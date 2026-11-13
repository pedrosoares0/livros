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
  {
    id: 'br-coracao-trevas',
    title: 'Coração das Trevas',
    author: 'Joseph Conrad',
    publisher: 'Antofágica',
    year: 1899,
    pages: 256,
    coverUrl: amz('6555980990'),
    genres: ['Clássico', 'Drama Psicológico'],
    resumo:
      'Subindo o rio Congo em busca do misterioso agente Kurtz, o marinheiro Marlow testemunha a barbárie colonial e a loucura de um homem que se declarou um deus na selva.',
  },
  {
    id: 'br-moby-dick',
    title: 'Moby Dick',
    author: 'Herman Melville',
    publisher: 'Cosac Naify',
    year: 1851,
    pages: 656,
    coverUrl: amz('857503670X'),
    genres: ['Clássico', 'Tragédia', 'Obsessão'],
    resumo:
      'O capitão Ahab arrasta a tripulação do baleeiro Pequod pelos oceanos em uma caçada suicida e metafísica contra a baleia branca que lhe arrancou a perna.',
  },
  {
    id: 'br-estudo-vermelho',
    title: 'Um Estudo em Vermelho',
    author: 'Arthur Conan Doyle',
    publisher: 'Martin Claret',
    year: 1887,
    pages: 192,
    coverUrl: amz('8544001939'),
    genres: ['Mistério', 'Investigação', 'Clássico'],
    resumo:
      'O primeiro encontro entre Sherlock Holmes e Dr. Watson em Londres, diante de um cadáver sem ferimentos em uma casa vazia e uma inscrição escrita com sangue na parede.',
  },
  {
    id: 'br-aventuras-sherlock',
    title: 'As Aventuras de Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    publisher: 'Zahar',
    year: 1892,
    pages: 336,
    coverUrl: amz('8537802808'),
    genres: ['Mistério', 'Contos', 'Clássico'],
    resumo:
      'Doze casos clássicos em que o detetive de Baker Street aplica dedução implacável e observação fria para desvendar crimes que desafiam a Scotland Yard.',
  },
  {
    id: 'br-cao-baskerville',
    title: 'O Cão dos Baskerville',
    author: 'Arthur Conan Doyle',
    publisher: 'Zahar',
    year: 1902,
    pages: 224,
    coverUrl: amz('8537802751'),
    genres: ['Mistério', 'Gótico', 'Investigação'],
    resumo:
      'Nos pântanos sombrios de Dartmoor, Sherlock Holmes enfrenta a lenda de um cão demoníaco que assombra a família Baskerville, separando superstição de assassinato calculado.',
  },
  {
    id: 'br-jogos-vorazes',
    title: 'Jogos Vorazes',
    author: 'Suzanne Collins',
    publisher: 'Rocco',
    year: 2008,
    pages: 400,
    coverUrl: amz('655532144X'),
    genres: ['Distopia', 'Sobrevivência', 'Ficção Científica'],
    resumo:
      'Nas ruínas da América do Norte, Katniss Everdeen se oferece no lugar da irmã para lutar até a morte em um massacre televisionado pela Capital — e vira a centelha de uma rebelião.',
  },
  {
    id: 'br-conto-da-aia',
    title: 'O Conto da Aia',
    author: 'Margaret Atwood',
    publisher: 'Rocco',
    year: 1985,
    pages: 368,
    coverUrl: amz('6555320982'),
    genres: ['Distopia', 'Drama Político'],
    resumo:
      'Na teocracia totalitária de Gilead, onde mulheres férteis são reduzidas a propriedade estatal, Offred registra em segredo sua resistência silenciosa para não perder o próprio nome.',
  },
  {
    id: 'br-maquina-do-tempo',
    title: 'A Máquina do Tempo',
    author: 'H. G. Wells',
    publisher: 'Suma',
    year: 1895,
    pages: 176,
    coverUrl: amz('855651068X'),
    genres: ['Ficção Científica', 'Clássico', 'Distopia'],
    resumo:
      'Um inventor vitoriano viaja até o ano 802.701 e descobre que a humanidade se dividiu em duas espécies: os frágeis Eloi da superfície e os predadores subterrâneos Morlocks.',
  },
  {
    id: 'br-contato',
    title: 'Contato',
    author: 'Carl Sagan',
    publisher: 'Companhia das Letras',
    year: 1985,
    pages: 440,
    coverUrl: amz('8535913513'),
    genres: ['Ficção Científica', 'Hard Sci-Fi', 'Filosófico'],
    resumo:
      'A radioastrônoma Ellie Arroway capta uma transmissão vinda da estrela Vega contendo as instruções para construir uma máquina que coloca frente a frente ciência, fé e a solidão cósmica.',
  },
  {
    id: 'br-grande-gatsby',
    title: 'O Grande Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Penguin-Companhia',
    year: 1925,
    pages: 256,
    coverUrl: amz('8563560298'),
    genres: ['Clássico', 'Drama', 'Tragédia'],
    resumo:
      'Por trás das festas opulentas de Long Island nos anos 1920, Jay Gatsby constrói um império inteiro apenas para tentar recuperar um amor do passado que já não existe.',
  },
  {
    id: 'br-nome-do-vento',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    publisher: 'Arqueiro',
    year: 2007,
    pages: 656,
    coverUrl: amz('6555651857'),
    genres: ['Fantasia', 'Drama', 'Formação'],
    resumo:
      'O lendário arcanista Kvothe, hoje escondido como um simples taverneiro, narra sua infância trágica, a obsessão pelos Chandrian e sua ascensão na Universidade.',
  },
  {
    id: 'br-arte-da-guerra',
    title: 'A Arte da Guerra',
    author: 'Sun Tzu',
    publisher: 'Penguin-Companhia',
    year: -500,
    pages: 160,
    coverUrl: amz('8582850905'),
    genres: ['Estratégia', 'Clássico', 'Filosofia'],
    resumo:
      'O tratado clássico do general Sun Tzu sobre domínio psicológico, disciplina, leitura de terreno e a arte de vencer o adversário antes mesmo do primeiro golpe.',
  },
  {
    id: 'br-o-principe',
    title: 'O Príncipe',
    author: 'Nicolau Maquiavel',
    publisher: 'Penguin-Companhia',
    year: 1532,
    pages: 176,
    coverUrl: amz('8563560034'),
    genres: ['Filosofia Política', 'Clássico'],
    resumo:
      'Dissecação fria e realista de como conquistar, exercer e manter o poder, despindo a política de qualquer ilusão moralista.',
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
    id: 'ekko',
    name: 'Ekko',
    source: 'Arcane',
    thread: 'Revolucionários que lutam contra o tempo para salvar quem ficou para trás.',
    bookIds: ['br-maquina-do-tempo', 'br-recursao', 'br-neuromancer', 'br-jogos-vorazes', 'br-fahrenheit-451'],
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
      'br-o-principe',
      'br-ricardo-iii',
      'br-irmaos-karamazov',
      'br-cem-anos-solidao',
      'br-conde-monte-cristo',
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
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    source: 'Marvel',
    thread: 'Engenheiros atormentados pelo futuro que tentam blindar o mundo.',
    bookIds: [
      'br-eu-robo',
      'br-devoradores-estrelas',
      'br-perdido-em-marte',
      'br-fundacao',
      'br-recursao',
    ],
  },
  {
    id: 'bruce-wayne',
    name: 'Bruce Wayne',
    source: 'Batman',
    thread: 'Vigilantes moldados pelo trauma que usam a própria escuridão como arma.',
    bookIds: [
      'br-conde-monte-cristo',
      'br-crime-e-castigo',
      'br-medico-e-monstro',
      'br-estudo-vermelho',
      'br-coracao-trevas',
    ],
  },
  {
    id: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    source: 'Arthur Conan Doyle',
    thread: 'Mentes hiperanalíticas que enxergam o crime como um enigma frio.',
    bookIds: [
      'br-estudo-vermelho',
      'br-aventuras-sherlock',
      'br-cao-baskerville',
      'br-o-processo',
      'br-medico-e-monstro',
    ],
  },
  {
    id: 'visao',
    name: 'Visão',
    source: 'Marvel',
    thread: 'Consciências sintéticas que contemplam a beleza e a finitude humana.',
    bookIds: [
      'br-klara-e-o-sol',
      'br-eu-robo',
      'br-androides-sonham',
      'br-2001-odisseia',
      'br-fim-da-infancia',
    ],
  },
  {
    id: 'cooper',
    name: 'Cooper',
    source: 'Interestelar',
    thread: 'Exploradores que atravessam o abismo do espaço e do tempo para voltar para casa.',
    bookIds: [
      'br-devoradores-estrelas',
      'br-perdido-em-marte',
      'br-2001-odisseia',
      'br-a-estrada',
      'br-maquina-do-tempo',
    ],
  },
  {
    id: 'dra-brand',
    name: 'Dra. Brand',
    source: 'Interestelar',
    thread: 'Cientistas divididos entre a salvação da espécie e a força do afeto.',
    bookIds: [
      'br-contato',
      'br-devoradores-estrelas',
      'br-mao-esquerda-escuridao',
      'br-fim-da-infancia',
      'br-tres-corpos',
    ],
  },
  {
    id: 'murph',
    name: 'Murph',
    source: 'Interestelar',
    thread: 'A obstinação de decifrar as leis do universo para cumprir uma promessa.',
    bookIds: [
      'br-contato',
      'br-tres-corpos',
      'br-recursao',
      'br-fundacao',
      'br-materia-escura',
    ],
  },
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    source: 'Harry Potter',
    thread: 'Crescer marcado por uma profecia e caminhar para o próprio sacrifício.',
    bookIds: [
      'br-nome-do-vento',
      'br-duna',
      'br-fim-da-infancia',
      'br-a-estrada',
      'br-fahrenheit-451',
    ],
  },
  {
    id: 'sirius-black',
    name: 'Sirius Black',
    source: 'Harry Potter',
    thread: 'Inocentes encarcerados que mantêm a lealdade intacta após anos na escuridão.',
    bookIds: [
      'br-conde-monte-cristo',
      'br-o-processo',
      'br-apanhador-centeio',
      'br-memorias-subsolo',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'snape',
    name: 'Professor Snape',
    source: 'Harry Potter',
    thread: 'Homens amargos condenados a proteger em segredo o que restou de um amor perdido.',
    bookIds: [
      'br-morro-ventos-uivantes',
      'br-crime-e-castigo',
      'br-conde-monte-cristo',
      'br-dorian-gray',
      'br-irmaos-karamazov',
    ],
  },
  {
    id: 'abby-anderson',
    name: 'Abby Anderson',
    source: 'The Last of Us',
    thread: 'Quando a vingança se cumpre e só resta reconstruir a própria humanidade.',
    bookIds: [
      'br-conde-monte-cristo',
      'br-a-estrada',
      'br-moby-dick',
      'br-ensaio-cegueira',
      'br-onde-os-velhos',
    ],
  },
  {
    id: 'ellie-williams',
    name: 'Ellie Williams',
    source: 'The Last of Us',
    thread: 'A espiral da perda que consome tudo até que largar a faca seja o último gesto.',
    bookIds: [
      'br-a-estrada',
      'br-morro-ventos-uivantes',
      'br-onde-os-velhos',
      'br-ensaio-cegueira',
      'br-jogos-vorazes',
    ],
  },
  {
    id: 'sebastian',
    name: 'Sebastian',
    source: 'La La Land',
    thread: 'O preço silencioso da ambição artística e dos amores que ficam pelo caminho.',
    bookIds: [
      'br-grande-gatsby',
      'br-dom-casmurro',
      'br-nome-do-vento',
      'br-dorian-gray',
      'br-memorias-postumas',
    ],
  },
  {
    id: 'juiz-holden',
    name: 'Juiz Holden',
    source: 'Meridiano de Sangue',
    thread: 'A encarnação erudita e implacável da guerra como lei suprema do mundo.',
    bookIds: [
      'br-coracao-trevas',
      'br-onde-os-velhos',
      'br-moby-dick',
      'br-paraiso-perdido',
      'br-o-principe',
    ],
  },
  {
    id: 'katniss',
    name: 'Katniss Everdeen',
    source: 'Jogos Vorazes',
    thread: 'Sobreviventes transformados em símbolos de uma guerra que nunca pediram para liderar.',
    bookIds: [
      'br-jogos-vorazes',
      'br-conto-da-aia',
      'br-duna',
      'br-admiravel-mundo-novo',
      'br-ensaio-cegueira',
    ],
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    source: 'Dragon Ball',
    thread: 'O orgulho ferido do guerreiro que precisa perder a soberba para superar seus limites.',
    bookIds: [
      'br-arte-da-guerra',
      'br-moby-dick',
      'br-paraiso-perdido',
      'br-conde-monte-cristo',
      'br-duna',
    ],
  },
  {
    id: 'coringa',
    name: 'O Coringa',
    source: 'DC',
    thread: 'O caos lúcido que ri da moral civilizada e quer provar que basta um dia ruim.',
    bookIds: [
      'br-memorias-subsolo',
      'br-laranja-mecanica',
      'br-o-estrangeiro',
      'br-mestre-margarida',
      'br-o-perfume',
    ],
  },
];

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
