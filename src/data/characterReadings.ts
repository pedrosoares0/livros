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
  {
    id: 'br-1984',
    title: '1984',
    author: 'George Orwell',
    publisher: 'Companhia das Letras',
    year: 1949,
    pages: 416,
    coverUrl: amz('8535914846'),
    genres: ['Distopia', 'Clássico', 'Ficção Política'],
    resumo:
      'Sob o olhar onipresente do Grande Irmão, Winston Smith trabalha reescrevendo o passado no Ministério da Verdade até ousar manter um diário e se apaixonar em segredo.',
  },
  {
    id: 'br-revolucao-bichos',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    publisher: 'Companhia das Letras',
    year: 1945,
    pages: 152,
    coverUrl: amz('8535909559'),
    genres: ['Alegoria Política', 'Clássico', 'Sátira'],
    resumo:
      'Os animais da Granja do Solar expulsam os humanos para criar uma sociedade igualitária, mas assistem aos porcos liderados por Napoleão converterem a utopia em tirania.',
  },
  {
    id: 'br-senhor-das-moscas',
    title: 'Senhor das Moscas',
    author: 'William Golding',
    publisher: 'Alfaguara',
    year: 1954,
    pages: 224,
    coverUrl: amz('8556521223'),
    genres: ['Clássico', 'Alegoria Moral', 'Drama Psicológico'],
    resumo:
      'Isolados numa ilha deserta após um acidente aéreo, um grupo de garotos britânicos tenta se autogovernar, mas a disputa entre Ralph e Jack rapidamente degenera em caça e barbárie.',
  },
  {
    id: 'br-cavernas-aco',
    title: 'As Cavernas de Aço',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1954,
    pages: 304,
    coverUrl: amz('8576574535'),
    genres: ['Ficção Científica', 'Investigação'],
    resumo:
      'Em uma Terra superpovoada e subterrânea, o detetive Elijah Baley é forçado a investigar um assassinato político ao lado de R. Daneel Olivaw, um robô idêntico a um ser humano.',
  },
  {
    id: 'br-floresta-sombria',
    title: 'A Floresta Sombria',
    author: 'Cixin Liu',
    publisher: 'Suma',
    year: 2008,
    pages: 472,
    coverUrl: amz('8556510507'),
    genres: ['Ficção Científica', 'Hard Sci-Fi', 'Estratégia Cósmica'],
    resumo:
      'Com a frota trissolariana a caminho da Terra e toda comunicação vigiada por sófons, a humanidade elege quatro Vallados para conceber planos secretos dentro da própria mente.',
  },
  {
    id: 'br-solaris',
    title: 'Solaris',
    author: 'Stanisław Lem',
    publisher: 'Aleph',
    year: 1961,
    pages: 272,
    coverUrl: amz('8576573326'),
    genres: ['Ficção Científica', 'Filosófico', 'Psicológico'],
    resumo:
      'O psicólogo Kris Kelvin chega a uma estação orbital sobre o planeta-oceano Solaris e descobre que aquela inteligência incompreensível materializa as memórias mais dolorosas da tripulação.',
  },
  {
    id: 'br-hamlet',
    title: 'Hamlet',
    author: 'William Shakespeare',
    publisher: 'Penguin-Companhia',
    year: 1601,
    pages: 320,
    coverUrl: amz('858285014X'),
    genres: ['Teatro', 'Tragédia', 'Clássico'],
    resumo:
      'Assombrado pelo espectro do pai assassinado, o príncipe da Dinamarca finge loucura na corte de Elsinore enquanto hesita entre a dúvida moral e a consumação da vingança.',
  },
  {
    id: 'br-otelo',
    title: 'Otelo',
    author: 'William Shakespeare',
    publisher: 'Penguin-Companhia',
    year: 1604,
    pages: 240,
    coverUrl: amz('858285045X'),
    genres: ['Teatro', 'Tragédia', 'Clássico'],
    resumo:
      'Manipulado pelas intrigas venenosas de Iago, o general mouro Otelo vê sua honra e seu amor por Desdêmona serem destruídos pela engrenagem implacável do ciúme e do ressentimento.',
  },
];

