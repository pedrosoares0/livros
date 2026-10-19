import { BookEvaluation, CriteriaScores, VereditoTipo } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AQ.Ab8RN6LNzoEEpQlupq2n1dJRY5APsOuFfXmRLp7ESySq8-A3Uw';
const GEMINI_MODEL = 'gemini-3.8-flash';

const USER_PROFILE_PROMPT = `
Você é o motor de avaliação do app "Veredito", responsável por avaliar livros, HQs e coletâneas para um leitor pessoal exigente.

PERFIL DO USUÁRIO:
- Preferência de formato: Livros curtos a médios em português (pt-BR), seriedade, densidade, humor sutil e inteligente quando houver. Aprecia graphic novels, adaptações visuais e forte identidade estética.
- Gêneros favoritos: Ficção científica conceitual/filosófica/existencial, fantasia sombria, worldbuilding denso e consistente, distopias, clássicos da literatura, contos e novelas densas, fábulas/alegorias sombrias, horror psicológico, drama humano pesado (guerra, culpa, trauma, luto, obsessão, poder, dilemas éticos/morais com consequências definitivas, personagens moralmente ambíguos).
- Obras que o usuário amou (referência 9 a 10):
  * Senhor das Moscas (Golding) — Técnica 9, Encaixe 10
  * A Revolução dos Bichos (Orwell) — Técnica 9, Encaixe 10
  * De Quanta Terra Precisa o Homem? (Tolstói) — Técnica 10, Encaixe 10
  * Flores para Algernon (Daniel Keyes) — Técnica 10, Encaixe 10
  * O Inferno de Dante — Técnica 10, Encaixe 10
  * Noites Brancas (Dostoiévski) — Técnica 9.5, Encaixe 10
  * A Chegada / Histórias da sua Vida (Ted Chiang) — Técnica 10, Encaixe 10
  * O Gato Preto (Edgar Allan Poe) — Técnica 9.5, Encaixe 10
  * O Estranho Misterioso (Mark Twain) — Técnica 9, Encaixe 10
  * O Cair da Noite (Isaac Asimov) — Técnica 9, Encaixe 10
  * Contos de Beedle, o Bardo (Rowling) — Técnica 8.5, Encaixe 9.5
  * Colapso (Roberto Denser / DarkSide) — Técnica 8.5, Encaixe 9.5
  * Entre Quatro Paredes (Sartre) — Técnica 9.5, Encaixe 10
  * Diário de um Homem Supérfluo (Turguêniev) — Técnica 9.5, Encaixe 10
  * A Menina do Outro Lado (Nagabe / DarkSide) — Técnica 9, Encaixe 9.5
- Obras que o usuário REJEITOU (com notas do próprio leitor):
  * O Velho e o Mar (Hemingway) — tenta ser profundo mas soa super raso, fraco, prolixo e lento; tenta dizer muito mas no final não diz nada.
  * Encontro com Rama (Clarke) — decepcionante, muito devagar, personagens burocráticos.
  * Carta ao Pai (Kafka) — muito bem escrito e ritmo ok, mas puramente formal e sem emoção, não tocou em nada.
  * As Fontes do Paraíso (Clarke) — hard sci-fi contemplativo demais, ritmo arrastado sem impacto dramático.
- Pesos negativos: romance como motor central, tramas fofas/cozy/acolhedoras, jovem adulto (YA) genérico/colegial, misticismo leve, comédia romântica, autoajuda disfarçada de ficção, prolixidade sem tensão dramática.
- REGRA CRÍTICA: Qualidade técnica alta NÃO compensa um tom que o usuário rejeita. Uma obra pode ter Nota Técnica 8.5 e Nota de Encaixe 2.0 se tiver elementos que o usuário odeia (como romance piegas ou ritmo lento vazio).

Exemplos de calibração calibrados:
- Senhor das Moscas: Técnica 9, Encaixe 10
- A Cabeça do Santo: Técnica 7, Encaixe 2
- Patinando no Amor: Técnica 5, Encaixe 1
- Kallocaína: Técnica 8, Encaixe 8
- A Guerra da Papoula: Técnica 7, Encaixe 7
`;

