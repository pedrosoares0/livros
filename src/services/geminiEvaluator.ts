import { BookEvaluation, CriteriaScores, VereditoTipo } from '../types';
import { buildReadingHistoryBlock } from './ratings';
import { getCuratedCovers } from '../data/curatedCovers';
import { raceGemini, parseJsonLoose, RaceModel } from './geminiRace';

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  'AQ.Ab8RN6LNzoEEpQlupq2n1dJRY5APsOuFfXmRLp7ESySq8-A3Uw';

const EVAL_INITIAL_MODELS: RaceModel[] = [
  {
    model: 'gemini-3-flash-preview',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'low' } },
  },
  { model: 'gemini-3.1-flash-lite', tier: 'fast' },
];

const EVAL_BACKUP_MODELS: RaceModel[] = [
  { model: 'gemini-flash-lite-latest', tier: 'fast' },
  { model: 'gemini-3.5-flash-lite', tier: 'fast' },
  {
    model: 'gemini-3.1-flash-lite-preview',
    tier: 'fast',
    generationConfig: { thinkingConfig: { thinkingBudget: 0 } },
  },
  {
    model: 'gemini-3.5-flash',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingBudget: 0 } },
  },
];

const EVAL_GENERATION_CONFIG = {
  responseMimeType: 'application/json',
  temperature: 0.2,
};

const USER_PROFILE_PROMPT = `
Você é o motor de avaliação do app "Veredito", responsável por avaliar livros, HQs e coletâneas para um leitor pessoal extremamente criterioso.

PERFIL DO LEITOR:
- Preferência de formato: Livros curtos a médios em português (pt-BR), densidade existencial/filosófica, ritmo firme sem gordura, seriedade dramática, humor sutil e inteligente quando houver. Aprecia graphic novels, adaptações visuais e forte identidade estética.
- Gêneros favoritos: Ficção científica conceitual/filosófica/existencial, fantasia sombria, worldbuilding denso e consistente, distopias, clássicos da literatura, contos e novelas densas, fábulas/alegorias sombrias, horror psicológico, drama humano pesado (guerra, culpa, trauma, luto, obsessão, poder, dilemas éticos/morais com consequências definitivas, personagens moralmente ambíguos).
- Obras que o usuário amou (referência 9 a 10):
  * Senhor das Moscas (Golding) — Técnica 9, Encaixe 10
  * A Revolução dos Bichos (Orwell) — Técnica 9, Encaixe 10
  * De Quanta Terra Precisa o Homem? (Tolstói) — Técnica 10, Encaixe 10
  * Flores para Algernon (Daniel Keyes) — Técnica 10, Encaixe 10
  * O Inferno de Dante — Técnica 10, Encaixe 10
  * Noites Brancas (Dostoiévski) — Técnica 9, Encaixe 10
  * A Chegada / Histórias da sua Vida (Ted Chiang) — Técnica 10, Encaixe 10
  * O Gato Preto (Edgar Allan Poe) — Técnica 9, Encaixe 10
  * O Estranho Misterioso (Mark Twain) — Técnica 9, Encaixe 10
  * O Cair da Noite (Isaac Asimov) — Técnica 9, Encaixe 10
  * Contos de Beedle, o Bardo (Rowling) — Técnica 8, Encaixe 9
  * Colapso (Roberto Denser / DarkSide) — Técnica 8, Encaixe 9
  * Entre Quatro Paredes (Sartre) — Técnica 9, Encaixe 10
  * Diário de um Homem Supérfluo (Turguêniev) — Técnica 9, Encaixe 10
  * A Menina do Outro Lado (Nagabe / DarkSide) — Técnica 9, Encaixe 9
- Obras que o usuário REJEITOU (com notas do próprio leitor):
  * O Velho e o Mar (Hemingway) — tenta ser profundo mas soa super raso, fraco, prolixo e lento; tenta dizer muito mas no final não diz nada.
  * Encontro com Rama (Clarke) — decepcionante, muito devagar, personagens burocráticos.
  * Carta ao Pai (Kafka) — muito bem escrito e ritmo ok, mas puramente formal e sem emoção, não tocou em nada.
  * As Fontes do Paraíso (Clarke) — hard sci-fi contemplativo demais, ritmo arrastado sem impacto dramático.
- Pesos negativos: romance como motor central, tramas fofas/cozy/acolhedoras, jovem adulto (YA) genérico/colegial, misticismo leve, comédia romântica, autoajuda disfarçada de ficção, prolixidade sem tensão dramática, calhamaços inchados onde a densidade dramática se dilui em centenas de páginas secundárias.
- REGRA CRÍTICA: Qualidade técnica alta NÃO compensa um tom que o usuário rejeita. Uma obra pode ter Nota Técnica 9 ou 10 e Nota de Encaixe 3 ou 4 se for um calhamaço prolixo, lento ou focado em tramas secundárias.
- REGRA DE NOTAS: Todas as notas (Técnica e Encaixe) devem ser NÚMEROS INTEIROS de 0 a 10. Se fracionado, arredonde para menos (ex: 8.6 vira 8).
`;

