import { createClient } from '@supabase/supabase-js';
import { BookEvaluation } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://odaawprzdbpzivajzned.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ylTo-hmvP4G-LE8T8J6aoA_jFh2p9mg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOCAL_STORAGE_KEY = 'protocolo_evaluations_cache';

// Map database row to BookEvaluation
const mapRowToEvaluation = (row: any): BookEvaluation => ({
  id: row.id,
  title: row.title,
  author: row.author,
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
  createdAt: row.created_at || new Date().toISOString(),
});

// Map BookEvaluation to database row
const mapEvaluationToRow = (b: BookEvaluation) => ({
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
  criteria: b.criteria || {},
  nota_tecnica: b.notaTecnica,
  nota_encaixe: b.notaEncaixe,
  veredito: b.veredito,
  veredito_tipo: b.vereditoTipo,
  justificativa_encaixe: b.justificativaEncaixe || '',
  created_at: b.createdAt || new Date().toISOString(),
});

// Local cache helpers for resilient offline-first UX
export const getLocalEvaluations = (): BookEvaluation[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading local evaluations:', e);
    return [];
  }
};

export const saveLocalEvaluations = (books: BookEvaluation[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  } catch (e) {
    console.error('Error writing local evaluations:', e);
  }
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

    if (data && data.length > 0) {
      const parsed = data.map(mapRowToEvaluation);
      saveLocalEvaluations(parsed);
      return parsed;
    }

    // If Supabase returned empty table, return cached local evaluations
    return getLocalEvaluations();
  } catch (err) {
    console.warn('Failed to reach Supabase, using local cache:', err);
    return getLocalEvaluations();
  }
};

// Save single evaluation to Supabase and local cache
export const saveEvaluation = async (evaluation: BookEvaluation): Promise<BookEvaluation> => {
  // Update local cache first for instant optimistic response
  const localList = getLocalEvaluations();
  const existingIdx = localList.findIndex((b) => b.id === evaluation.id);
  const updatedList = existingIdx >= 0
    ? localList.map((b) => (b.id === evaluation.id ? evaluation : b))
    : [evaluation, ...localList];
  saveLocalEvaluations(updatedList);

  // Sync to Supabase
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

// Delete evaluation from Supabase and local cache
export const deleteEvaluation = async (id: string): Promise<boolean> => {
  // Remove from local cache
  const localList = getLocalEvaluations().filter((b) => b.id !== id);
  saveLocalEvaluations(localList);

  // Delete from Supabase
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