export interface GeminiEvaluationResponse {
  title: string;
  author: string;
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
  extraContext?: { author?: string; description?: string; coverUrl?: string }
): Promise<BookEvaluation> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `
${USER_PROFILE_PROMPT}

Analise a obra: "${bookTitle}" ${extraContext?.author ? `do autor "${extraContext.author}"` : ''}.
${extraContext?.description ? `Contexto da premissa: ${extraContext.description}` : ''}

Você DEVE responder ESTRITAMENTE em formato JSON com as seguintes chaves:
{
  "title": "${bookTitle}",
  "author": "Nome do autor",
  "pages": 250, // número aproximado de páginas da edição brasileira mais comum
  "genres": ["Ficção Científica", "Distopia"],
  "resumo": "2 a 3 linhas focando clima, tema e premissa sem spoilers",
  "movieComparisons": ["Filme 1", "Filme 2", "Filme 3"], // Forneça de 2 até 4 indicações de filmes do cinema mundial (de qualquer país ou época) que capturem a atmosfera, tom, ritmo ou conflito da obra
  "adaptacoes": "Menção curta a adaptações existentes em cinema, série, anime, HQ, ou 'Nenhuma adaptação conhecida'",
  "criteria": {
    "genericidade": 1.0, // 0 = extremamente original, 10 = clichê
    "infantilidade": 1.0, // 0 = adulto/sombrio, 10 = infantil; faixa: 0-2 ideal, 3-5 aceitavel, 6 risco, 7-10 rejeicao
    "infantilidadeStatus": "ideal", // "ideal" | "aceitavel" | "risco" | "rejeicao"
    "qualidadeTecnica": 9.0, // 0 a 10
    "worldbuilding": 8.5, // 0 a 10
    "ritmo": 7.5, // 0 a 10
    "ritmoDescricao": "Frase curta descrevendo o ritmo (ex: Frenético e visceral, Cadenciado reflexivo, etc.)",
    "tomSombrio": 8.5, // 0 a 10
    "impactoEmocional": 8.0 // 0 a 10
  },
  "notaTecnica": 8.8, // 0 a 10
  "notaEncaixe": 9.0, // 0 a 10 rigorosamente calibrada com os pesos do perfil
  "veredito": "Uma frase final direta, sincera e sem rodeios",
  "vereditoTipo": "leia", // "leia" | "ressalvas" | "evite"
  "justificativaEncaixe": "Análise transparente e direta de 2 linhas explicando por que a obra casa ou conflita com o perfil"
}
`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.25,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini retornou uma resposta vazia.');
  }

  const parsed: GeminiEvaluationResponse = JSON.parse(rawText);

  // Formatter and fallback sanitizer
  const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const coverUrl = extraContext?.coverUrl || `https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg`;

  return {
    id,
    title: parsed.title || bookTitle,
    author: parsed.author || extraContext?.author || 'Autor não informado',
    pages: parsed.pages || 200,
    coverUrl,
    genres: parsed.genres || ['Ficção'],
    resumo: parsed.resumo || '',
    movieComparisons: Array.isArray(parsed.movieComparisons) ? parsed.movieComparisons.slice(0, 4) : [],
    adaptacoes: parsed.adaptacoes || 'Nenhuma adaptação conhecida',
    criteria: {
      genericidade: Number(parsed.criteria?.genericidade) || 5,
      infantilidade: Number(parsed.criteria?.infantilidade) || 3,
      infantilidadeStatus: parsed.criteria?.infantilidadeStatus || 'ideal',
      qualidadeTecnica: Number(parsed.criteria?.qualidadeTecnica) || 7,
      worldbuilding: Number(parsed.criteria?.worldbuilding) || 5,
      ritmo: Number(parsed.criteria?.ritmo) || 6,
      ritmoDescricao: parsed.criteria?.ritmoDescricao || 'Ritmo moderado',
      tomSombrio: Number(parsed.criteria?.tomSombrio) || 5,
      impactoEmocional: Number(parsed.criteria?.impactoEmocional) || 6,
    },
    notaTecnica: Number(parsed.notaTecnica) || 7,
    notaEncaixe: Number(parsed.notaEncaixe) || 7,
    veredito: parsed.veredito || 'Vale a pena conferir com atenção.',
    vereditoTipo: parsed.vereditoTipo || 'ressalvas',
    justificativaEncaixe: parsed.justificativaEncaixe || '',
    createdAt: new Date().toISOString(),
  };
}