export interface GeminiEvaluationResponse {
  title: string;
  author: string;
  originalTitle?: string;
  pages: number;
  year?: number;
  resumo: string;
  movieComparisons: string[];
  adaptacoes: string;
  criteria: CriteriaScores;
  notaTecnica: number;
  notaEncaixe: number;
  veredito: string;
  vereditoTipo: VereditoTipo;
  justificativaEncaixe: string;
  genres: string[];
}

function parseEvaluationJson(rawText: string): GeminiEvaluationResponse {
  const parsed = parseJsonLoose<GeminiEvaluationResponse | GeminiEvaluationResponse[]>(rawText);
  const obj = Array.isArray(parsed) ? parsed[0] : parsed;
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON de avaliação inválido.');
  }
  if (!Number.isFinite(Number(obj.notaEncaixe)) || !Number.isFinite(Number(obj.notaTecnica))) {
    throw new Error('Avaliação sem notas numéricas válidas.');
  }
  return obj;
}

function parseBulkJson(rawText: string): GeminiEvaluationResponse[] {
  const parsed = parseJsonLoose<any>(rawText);
  const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.items) ? parsed.items : null;
  if (!list || list.length === 0) {
    throw new Error('Lista de avaliações vazia.');
  }
  return list;
}

export async function evaluateWithGemini(
  bookTitle: string,
  extraContext?: {
    author?: string;
    description?: string;
    coverUrl?: string;
    pages?: number;
    year?: number;
    genres?: string[];
  }
): Promise<BookEvaluation> {
  const historyBlock = buildReadingHistoryBlock();
  const prompt = `
${USER_PROFILE_PROMPT}
${historyBlock}

Analise rigorosamente a obra: "${bookTitle}" ${extraContext?.author ? `do autor "${extraContext.author}"` : ''}.
${extraContext?.description ? `Sinopse/Contexto prévio: ${extraContext.description}` : ''}

INSTRUÇÕES OBRIGATÓRIAS DE CONTEÚDO E FIDELIDADE:
1. PÁGINAS REAIS: Forneça a quantidade REAL aproximada de páginas da edição brasileira mais conhecida ou da obra original (Exemplo: Ritmo da Guerra ~1280; Guerra e Paz ~1200; Duna ~680; Flores para Algernon ~280). NUNCA invente 200 ou 240 se a obra for notoriamente mais extensa ou mais curta.
2. FILMES RELACIONADOS CONEXOS: Indique de 2 a 3 filmes ou séries cujo tom, temática, atmosfera, escala ou dilemas éticos REALMENTE tenham paralelo com a obra. NUNCA indique comédias ou obras desconexas.
3. CRITÉRIOS REAIS (0 a 10 inteiros):
   - genericidade: 0 = hiper autoral/original, 10 = clichê comercial previsível
   - infantilidade: 0-2 adulto/pesado, 3-5 aceitável/geral, 6 risco juvenil, 7-10 infantil ("infantilidadeStatus": "ideal" | "aceitavel" | "risco" | "rejeicao")
   - qualidadeTecnica, worldbuilding, ritmo, tomSombrio, impactoEmocional: 0 a 10
4. NOTAS INTEIRAS: "notaTecnica" e "notaEncaixe" devem ser NÚMEROS INTEIROS (0 a 10), arredondados para baixo. "vereditoTipo": "leia" | "ressalvas" | "evite".

Responda ESTRITAMENTE em JSON válido com estas exatas chaves:
{
  "title": "${bookTitle}",
  "author": "Nome do autor verificado",
  "originalTitle": "Título original no idioma original",
  "pages": 320,
  "genres": ["Gênero Principal", "Subgênero"],
  "resumo": "2 a 3 linhas focando o conflito central, clima, premissa e tom sem spoilers",
  "movieComparisons": ["Filme 1", "Filme 2", "Filme 3"],
  "adaptacoes": "Menção a adaptações reais ou 'Nenhuma adaptação audiovisual oficial até o momento.'",
  "criteria": {
    "genericidade": 3,
    "infantilidade": 2,
    "infantilidadeStatus": "ideal",
    "qualidadeTecnica": 9,
    "worldbuilding": 9,
    "ritmo": 6,
    "ritmoDescricao": "Frase curta descrevendo a cadência real da leitura",
    "tomSombrio": 8,
    "impactoEmocional": 8
  },
  "notaTecnica": 9,
  "notaEncaixe": 7,
  "veredito": "Frase final sincera, direta e sem rodeios sobre valer ou não o investimento do leitor",
  "vereditoTipo": "leia",
  "justificativaEncaixe": "Análise crítica transparente de 2 a 3 linhas explicando exatamente onde a obra acerta e onde colide com as idiossincrasias do leitor"
}
`;

  const { value: parsed } = await raceGemini<GeminiEvaluationResponse>({
    apiKey: GEMINI_API_KEY,
    prompt,
    initial: EVAL_INITIAL_MODELS,
    backups: EVAL_BACKUP_MODELS,
    parse: parseEvaluationJson,
    baseGenerationConfig: EVAL_GENERATION_CONFIG,
    preferWindowMs: 5000,
    hedgeAfterMs: 2600,
    perRequestTimeoutMs: 11000,
    overallTimeoutMs: 13500,
    label: 'Gemini',
  });

  const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const curated = getCuratedCovers(parsed.title || bookTitle);
  const coverUrl =
    extraContext?.coverUrl ||
    curated?.[0] ||
    `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`;

  const pages =
    extraContext?.pages && extraContext.pages > 30
      ? extraContext.pages
      : parsed.pages && parsed.pages > 30
      ? Math.round(parsed.pages)
      : 300;

  const year = extraContext?.year || (parsed.year ? Number(parsed.year) : undefined);

  return {
    id,
    title: parsed.title || bookTitle,
    author: parsed.author || extraContext?.author || 'Autor não informado',
    originalTitle: parsed.originalTitle || undefined,
    pages,
    year,
    coverUrl,
    genres: Array.isArray(parsed.genres) && parsed.genres.length > 0 ? parsed.genres : ['Ficção'],
    resumo: parsed.resumo || '',
    movieComparisons: Array.isArray(parsed.movieComparisons) ? parsed.movieComparisons.slice(0, 4) : [],
    adaptacoes: Array.isArray(parsed.adaptacoes)
      ? parsed.adaptacoes.join(', ') || 'Nenhuma adaptação conhecida'
      : typeof parsed.adaptacoes === 'string' && parsed.adaptacoes.trim()
      ? parsed.adaptacoes
      : 'Nenhuma adaptação conhecida',
    criteria: {
      genericidade: Math.floor(Number(parsed.criteria?.genericidade ?? 3)),
      infantilidade: Math.floor(Number(parsed.criteria?.infantilidade ?? 2)),
      infantilidadeStatus: parsed.criteria?.infantilidadeStatus || 'ideal',
      qualidadeTecnica: Math.floor(Number(parsed.criteria?.qualidadeTecnica) || 8),
      worldbuilding: Math.floor(Number(parsed.criteria?.worldbuilding) || 8),
      ritmo: Math.floor(Number(parsed.criteria?.ritmo) || 6),
      ritmoDescricao: parsed.criteria?.ritmoDescricao || 'Ritmo moderado',
      tomSombrio: Math.floor(Number(parsed.criteria?.tomSombrio) || 6),
      impactoEmocional: Math.floor(Number(parsed.criteria?.impactoEmocional) || 6),
    },
    notaTecnica: Math.floor(Number(parsed.notaTecnica)),
    notaEncaixe: Math.floor(Number(parsed.notaEncaixe)),
    veredito: parsed.veredito || 'Obra que demanda leitura atenta.',
    vereditoTipo: parsed.vereditoTipo || 'ressalvas',
    justificativaEncaixe: parsed.justificativaEncaixe || '',
    createdAt: new Date().toISOString(),
  };
}

