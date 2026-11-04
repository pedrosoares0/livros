import { BookEvaluation } from '../types';
import { getCuratedCovers } from '../data/curatedCovers';
import { raceGemini, parseJsonLoose, RaceModel } from './geminiRace';

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  'AQ.Ab8RN6LNzoEEpQlupq2n1dJRY5APsOuFfXmRLp7ESySq8-A3Uw';

const AMAZON_INITIAL_MODELS: RaceModel[] = [
  {
    model: 'gemini-3-flash-preview',
    tier: 'preferred',
    generationConfig: { thinkingConfig: { thinkingLevel: 'minimal' } },
  },
  { model: 'gemini-3.1-flash-lite', tier: 'fast' },
];

const AMAZON_BACKUP_MODELS: RaceModel[] = [
  { model: 'gemini-flash-lite-latest', tier: 'fast' },
  { model: 'gemini-3.5-flash-lite', tier: 'fast' },
];

/**
 * Detecta se uma string representa uma URL ou link da Amazon
 */
export function isAmazonUrl(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  return (
    /(?:https?:\/\/)?(?:www\.)?(?:amazon\.[a-z.]+|amzn\.[a-z]+|a\.co)\b/i.test(trimmed) ||
    /amazon\.com/i.test(trimmed)
  );
}

/**
 * Converte um ISBN-10 (ou ASIN de livro físico) em ISBN-13 oficial
 */
