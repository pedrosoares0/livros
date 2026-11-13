import { BookEvaluation, CriteriaScores, VereditoTipo } from '../types';
import { buildReadingHistoryBlock } from './ratings';
import { getCuratedCovers } from '../data/curatedCovers';
import { raceGemini, parseJsonLoose, RaceModel } from './geminiRace';

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  'AQ.Ab8RN6LNzoEEpQlupq2n1dJRY5APsOuFfXmRLp7ESySq8-A3Uw';

/**
 * Avaliação crítica: SOMENTE modelos Gemini Flash completos com raciocínio (thinking) ativo.
 * Nenhum modelo `flash-lite` ou `thinkingBudget: 0` entra na avaliação, preservando 100% da
 * profundidade analítica, fidelidade bibliográfica e calibragem com o histórico do leitor.
 * O ganho de velocidade vem exclusivamente do paralelismo e do corte imediato de 503/stalls.
 */
const EVAL_INITIAL_MODELS: RaceModel[] = [
  {
    model: 'gemini-3-flash-preview',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'medium' } },
  },
  {
    model: 'gemini-3.8-flash',
    tier: 'preferred',
  },
];

const EVAL_BACKUP_MODELS: RaceModel[] = [
  { model: 'gemini-3-flash-preview', tier: 'preferred' },
  { model: 'gemini-3.6-flash', tier: 'preferred' },
  { model: 'gemini-3.5-flash', tier: 'preferred' },
  { model: 'gemini-flash-latest', tier: 'preferred' },
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
- Filmes de referência que definem o gosto do leitor: Seven, De Olhos Bem Fechados, After Hours, Planeta dos Macacos, Interestelar, Goodfellas, Manchester à Beira-Mar, Klaus, Nada de Novo no Front, Bastardos Inglórios, Blade Runner 2049, Aftersun, O Poderoso Chefão, Clube da Luta.
- Séries de referência que definem o gosto do leitor: The Bear, Game of Thrones, Love, Death & Robots, Arcane, Sherlock, Rick and Morty, Mr. Robot, Chernobyl, Planeta dos Abutres, Os Sopranos.
- Personagens favoritos do leitor (arquétipos e núcleos dramáticos que ele mais admira na ficção): Ultron, Thanos, Tai Lung, Jack (Senhor das Moscas), Viktor e Ekko (Arcane), Tony Stark, Bruce Wayne / Batman, Sherlock Holmes, Visão (Marvel), Loki, Cooper, Dra. Brand e Murph (Interestelar), Anakin Skywalker, Harry Potter, Sirius Black e Professor Snape, Abby Anderson e Ellie Williams (The Last of Us - jogo), Carmy (The Bear), K (Blade Runner 2049), César (Planeta dos Macacos), Michael Corleone, Juiz Holden (Meridiano de Sangue), Katniss Everdeen, Sebastian (La La Land), Vegeta, O Coringa, Logan.
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

export interface EvaluationExtraContext {
  sourceId?: string;
  author?: string;
  publisher?: string;
  description?: string;
  coverUrl?: string;
  pages?: number;
  year?: number;
  genres?: string[];
}

interface VerifiedCatalogFacts {
  author?: string;
  publisher?: string;
  pages?: number;
  year?: number;
  description?: string;
  coverUrl?: string;
}

function isCatalogVerifiedSource(sourceId?: string): boolean {
  if (!sourceId) return false;
  return (
    sourceId.startsWith('cbl-') ||
    sourceId.startsWith('amz-cbl-') ||
    sourceId.startsWith('ol-') ||
    sourceId.startsWith('gb-')
  );
}

/**
 * Consulta rápida (máx. 800ms) ao catálogo público do Google Books em português
 * para ancorar páginas reais, ano, autor e sinopse oficial quando o usuário digita
 * direto ou vem de sugestão sintética sem metadados verificados.
 */
async function fetchVerifiedCatalogFacts(
  bookTitle: string,
  authorHint?: string
): Promise<VerifiedCatalogFacts | null> {
  try {
    const q = authorHint && authorHint !== 'Autor a consultar' && authorHint !== 'Autor a verificar'
      ? `intitle:${bookTitle} inauthor:${authorHint}`
      : `intitle:${bookTitle}`;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&langRestrict=pt&maxResults=3`,
      { signal: AbortSignal.timeout(800) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.items) || data.items.length === 0) return null;

    const normTarget = bookTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    for (const item of data.items) {
      const info = item?.volumeInfo;
      if (!info?.title) continue;
      const normTitle = String(info.title)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
      if (!normTitle.includes(normTarget) && !normTarget.includes(normTitle)) continue;

      let coverUrl: string | undefined =
        info.imageLinks?.large ||
        info.imageLinks?.medium ||
        info.imageLinks?.thumbnail ||
        undefined;
      if (coverUrl?.startsWith('http://')) {
        coverUrl = coverUrl.replace('http://', 'https://');
      }

      const parsedYear = info.publishedDate ? parseInt(String(info.publishedDate).slice(0, 4), 10) : NaN;

      return {
        author: Array.isArray(info.authors) && info.authors.length > 0 ? info.authors.join(', ') : undefined,
        publisher: info.publisher || undefined,
        pages: info.pageCount && info.pageCount > 30 ? Number(info.pageCount) : undefined,
        year: Number.isFinite(parsedYear) ? parsedYear : undefined,
        description: typeof info.description === 'string' ? info.description.slice(0, 900) : undefined,
        coverUrl,
      };
    }
  } catch {
    // Silencioso: se exceder 800ms ou falhar, segue direto sem bloquear a avaliação
  }
  return null;
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
  extraContext?: EvaluationExtraContext
): Promise<BookEvaluation> {
  const historyBlock = buildReadingHistoryBlock();
  const hasVerifiedCatalogInput = isCatalogVerifiedSource(extraContext?.sourceId);

  // Ancoragem factual rápida caso faltem sinopse ou páginas de catálogo oficial
  const catalogFacts =
    hasVerifiedCatalogInput && extraContext?.description && extraContext?.pages
      ? null
      : await fetchVerifiedCatalogFacts(bookTitle, extraContext?.author);

  const verifiedAuthor =
    (extraContext?.author &&
    extraContext.author !== 'Autor a consultar' &&
    extraContext.author !== 'Autor a verificar'
      ? extraContext.author
      : undefined) || catalogFacts?.author;

  const verifiedPages = hasVerifiedCatalogInput
    ? extraContext?.pages
    : catalogFacts?.pages;

  const editionPagesHint = !hasVerifiedCatalogInput ? extraContext?.pages : undefined;
  const verifiedPublisher = extraContext?.publisher || catalogFacts?.publisher;
  const verifiedYear = extraContext?.year || catalogFacts?.year;
  const verifiedDescription = extraContext?.description || catalogFacts?.description;

  const metadataLines: string[] = [];
  if (verifiedPublisher) metadataLines.push(`- Editora: ${verifiedPublisher}`);
  if (verifiedYear) metadataLines.push(`- Ano da edição: ${verifiedYear}`);
  if (verifiedPages && verifiedPages > 30) {
    metadataLines.push(`- Páginas registradas em catálogo editorial: ${verifiedPages}`);
  } else if (editionPagesHint && editionPagesHint > 30) {
    metadataLines.push(
      `- Estimativa preliminar de páginas (confirme e corrija se imprecisa): ${editionPagesHint}`
    );
  }
  if (extraContext?.genres && extraContext.genres.length > 0) {
    metadataLines.push(`- Gêneros catalogados: ${extraContext.genres.join(', ')}`);
  }
  if (verifiedDescription) {
    metadataLines.push(`- Sinopse/Contexto editorial oficial: ${verifiedDescription}`);
  }

  const prompt = `
${USER_PROFILE_PROMPT}
${historyBlock}

Analise rigorosamente a obra: "${bookTitle}"${verifiedAuthor ? ` do autor "${verifiedAuthor}"` : ''}.
${metadataLines.length > 0 ? `\nMETADADOS EDITORIAIS DE APOIO:\n${metadataLines.join('\n')}\n` : ''}
INSTRUÇÕES OBRIGATÓRIAS DE CONTEÚDO E FIDELIDADE:
1. PÁGINAS REAIS: Forneça a quantidade REAL aproximada de páginas da edição brasileira mais conhecida ou da edição informada acima (Exemplo: Ritmo da Guerra ~1280; Guerra e Paz ~1200; Duna ~680; Flores para Algernon ~280; O Deserto dos Tártaros ~224). NUNCA invente 200 ou 240 genéricos se a obra for notoriamente mais extensa ou mais curta.
2. VERACIDADE CRÍTICA E CALIBRAGEM FIEL: Avalie a obra pelo que ela REALMENTE é na literatura (estrutura narrativa real, cadência real de acontecimentos, peso filosófico/humano real), cruzando com rigor contra as obras amadas, rejeitadas e o histórico real do leitor. Nunca infle a Nota de Encaixe por prestígio acadêmico se o ritmo ou o tom colidirem com o perfil.
3. FILMES RELACIONADOS CONEXOS: Indique de 2 a 3 filmes ou séries cujo tom, temática, atmosfera, escala ou dilemas éticos REALMENTE tenham paralelo com a obra. NUNCA indique comédias ou obras desconexas.
4. CRITÉRIOS REAIS (0 a 10 inteiros):
   - genericidade: 0 = hiper autoral/original, 10 = clichê comercial previsível
   - infantilidade: 0-2 adulto/pesado, 3-5 aceitável/geral, 6 risco juvenil, 7-10 infantil ("infantilidadeStatus": "ideal" | "aceitavel" | "risco" | "rejeicao")
   - qualidadeTecnica, worldbuilding, ritmo, tomSombrio, impactoEmocional: 0 a 10
5. NOTAS INTEIRAS: "notaTecnica" e "notaEncaixe" devem ser NÚMEROS INTEIROS (0 a 10), arredondados para baixo. "vereditoTipo": "leia" | "ressalvas" | "evite".

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
    hedgeAfterMs: 4500,
    perRequestTimeoutMs: 16000,
    overallTimeoutMs: 22000,
    label: 'Gemini Avaliação',
  });

  const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const curated = getCuratedCovers(parsed.title || bookTitle);
  const coverUrl =
    extraContext?.coverUrl ||
    curated?.[0] ||
    catalogFacts?.coverUrl ||
    `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`;

  const pages =
    verifiedPages && verifiedPages > 30
      ? Math.round(verifiedPages)
      : parsed.pages && parsed.pages > 30
      ? Math.round(parsed.pages)
      : editionPagesHint && editionPagesHint > 30
      ? Math.round(editionPagesHint)
      : 300;

  const year = verifiedYear || (parsed.year ? Number(parsed.year) : undefined);

  return {
    id,
    title: parsed.title || bookTitle,
    author: parsed.author || verifiedAuthor || 'Autor não informado',
    originalTitle: parsed.originalTitle || undefined,
    publisher: verifiedPublisher,
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

Avalie rigorosamente a seguinte lista de obras literárias de acordo com o perfil e o histórico real do leitor do app Veredito:
${booksToEvaluate.map((b, i) => `${i + 1}. ${b}`).join('\n')}

INSTRUÇÕES OBRIGATÓRIAS:
1. PÁGINAS REAIS: informe a quantidade real aproximada de páginas de cada obra na edição brasileira mais conhecida.
2. VERACIDADE CRÍTICA: avalie cada obra fielmente quanto a ritmo, densidade dramática e encaixe real com o perfil.
3. FILMES CONEXOS: indique filmes cujos temas e atmosfera realmente dialoguem com a obra.
4. NOTAS INTEIRAS: notas inteiras (0 a 10) arredondadas para menos.

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
    hedgeAfterMs: 7000,
    perRequestTimeoutMs: 28000,
    overallTimeoutMs: 35000,
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
 * (apenas para autocompletar sugestões — a avaliação crítica em si usa sempre modelos completos)
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
