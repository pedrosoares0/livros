import { BookEvaluation, CriteriaScores, VereditoTipo } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AQ.Ab8RN6LNzoEEpQlupq2n1dJRY5APsOuFfXmRLp7ESySq8-A3Uw';

// Lista de modelos suportados em ordem de preferência e resiliência
const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite-preview',
  'gemini-flash-latest',
];

const USER_PROFILE_PROMPT = `
Você é o motor de avaliação do app "Protocolo", responsável por avaliar livros, HQs e coletâneas para um leitor pessoal extremamente criterioso.

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

export async function evaluateWithGemini(
  bookTitle: string,
  extraContext?: { author?: string; description?: string; coverUrl?: string; pages?: number; genres?: string[] }
): Promise<BookEvaluation> {
  const prompt = `
${USER_PROFILE_PROMPT}

Analise rigorosamente a obra: "${bookTitle}" ${extraContext?.author ? `do autor "${extraContext.author}"` : ''}.
${extraContext?.description ? `Sinopse/Contexto prévio: ${extraContext.description}` : ''}

INSTRUÇÕES OBRIGATÓRIAS DE CONTEÚDO E FIDELIDADE:
1. PÁGINAS REAIS: Forneça a quantidade REAL aproximada de páginas da edição brasileira mais conhecida ou da obra original (Exemplo: Ritmo da Guerra tem ~1280 a 1400 páginas; Guerra e Paz ~1200 páginas; Duna ~680 páginas; Flores para Algernon ~280 páginas). NUNCA invente 200 ou 240 se a obra for notoriamente mais extensa ou mais curta.
2. FILMES RELACIONADOS CONEXOS: Indique de 2 a 3 filmes ou séries cujo tom, temática, atmosfera, escala ou dilemas éticos REALMENTE tenham paralelo com a obra. (Exemplo: Para fantasia militar com trauma e cerco como Ritmo da Guerra -> indicar obras épicas ou de guerra/cerco como Duna, O Resgate do Soldado Ryan ou Gladiador. NUNCA indique comédias ou filmes aleatórios que não tenham a menor relação!).
3. TOM SOMBRIO E CRITÉRIOS REAIS: Analise com precisão o tom sombrio (0 a 10). Se a obra aborda guerra, depressão, estresse pós-traumático, escravidão e perdas, o tom sombrio deve ser alto (7 a 9). Se o ritmo for prolixo com explicações extensas, o ritmo deve refletir isso (ex: 4 ou 5).
4. NOTAS INTEIRAS: "notaTecnica" e "notaEncaixe" devem ser NÚMEROS INTEIROS (0 a 10). Arredonde para baixo se houver fração.

