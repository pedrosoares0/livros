import { BookEvaluation, CriteriaScores, VereditoTipo, BookDuelVerdict } from '../types';
import { buildReadingHistoryBlock } from './ratings';
import { getCuratedCovers } from '../data/curatedCovers';
import { fetchVerifiedBookCover } from './coverSearch';
import { raceGemini, parseJsonLoose, RaceModel } from './geminiRace';
import { resolveRuntimeConfig } from '../lib/utils';

const GEMINI_API_KEY = resolveRuntimeConfig(
  'VITE_GEMINI_API_KEY',
  'UWFpSjJTR0d6S1M3T1FQMy1pU29BRmRjMFlaZ193RzZLY2hSd3loaWFuREo2TlI4YkEuUUE='
);

/**
 * Avaliação crítica: prioriza modelos Gemini Flash completos com raciocínio (thinking) ativo
 * (`tier: 'preferred'`). Em caso de pico severo de 503/timeout em todos os modelos principais,
 * aciona contingência `tier: 'fast'` (com thinking ativo quando suportado) após `preferWindowMs`,
 * evitando erro fatal para o leitor.
 */
const EVAL_INITIAL_MODELS: RaceModel[] = [
  {
    model: 'gemini-3-flash-preview',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'medium' } },
  },
  {
    model: 'gemini-3.6-flash',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'low' } },
  },
];

