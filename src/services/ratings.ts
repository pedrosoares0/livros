import { supabase, getLocalEvaluations } from './supabase';
import type { BookEvaluation, UserRating, UserRatingsMap } from '../types';

const RATINGS_STORAGE_KEY = 'veredito_user_ratings';

// ---------------------------------------------------------------------------
// Pills por faixa de nota (exclusivas de cada faixa, opcionais)
// ---------------------------------------------------------------------------
export type RatingBand = 'low' | 'mid' | 'high';

export const RATING_PILLS: Record<RatingBand, string[]> = {
  low: ['Ritmo arrastado', 'Nenhum impacto', 'Raso / besta'],
  mid: ['Experiência ok', 'Bom, mas nada demais', 'Ideia boa, ritmo lento'],
  high: ['Me marcou', 'Ritmo impecável', 'Releria'],
};

export const getRatingBand = (rating: number): RatingBand => {
  if (rating <= 5) return 'low';
  if (rating <= 7) return 'mid';
  return 'high';
};

/** Nota efetiva: a do leitor quando existe, senão a de encaixe prevista pela IA. */
export const getEffectiveScore = (book: BookEvaluation, ratings?: UserRatingsMap): number =>
  ratings?.[book.id]?.rating ?? book.notaEncaixe;

// ---------------------------------------------------------------------------
// Mapeamento DB <-> App
// ---------------------------------------------------------------------------
const mapRowToRating = (row: any): UserRating => ({
  bookId: row.book_id,
  rating: Number(row.rating),
  tags: Array.isArray(row.tags) ? row.tags : [],
  ratedAt: row.rated_at || new Date().toISOString(),
  updatedAt: row.updated_at || row.rated_at || new Date().toISOString(),
});

const mapRatingToRow = (r: UserRating) => ({
  book_id: r.bookId,
  rating: r.rating,
  tags: r.tags,
  rated_at: r.ratedAt,
  updated_at: r.updatedAt,
});

// ---------------------------------------------------------------------------
// Cache local (leitura síncrona: usado na UI e no prompt da IA sem latência)
// ---------------------------------------------------------------------------
export const getLocalRatings = (): UserRatingsMap => {
  try {
    const raw = localStorage.getItem(RATINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveLocalRatings = (map: UserRatingsMap) => {
  try {
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Error writing local ratings:', e);
  }
};

// ---------------------------------------------------------------------------
// Supabase
// ---------------------------------------------------------------------------
export const fetchRatings = async (): Promise<UserRatingsMap> => {
  const local = getLocalRatings();
  try {
    const { data, error } = await supabase.from('user_ratings').select('*');
    if (error || !Array.isArray(data)) {
      if (error) console.warn('Supabase user_ratings notice:', error.message);
      return local;
    }

    const server: UserRatingsMap = {};
    for (const row of data) {
      const r = mapRowToRating(row);
      server[r.bookId] = r;
    }

    // Notas feitas offline (ou antes da tabela existir) sobem em segundo plano
    const pending = Object.values(local).filter(
      (r) => !server[r.bookId] || new Date(r.updatedAt) > new Date(server[r.bookId].updatedAt)
    );
    for (const r of pending) server[r.bookId] = r;
    if (pending.length > 0) {
      supabase
        .from('user_ratings')
        .upsert(pending.map(mapRatingToRow), { onConflict: 'book_id' })
        .then(({ error: upErr }) => {
          if (upErr) console.warn('Could not sync pending ratings:', upErr.message);
        });
    }

    saveLocalRatings(server);
    return server;
  } catch (err) {
    console.warn('Failed to reach Supabase ratings, using local cache:', err);
    return local;
  }
};

export const upsertRating = async (rating: UserRating): Promise<void> => {
  saveLocalRatings({ ...getLocalRatings(), [rating.bookId]: rating });
  try {
    const { error } = await supabase
      .from('user_ratings')
      .upsert(mapRatingToRow(rating), { onConflict: 'book_id' });
    if (error) console.warn('Could not persist rating:', error.message);
  } catch (err) {
    console.warn('Error syncing rating with Supabase:', err);
  }
};

export const deleteRating = async (bookId: string): Promise<void> => {
  const map = getLocalRatings();
  if (map[bookId]) {
    delete map[bookId];
    saveLocalRatings(map);
  }
  try {
    const { error } = await supabase.from('user_ratings').delete().eq('book_id', bookId);
    if (error) console.warn('Could not delete rating:', error.message);
  } catch (err) {
    console.warn('Error deleting rating in Supabase:', err);
  }
};

// ---------------------------------------------------------------------------
// Histórico real de leitura para o prompt da IA
// ---------------------------------------------------------------------------
const MAX_RECENT = 20;
const MAX_DIVERGENT = 10;

/**
 * Bloco compacto (uma linha por obra) com as notas reais do leitor.
 * Lido do cache local: zero requisições extras antes de chamar o Gemini.
 * Seleciona as 20 leituras mais recentes + as 10 com maior divergência entre
 * a previsão da IA e a nota real, para manter o prompt curto e informativo.
 */
export const buildReadingHistoryBlock = (): string => {
  const ratings = Object.values(getLocalRatings());
  if (ratings.length === 0) return '';

  const booksById = new Map(getLocalEvaluations().map((b) => [b.id, b]));
  const entries = ratings
    .map((r) => ({ r, book: booksById.get(r.bookId) }))
    .filter((e): e is { r: UserRating; book: BookEvaluation } => Boolean(e.book));
  if (entries.length === 0) return '';

  const byRecent = [...entries].sort(
    (a, b) => new Date(b.r.updatedAt).getTime() - new Date(a.r.updatedAt).getTime()
  );
  const selected = byRecent.slice(0, MAX_RECENT);
  const selectedIds = new Set(selected.map((e) => e.r.bookId));
  const divergent = byRecent
    .slice(MAX_RECENT)
    .sort(
      (a, b) =>
        Math.abs(b.r.rating - b.book.notaEncaixe) - Math.abs(a.r.rating - a.book.notaEncaixe)
    )
    .filter((e) => !selectedIds.has(e.r.bookId))
    .slice(0, MAX_DIVERGENT);

  const lines = [...selected, ...divergent].map(({ r, book }) => {
    const predicted = Math.floor(book.notaEncaixe);
    const delta = r.rating - predicted;
    const drift = delta === 0 ? 'previsão correta' : delta < 0 ? `IA superestimou em ${-delta}` : `IA subestimou em ${delta}`;
    const genres = book.genres.slice(0, 2).join(', ');
    const tags = r.tags.length > 0 ? ` | ${r.tags.join(', ')}` : '';
    return `  * ${book.title} (${book.author}) [${genres}] — previsto ${predicted} → leitor ${r.rating} (${drift})${tags}`;
  });

  return `
HISTÓRICO REAL DE LEITURA (notas que o próprio leitor deu APÓS terminar cada obra, com seus comentários rápidos):
${lines.join('\n')}
- PRIORIDADE: este histórico é o sinal MAIS FORTE do gosto do leitor. Em qualquer conflito com o perfil acima, o histórico prevalece.
- CALIBRAÇÃO: use as divergências "previsto → leitor" para corrigir sua Nota de Encaixe. Se você superestimou obras com certas características (ritmo, tom, gênero, extensão, estilo do autor), penalize obras semelhantes; se subestimou, valorize-as. Os comentários indicam o motivo.
`;
};
