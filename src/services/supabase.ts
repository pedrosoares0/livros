import { createClient } from '@supabase/supabase-js';
import type { BookEvaluation } from '../types/index.ts';

const SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://odaawprzdbpzivajzned.supabase.co';
const SUPABASE_ANON_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_ylTo-hmvP4G-LE8T8J6aoA_jFh2p9mg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOCAL_STORAGE_KEY = 'protocolo_evaluations_cache';
const SAVED_BOOKS_STORAGE_KEY = 'veredito_saved_books';

// Cache em memória: evita JSON.parse / JSON.stringify síncronos bloqueando animações de UI
let memoryEvaluations: BookEvaluation[] | null = null;
let evaluationsVersion = 0;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

export const getEvaluationsCacheVersion = () => evaluationsVersion;

const scheduleEvaluationsFlush = () => {
  if (typeof window === 'undefined') return;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    if (!memoryEvaluations) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memoryEvaluations));
    } catch (e) {
      console.error('Error writing local evaluations:', e);
    }
  }, 0);
};

const SUBTLE_PREMISE_OVERRIDES: Array<{
  matchTitle: RegExp;
  spoilerPattern: RegExp;
  subtleResumo: string;
}> = [
  {
    matchTitle: /n[aã]o\s+me\s+abandone\s+jamais|never\s+let\s+me\s+go/i,
    spoilerPattern: /clones?|doa[cç][aã]o\s+de\s+[oó]rg[aã]os/i,
    subtleResumo:
      'Em uma Inglaterra alternativa, jovens crescem no isolado internato de Hailsham cercados por regras veladas e pelo estímulo constante à arte, até compreenderem aos poucos o propósito silencioso para o qual foram criados.',
  },
];

function sanitizeEvaluationPremise(evalItem: BookEvaluation): {
  item: BookEvaluation;
  changed: boolean;
} {
  for (const rule of SUBTLE_PREMISE_OVERRIDES) {
    if (
      (rule.matchTitle.test(evalItem.title || '') ||
        rule.matchTitle.test(evalItem.originalTitle || '')) &&
      rule.spoilerPattern.test(evalItem.resumo || '')
    ) {
      return {
        item: { ...evalItem, resumo: rule.subtleResumo },
        changed: true,
      };
    }
  }
  return { item: evalItem, changed: false };
}

// Map database row to BookEvaluation
export const mapRowToEvaluation = (row: any): BookEvaluation =>
  sanitizeEvaluationPremise({
    id: row.id,
    title: row.title,
    author: row.author,
    originalTitle: row.original_title || row.criteria?.originalTitle || undefined,
    pages: row.pages || 0,
    coverUrl: row.cover_url || '',
    year: row.year || undefined,
    genres: Array.isArray(row.genres) ? row.genres : [],
    resumo: row.resumo || '',
    movieComparisons: Array.isArray(row.movie_comparisons) ? row.movie_comparisons : [],
    adaptacoes: row.adaptacoes || 'Nenhuma adaptação conhecida',
    criteria: row.criteria || {
      genericidade: 5,
      infantilidade: 5,
      infantilidadeStatus: 'aceitavel',
      qualidadeTecnica: 5,
      worldbuilding: 5,
      ritmo: 5,
      ritmoDescricao: 'Moderado',
      tomSombrio: 5,
      impactoEmocional: 5,
    },
    notaTecnica: Number(row.nota_tecnica) || 0,
    notaEncaixe: Number(row.nota_encaixe) || 0,
    veredito: row.veredito || '',
    vereditoTipo: row.veredito_tipo || 'ressalvas',
    justificativaEncaixe: row.justificativa_encaixe || '',
    userStatus: row.criteria?.userStatus || (row.criteria?.isSaved ? 'wishlist' : undefined),
    categoryShelf: row.criteria?.categoryShelf,
    isSaved: Boolean(row.criteria?.isSaved || row.criteria?.userStatus === 'wishlist'),
    createdAt: row.created_at || new Date().toISOString(),
  }).item;

// Map BookEvaluation to database row
export const mapEvaluationToRow = (b: BookEvaluation) => ({
  id: b.id,
  title: b.title,
  author: b.author,
  pages: b.pages,
  cover_url: b.coverUrl || null,
  year: b.year || null,
  genres: b.genres || [],
  resumo: b.resumo || '',
  movie_comparisons: b.movieComparisons || [],
  adaptacoes: b.adaptacoes || '',
  criteria: {
    ...(b.criteria || {}),
    originalTitle: b.originalTitle || undefined,
    isSaved: Boolean(b.isSaved || b.userStatus === 'wishlist'),
    userStatus: b.userStatus || (b.isSaved ? 'wishlist' : undefined),
    categoryShelf: b.categoryShelf || undefined,
  },
  nota_tecnica: b.notaTecnica,
  nota_encaixe: b.notaEncaixe,
  veredito: b.veredito,
  veredito_tipo: b.vereditoTipo,
  justificativa_encaixe: b.justificativaEncaixe || '',
  created_at: b.createdAt || new Date().toISOString(),
});

