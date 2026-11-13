import type { BookEvaluation } from '../types';
import { POPULAR_SUGGESTIONS_POOL } from './suggestionBooks';

/**
 * Leituras por Personagem.
 * Cada personagem favorito do leitor aponta para livros que compartilham o mesmo núcleo dramático
 * (o "fio" do personagem). Todas as capas são edições brasileiras verificadas na CDN da Amazon.
 */

const amz = (isbn10: string) => `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`;

const CHARACTER_EXTRA_BOOKS: Partial<BookEvaluation>[] = [
  {
    id: 'br-irmaos-karamazov',
    title: 'Os Irmãos Karamázov',
    author: 'Fiódor Dostoiévski',
    publisher: 'Penguin-Companhia',
    year: 1880,
    pages: 1008,
    coverUrl: amz('8582851995'),
    genres: ['Clássico Russo', 'Drama Filosófico'],
    resumo:
      'O assassinato do devasso Fiódor Karamázov expõe os três filhos — o sensual Dmitri, o racional Ivan e o devoto Aliócha — a um embate brutal sobre fé, culpa, liberdade e a existência de Deus.',
  },
  {
    id: 'br-eu-robo',
    title: 'Eu, Robô',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1950,
    pages: 320,
    coverUrl: amz('8576572001'),
    genres: ['Ficção Científica', 'Clássico'],
    resumo:
      'Contos interligados narram a evolução dos robôs positrônicos e os paradoxos das Três Leis da Robótica, até o ponto em que as máquinas passam a decidir o que é melhor para a humanidade.',
  },
  {
    id: 'br-laranja-mecanica',
    title: 'Laranja Mecânica',
    author: 'Anthony Burgess',
    publisher: 'Aleph',
    year: 1962,
    pages: 288,
    coverUrl: amz('8576574462'),
    genres: ['Distopia', 'Drama Psicológico'],
    resumo:
      'Alex e seus druguis aterrorizam as noites de uma cidade decadente. Preso pelo Estado, ele é submetido ao condicionamento Ludovico e perde a capacidade de escolher entre o bem e o mal.',
  },
  {
    id: 'br-morro-ventos-uivantes',
    title: 'O Morro dos Ventos Uivantes',
    author: 'Emily Brontë',
    publisher: 'Zahar',
    year: 1847,
    pages: 416,
    coverUrl: amz('853781752X'),
    genres: ['Clássico', 'Drama Gótico'],
    resumo:
      'Acolhido e depois humilhado pela família Earnshaw, o órfão Heathcliff transforma a rejeição em uma vingança metódica que atravessa duas gerações nas charnecas de Yorkshire.',
  },
  {
    id: 'br-conde-monte-cristo',
    title: 'O Conde de Monte Cristo',
    author: 'Alexandre Dumas',
    publisher: 'Zahar',
    year: 1844,
    pages: 1664,
    coverUrl: amz('853780827X'),
    genres: ['Clássico', 'Aventura', 'Vingança'],
    resumo:
      'Traído e preso injustamente no Château d’If, Edmond Dantès escapa após catorze anos, enriquece com um tesouro escondido e retorna como o enigmático Conde para destruir cada um de seus algozes.',
  },
  {
    id: 'br-dorian-gray',
    title: 'O Retrato de Dorian Gray',
    author: 'Oscar Wilde',
    publisher: 'Penguin-Companhia',
    year: 1890,
    pages: 336,
    coverUrl: amz('8563560433'),
    genres: ['Clássico', 'Gótico', 'Drama Moral'],
    resumo:
      'Um jovem de beleza extraordinária troca a alma pela juventude eterna: enquanto ele mergulha na corrupção, apenas seu retrato escondido envelhece e registra cada crime.',
  },
  {
    id: 'br-klara-e-o-sol',
    title: 'Klara e o Sol',
    author: 'Kazuo Ishiguro',
    publisher: 'Companhia das Letras',
    year: 2021,
    pages: 304,
    coverUrl: amz('6559210235'),
    genres: ['Ficção Científica', 'Drama Humano'],
    resumo:
      'Klara, uma Amiga Artificial, observa o mundo humano da vitrine de uma loja até ser escolhida por uma menina doente — e passa a questionar o que, afinal, torna alguém insubstituível.',
  },
  {
    id: 'br-memorias-subsolo',
    title: 'Memórias do Subsolo',
    author: 'Fiódor Dostoiévski',
    publisher: 'Editora 34',
    year: 1864,
    pages: 152,
    coverUrl: amz('8573261854'),
    genres: ['Clássico Russo', 'Existencialismo'],
    resumo:
      'Um ex-funcionário amargurado, isolado em seu subsolo de São Petersburgo, despeja um monólogo feroz contra a razão, a sociedade e a si mesmo, revelando a anatomia do ressentimento.',
  },
  {
    id: 'br-apanhador-centeio',
    title: 'O Apanhador no Campo de Centeio',
    author: 'J. D. Salinger',
    publisher: 'Todavia',
    year: 1951,
    pages: 256,
    coverUrl: amz('6580309032'),
    genres: ['Clássico', 'Drama Psicológico'],
    resumo:
      'Expulso de mais uma escola, Holden Caulfield vaga por Nova York durante três dias carregando o luto não resolvido pelo irmão e uma raiva crescente contra a falsidade do mundo adulto.',
  },
  {
    id: 'br-planeta-macacos',
    title: 'O Planeta dos Macacos',
    author: 'Pierre Boulle',
    publisher: 'Aleph',
    year: 1963,
    pages: 224,
    coverUrl: amz('8576576104'),
    genres: ['Ficção Científica', 'Alegoria Social'],
    resumo:
      'Um jornalista chega a um planeta onde símios civilizados governam e humanos são bestas caçadas e estudadas em laboratório — uma sátira cortante sobre arrogância e hierarquia.',
  },
  {
    id: 'br-onde-os-velhos',
    title: 'Onde os Velhos Não Têm Vez',
    author: 'Cormac McCarthy',
    publisher: 'Alfaguara',
    year: 2005,
    pages: 256,
    coverUrl: amz('8556522068'),
    genres: ['Thriller', 'Neo-Western', 'Drama Sombrio'],
    resumo:
      'Ao encontrar uma maleta com dois milhões de dólares, um caçador do Texas se torna presa do implacável Anton Chigurh, enquanto um xerife envelhecido testemunha um mundo que já não entende.',
  },
  {
    id: 'br-a-estrada',
    title: 'A Estrada',
    author: 'Cormac McCarthy',
    publisher: 'Alfaguara',
    year: 2006,
    pages: 240,
    coverUrl: amz('8556522580'),
    genres: ['Pós-Apocalíptico', 'Drama Humano'],
    resumo:
      'Num mundo devastado e coberto de cinzas, um pai e seu filho caminham rumo ao litoral, protegendo um ao outro da fome, do frio e de outros sobreviventes.',
  },
  {
    id: 'br-mitologia-nordica',
    title: 'Mitologia Nórdica',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    year: 2017,
    pages: 288,
    coverUrl: amz('8551001280'),
    genres: ['Mitologia', 'Fantasia'],
    resumo:
      'Gaiman reconta os mitos de Odin, Thor e do ardiloso Loki, da criação dos nove mundos ao Ragnarök, com humor seco e o fatalismo sombrio das sagas originais.',
  },
  {
    id: 'br-deuses-americanos',
    title: 'Deuses Americanos',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    year: 2001,
    pages: 576,
    coverUrl: amz('8551000721'),
    genres: ['Fantasia Sombria', 'Mitologia'],
    resumo:
      'Recém-saído da prisão, Shadow é contratado pelo misterioso Wednesday e arrastado para uma guerra entre os velhos deuses esquecidos e as novas divindades da mídia e da tecnologia.',
  },
  {
    id: 'br-paraiso-perdido',
    title: 'Paraíso Perdido',
    author: 'John Milton',
    publisher: 'Editora 34',
    year: 1667,
    pages: 960,
    coverUrl: amz('8573266112'),
    genres: ['Clássico', 'Poesia Épica'],
    resumo:
      'O poema épico da rebelião de Lúcifer contra Deus, sua queda ao Inferno e a vingança que leva à expulsão de Adão e Eva — com o anjo caído como um dos antagonistas mais fascinantes da literatura.',
  },
  {
    id: 'br-ricardo-iii',
    title: 'Ricardo III',
    author: 'William Shakespeare',
    publisher: 'L&PM',
    year: 1593,
    pages: 192,
    coverUrl: amz('8525415847'),
    genres: ['Teatro', 'Tragédia Histórica'],
    resumo:
      'Deformado, carismático e sem escrúpulos, Ricardo de Gloucester manipula, trai e assassina parentes um a um para tomar a coroa da Inglaterra — e descobre o preço de governar pelo medo.',
  },
  {
    id: 'br-o-perfume',
    title: 'O Perfume',
    author: 'Patrick Süskind',
    publisher: 'Record',
    year: 1985,
    pages: 256,
    coverUrl: amz('8577991148'),
    genres: ['Thriller Psicológico', 'Literatura Alemã'],
    resumo:
      'Na França do século XVIII, Jean-Baptiste Grenouille nasce sem cheiro próprio, mas com o olfato mais apurado do mundo, e mata para destilar o perfume perfeito.',
  },
  {
    id: 'br-o-estrangeiro',
    title: 'O Estrangeiro',
    author: 'Albert Camus',
    publisher: 'Record',
    year: 1942,
    pages: 128,
    coverUrl: amz('8501014869'),
    genres: ['Clássico', 'Existencialismo', 'Absurdo'],
    resumo:
      'Meursault não chora no enterro da mãe e, dias depois, mata um homem numa praia de Argel. Seu julgamento vira um processo contra sua indiferença diante das convenções humanas.',
  },
  {
    id: 'br-mestre-margarida',
    title: 'O Mestre e Margarida',
    author: 'Mikhail Bulgákov',
    publisher: 'Editora 34',
    year: 1967,
    pages: 512,
    coverUrl: amz('8573266805'),
    genres: ['Clássico Russo', 'Sátira', 'Fantasia'],
    resumo:
      'O Diabo desembarca na Moscou soviética como o enigmático professor Woland e expõe a hipocrisia da elite cultural, enquanto Margarida arrisca tudo para salvar o escritor que ama.',
  },
];

