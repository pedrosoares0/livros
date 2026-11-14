import { supabase, getLocalEvaluations, getEvaluationsCacheVersion } from './supabase';
import type { BookEvaluation, UserRating, UserRatingsMap } from '../types';

const RATINGS_STORAGE_KEY = 'veredito_user_ratings';

// ---------------------------------------------------------------------------
// Pills por faixa de nota (exclusivas de cada faixa, opcionais)
// ---------------------------------------------------------------------------
export type RatingBand = 'low' | 'mid' | 'high';

export const RATING_PILLS: Record<RatingBand, string[]> = {
  low: ['Só é ruim mesmo', 'Ritmo arrastado', 'Nenhum impacto', 'Raso / besta'],
  mid: ['Experiência ok', 'Bom, mas nada demais', 'Ideia boa, ritmo lento'],
  high: ['Me marcou', 'Ritmo impecável', 'Releria'],
};

export const getRatingBand = (rating: number): RatingBand => {
  if (rating <= 5) return 'low';
  if (rating <= 7) return 'mid';
  return 'high';
};

export const getPillsForRating = (rating: number): string[] => {
  if (rating <= 5) {
    return ['Só é ruim mesmo', 'Ritmo arrastado', 'Nenhum impacto', 'Raso / besta'];
  }
  if (rating <= 7) {
    return ['Experiência ok', 'Bom, mas nada demais', 'Ideia boa, ritmo lento'];
  }
  if (rating === 10) {
    return ['Perfeito', 'Me marcou', 'Ritmo impecável', 'Releria'];
  }
  return ['Me marcou', 'Ritmo impecável', 'Releria'];
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
// Cache em memória + flush assíncrono em localStorage (0ms na main thread)
// ---------------------------------------------------------------------------
let memoryRatings: UserRatingsMap | null = null;
let ratingsVersion = 0;
let ratingsFlushTimer: ReturnType<typeof setTimeout> | null = null;

export const getLocalRatings = (): UserRatingsMap => {
  if (memoryRatings !== null) {
    return memoryRatings;
  }
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(RATINGS_STORAGE_KEY);
    memoryRatings = raw ? JSON.parse(raw) : {};
    return memoryRatings!;
  } catch {
    memoryRatings = {};
    return {};
  }
};

const saveLocalRatings = (map: UserRatingsMap) => {
  memoryRatings = map;
  ratingsVersion++;
  if (typeof window === 'undefined') return;
  if (ratingsFlushTimer) clearTimeout(ratingsFlushTimer);
  ratingsFlushTimer = setTimeout(() => {
    ratingsFlushTimer = null;
    if (!memoryRatings) return;
    try {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(memoryRatings));
    } catch (e) {
      console.error('Error writing local ratings:', e);
    }
  }, 0);
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
  await deleteRatingsBulk([bookId]);
};

export const deleteRatingsBulk = async (bookIds: string[]): Promise<void> => {
  if (bookIds.length === 0) return;
  const current = getLocalRatings();
  const next = { ...current };
  let changed = false;
  for (const id of bookIds) {
    if (next[id]) {
      delete next[id];
      changed = true;
    }
  }
  if (changed) {
    saveLocalRatings(next);
  }
  try {
    const { error } = await supabase.from('user_ratings').delete().in('book_id', bookIds);
    if (error) console.warn('Could not delete rating:', error.message);
  } catch (err) {
    console.warn('Error deleting rating in Supabase:', err);
  }
};

// ---------------------------------------------------------------------------
// Histórico real de leitura para o prompt da IA (memoizado por versão)
// ---------------------------------------------------------------------------
const MAX_RECENT = 20;
const MAX_DIVERGENT = 10;

let cachedHistoryKey = '';
let cachedHistoryValue = '';

export const buildReadingHistoryBlock = (): string => {
  const ratings = Object.values(getLocalRatings());
  if (ratings.length === 0) return '';

  const cacheKey = `${ratingsVersion}:${getEvaluationsCacheVersion()}`;
  if (cacheKey === cachedHistoryKey) {
    return cachedHistoryValue;
  }

  const booksById = new Map(getLocalEvaluations().map((b) => [b.id, b]));
  const entries = ratings
    .map((r) => ({ r, book: booksById.get(r.bookId) }))
    .filter((e): e is { r: UserRating; book: BookEvaluation } => Boolean(e.book));
  if (entries.length === 0) {
    cachedHistoryKey = cacheKey;
    cachedHistoryValue = '';
    return '';
  }

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
    const drift =
      delta === 0
        ? 'previsão correta'
        : delta < 0
        ? `IA superestimou em ${-delta}`
        : `IA subestimou em ${delta}`;
    const genres = book.genres.slice(0, 2).join(', ');
    const tags = r.tags.length > 0 ? ` | ${r.tags.join(', ')}` : '';
    return `  * ${book.title} (${book.author}) [${genres}] — previsto ${predicted} → leitor ${r.rating} (${drift})${tags}`;
  });

  cachedHistoryKey = cacheKey;
  cachedHistoryValue = `
HISTÓRICO REAL DE LEITURA (notas que o próprio leitor deu APÓS terminar cada obra, com seus comentários rápidos):
${lines.join('\n')}
- PRIORIDADE: este histórico é o sinal MAIS FORTE do gosto do leitor. Em qualquer conflito com o perfil acima, o histórico prevalece.
- CALIBRAÇÃO: use as divergências "previsto → leitor" para corrigir sua Nota de Encaixe. Se você superestimou obras com certas características (ritmo, tom, gênero, extensão, estilo do autor), penalize obras semelhantes; se subestimou, valorize-as. Os comentários indicam o motivo.
`;
  return cachedHistoryValue;
};