Você DEVE responder ESTRITAMENTE em formato JSON com a seguinte estrutura:
{
  "title": "${bookTitle}",
  "author": "Nome do autor verificado",
  "originalTitle": "Título original no idioma original (se houver)",
  "pages": 1280, // Número real aproximado de páginas da obra
  "genres": ["Gênero Principal", "Subgênero"],
  "resumo": "2 a 3 linhas focando o conflito central, clima, premissa e tom sem spoilers",
  "movieComparisons": ["Filme 1", "Filme 2", "Filme 3"], // Filmes que realmente combinem em tema e atmosfera
  "adaptacoes": "Menção a adaptações reais para cinema/série/quadrinhos ou 'Nenhuma adaptação audiovisual oficial até o momento.'",
  "criteria": {
    "genericidade": 3, // 0 a 10 (0 = hiper autoral/original, 10 = clichê comercial previsível)
    "infantilidade": 2, // 0 a 10 (0-2 adulto/pesado, 3-5 aceitável/geral, 6 risco juvenil, 7-10 infantil)
    "infantilidadeStatus": "ideal", // "ideal" | "aceitavel" | "risco" | "rejeicao"
    "qualidadeTecnica": 9, // 0 a 10 (construção de prosa, worldbuilding, coerência interna)
    "worldbuilding": 10, // 0 a 10
    "ritmo": 5, // 0 a 10
    "ritmoDescricao": "Frase curta descrevendo a cadência real da leitura",
    "tomSombrio": 8, // 0 a 10 (grau de peso emocional, violência, trauma ou tragédia)
    "impactoEmocional": 8 // 0 a 10
  },
  "notaTecnica": 9, // Inteiro 0 a 10
  "notaEncaixe": 5, // Inteiro 0 a 10 (fundamentado no gosto do usuário)
  "veredito": "Frase final sincera, direta e sem rodeios sobre valer ou não o investimento do leitor",
  "vereditoTipo": "ressalvas", // "leia" | "ressalvas" | "evite"
  "justificativaEncaixe": "Análise crítica transparente de 2 a 3 linhas explicando exatamente onde a obra acerta e onde ela colide com as idiossincrasias do leitor"
}
`;

  let lastError: Error | null = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Gemini] Modelo ${model} falhou com status ${response.status}:`, errorText);
        lastError = new Error(`Gemini ${model} error (${response.status}): ${errorText}`);
        continue; // Tenta o próximo modelo candidato
      }

      const json = await response.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        console.warn(`[Gemini] Modelo ${model} retornou resposta vazia.`);
        lastError = new Error(`Modelo ${model} retornou resposta vazia.`);
        continue;
      }

      const parsed: GeminiEvaluationResponse = JSON.parse(rawText);

      // Sanitização e formatação consistente
      const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const coverUrl =
        extraContext?.coverUrl ||
        `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`;

      const pages =
        parsed.pages && parsed.pages > 30
          ? Math.round(parsed.pages)
          : extraContext?.pages && extraContext.pages > 30
          ? extraContext.pages
          : 300;

      return {
        id,
        title: parsed.title || bookTitle,
        author: parsed.author || extraContext?.author || 'Autor não informado',
        originalTitle: parsed.originalTitle || undefined,
        pages,
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
          genericidade: Math.floor(Number(parsed.criteria?.genericidade) || 3),
          infantilidade: Math.floor(Number(parsed.criteria?.infantilidade) || 2),
          infantilidadeStatus: parsed.criteria?.infantilidadeStatus || 'ideal',
          qualidadeTecnica: Math.floor(Number(parsed.criteria?.qualidadeTecnica) || 8),
          worldbuilding: Math.floor(Number(parsed.criteria?.worldbuilding) || 8),
          ritmo: Math.floor(Number(parsed.criteria?.ritmo) || 6),
          ritmoDescricao: parsed.criteria?.ritmoDescricao || 'Ritmo moderado',
          tomSombrio: Math.floor(Number(parsed.criteria?.tomSombrio) || 6),
          impactoEmocional: Math.floor(Number(parsed.criteria?.impactoEmocional) || 6),
        },
        notaTecnica: Math.floor(Number(parsed.notaTecnica) || 8),
        notaEncaixe: Math.floor(Number(parsed.notaEncaixe) || 6),
        veredito: parsed.veredito || 'Obra que demanda leitura atenta.',
        vereditoTipo: parsed.vereditoTipo || 'ressalvas',
        justificativaEncaixe: parsed.justificativaEncaixe || '',
        createdAt: new Date().toISOString(),
      };
    } catch (err: any) {
      console.warn(`[Gemini] Erro ao tentar modelo ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Não foi possível conectar a nenhum dos modelos do Gemini disponíveis.');
}

export async function evaluateBulkWithGemini(rawLines: string[]): Promise<BookEvaluation[]> {
  const booksToEvaluate = rawLines.slice(0, 10);
  const prompt = `
${USER_PROFILE_PROMPT}

Avalie a seguinte lista de obras literárias de acordo com o perfil rigoroso do leitor do app Protocolo:
${booksToEvaluate.map((b, i) => `${i + 1}. ${b}`).join('\n')}

INSTRUÇÕES OBRIGATÓRIAS:
1. PÁGINAS REAIS: consulte sua base para informar a quantidade real de páginas de cada obra.
2. FILMES CONEXOS: indique filmes cujos temas e atmosfera realmente dialoguem com a obra.
3. NOTAS INTEIRAS: notas inteiras (0 a 10) arredondadas para menos.

Retorne ESTRITAMENTE um array JSON de objetos:
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
    "vereditoTipo": "leia", // "leia" | "ressalvas" | "evite"
    "justificativaEncaixe": "Análise transparente do encaixe"
  }
]
`;

  let lastError: Error | null = null;
  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        lastError = new Error(`Gemini ${model} bulk error: ${res.status}`);
        continue;
      }

      const json = await res.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsedList: any[] = JSON.parse(rawText);
      if (!Array.isArray(parsedList)) continue;

      return parsedList.map((parsed, idx) => ({
        id: `eval-bulk-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        title: parsed.title || booksToEvaluate[idx],
        author: parsed.author || 'Autor não informado',
        originalTitle: parsed.originalTitle || undefined,
        pages: parsed.pages && parsed.pages > 30 ? Math.round(parsed.pages) : 300,
        coverUrl: `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`,
        genres: Array.isArray(parsed.genres) && parsed.genres.length > 0 ? parsed.genres : ['Ficção'],
        resumo: parsed.resumo || '',
        movieComparisons: Array.isArray(parsed.movieComparisons) ? parsed.movieComparisons.slice(0, 4) : [],
        adaptacoes: Array.isArray(parsed.adaptacoes)
          ? parsed.adaptacoes.join(', ') || 'Nenhuma adaptação conhecida'
          : typeof parsed.adaptacoes === 'string' && parsed.adaptacoes.trim()
          ? parsed.adaptacoes
          : 'Nenhuma adaptação conhecida',
        criteria: {
          genericidade: Math.floor(Number(parsed.criteria?.genericidade) || 3),
          infantilidade: Math.floor(Number(parsed.criteria?.infantilidade) || 2),
          infantilidadeStatus: parsed.criteria?.infantilidadeStatus || 'ideal',
          qualidadeTecnica: Math.floor(Number(parsed.criteria?.qualidadeTecnica) || 8),
          worldbuilding: Math.floor(Number(parsed.criteria?.worldbuilding) || 8),
          ritmo: Math.floor(Number(parsed.criteria?.ritmo) || 6),
          ritmoDescricao: parsed.criteria?.ritmoDescricao || 'Ritmo moderado',
          tomSombrio: Math.floor(Number(parsed.criteria?.tomSombrio) || 6),
          impactoEmocional: Math.floor(Number(parsed.criteria?.impactoEmocional) || 6),
        },
        notaTecnica: Math.floor(Number(parsed.notaTecnica) || 8),
        notaEncaixe: Math.floor(Number(parsed.notaEncaixe) || 6),
        veredito: parsed.veredito || 'Obra avaliada pelo perfil.',
        vereditoTipo: parsed.vereditoTipo || 'ressalvas',
        justificativaEncaixe: parsed.justificativaEncaixe || '',
        createdAt: new Date().toISOString(),
      }));
    } catch (e: any) {
      lastError = e;
    }
  }

  throw lastError || new Error('Não foi possível avaliar a lista com o Gemini.');
}