const BOOKS_BY_ID = new Map<string, Partial<BookEvaluation>>(
  [...POPULAR_SUGGESTIONS_POOL, ...CHARACTER_EXTRA_BOOKS].map((b) => [b.id!, b])
);

export interface CharacterReading {
  id: string;
  name: string;
  source: string;
  /** Foto vertical (proporção capa) do personagem */
  imageUrl?: string;
  /** O núcleo dramático do personagem: o que conecta os livros a ele */
  thread: string;
  /**
   * IDs em ordem de afinidade:
   * - Os 4 primeiros são as obras-âncora do personagem;
   * - Os demais formam o pool estendido que rotaciona 1 a 2 livros a cada aparição.
   */
  bookIds: string[];
}

export const CHARACTER_POOL: CharacterReading[] = [
  {
    id: 'ultron',
    name: 'Ultron',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/04/8a/2e/048a2ee796e96f8a11c5e706d72a467c.jpg',
    thread: 'Criações que concluem que o criador é o problema.',
    bookIds: [
      'br-frankenstein',
      'br-2001-odisseia',
      'br-eu-robo',
      'br-androides-sonham',
      'br-neuromancer',
      'br-cavernas-aco',
      'br-klara-e-o-sol',
      'br-fim-da-infancia',
      'br-ubik',
      'br-solaris',
    ],
  },
  {
    id: 'thanos',
    name: 'Thanos',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/c6/c4/e4/c6c4e46289db210071f2cd424adc09c4.jpg',
    thread: 'Convictos de que a destruição é um ato de misericórdia.',
    bookIds: [
      'br-crime-e-castigo',
      'br-irmaos-karamazov',
      'br-tres-corpos',
      'br-duna',
      'br-floresta-sombria',
      'br-admiravel-mundo-novo',
      'br-paraiso-perdido',
      'br-o-principe',
      'br-fim-da-infancia',
      'br-fundacao',
    ],
  },
  {
    id: 'tai-lung',
    name: 'Tai Lung',
    source: 'Kung Fu Panda',
    imageUrl: 'https://i.pinimg.com/736x/a1/37/66/a137666a3d0f60df80bc1af2860082be.jpg',
    thread: 'Prodígios rejeitados que transformam a mágoa em fúria.',
    bookIds: [
      'br-morro-ventos-uivantes',
      'br-frankenstein',
      'br-conde-monte-cristo',
      'br-paraiso-perdido',
      'br-memorias-subsolo',
      'br-moby-dick',
      'br-otelo',
      'br-hamlet',
      'br-arte-da-guerra',
      'br-dorian-gray',
    ],
  },
  {
    id: 'jack',
    name: 'Jack',
    source: 'Senhor das Moscas',
    imageUrl: 'https://i.pinimg.com/736x/6e/b4/4b/6eb44bf3859cbd111a530a3edd96c28a.jpg',
    thread: 'Quando a civilização cai, o poder vira instinto.',
    bookIds: [
      'br-senhor-das-moscas',
      'br-laranja-mecanica',
      'br-ensaio-cegueira',
      'br-ricardo-iii',
      'br-revolucao-bichos',
      'br-medico-e-monstro',
      'br-coracao-trevas',
      'br-o-perfume',
      'br-1984',
      'br-onde-os-velhos',
    ],
  },
  {
    id: 'viktor',
    name: 'Viktor',
    source: 'Arcane',
    thread: 'Gênios que sacrificam o próprio corpo para superar a carne.',
    bookIds: [
      'br-frankenstein',
      'br-medico-e-monstro',
      'br-devoradores-estrelas',
      'br-a-metamorfose',
      'br-recursao',
      'br-neuromancer',
      'br-materia-escura',
      'br-2001-odisseia',
    ],
  },
  {
    id: 'ekko',
    name: 'Ekko',
    source: 'Arcane',
    thread: 'Revolucionários que lutam contra o tempo para salvar quem ficou para trás.',
    bookIds: [
      'br-maquina-do-tempo',
      'br-recursao',
      'br-neuromancer',
      'br-jogos-vorazes',
      'br-fahrenheit-451',
      'br-materia-escura',
      'br-1984',
      'br-planeta-macacos',
    ],
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
      'br-otelo',
      'br-hamlet',
      'br-moby-dick',
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
      'br-hamlet',
      'br-arte-da-guerra',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'k-blade-runner',
    name: 'K',
    source: 'Blade Runner 2049',
    thread: 'Seres artificiais em busca de algo que os torne reais.',
    bookIds: [
      'br-androides-sonham',
      'br-klara-e-o-sol',
      'br-eu-robo',
      'br-frankenstein',
      'br-ubik',
      'br-cavernas-aco',
      'br-neuromancer',
      'br-solaris',
    ],
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
      'br-o-processo',
      'br-grande-gatsby',
      'br-moby-dick',
    ],
  },
  {
    id: 'cesar',
    name: 'César',
    source: 'Planeta dos Macacos',
    thread: 'Líderes que erguem os oprimidos contra quem os dominou.',
    bookIds: [
      'br-planeta-macacos',
      'br-duna',
      'br-fundacao',
      'br-admiravel-mundo-novo',
      'br-frankenstein',
      'br-revolucao-bichos',
      'br-jogos-vorazes',
      'br-arte-da-guerra',
    ],
  },
  {
    id: 'logan',
    name: 'Logan',
    source: 'X-Men',
    thread: 'Sobreviventes cansados de violência que ainda protegem alguém.',
    bookIds: [
      'br-a-estrada',
      'br-onde-os-velhos',
      'br-frankenstein',
      'br-devoradores-estrelas',
      'br-o-estrangeiro',
      'br-ensaio-cegueira',
      'br-coracao-trevas',
      'br-perdido-em-marte',
    ],
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
      'br-ricardo-iii',
      'br-otelo',
      'br-memorias-postumas',
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
      'br-2001-odisseia',
      'br-cavernas-aco',
      'br-floresta-sombria',
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
      'br-hamlet',
      'br-cao-baskerville',
      'br-o-processo',
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
      'br-cavernas-aco',
      'br-crime-e-castigo',
      'br-o-perfume',
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
      'br-solaris',
      'br-cavernas-aco',
      'br-mao-esquerda-escuridao',
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
      'br-contato',
      'br-solaris',
      'br-materia-escura',
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
      'br-solaris',
      'br-floresta-sombria',
      'br-2001-odisseia',
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
      'br-floresta-sombria',
      'br-devoradores-estrelas',
      'br-2001-odisseia',
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
      'br-hamlet',
      'br-jogos-vorazes',
      'br-irmaos-karamazov',
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
      'br-1984',
      'br-a-estrada',
      'br-hamlet',
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
      'br-dom-casmurro',
      'br-grande-gatsby',
      'br-hamlet',
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
      'br-crime-e-castigo',
      'br-morro-ventos-uivantes',
      'br-hamlet',
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
      'br-moby-dick',
      'br-conde-monte-cristo',
      'br-apanhador-centeio',
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
      'br-cem-anos-solidao',
      'br-apanhador-centeio',
      'br-solaris',
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
      'br-senhor-das-moscas',
      'br-ricardo-iii',
      'br-mestre-margarida',
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
      'br-1984',
      'br-revolucao-bichos',
      'br-fahrenheit-451',
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
      'br-morro-ventos-uivantes',
      'br-irmaos-karamazov',
      'br-otelo',
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
      'br-senhor-das-moscas',
      'br-medico-e-monstro',
      'br-crime-e-castigo',
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

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Sorteia `count` (4) livros para um personagem em uma rotação:
 * - Mantém 2 ou 3 livros-âncora (dos 4 primeiros do personagem)
 * - Mistura 1 ou 2 livros do pool estendido do personagem
 * - Garante que, em relação à rotação anterior (`previousBookIds`), pelo menos 1 ou 2 livros mudem.
 */
export function selectVariedCharacterBookIds(
  character: CharacterReading,
  evaluatedTitles: Set<string>,
  previousBookIds?: string[],
  count = 4
): string[] {
  const validBooks = character.bookIds
    .map((id) => BOOKS_BY_ID.get(id))
    .filter((b): b is Partial<BookEvaluation> => Boolean(b));

  const freshIds = validBooks
    .filter((b) => !evaluatedTitles.has(normalize(b.title || '')))
    .map((b) => b.id!);
  const seenIds = validBooks
    .filter((b) => evaluatedTitles.has(normalize(b.title || '')))
    .map((b) => b.id!);

  const pool = [...freshIds, ...seenIds];
  if (pool.length <= count) return pool;

  const corePool = pool.slice(0, Math.min(4, pool.length));
  const extraPool = pool.slice(corePool.length);
  const prevSet = new Set(previousBookIds || []);

  const buildCandidate = (): string[] => {
    // Mantém 2 ou 3 obras-âncora e varia 1 ou 2 com o pool estendido
    const coreKeep =
      extraPool.length >= 2
        ? Math.random() < 0.55
          ? 3
          : 2
        : Math.max(1, count - extraPool.length);
    const extraTake = Math.min(extraPool.length, count - coreKeep);

    const chosenCore = shuffleArray(corePool).slice(0, coreKeep);
    const chosenExtra = shuffleArray(extraPool).slice(0, extraTake);
    // Preserva os livros-âncora na frente seguidos das variações da rotação
    const orderedCore = corePool.filter((id) => chosenCore.includes(id));
    return [...orderedCore, ...chosenExtra].slice(0, count);
  };

  let best = buildCandidate();
  if (prevSet.size > 0) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = buildCandidate();
      const overlap = candidate.filter((id) => prevSet.has(id)).length;
      // Ideal: mudou 1 ou 2 livros em relação à aparição anterior (overlap de 2 ou 3)
      if (overlap >= 1 && overlap <= count - 1) {
        best = candidate;
        break;
      }
    }
  }

  return best;
}