const BOOKS_BY_ID = new Map<string, Partial<BookEvaluation>>(
  [...POPULAR_SUGGESTIONS_POOL, ...CHARACTER_EXTRA_BOOKS].map((b) => [b.id!, b])
);

export interface CharacterReading {
  id: string;
  name: string;
  source: string;
  /** O núcleo dramático do personagem: o que conecta os livros a ele */
  thread: string;
  /** IDs em ordem de afinidade; os 4 primeiros ainda não avaliados são exibidos */
  bookIds: string[];
}

export const CHARACTER_POOL: CharacterReading[] = [
  {
    id: 'thanos',
    name: 'Thanos',
    source: 'Marvel',
    thread: 'Convictos de que a destruição é um ato de misericórdia.',
    bookIds: [
      'br-crime-e-castigo',
      'br-irmaos-karamazov',
      'br-tres-corpos',
      'br-duna',
      'br-admiravel-mundo-novo',
      'br-paraiso-perdido',
    ],
  },
  {
    id: 'ultron',
    name: 'Ultron',
    source: 'Marvel',
    thread: 'Criações que concluem que o criador é o problema.',
    bookIds: ['br-frankenstein', 'br-eu-robo', 'br-2001-odisseia', 'br-androides-sonham', 'br-neuromancer'],
  },
  {
    id: 'tai-lung',
    name: 'Tai Lung',
    source: 'Kung Fu Panda',
    thread: 'Prodígios rejeitados que transformam a mágoa em fúria.',
    bookIds: [
      'br-morro-ventos-uivantes',
      'br-frankenstein',
      'br-conde-monte-cristo',
      'br-paraiso-perdido',
      'br-memorias-subsolo',
    ],
  },
  {
    id: 'jack',
    name: 'Jack',
    source: 'Senhor das Moscas',
    thread: 'Quando a civilização cai, o poder vira instinto.',
    bookIds: ['br-laranja-mecanica', 'br-ensaio-cegueira', 'br-ricardo-iii', 'br-medico-e-monstro', 'br-o-perfume'],
  },
  {
    id: 'viktor',
    name: 'Viktor',
    source: 'Arcane',
    thread: 'Gênios que sacrificam o próprio corpo para superar a carne.',
    bookIds: ['br-frankenstein', 'br-medico-e-monstro', 'br-devoradores-estrelas', 'br-a-metamorfose', 'br-recursao'],
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    source: 'Star Wars',
    thread: 'A queda do herói movida pelo medo de perder quem ama.',
    bookIds: [
      'br-dorian-gray',
      'br-duna',
      'br-paraiso-perdido',
      'br-morro-ventos-uivantes',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'michael-corleone',
    name: 'Michael Corleone',
    source: 'O Poderoso Chefão',
    thread: 'O herdeiro relutante devorado pelo poder da família.',
    bookIds: [
      'br-ricardo-iii',
      'br-irmaos-karamazov',
      'br-cem-anos-solidao',
      'br-conde-monte-cristo',
      'br-duna',
    ],
  },
  {
    id: 'k-blade-runner',
    name: 'K',
    source: 'Blade Runner 2049',
    thread: 'Seres artificiais em busca de algo que os torne reais.',
    bookIds: ['br-androides-sonham', 'br-klara-e-o-sol', 'br-eu-robo', 'br-frankenstein', 'br-ubik'],
  },
  {
    id: 'carmy',
    name: 'Carmy',
    source: 'The Bear',
    thread: 'Obsessão, luto e a ansiedade de nunca ser o bastante.',
    bookIds: [
      'br-apanhador-centeio',
      'br-a-metamorfose',
      'br-memorias-subsolo',
      'br-o-estrangeiro',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'cesar',
    name: 'César',
    source: 'Planeta dos Macacos',
    thread: 'Líderes que erguem os oprimidos contra quem os dominou.',
    bookIds: ['br-planeta-macacos', 'br-duna', 'br-fundacao', 'br-admiravel-mundo-novo', 'br-frankenstein'],
  },
  {
    id: 'logan',
    name: 'Logan',
    source: 'X-Men',
    thread: 'Sobreviventes cansados de violência que ainda protegem alguém.',
    bookIds: ['br-a-estrada', 'br-onde-os-velhos', 'br-frankenstein', 'br-devoradores-estrelas', 'br-o-estrangeiro'],
  },
  {
    id: 'loki',
    name: 'Loki',
    source: 'Marvel',
    thread: 'Trapaceiros, deuses e forasteiros em guerra com a própria identidade.',
    bookIds: [
      'br-mitologia-nordica',
      'br-deuses-americanos',
      'br-mestre-margarida',
      'br-paraiso-perdido',
      'br-dorian-gray',
    ],
  },
];

/** Personagens exibidos na primeira janela de 6h (antes de qualquer rotação) */
export const DEFAULT_CHARACTER_IDS = ['thanos', 'ultron', 'tai-lung', 'jack'];

const normalize = (text: string) =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim();

/**
 * Retorna até `count` livros do personagem, priorizando os que o leitor ainda não avaliou.
 */
export function getCharacterBooks(
  character: CharacterReading,
  evaluatedTitles: Set<string>,
  count = 4
): Partial<BookEvaluation>[] {
  const books = character.bookIds
    .map((id) => BOOKS_BY_ID.get(id))
    .filter((b): b is Partial<BookEvaluation> => Boolean(b));
  const fresh = books.filter((b) => !evaluatedTitles.has(normalize(b.title || '')));
  const seen = books.filter((b) => evaluatedTitles.has(normalize(b.title || '')));
  return [...fresh, ...seen].slice(0, count);
}

export function buildEvaluatedTitleSet(existing: { title: string; originalTitle?: string }[]): Set<string> {
  const set = new Set<string>();
  for (const b of existing) {
    if (b.title) set.add(normalize(b.title));
    if (b.originalTitle) set.add(normalize(b.originalTitle));
  }
  return set;
}