const EVAL_BACKUP_MODELS: RaceModel[] = [
  {
    model: 'gemini-3.7-flash',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'low' } },
  },
  {
    model: 'gemini-3.8-flash',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'low' } },
  },
  {
    model: 'gemini-3.5-flash',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'low' } },
  },
  {
    model: 'gemini-flash-latest',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingBudget: 2048 } },
  },
  {
    model: 'gemini-3.1-flash-lite',
    tier: 'fast',
    generationConfig: { thinkingConfig: { thinkingLevel: 'medium' } },
  },
  {
    model: 'gemini-3.5-flash-lite',
    tier: 'fast',
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
- Filmes de referência que definem o gosto do leitor: Seven, De Olhos Bem Fechados, After Hours, Planeta dos Macacos, Interestelar, Goodfellas, Manchester à Beira-Mar, Klaus, Nada de Novo no Front, Bastardos Inglórios, Blade Runner 2049, Aftersun, O Poderoso Chefão, Clube da Luta, Whiplash, Princesa Mononoke.
- Séries de referência que definem o gosto do leitor: The Bear, Game of Thrones, Love, Death & Robots, Arcane, Sherlock, Rick and Morty, Mr. Robot, Chernobyl, Planeta dos Abutres, Os Sopranos.
- Personagens favoritos do leitor (arquétipos e núcleos dramáticos que ele mais admira na ficção): Ultron, Thanos, Tai Lung, Jack (Senhor das Moscas), Viktor e Ekko (Arcane), Tony Stark, Bruce Wayne / Batman, Sherlock Holmes, Visão (Marvel), Rocket (Marvel), Magneto (Marvel), Loki, Cooper, Dra. Brand e Murph (Interestelar), Anakin Skywalker, Harry Potter, Sirius Black e Professor Snape, Joel, Abby Anderson e Ellie Williams (The Last of Us), Carmy (The Bear), K (Blade Runner 2049), César (Planeta dos Macacos), Michael Corleone, Juiz Holden (Meridiano de Sangue), Katniss Everdeen, Sebastian (La La Land), Vegeta, O Coringa, Logan, Princesa Mononoke, Tyler Durden, Rick Sanchez, Elliot Alderson, Morpheus, Agente Smith, Tony Soprano, James Bond.
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

const catalogFactsCache = new Map<string, VerifiedCatalogFacts | null>();
let googleBooksRateLimitedUntil = 0;

/**
 * Consulta rápida (máx. 800ms) ao catálogo público do Google Books em português
 * para ancorar páginas reais, ano, autor e sinopse oficial quando o usuário digita
 * direto ou vem de sugestão sintética sem metadados verificados.
 */
async function fetchVerifiedCatalogFacts(
  bookTitle: string,
  authorHint?: string
): Promise<VerifiedCatalogFacts | null> {
  const cacheKey = `${bookTitle.toLowerCase().trim()}|${(authorHint || '').toLowerCase().trim()}`;
  if (catalogFactsCache.has(cacheKey)) {
    return catalogFactsCache.get(cacheKey) ?? null;
  }
  if (Date.now() < googleBooksRateLimitedUntil) {
    return null;
  }

  try {
    const q = authorHint && authorHint !== 'Autor a consultar' && authorHint !== 'Autor a verificar'
      ? `intitle:${bookTitle} inauthor:${authorHint}`
      : `intitle:${bookTitle}`;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&langRestrict=pt&maxResults=3`,
      { signal: AbortSignal.timeout(800) }
    );
    if (res.status === 429 || res.status === 403) {
      googleBooksRateLimitedUntil = Date.now() + 5 * 60 * 1000;
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.items) || data.items.length === 0) {
      catalogFactsCache.set(cacheKey, null);
      return null;
    }

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

      const facts: VerifiedCatalogFacts = {
        author: Array.isArray(info.authors) && info.authors.length > 0 ? info.authors.join(', ') : undefined,
        publisher: info.publisher || undefined,
        pages: info.pageCount && info.pageCount > 30 ? Number(info.pageCount) : undefined,
        year: Number.isFinite(parsedYear) ? parsedYear : undefined,
        description: typeof info.description === 'string' ? info.description.slice(0, 900) : undefined,
        coverUrl,
      };
      catalogFactsCache.set(cacheKey, facts);
      return facts;
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
6. PREMISSA & CLIMA SUTIS E SEM SPOILERS (REGRA DE OURO DO "resumo"):
   - O campo "resumo" deve apresentar o ponto de partida, a atmosfera e a inquietação central da obra de forma instigante e sutil, preservando a descoberta da leitura.
   - NUNCA entregue de forma explícita segredos da trama, revelações da natureza do mundo ou reviravoltas — mesmo quando constarem em sinopses comerciais ou nos metadados de apoio (Exemplo: em "Não Me Abandone Jamais", descreva o internato isolado de Hailsham, as regras veladas e a descoberta gradual do propósito para o qual aqueles jovens foram criados, mas NUNCA entregue explicitamente termos como "clones" ou "doação de órgãos").

Responda ESTRITAMENTE em JSON válido com estas exatas chaves:
{
  "title": "${bookTitle}",
  "author": "Nome do autor verificado",
  "originalTitle": "Título original no idioma original",
  "pages": 320,
  "genres": ["Gênero Principal", "Subgênero"],
  "resumo": "2 a 3 linhas focando a premissa inicial, atmosfera e tensão central com sutileza, sem spoilers nem revelações explícitas da trama",
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
    preferWindowMs: 11000,
    hedgeAfterMs: 3200,
    perRequestTimeoutMs: 16000,
    overallTimeoutMs: 26000,
    label: 'Gemini Avaliação',
  });

  const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const finalTitle = parsed.title || bookTitle;
  const finalAuthor = parsed.author || verifiedAuthor;
  const curated = getCuratedCovers(finalTitle);
  let coverUrl =
    extraContext?.coverUrl ||
    curated?.[0] ||
    catalogFacts?.coverUrl ||
    '';
  if (!coverUrl) {
    coverUrl = await fetchVerifiedBookCover(finalTitle, finalAuthor);
  }

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
5. PREMISSA & CLIMA SUTIS E SEM SPOILERS: no campo "resumo", descreva apenas o ponto de partida, a atmosfera e a inquietação inicial sem entregar revelações da trama, reviravoltas ou a natureza explícita de mistérios que o leitor descobre aos poucos.

Retorne ESTRITAMENTE um array JSON de objetos válidos:
[
  {
    "title": "Título",
    "author": "Autor",
    "originalTitle": "Título original",
    "pages": 300,
    "genres": ["Gênero 1"],
    "resumo": "Premissa inicial e clima em 2 linhas sutis, sem spoilers ou revelações explícitas",
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

  return Promise.all(
    parsedList.map(async (parsed, idx) => {
      const itemTitle = parsed.title || booksToEvaluate[idx];
      const itemAuthor = parsed.author || 'Autor não informado';
      const curated = getCuratedCovers(itemTitle);
      const coverUrl =
        curated?.[0] || (await fetchVerifiedBookCover(itemTitle, itemAuthor));
      return {
        id: `eval-bulk-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        title: itemTitle,
        author: itemAuthor,
        originalTitle: parsed.originalTitle || undefined,
        pages: parsed.pages && parsed.pages > 30 ? Math.round(parsed.pages) : 300,
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
        notaTecnica: Number.isFinite(Number(parsed.notaTecnica)) ? Math.floor(Number(parsed.notaTecnica)) : 8,
        notaEncaixe: Number.isFinite(Number(parsed.notaEncaixe)) ? Math.floor(Number(parsed.notaEncaixe)) : 6,
        veredito: parsed.veredito || 'Obra avaliada pelo perfil.',
        vereditoTipo: parsed.vereditoTipo || 'ressalvas',
        justificativaEncaixe: parsed.justificativaEncaixe || '',
        createdAt: new Date().toISOString(),
      };
    })
  );
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

    const results: Partial<BookEvaluation>[] = await Promise.all(
      rawItems.slice(0, 4).map(async (item, idx) => {
        const itemTitle = String(item.title || clean).trim();
        const itemAuthor = String(item.author || 'Autor a verificar').trim();
        let coverUrl = '';

        const curated = getCuratedCovers(itemTitle);
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

        if (!coverUrl) {
          coverUrl = await fetchVerifiedBookCover(itemTitle, itemAuthor, signal);
        }

        return {
          id: `gem-search-${idx}-${Date.now()}`,
          title: itemTitle,
          author: itemAuthor,
          publisher: item.publisher || undefined,
          year: item.year ? Number(item.year) : undefined,
          pages: item.pages && Number(item.pages) > 20 ? Math.round(Number(item.pages)) : undefined,
          coverUrl,
          genres: ['Literatura'],
          resumo: '',
        };
      })
    );

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