export async function evaluateBulkWithGemini(rawLines: string[]): Promise<BookEvaluation[]> {
  const booksToEvaluate = rawLines.slice(0, 10);
  const historyBlock = buildReadingHistoryBlock();
  const prompt = `
${USER_PROFILE_PROMPT}
${historyBlock}

Avalie a seguinte lista de obras literárias de acordo com o perfil rigoroso do leitor do app Veredito:
${booksToEvaluate.map((b, i) => `${i + 1}. ${b}`).join('\n')}

INSTRUÇÕES OBRIGATÓRIAS:
1. PÁGINAS REAIS: informe a quantidade real aproximada de páginas de cada obra.
2. FILMES CONEXOS: indique filmes cujos temas e atmosfera realmente dialoguem com a obra.
3. NOTAS INTEIRAS: notas inteiras (0 a 10) arredondadas para menos.

Retorne ESTRITAMENTE um array JSON de objetos válidos:
[
  {
    "title": "Título",
    "author": "Autor",
    "originalTitle": "Título original",
    "pages": 300,
    "genres": ["Gênero 1"],
    "resumo": "Sinopse concisa sem spoiler de 2 linhas",
    "movieComparisons": ["Filme 1", "Filme 2"],
    "adaptacoes": "Menção curta",
    "criteria": {
      "genericidade": 3,
      "infantilidade": 2,
      "infantilidadeStatus": "ideal",
      "qualidadeTecnica": 8,
      "worldbuilding": 8,
      "ritmo": 6,
      "ritmoDescricao": "descrição curta",
      "tomSombrio": 7,
      "impactoEmocional": 7
    },
    "notaTecnica": 8,
    "notaEncaixe": 7,
    "veredito": "Frase direta",
    "vereditoTipo": "leia",
    "justificativaEncaixe": "Análise transparente do encaixe"
  }
]
`;

  const { value: parsedList } = await raceGemini<GeminiEvaluationResponse[]>({
    apiKey: GEMINI_API_KEY,
    prompt,
    initial: EVAL_INITIAL_MODELS,
    backups: EVAL_BACKUP_MODELS,
    parse: parseBulkJson,
    baseGenerationConfig: EVAL_GENERATION_CONFIG,
    preferWindowMs: 12000,
    hedgeAfterMs: 8000,
    perRequestTimeoutMs: 28000,
    overallTimeoutMs: 32000,
    label: 'Gemini Lote',
  });

  return parsedList.map((parsed, idx) => {
    const curated = getCuratedCovers(parsed.title || booksToEvaluate[idx]);
    return {
      id: `eval-bulk-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      title: parsed.title || booksToEvaluate[idx],
      author: parsed.author || 'Autor não informado',
      originalTitle: parsed.originalTitle || undefined,
      pages: parsed.pages && parsed.pages > 30 ? Math.round(parsed.pages) : 300,
      coverUrl: curated?.[0] || `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`,
      genres: Array.isArray(parsed.genres) && parsed.genres.length > 0 ? parsed.genres : ['Ficção'],
      resumo: parsed.resumo || '',
      movieComparisons: Array.isArray(parsed.movieComparisons) ? parsed.movieComparisons.slice(0, 4) : [],
      adaptacoes: Array.isArray(parsed.adaptacoes)
        ? parsed.adaptacoes.join(', ') || 'Nenhuma adaptação conhecida'
        : typeof parsed.adaptacoes === 'string' && parsed.adaptacoes.trim()
        ? parsed.adaptacoes
        : 'Nenhuma adaptação conhecida',
      criteria: {
        genericidade: Math.floor(Number(parsed.criteria?.genericidade ?? 3)),
        infantilidade: Math.floor(Number(parsed.criteria?.infantilidade ?? 2)),
        infantilidadeStatus: parsed.criteria?.infantilidadeStatus || 'ideal',
        qualidadeTecnica: Math.floor(Number(parsed.criteria?.qualidadeTecnica) || 8),
        worldbuilding: Math.floor(Number(parsed.criteria?.worldbuilding) || 8),
        ritmo: Math.floor(Number(parsed.criteria?.ritmo) || 6),
        ritmoDescricao: parsed.criteria?.ritmoDescricao || 'Ritmo moderado',
        tomSombrio: Math.floor(Number(parsed.criteria?.tomSombrio) || 6),
        impactoEmocional: Math.floor(Number(parsed.criteria?.impactoEmocional) || 6),
      },
      notaTecnica: Number.isFinite(Number(parsed.notaTecnica)) ? Math.floor(Number(parsed.notaTecnica)) : 8,
      notaEncaixe: Number.isFinite(Number(parsed.notaEncaixe)) ? Math.floor(Number(parsed.notaEncaixe)) : 6,
      veredito: parsed.veredito || 'Obra avaliada pelo perfil.',
      vereditoTipo: parsed.vereditoTipo || 'ressalvas',
      justificativaEncaixe: parsed.justificativaEncaixe || '',
      createdAt: new Date().toISOString(),
    };
  });
}

// Cache em memória para buscas instantâneas (0ms)
const searchMemoryCache = new Map<string, Partial<BookEvaluation>[]>();

const SEARCH_INITIAL_MODELS: RaceModel[] = [
  { model: 'gemini-3.1-flash-lite', tier: 'preferred' },
  { model: 'gemini-flash-lite-latest', tier: 'preferred' },
];

const SEARCH_BACKUP_MODELS: RaceModel[] = [
  { model: 'gemini-3.5-flash-lite', tier: 'preferred' },
];

/**
 * Busca inteligente ultra-rápida de livros e edições populares no catálogo brasileiro
 */
export async function searchPopularBooksWithGemini(
  query: string,
  signal?: AbortSignal
): Promise<Partial<BookEvaluation>[]> {
  const clean = query.trim();
  if (!clean || clean.length < 2) return [];

  const cacheKey = clean.toLowerCase();
  if (searchMemoryCache.has(cacheKey)) {
    return searchMemoryCache.get(cacheKey)!;
  }

  const prompt = `Busca rápida de livros para catálogo brasileiro: "${clean}".
Retorne no máximo 3 ou 4 obras/edições mais populares comercializadas no Brasil (como na Amazon Brasil e principais livrarias).
Responda ESTRITAMENTE em formato JSON (array de objetos compactos):
[
  {
    "title": "Título em português",
    "author": "Nome do Autor",
    "publisher": "Editora (ex: Antofágica, Companhia das Letras, Planeta)",
    "year": 2024,
    "pages": 500,
    "isbn13": "9788542225341"
  }
]`;

  try {
    const { value: rawItems } = await raceGemini<any[]>({
      apiKey: GEMINI_API_KEY,
      prompt,
      initial: SEARCH_INITIAL_MODELS,
      backups: SEARCH_BACKUP_MODELS,
      parse: (text) => {
        const parsed = parseJsonLoose<any>(text);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Busca sem resultados.');
        }
        return parsed;
      },
      baseGenerationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
        maxOutputTokens: 600,
      },
      preferWindowMs: 0,
      hedgeAfterMs: 1800,
      perRequestTimeoutMs: 5200,
      overallTimeoutMs: 6200,
      signal,
      label: 'Busca Gemini',
    });

    const results: Partial<BookEvaluation>[] = rawItems.slice(0, 4).map((item, idx) => {
      let coverUrl = '';

      const curated = getCuratedCovers(item.title);
      if (curated && curated.length > 0) {
        const pub = (item.publisher || '').toLowerCase();
        if (pub.includes('antofagica') || pub.includes('antofágica')) {
          coverUrl = curated[0] || '';
        } else if (pub.includes('penguin') || pub.includes('companhia')) {
          coverUrl = curated[1] || curated[0] || '';
        } else if (pub.includes('principis')) {
          coverUrl = curated[2] || curated[0] || '';
        } else if (pub.includes('34')) {
          coverUrl = curated[1] || curated[0] || '';
        } else if (pub.includes('planeta') || pub.includes('minotauro')) {
          coverUrl = curated[0] || '';
        } else {
          coverUrl = curated[idx % curated.length] || '';
        }
      }

      return {
        id: `gem-search-${idx}-${Date.now()}`,
        title: item.title || clean,
        author: item.author || 'Autor a verificar',
        publisher: item.publisher || undefined,
        year: item.year ? Number(item.year) : undefined,
        pages: item.pages && Number(item.pages) > 20 ? Math.round(Number(item.pages)) : undefined,
        coverUrl: coverUrl || '',
        genres: ['Literatura'],
        resumo: '',
      };
    });

    if (results.length > 0) {
      searchMemoryCache.set(cacheKey, results);
    }
    return results;
  } catch (err: any) {
    if (err?.name === 'AbortError') return [];
    console.warn('[searchPopularBooksWithGemini] Falha na busca rápida:', err);
    return [];
  }
}