/**
 * Retorna até `count` livros do personagem, priorizando os que o leitor ainda não avaliou.
 * Se `savedBookIds` (da rotação atual) for informado, respeita a seleção sorteada e repõe
 * automaticamente qualquer livro que o leitor tenha avaliado nesse meio-tempo.
 */
export function getCharacterBooks(
  character: CharacterReading,
  evaluatedTitles: Set<string>,
  count = 4,
  savedBookIds?: string[]
): Partial<BookEvaluation>[] {
  const allBooks = character.bookIds
    .map((id) => BOOKS_BY_ID.get(id))
    .filter((b): b is Partial<BookEvaluation> => Boolean(b));

  const fresh = allBooks.filter((b) => !evaluatedTitles.has(normalize(b.title || '')));
  const seen = allBooks.filter((b) => evaluatedTitles.has(normalize(b.title || '')));

  if (savedBookIds && savedBookIds.length > 0) {
    const savedValid = savedBookIds
      .map((id) => BOOKS_BY_ID.get(id))
      .filter(
        (b): b is Partial<BookEvaluation> =>
          Boolean(b) && !evaluatedTitles.has(normalize(b!.title || ''))
      );

    if (savedValid.length >= count) {
      return savedValid.slice(0, count);
    }

    const usedIds = new Set(savedValid.map((b) => b.id!));
    const fillers = [...fresh, ...seen].filter((b) => b.id && !usedIds.has(b.id));
    return [...savedValid, ...fillers].slice(0, count);
  }

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