/**
 * Reabastece em background o pool de livros de um personagem quando restam poucos inéditos,
 * gerando 4 novas obras reais publicadas no Brasil que compartilhem o mesmo fio dramático.
 */
export async function replenishCharacterBooksWithGemini(
  character: { id: string; name: string; source: string; thread: string },
  excludeTitles: string[]
): Promise<Partial<BookEvaluation>[]> {
  const excludedSample = excludeTitles.slice(0, 80).join(', ');
  const prompt = `Você é o curador literário do app Veredito.
O leitor esgotou quase todas as indicações do personagem "${character.name}" (${character.source}).
Fio dramático do personagem: "${character.thread}"

Indique 4 OBRAS LITERÁRIAS REAIS (romances, novelas, clássicos, ficção científica, distopias ou graphic novels adultas consagradas e publicadas no Brasil) que compartilhem visceralmente esse mesmo núcleo dramático e psicológico.
PROIBIDO repetir qualquer uma destas obras já listadas ou avaliadas: [${excludedSample}].
PROIBIDO indicar livros infantis, autoajuda ou romances água-com-açúcar.
No campo "resumo", escreva 2 linhas sutis focando apenas o ponto de partida e a atmosfera, SEM spoilers ou revelações explícitas da trama.

Responda ESTRITAMENTE em JSON válido (array de 4 objetos):
[
  {
    "title": "Título oficial em português no Brasil",
    "author": "Nome do Autor",
    "publisher": "Editora brasileira",
    "year": 1995,
    "pages": 320,
    "genres": ["Gênero 1", "Gênero 2"],
    "resumo": "Premissa sutil de 2 linhas sem spoilers"
  }
]`;

  try {
    const { value: rawItems } = await raceGemini<any[]>({
      apiKey: GEMINI_API_KEY,
      prompt,
      initial: SEARCH_INITIAL_MODELS,
      backups: EVAL_INITIAL_MODELS,
      parse: (text) => {
        const parsed = parseJsonLoose<any>(text);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Sem novos livros retornados.');
        }
        return parsed;
      },
      baseGenerationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.35,
        maxOutputTokens: 900,
      },
      preferWindowMs: 0,
      hedgeAfterMs: 2500,
      perRequestTimeoutMs: 9000,
      overallTimeoutMs: 12000,
      label: `Replenish ${character.name}`,
    });

    const enriched = await Promise.all(
      rawItems.slice(0, 4).map(async (item, idx) => {
        const title = String(item.title || '').trim();
        const author = String(item.author || '').trim();
        if (!title || !author) return null;

        const curated = getCuratedCovers(title);
        let coverUrl = curated?.[0] || '';
        const facts = coverUrl ? null : await fetchVerifiedCatalogFacts(title, author);
        if (!coverUrl) {
          coverUrl = facts?.coverUrl || (await fetchVerifiedBookCover(title, author));
        }

        return {
          id: `dyn-${character.id}-${Date.now()}-${idx}`,
          title,
          author,
          publisher: item.publisher || facts?.publisher || undefined,
          year: Number(item.year) || facts?.year || undefined,
          pages:
            (Number(item.pages) > 30 ? Math.round(Number(item.pages)) : undefined) ||
            facts?.pages ||
            280,
          coverUrl,
          genres: Array.isArray(item.genres) && item.genres.length > 0 ? item.genres : ['Ficção'],
          resumo: String(item.resumo || '').trim(),
        } as Partial<BookEvaluation>;
      })
    );

    return enriched.filter((b): b is Partial<BookEvaluation> => Boolean(b));
  } catch (err) {
    console.warn('[replenishCharacterBooksWithGemini] Aviso:', err);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Duelo de Livros ("Qual eu leio primeiro?") — Desempate calibrado + Cache 0ms
// ---------------------------------------------------------------------------
const DUEL_CACHE_STORAGE_KEY = 'veredito_duel_cache_v1';
const duelMemoryCache = new Map<string, BookDuelVerdict>();

function getDuelCacheKey(books: BookEvaluation[]): string {
  return books
    .map((b) => `${b.id}:${Math.floor(b.notaEncaixe)}:${Math.floor(b.notaTecnica)}:${b.pages || 0}`)
    .sort()
    .join('|');
}

export function getCachedDuelVerdict(books: BookEvaluation[]): BookDuelVerdict | null {
  if (books.length < 2) return null;
  const key = getDuelCacheKey(books);
  if (duelMemoryCache.has(key)) {
    return duelMemoryCache.get(key)!;
  }
  try {
    const raw = localStorage.getItem(DUEL_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, BookDuelVerdict>;
    if (parsed && parsed[key]) {
      duelMemoryCache.set(key, parsed[key]);
      return parsed[key];
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

function saveCachedDuelVerdict(books: BookEvaluation[], verdict: BookDuelVerdict): void {
  const key = getDuelCacheKey(books);
  duelMemoryCache.set(key, verdict);
  try {
    const raw = localStorage.getItem(DUEL_CACHE_STORAGE_KEY);
    const current: Record<string, BookDuelVerdict> = raw ? JSON.parse(raw) : {};
    current[key] = verdict;
    // Mantém os últimos 40 duelos no cache local
    const keys = Object.keys(current);
    if (keys.length > 40) {
      delete current[keys[0]];
    }
    localStorage.setItem(DUEL_CACHE_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // ignore storage errors
  }
}

/**
 * Gera uma análise instantânea (0ms) baseada na telemetria das obras enquanto a IA
 * refina o texto personalizado ou caso o usuário esteja offline.
 */
export function buildInstantDuelVerdict(books: BookEvaluation[]): BookDuelVerdict {
  const scored = books.map((b) => {
    const c = b.criteria;
    const concisenessBonus = b.pages > 0 && b.pages <= 180 ? 0.65 : b.pages <= 280 ? 0.3 : 0;
    const composite =
      b.notaEncaixe * 1.45 +
      b.notaTecnica * 0.35 +
      (c?.ritmo || 6) * 0.18 +
      (c?.impactoEmocional || 6) * 0.2 +
      (c?.tomSombrio || 6) * 0.12 +
      concisenessBonus;
    return { book: b, composite };
  });

  scored.sort((a, b) => b.composite - a.composite);
  const winner = scored[0].book;
  const runnerUp = scored[1]?.book;

  // Garante rótulos e motivos distintos para cada obra usando seus dados reais da ficha
  const minPages = Math.min(...books.map((b) => b.pages || 9999));
  const maxDark = Math.max(...books.map((b) => b.criteria?.tomSombrio ?? 0));
  const maxTech = Math.max(...books.map((b) => b.criteria?.qualidadeTecnica ?? 0));
  const usedLabels = new Set<string>();

  const scenarios = books.map((b) => {
    const c = b.criteria;
    let label = b.genres?.[0] ? `${b.genres[0]} • ${b.pages} págs` : `${b.pages} páginas`;

    if (b.pages === minPages && books.some((other) => other.id !== b.id && other.pages > b.pages + 30)) {
      label = `Leitura mais enxuta (${b.pages} págs)`;
    } else if ((c?.tomSombrio ?? 0) === maxDark && (c?.tomSombrio ?? 0) >= 8 && !usedLabels.has('Tom mais sombrio & denso')) {
      label = 'Tom mais sombrio & denso';
    } else if ((c?.qualidadeTecnica ?? 0) === maxTech && !usedLabels.has('Primor técnico & prosa')) {
      label = 'Primor técnico & prosa';
    } else if ((c?.ritmo ?? 0) >= 8 && !usedLabels.has('Cadência mais ágil')) {
      label = 'Cadência mais ágil';
    }
    usedLabels.add(label);

    return {
      bookId: b.id,
      label,
      reason: b.criteria?.ritmoDescricao
        ? `${b.criteria.ritmoDescricao}. ${b.veredito}`
        : b.veredito,
    };
  });

  const headline = runnerUp
    ? Math.floor(winner.notaEncaixe) > Math.floor(runnerUp.notaEncaixe)
      ? `${winner.title} leva vantagem no duelo pelo encaixe superior (${Math.floor(winner.notaEncaixe)} vs. ${Math.floor(runnerUp.notaEncaixe)}) e maior peso dramático para o seu gosto.`
      : `Mesmo empatados em Encaixe (${Math.floor(winner.notaEncaixe)}), ${winner.title} sai na frente pelo equilíbrio entre ritmo, extensão (${winner.pages} págs) e impacto dramático.`
    : winner.veredito || `Comece por ${winner.title}.`;

  const comparativo = runnerUp
    ? `${winner.title} (${winner.pages} págs, Encaixe ${Math.floor(winner.notaEncaixe)}) sai na frente de ${runnerUp.title} (${runnerUp.pages} págs, Encaixe ${Math.floor(runnerUp.notaEncaixe)}). ${winner.justificativaEncaixe}`
    : winner.justificativaEncaixe;

  return {
    winnerId: winner.id,
    headline,
    comparativo,
    scenarios,
  };
}

export async function analyzeBookDuelWithGemini(
  books: BookEvaluation[],
  signal?: AbortSignal
): Promise<BookDuelVerdict> {
  const cached = getCachedDuelVerdict(books);
  if (cached) return cached;

  const fallback = buildInstantDuelVerdict(books);
  const historyBlock = buildReadingHistoryBlock();

  const contendersBlock = books
    .map((b, idx) => {
      const c = b.criteria;
      const orig = Math.floor(10 - (c?.genericidade ?? 3));
      return `${idx + 1}. ID: "${b.id}" | Título: "${b.title}" (${b.author})
   - Páginas: ${b.pages} | Nota de Encaixe: ${Math.floor(b.notaEncaixe)}/10 | Nota Técnica: ${Math.floor(b.notaTecnica)}/10 | Veredito: ${b.vereditoTipo.toUpperCase()}
   - Critérios: Originalidade ${orig}, Técnica ${Math.floor(c.qualidadeTecnica)}, Worldbuilding ${Math.floor(c.worldbuilding)}, Ritmo ${Math.floor(c.ritmo)} (${c.ritmoDescricao}), Tom Sombrio ${Math.floor(c.tomSombrio)}, Impacto Emocional ${Math.floor(c.impactoEmocional)}
   - Resumo/Clima: ${b.resumo}`;
    })
    .join('\n\n');

  const prompt = `${USER_PROFILE_PROMPT}
${historyBlock}

O leitor está em dúvida entre estas ${books.length} obras da estante dele e abriu um DUELO DE LEITURA ("Qual eu leio primeiro?"):

${contendersBlock}

Compare as obras com rigor cirúrgico para o perfil deste leitor (que valoriza concisão sem gordura, peso existencial/trágico, ritmo firme e rejeita prolixidade).
Determine:
1. "winnerId": o ID exato ("${books.map((b) => b.id).join('" ou "')}") da obra que ele deve ler PRIMEIRO hoje.
2. "headline": 1 frase direta, incisiva e sem spoilers cravando qual ler primeiro e o motivo central da vitória.
3. "comparativo": 2 a 3 linhas contrastando diretamente o fôlego (páginas/ritmo), a densidade dramática e a diferença de clima entre elas.
4. "scenarios": para CADA obra do duelo, um rótulo curto de ocasião ("label", máx 4 palavras, ex: "Tiro curto de domingo", "Imersão noturna e pesada", "Conceito sci-fi implacável") e 1 frase direta ("reason") dizendo em que momento/humor escolher aquela obra.

Responda ESTRITAMENTE em JSON válido:
{
  "winnerId": "${books[0].id}",
  "headline": "Frase direta de decisão",
  "comparativo": "Contraste objetivo de 2 a 3 linhas entre as obras",
  "scenarios": [
    ${books
      .map(
        (b) => `{ "bookId": "${b.id}", "label": "Ocasião curta", "reason": "Quando escolher esta obra em 1 frase sem spoilers" }`
      )
      .join(',\n    ')}
  ]
}`;

  try {
    const { value: parsed } = await raceGemini<BookDuelVerdict>({
      apiKey: GEMINI_API_KEY,
      prompt,
      initial: SEARCH_INITIAL_MODELS,
      backups: EVAL_INITIAL_MODELS,
      parse: (text) => {
        const obj = parseJsonLoose<BookDuelVerdict>(text);
        if (!obj || typeof obj !== 'object' || !obj.headline || !obj.comparativo) {
          throw new Error('JSON de duelo inválido.');
        }
        const validIds = new Set(books.map((b) => b.id));
        const winnerId = validIds.has(obj.winnerId) ? obj.winnerId : fallback.winnerId;
        const scenarios = books.map((b) => {
          const found = Array.isArray(obj.scenarios)
            ? obj.scenarios.find((s) => s.bookId === b.id)
            : null;
          const fb = fallback.scenarios.find((s) => s.bookId === b.id)!;
          return {
            bookId: b.id,
            label: found?.label?.trim() || fb.label,
            reason: found?.reason?.trim() || fb.reason,
          };
        });
        return {
          winnerId,
          headline: String(obj.headline).trim(),
          comparativo: String(obj.comparativo).trim(),
          scenarios,
        };
      },
      baseGenerationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.25,
        maxOutputTokens: 750,
      },
      preferWindowMs: 0,
      hedgeAfterMs: 2200,
      perRequestTimeoutMs: 8500,
      overallTimeoutMs: 11000,
      signal,
      label: 'Gemini Duelo',
    });

    saveCachedDuelVerdict(books, parsed);
    return parsed;
  } catch (err: any) {
    if (err?.name !== 'AbortError') {
      console.warn('[analyzeBookDuelWithGemini] Usando telemetria instantânea:', err);
    }
    return fallback;
  }
}
