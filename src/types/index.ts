export interface CriteriaScores {
  genericidade: number; // 0 = extremamente original, 10 = clichê
  infantilidade: number; // 0 = adulto/sombrio, 10 = infantil/juvenil
  infantilidadeStatus: 'ideal' | 'aceitavel' | 'risco' | 'rejeicao';
  qualidadeTecnica: number; // 0-10 prosa, estrutura, diálogos
  worldbuilding: number; // 0-10 regras, profundidade, política, magia
  ritmo: number; // 0 = muito lento, 10 = extremamente ágil
  ritmoDescricao: string; // Ex: "Leitura rápida de fim de semana" ou "Mais lento e introspectivo"
  tomSombrio: number; // 0 = leve/acolhedor, 10 = opressivo/trágico
  impactoEmocional: number; // 0 = raso, 10 = dilemas fortes, culpa, luto
}

export type VereditoTipo = 'leia' | 'ressalvas' | 'evite';

export interface BookEvaluation {
  id: string;
  title: string;
  author: string;
  originalTitle?: string;
  year?: number;
  pages: number; // Páginas aproximadas edição pt-BR (sempre presente)
  coverUrl: string;
  resumo: string; // 2 a 3 linhas, sem spoilers, foco em clima, tema e premissa
  movieComparisons: string[]; // 1 ou 2 filmes para vibe
  adaptacoes: string; // Adaptações existentes (filme, série, HQ) ou "Nenhuma adaptação relevante"
  criteria: CriteriaScores;
  notaTecnica: number; // Média ponderada da qualidade objetiva (0 a 10)
  notaEncaixe: number; // Calibrada para o perfil do usuário (0 a 10)
  veredito: string; // Uma frase direta
  vereditoTipo: VereditoTipo;
  justificativaEncaixe: string; // Análise transparente dos pesos
  genres: string[];
  userStatus?: 'loved' | 'disliked' | 'wishlist' | 'analyzed';
  categoryShelf?: string;
  createdAt?: string;
  isSaved?: boolean;
}

export interface UserPreferences {
  name: string;
  preferredTone: string;
  preferredFormat: string;
}

// Nota pessoal do leitor após terminar a leitura ("Já li")
export interface UserRating {
  bookId: string;
  rating: number; // Inteiro 1 a 10
  tags: string[]; // Pills da faixa da nota
  ratedAt: string;
  updatedAt: string;
}

export type UserRatingsMap = Record<string, UserRating>;