// Local cache helpers for resilient offline-first UX (O(1) memory hit after initial read)
export const getLocalEvaluations = (): BookEvaluation[] => {
  if (memoryEvaluations !== null) {
    return memoryEvaluations;
  }
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsed: BookEvaluation[] = raw ? JSON.parse(raw) : [];
    memoryEvaluations = parsed.map((b) => sanitizeEvaluationPremise(b).item);
    return memoryEvaluations!;
  } catch (e) {
    console.error('Error reading local evaluations:', e);
    memoryEvaluations = [];
    return [];
  }
};

export const saveLocalEvaluations = (books: BookEvaluation[]) => {
  memoryEvaluations = books;
  evaluationsVersion++;
  scheduleEvaluationsFlush();
};

// Fetch evaluations from Supabase (with fallback to local storage)
export const fetchEvaluations = async (): Promise<BookEvaluation[]> => {
  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase query notice:', error.message);
      return getLocalEvaluations();
    }

    if (data && Array.isArray(data)) {
      const parsed: BookEvaluation[] = [];
      for (const row of data) {
        const mapped = mapRowToEvaluation(row);
        parsed.push(mapped);
        if (row.resumo && mapped.resumo !== row.resumo) {
          supabase
            .from('evaluations')
            .update({ resumo: mapped.resumo })
            .eq('id', mapped.id)
            .then(() => {});
        }
      }
      saveLocalEvaluations(parsed);
      return parsed;
    }

    return getLocalEvaluations();
  } catch (err) {
    console.warn('Failed to reach Supabase, using local cache:', err);
    return getLocalEvaluations();
  }
};

// Save single evaluation to Supabase and local cache
export const saveEvaluation = async (evaluation: BookEvaluation): Promise<BookEvaluation> => {
  const localList = getLocalEvaluations();
  const existingIdx = localList.findIndex((b) => b.id === evaluation.id);
  const updatedList =
    existingIdx >= 0
      ? localList.map((b) => (b.id === evaluation.id ? evaluation : b))
      : [evaluation, ...localList];
  saveLocalEvaluations(updatedList);

  try {
    const row = mapEvaluationToRow(evaluation);
    const { data, error } = await supabase
      .from('evaluations')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('Could not persist to Supabase evaluations table:', error.message);
    } else if (data) {
      return mapRowToEvaluation(data);
    }
  } catch (err) {
    console.warn('Error syncing evaluation with Supabase:', err);
  }

  return evaluation;
};

// Toggle saved state in Supabase and local cache (sem round-trip extra de SELECT quando já está em memória)
export const toggleSaveBook = async (bookId: string, isSaved: boolean): Promise<boolean> => {
  const localList = getLocalEvaluations();
  const cachedBook = localList.find((b) => b.id === bookId);
  const updatedList = localList.map((b) => (b.id === bookId ? { ...b, isSaved } : b));
  saveLocalEvaluations(updatedList);

  setTimeout(() => {
    try {
      const raw = localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);
      const set = new Set(raw ? JSON.parse(raw) : []);
      if (isSaved) {
        set.add(bookId);
      } else {
        set.delete(bookId);
      }
      localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, JSON.stringify([...set]));
    } catch (e) {
      console.error('Error writing saved books storage:', e);
    }
  }, 0);

  try {
    let baseCriteria: Record<string, any> = cachedBook?.criteria ? { ...cachedBook.criteria } : {};
    if (!cachedBook) {
      const { data } = await supabase
        .from('evaluations')
        .select('criteria')
        .eq('id', bookId)
        .single();
      baseCriteria = data?.criteria || {};
    } else {
      if (cachedBook.originalTitle) baseCriteria.originalTitle = cachedBook.originalTitle;
      if (cachedBook.categoryShelf) baseCriteria.categoryShelf = cachedBook.categoryShelf;
    }

    const updatedCriteria = {
      ...baseCriteria,
      isSaved,
      userStatus: isSaved
        ? 'wishlist'
        : baseCriteria.userStatus === 'wishlist'
        ? undefined
        : baseCriteria.userStatus,
    };

    const { error } = await supabase
      .from('evaluations')
      .update({ criteria: updatedCriteria })
      .eq('id', bookId);

    if (error) {
      console.warn('Supabase toggleSave error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error syncing toggleSave with Supabase:', err);
    return false;
  }
};

// Update book cover in Supabase and local cache
export const updateBookCoverInDb = async (bookId: string, newCoverUrl: string): Promise<boolean> => {
  const localList = getLocalEvaluations();
  const updatedList = localList.map((b) => (b.id === bookId ? { ...b, coverUrl: newCoverUrl } : b));
  saveLocalEvaluations(updatedList);

  try {
    const { error } = await supabase
      .from('evaluations')
      .update({ cover_url: newCoverUrl })
      .eq('id', bookId);

    if (error) {
      console.warn('Supabase update cover error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error updating cover in Supabase:', err);
    return false;
  }
};

// Delete evaluation from Supabase and local cache
export const deleteEvaluation = async (id: string): Promise<boolean> => {
  const localList = getLocalEvaluations().filter((b) => b.id !== id);
  saveLocalEvaluations(localList);

  setTimeout(() => {
    try {
      const raw = localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);
      if (raw) {
        const set = new Set(JSON.parse(raw));
        set.delete(id);
        localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, JSON.stringify([...set]));
      }
    } catch (e) {
      console.error('Error removing from saved books storage:', e);
    }
  }, 0);

  try {
    const { error } = await supabase
      .from('evaluations')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase delete error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Failed to delete from Supabase:', err);
    return false;
  }
};