export function isbn10to13(isbn10: string): string | null {
  const clean = isbn10.replace(/[^0-9X]/gi, '').toUpperCase();
  if (clean.length !== 10) return null;
  const core = '978' + clean.slice(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(core[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return core + check;
}

export interface ParsedAmazonInfo {
  asin: string | null;
  isIsbn10: boolean;
  isbn13: string | null;
  slug: string | null;
  cleanUrl: string;
}

/**
 * Extrai ASIN, ISBN e slug do título contido na URL da Amazon
 */
export function parseAmazonUrl(url: string): ParsedAmazonInfo {
  const cleanUrl = url.trim();

  // Captura o ASIN (10 caracteres alfanuméricos após /dp/, /gp/product/, /product/, etc.)
  const asinMatch =
    cleanUrl.match(/(?:dp|gp\/product|product|asin|d)\/([A-Z0-9]{10})(?:[/?#]|$)/i) ||
    cleanUrl.match(/\/([A-Z0-9]{10})(?:[/?#]|$)/i);

  const asin = asinMatch ? asinMatch[1].toUpperCase() : null;
  const isIsbn10 = asin ? /^\d{9}[\dX]$/i.test(asin) : false;
  const isbn13 = isIsbn10 && asin ? isbn10to13(asin) : null;

  // Extrai o slug do produto na URL (ex: /O-massacre-da-familia-Hope-Riley-Sager/dp/...)
  let slug: string | null = null;
  const slugMatch = cleanUrl.match(/amazon\.[a-z.]+\/([^/]+)\/(?:dp|gp\/product|product)/i);
  if (slugMatch && slugMatch[1]) {
    try {
      slug = decodeURIComponent(slugMatch[1])
        .replace(/[-_+.]/g, ' ')
        .replace(
          /\b(ebook|livro|capa comum|capa dura|brochura|edicao kindle|edição kindle|portuguese edition|english edition)\b/gi,
          ''
        )
        .replace(/\s+/g, ' ')
        .trim();
    } catch {
      slug = slugMatch[1].replace(/[-_+.]/g, ' ').trim();
    }
  }

  return { asin, isIsbn10, isbn13, slug, cleanUrl };
}

/**
 * Verifica se a CDN oficial da Amazon possui a imagem exata desta edição pelo ASIN.
 * Retorna a URL direta da imagem da Amazon se for JPEG real (> 2KB), eliminando capas genéricas.
 */
async function checkAmazonCover(asin: string | null): Promise<string | null> {
  if (!asin) return null;
  const cdnUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
  try {
    const res = await fetch(cdnUrl, { signal: AbortSignal.timeout(1800) });
    const type = res.headers.get('content-type') || '';
    const len = Number(res.headers.get('content-length')) || 0;
    // Amazon retorna 1x1 gif (43 bytes) quando não há imagem; imagem real é JPEG > 2000 bytes
    if (res.ok && type.includes('image/jpeg') && len > 2000) {
      return cdnUrl;
    }
  } catch {}
  return null;
}

/**
 * Consulta a BrasilAPI (CBL) para enriquecimento instantâneo de editora, páginas e título
 */
async function fetchCblBook(isbn13: string | null): Promise<Partial<BookEvaluation> & { publisher?: string } | null> {
  if (!isbn13) return null;
  try {
    const cblRes = await fetch(`https://brasilapi.com.br/api/isbn/v1/${isbn13}`, {
      signal: AbortSignal.timeout(2200),
    });
    if (cblRes.ok) {
      const cbl = await cblRes.json();
      if (cbl && cbl.title) {
        return {
          id: `amz-cbl-${isbn13}`,
          title: cbl.title,
          author: Array.isArray(cbl.authors) && cbl.authors.length > 0 ? cbl.authors.join(', ') : '',
          year: cbl.year || undefined,
          pages: cbl.page_count && cbl.page_count > 20 ? cbl.page_count : undefined,
          coverUrl: cbl.cover_url || '',
          genres: cbl.subjects || ['Literatura'],
          resumo: cbl.synopsis || '',
          publisher: cbl.publisher || undefined,
        };
      }
    }
  } catch {}
  return null;
}

/**
 * Consulta o Gemini com foco estrito na edição específica comercializada no link da Amazon
 */
async function resolveAmazonWithGemini(
  url: string,
  parsed: ParsedAmazonInfo,
  publisherHint?: string,
  signal?: AbortSignal
): Promise<{
  title: string;
  author: string;
  publisher?: string;
  originalTitle?: string;
  pages: number;
  year?: number;
  genres: string[];
  resumo: string;
} | null> {
  const prompt = `Você é o reconhecedor de edições do app Veredito.
O usuário enviou este link específico da Amazon:
URL: "${url}"
${parsed.asin ? `ASIN: "${parsed.asin}"` : ''}
${parsed.isbn13 ? `ISBN-13: "${parsed.isbn13}"` : ''}
${parsed.slug ? `Slug do título: "${parsed.slug}"` : ''}
${publisherHint ? `Editora detectada no registro: "${publisherHint}"` : ''}

INSTRUÇÃO CRÍTICA DE FIDELIDADE À EDIÇÃO ESPECÍFICA DO LINK:
Identifique a EDIÇÃO ESPECÍFICA comercializada neste link da Amazon.
1. "title": Nome oficial da obra em português nesta edição (ex: "Maus", "O Cair da Noite").
2. "author": Autor(es) oficial(is).
3. "publisher": Editora desta edição brasileira (ex: "Companhia das Letras", "Editora Aleph", "Intrínseca", "Rocco").
4. "year": Ano de publicação DESTA edição específica à venda no link (Exemplo: para 'Maus' pela Companhia das Letras retorne 2005, NUNCA 1986; para 'O Cair da Noite' pela Aleph retorne 2014, NUNCA 1969). Nunca retorne o ano de lançamento internacional original se o link for de uma edição brasileira posterior.
5. "pages": Quantidade real aproximada de páginas desta edição brasileira do link (ex: 296 para Maus volume único; 320 ou 352 para O Cair da Noite).
6. "originalTitle": Título original no idioma de origem.
7. "genres": 2 a 3 gêneros principais.
8. "resumo": Sinopse concisa de 2 linhas sobre premissa, clima e conflito sem spoilers.

Responda ESTRITAMENTE em formato JSON:
{
  "title": "Título em português",
  "author": "Nome do autor",
  "publisher": "Nome da editora",
  "year": 2005,
  "pages": 296,
  "originalTitle": "Título original",
  "genres": ["Gênero 1", "Gênero 2"],
  "resumo": "Sinopse concisa em 2 linhas"
}`;

  try {
    const { value: parsedJson } = await raceGemini<any>({
      apiKey: GEMINI_API_KEY,
      prompt,
      initial: AMAZON_INITIAL_MODELS,
      backups: AMAZON_BACKUP_MODELS,
      parse: (rawText) => {
        const j = parseJsonLoose<any>(rawText);
        if (!j || !j.title || !j.author) throw new Error('Resposta incompleta.');
        return j;
      },
      baseGenerationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
      preferWindowMs: 2800,
      hedgeAfterMs: 1800,
      perRequestTimeoutMs: 4500,
      overallTimeoutMs: 5500,
      signal,
      label: 'Amazon Gemini',
    });

    return {
      title: parsedJson.title.trim(),
      author: parsedJson.author.trim(),
      publisher: parsedJson.publisher?.trim() || publisherHint,
      originalTitle: parsedJson.originalTitle?.trim() || undefined,
      pages: Number(parsedJson.pages) || 300,
      year: Number(parsedJson.year) || undefined,
      genres:
        Array.isArray(parsedJson.genres) && parsedJson.genres.length > 0
          ? parsedJson.genres
          : ['Literatura'],
      resumo: parsedJson.resumo?.trim() || '',
    };
  } catch {
    return null;
  }
}

/**
 * Fallback para busca de capa caso a Amazon CDN não possua imagem direta pelo ASIN
 */
async function findBestCoverFallback(
  title: string,
  author: string,
  isbn13: string | null
): Promise<string> {
  // 1. Catálogo curado interno (0ms)
  const curated = getCuratedCovers(title);
  if (curated && curated.length > 0) {
    return curated[0];
  }

  // 2. OpenLibrary com ISBN-13
  if (isbn13) {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?isbn=${isbn13}&fields=cover_i,title&limit=1`,
        { signal: AbortSignal.timeout(2200) }
      );
      if (res.ok) {
        const d = await res.json();
        if (d.docs?.[0]?.cover_i) {
          return `https://covers.openlibrary.org/b/id/${d.docs[0].cover_i}-L.jpg`;
        }
      }
    } catch {}
  }

  // 3. OpenLibrary por Título + Autor
  try {
    const q = encodeURIComponent(`${title} ${author}`.trim());
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&fields=cover_i,title&limit=3`,
      { signal: AbortSignal.timeout(2200) }
    );
    if (res.ok) {
      const d = await res.json();
      for (const doc of d.docs || []) {
        if (doc.cover_i) {
          return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
        }
      }
    }
  } catch {}

  // 4. Fallback padrão via ISBN
  if (isbn13) {
    return `https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg`;
  }

  return '';
}

/**
 * Reconhece e extrai os dados completos da edição específica de um livro da Amazon
 * Executa checagem de capa da Amazon, consulta CBL e Gemini em paralelo para máxima velocidade.
 */
export async function recognizeAmazonBook(
  url: string,
  signal?: AbortSignal
): Promise<Partial<BookEvaluation>[]> {
  const parsed = parseAmazonUrl(url);

  // Executa em paralelo:
  // 1. Probe direto da capa original na CDN da Amazon (instantâneo, ~80ms)
  // 2. Consulta BrasilAPI / CBL por ISBN-13 (~150ms)
  // 3. Resolução contextual de edição com Gemini (~1.5s)
  const [amazonCover, cblBook, geminiResolved] = await Promise.all([
    checkAmazonCover(parsed.asin),
    fetchCblBook(parsed.isbn13),
    resolveAmazonWithGemini(url, parsed, undefined, signal),
  ]);

  const title = geminiResolved?.title || cblBook?.title || parsed.slug || 'Livro da Amazon';
  const author = geminiResolved?.author || cblBook?.author || 'Autor a verificar';
  const pages = geminiResolved?.pages || cblBook?.pages || 300;
  const year = geminiResolved?.year || cblBook?.year;
  const originalTitle = geminiResolved?.originalTitle;
  const genres = geminiResolved?.genres || cblBook?.genres || ['Literatura'];
  const resumo = geminiResolved?.resumo || cblBook?.resumo || '';

  // Hierarquia de capa:
  // 1ª opção: Imagem original do link da Amazon (fidelidade 100% à edição)
  // 2ª opção: Capa oficial cadastrada na CBL / BrasilAPI
  // 3ª opção: Busca por ISBN / título na Open Library
  let coverUrl = amazonCover || cblBook?.coverUrl || '';
  if (!coverUrl) {
    coverUrl = await findBestCoverFallback(title, author, parsed.isbn13);
  }

  const bookResult: Partial<BookEvaluation> = {
    id: `amz-${parsed.asin || Date.now()}`,
    title,
    author,
    originalTitle,
    pages,
    year,
    coverUrl,
    genres,
    resumo,
  };

  return [bookResult];
}
