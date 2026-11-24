import type { BookEvaluation } from '../types';
import { POPULAR_SUGGESTIONS_POOL } from './suggestionBooks';

/**
 * Leituras por Personagem.
 * Cada personagem favorito do leitor aponta para livros que compartilham o mesmo núcleo dramático
 * (o "fio" do personagem). Todas as capas são edições brasileiras verificadas na CDN da Amazon.
 */

const amz = (isbn10: string) => `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`;

export const CHARACTER_EXTRA_BOOKS: Partial<BookEvaluation>[] = [
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
    coverUrl: amz('8576571366'),
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
    coverUrl: amz('8579800242'),
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
    coverUrl: amz('8532520669'),
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
  {
    id: 'br-ilha-dr-moreau',
    title: 'A Ilha do Dr. Moreau',
    author: 'H. G. Wells',
    publisher: 'L&PM',
    year: 1896,
    pages: 176,
    coverUrl: amz('8525437999'),
    genres: ['Ficção Científica', 'Horror Biológico', 'Clássico'],
    resumo:
      'Um náufrago desembarca na ilha isolada de um fisiologista banido que realiza vivissecções brutais para transformar animais em criaturas semihumanas dotadas de fala e dor.',
  },
  {
    id: 'br-flores-algernon',
    title: 'Flores para Algernon',
    author: 'Daniel Keyes',
    publisher: 'Aleph',
    year: 1966,
    pages: 288,
    coverUrl: amz('8576573938'),
    genres: ['Ficção Científica', 'Drama Psicológico'],
    resumo:
      'Submetido a um experimento cirúrgico ao lado do rato de laboratório Algernon, Charlie Gordon vê seu intelecto disparar acima dos próprios cientistas que o tratavam como cobaia.',
  },
  {
    id: 'br-mochileiro-galaxias',
    title: 'O Guia do Mochileiro das Galáxias',
    author: 'Douglas Adams',
    publisher: 'Arqueiro',
    year: 1979,
    pages: 208,
    coverUrl: amz('8599296949'),
    genres: ['Ficção Científica', 'Humor Ácido', 'Space Opera'],
    resumo:
      'Segundos antes de a Terra ser demolida para dar lugar a uma via expressa hiperespacial, Arthur Dent escapa de carona numa nave alienígena pelo caos burocrático da galáxia.',
  },
  {
    id: 'br-gambito-rainha',
    title: 'O Gambito da Rainha',
    author: 'Walter Tevis',
    publisher: 'Arqueiro',
    year: 1983,
    pages: 336,
    coverUrl: amz('6555651660'),
    genres: ['Drama Psicológico', 'Obsessão'],
    resumo:
      'Órfã aos oito anos, Beth Harmon descobre um talento assustador para o xadrez e trava uma escalada implacável rumo aos grandes mestres soviéticos enquanto luta contra a autodestruição.',
  },
  {
    id: 'br-um-jogador',
    title: 'Um Jogador',
    author: 'Fiódor Dostoiévski',
    publisher: 'Editora 34',
    year: 1866,
    pages: 208,
    coverUrl: amz('8573263105'),
    genres: ['Clássico Russo', 'Drama Psicológico', 'Obsessão'],
    resumo:
      'Nos cassinos de Roulettenburg, o preceptor Aleksei Ivánovitch é devorado pela febre da roleta, onde cada giro vale mais do que a própria dignidade, o dinheiro ou o amor.',
  },
  {
    id: 'br-floresta-nome-mundo',
    title: 'Floresta é o Nome do Mundo',
    author: 'Ursula K. Le Guin',
    publisher: 'Morro Branco',
    year: 1972,
    pages: 192,
    coverUrl: amz('658601509X'),
    genres: ['Ficção Científica', 'Ecologia', 'Guerra'],
    resumo:
      'Humanos colonizam um planeta coberto por florestas sagradas e escravizam seus habitantes pacíficos para extrair madeira — até que um líder nativo aprende a arte humana de matar.',
  },
  {
    id: 'br-aniquilacao',
    title: 'Aniquilação',
    author: 'Jeff VanderMeer',
    publisher: 'Intrínseca',
    year: 2014,
    pages: 208,
    coverUrl: amz('858057563X'),
    genres: ['Ficção Científica', 'Weird Fiction', 'Ecologia Sombria'],
    resumo:
      'Uma bióloga integra a décima segunda expedição à misteriosa Área X, um território costeiro isolado onde uma natureza mutante e indomável está apagando todos os vestígios humanos.',
  },
  {
    id: 'br-norwegian-wood',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 1987,
    pages: 360,
    coverUrl: amz('8560281525'),
    genres: ['Drama', 'Melancolia', 'Formação'],
    resumo:
      'Ao ouvir um velho arranjo dos Beatles num avião, Toru Watanabe mergulha nas lembranças da Tóquio do fim dos anos 1960, entre discos de jazz, perdas irreparáveis e um amor impossível.',
  },
  {
    id: 'br-noites-brancas',
    title: 'Noites Brancas',
    author: 'Fiódor Dostoiévski',
    publisher: 'Editora 34',
    year: 1848,
    pages: 96,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/2d/e3/0e/2de30e96-1fcb-44de-6f73-a3e7b40a923c/1031666439.jpg/600x900bb.jpg',
    genres: ['Clássico Russo', 'Drama Romântico', 'Melancolia'],
    resumo:
      'Durante quatro madrugadas claras em São Petersburgo, um sonhador solitário encontra Nástenka às margens de um canal e se apaixona sabendo que ela espera por outro homem.',
  },
  {
    id: 'br-insustentavel-leveza',
    title: 'A Insustentável Leveza do Ser',
    author: 'Milan Kundera',
    publisher: 'Companhia das Letras',
    year: 1984,
    pages: 312,
    coverUrl: amz('8535928839'),
    genres: ['Clássico', 'Filosófico', 'Drama'],
    resumo:
      'Em meio à Primavera de Praga, quatro personagens têm suas escolhas afetivas, artísticas e políticas postas à prova diante de uma única vida que não permite ensaio.',
  },
  {
    id: 'br-e-nao-sobrou-nenhum',
    title: 'E Não Sobrou Nenhum',
    author: 'Agatha Christie',
    publisher: 'HarperCollins',
    year: 1939,
    pages: 400,
    coverUrl: amz('6559870332'),
    genres: ['Mistério', 'Investigação', 'Suspense'],
    resumo:
      'Dez desconhecidos com crimes impunes no passado são atraídos a uma ilha isolada e passam a ser executados um a um seguindo os versos macabros de uma cantiga infantil.',
  },
  {
    id: 'br-expresso-oriente',
    title: 'Assassinato no Expresso do Oriente',
    author: 'Agatha Christie',
    publisher: 'HarperCollins',
    year: 1934,
    pages: 240,
    coverUrl: amz('8595086788'),
    genres: ['Mistério', 'Dedução', 'Clássico'],
    resumo:
      'Com o trem preso numa nevasca nos Bálcãs e um passageiro assassinado a facadas dentro da cabine trancada, Hercule Poirot precisa interrogar doze suspeitos antes que o assassino ataque novamente.',
  },
  {
    id: 'br-nome-da-rosa',
    title: 'O Nome da Rosa',
    author: 'Umberto Eco',
    publisher: 'Record',
    year: 1980,
    pages: 560,
    coverUrl: amz('8501115827'),
    genres: ['Mistério Histórico', 'Investigação', 'Filosofia'],
    resumo:
      'Em 1327, o franciscano Guilherme de Baskerville aplica lógica implacável para investigar uma série de mortes misteriosas ligadas à biblioteca labiríntica de uma abadia beneditina.',
  },
  {
    id: 'br-eu-sou-a-lenda',
    title: 'Eu Sou a Lenda',
    author: 'Richard Matheson',
    publisher: 'Aleph',
    year: 1954,
    pages: 256,
    coverUrl: amz('8576572710'),
    genres: ['Pós-Apocalíptico', 'Horror', 'Ficção Científica'],
    resumo:
      'Robert Neville acredita ser o último humano vivo após uma praga global, barricando-se todas as noites e caçando infectados de dia — até compreender quem se tornou o verdadeiro monstro.',
  },
  {
    id: 'br-oceano-fim-caminho',
    title: 'O Oceano no Fim do Caminho',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    year: 2013,
    pages: 208,
    coverUrl: amz('8580573688'),
    genres: ['Fantasia Sombria', 'Memória', 'Fábula'],
    resumo:
      'Um homem retorna à antiga estrada de sua infância e recorda a vizinha Lettie Hempstock, cujo lago nos fundos da fazenda escondia forças ancestrais e um sacrifício esquecido.',
  },
  {
    id: 'br-o-alienista',
    title: 'O Alienista',
    author: 'Machado de Assis',
    publisher: 'Antofágica',
    year: 1882,
    pages: 192,
    coverUrl: amz('6580210087'),
    genres: ['Clássico Brasileiro', 'Sátira Psicológica'],
    resumo:
      'O médico Simão Bacamarte funda a Casa Verde em Itaguaí para estudar a loucura e acaba trancafiando quase toda a cidade ao tentar traçar a fronteira exata da razão humana.',
  },
  {
    id: 'br-maus',
    title: 'Maus',
    author: 'Art Spiegelman',
    publisher: 'Companhia das Letras',
    year: 1991,
    pages: 296,
    coverUrl: amz('8535906282'),
    genres: ['Graphic Novel', 'História', 'Biografia'],
    resumo:
      'Através de entrevistas com o próprio pai sobrevivente de Auschwitz, Spiegelman reconstrói em quadrinhos o horror do Holocausto e as cicatrizes que atravessam gerações.',
  },
  {
    id: 'br-o-cemiterio',
    title: 'O Cemitério',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1983,
    pages: 424,
    coverUrl: amz('8581050395'),
    genres: ['Terror Psicológico', 'Luto', 'Tragédia'],
    resumo:
      'Devastado pela morte súbita do filho pequeno, o médico Louis Creed recusa aceitar o luto e recorre a um antigo cemitério indígena na floresta que devolve os mortos à vida.',
  },
  {
    id: 'br-o-hobbit',
    title: 'O Hobbit',
    author: 'J. R. R. Tolkien',
    publisher: 'HarperCollins',
    year: 1937,
    pages: 336,
    coverUrl: amz('8595084742'),
    genres: ['Fantasia', 'Aventura', 'Clássico'],
    resumo:
      'Arrancado do conforto do Condado pelo mago Gandalf e treze anãos exilados, Bilbo Bolseiro atravessa florestas ancestrais e montanhas para recuperar um reino usurpado pelo dragão Smaug.',
  },
  {
    id: 'br-duas-torres',
    title: 'O Senhor dos Anéis: As Duas Torres',
    author: 'J. R. R. Tolkien',
    publisher: 'HarperCollins',
    year: 1954,
    pages: 464,
    coverUrl: amz('8595084769'),
    genres: ['Fantasia Épica', 'Guerra', 'Clássico'],
    resumo:
      'Com a Sociedade do Anel partida, a guerra avança sobre Rohan e a antiga floresta de Fangorn desperta em fúria contra as forjas e a devastação industrial de Isengard.',
  },
  {
    id: 'br-watchmen',
    title: 'Watchmen',
    author: 'Alan Moore & Dave Gibbons',
    publisher: 'Panini',
    year: 1986,
    pages: 416,
    coverUrl: amz('857351549X'),
    genres: ['Graphic Novel', 'Distopia Política', 'Sci-Fi'],
    resumo:
      'Em uma Guerra Fria alternativa à beira do apocalipse nuclear, o assassinato do Comediante arrasta ex-vigilantes mascarados e um semideus indiferente para uma conspiração que coloca em xeque o destino da humanidade.',
  },
  {
    id: 'br-rei-lear',
    title: 'Rei Lear',
    author: 'William Shakespeare',
    publisher: 'Penguin-Companhia',
    year: 1606,
    pages: 288,
    coverUrl: amz('8582851111'),
    genres: ['Teatro', 'Tragédia', 'Clássico'],
    resumo:
      'Ao dividir o reino entre as filhas que mais o bajulam e deserdar a única que o ama com verdade, o velho rei Lear desencadeia uma guerra de ambição, ingratidão filial e loucura.',
  },
  {
    id: 'br-fim-eternidade',
    title: 'O Fim da Eternidade',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1955,
    pages: 288,
    coverUrl: amz('8576574225'),
    genres: ['Ficção Científica', 'Viagem no Tempo', 'Clássico'],
    resumo:
      'O técnico Andrew Harlan pertence à Eternidade, uma casta que altera os séculos para evitar catástrofes — até se apaixonar e perceber que a segurança absoluta está matando o futuro humano.',
  },
  {
    id: 'br-homem-castelo-alto',
    title: 'O Homem do Castelo Alto',
    author: 'Philip K. Dick',
    publisher: 'Aleph',
    year: 1962,
    pages: 304,
    coverUrl: amz('8576574411'),
    genres: ['Ficção Científica', 'Ucronia', 'Distopia Política'],
    resumo:
      'Em um 1962 alternativo em que a Alemanha nazista e o Império Japonês venceram a Segunda Guerra Mundial, um romance proibido circula pelas Américas ocupadas descrevendo um mundo onde o Eixo foi derrotado.',
  },
  {
    id: 'br-tropas-estelares',
    title: 'Tropas Estelares',
    author: 'Robert A. Heinlein',
    publisher: 'Aleph',
    year: 1959,
    pages: 368,
    coverUrl: amz('8576574926'),
    genres: ['Ficção Científica', 'Militar', 'Clássico'],
    resumo:
      'Da brutalidade do campo de treinamento de recrutas à guerra interestelar contra os Aracnídeos, Juan Rico é forjado pela disciplina marcial e pela filosofia implacável da Infantaria Móvel.',
  },
  {
    id: 'br-caixa-passaros',
    title: 'Caixa de Pássaros',
    author: 'Josh Malerman',
    publisher: 'Intrínseca',
    year: 2014,
    pages: 272,
    coverUrl: amz('8580576539'),
    genres: ['Pós-Apocalíptico', 'Suspense', 'Terror'],
    resumo:
      'Em um mundo onde um simples vislumbre de criaturas desconhecidas leva qualquer pessoa à violência suicida, Malorie precisa conduzir duas crianças vendadas por um rio em meio à neblina.',
  },
  {
    id: 'br-o-iluminado',
    title: 'O Iluminado',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1977,
    pages: 520,
    coverUrl: amz('8581050484'),
    genres: ['Terror Psicológico', 'Suspense', 'Drama Familiar'],
    resumo:
      'Contratado como zelador de inverno do isolado Hotel Overlook nas montanhas do Colorado, o escritor Jack Torrance vê seus próprios demônios serem alimentados pelas forças malignas do lugar.',
  },
  {
    id: 'br-misery',
    title: 'Misery',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1987,
    pages: 328,
    coverUrl: amz('8581052142'),
    genres: ['Thriller Psicológico', 'Suspense', 'Obsessão'],
    resumo:
      'Após sofrer um grave acidente na neve, o romancista Paul Sheldon é resgatado por Annie Wilkes — sua "fã número um" — que o mantém em cativeiro e o obriga sob tortura a reescrever sua obra.',
  },
  {
    id: 'br-o-naufrago',
    title: 'O Náufrago',
    author: 'Thomas Bernhard',
    publisher: 'Companhia das Letras',
    year: 1983,
    pages: 144,
    coverUrl: amz('853590851X'),
    genres: ['Drama Psicológico', 'Música', 'Obsessão'],
    resumo:
      'Dois pianistas de conservatório veem suas vidas e ambições artísticas serem esmagadas ao testemunharem de perto a perfeição técnica sobre-humana e implacável de Glenn Gould.',
  },
  {
    id: 'br-doutor-fausto',
    title: 'Doutor Fausto',
    author: 'Thomas Mann',
    publisher: 'Companhia das Letras',
    year: 1947,
    pages: 728,
    coverUrl: amz('8535926488'),
    genres: ['Clássico', 'Música', 'Tragédia'],
    resumo:
      'O compositor Adrian Leverkühn firma um pacto sombrio pelo qual renuncia à capacidade de amar e à própria sanidade em troca de vinte e quatro anos de genialidade musical absoluta.',
  },
  {
    id: 'br-defesa-lujin',
    title: 'A Defesa Lujin',
    author: 'Vladimir Nabokov',
    publisher: 'Companhia das Letras',
    year: 1930,
    pages: 224,
    coverUrl: amz('8535911529'),
    genres: ['Clássico', 'Drama Psicológico', 'Obsessão'],
    resumo:
      'Um prodígio solitário sacrifica a vida afetiva e a própria saúde mental à perfeição implacável de sua arte, até que a realidade inteira se reduz a um tabuleiro prestes a desabar.',
  },
  {
    id: 'br-livro-do-xadrez',
    title: 'O Livro do Xadrez',
    author: 'Stefan Zweig',
    publisher: 'Fósforo',
    year: 1942,
    pages: 112,
    coverUrl: amz('6589733341'),
    genres: ['Clássico', 'Drama Psicológico', 'Obsessão'],
    resumo:
      'A bordo de um transatlântico, o campeão mundial Mirko Czentovic enfrenta um homem cuja mente foi levada à febre e ao colapso pelo exercício solitário e obsessivo da perfeição técnica.',
  },
  {
    id: 'br-martin-eden',
    title: 'Martin Eden',
    author: 'Jack London',
    publisher: 'Nova Alexandria',
    year: 1909,
    pages: 408,
    coverUrl: amz('6586189888'),
    genres: ['Clássico', 'Formação', 'Obsessão Artística'],
    resumo:
      'Um jovem marinheiro autodidata brutaliza o próprio corpo trabalhando dezenove horas por dia, sacrificando o amor, o sono e a saúde na busca implacável pela grandeza artística.',
  },
  {
    id: 'br-jogo-contas-vidro',
    title: 'O Jogo das Contas de Vidro',
    author: 'Hermann Hesse',
    publisher: 'Record',
    year: 1943,
    pages: 560,
    coverUrl: amz('8577990036'),
    genres: ['Clássico', 'Filosófico', 'Música'],
    resumo:
      'Na província pedagógica de Castália, o prodígio Joseph Knecht ascende ao topo de uma ordem de elite devotada à perfeição musical e intelectual absoluta — e descobre o preço humano do isolamento.',
  },
  {
    id: 'br-fome',
    title: 'Fome',
    author: 'Knut Hamsun',
    publisher: 'Geração Editorial',
    year: 1890,
    pages: 240,
    coverUrl: amz('8561501146'),
    genres: ['Clássico', 'Drama Psicológico', 'Obsessão'],
    resumo:
      'Nas ruas geladas de Cristiânia, um jovem artista leva o corpo e a mente à beira do delírio, recusando qualquer concessão enquanto sangra pela própria vocação.',
  },
  {
    id: 'br-musashi',
    title: 'Musashi',
    author: 'Eiji Yoshikawa',
    publisher: 'Estação Liberdade',
    year: 1935,
    pages: 920,
    coverUrl: amz('857448007X'),
    genres: ['Épico Samurai', 'Artes Marciais', 'Clássico'],
    resumo:
      'A jornada implacável do espadachim Miyamoto Musashi pelo Japão feudal em busca da invencibilidade sob o céu, aprendendo a domar a própria fúria bruta através do caminho da espada.',
  },
  {
    id: 'br-cinco-aneis',
    title: 'O Livro dos Cinco Anéis',
    author: 'Miyamoto Musashi',
    publisher: 'Jardim dos Livros',
    year: 1645,
    pages: 160,
    coverUrl: amz('8584840338'),
    genres: ['Artes Marciais', 'Estratégia', 'Filosofia'],
    resumo:
      'Escrito pelo maior duelista da história do Japão em seus últimos dias numa caverna, o tratado definitivo sobre a técnica, o ritmo e o espírito implacável do combate.',
  },
  {
    id: 'br-iliada',
    title: 'Ilíada',
    author: 'Homero',
    publisher: 'Penguin-Companhia',
    year: -750,
    pages: 728,
    coverUrl: amz('8563560565'),
    genres: ['Épico', 'Guerra', 'Clássico'],
    resumo:
      'No nono ano do cerco a Troia, a cólera e o orgulho ferido de Aquiles colidem com a honra de Heitor num campo de batalha onde guerreiros preferem a glória eterna à vida.',
  },
  {
    id: 'br-cozinha-confidencial',
    title: 'Cozinha Confidencial',
    author: 'Anthony Bourdain',
    publisher: 'Companhia de Mesa',
    year: 2000,
    pages: 376,
    coverUrl: amz('8592754038'),
    genres: ['Gastronomia', 'Biografia', 'Alta Pressão'],
    resumo:
      'O retrato cru, febril e sem filtros dos bastidores das cozinhas profissionais de Nova York: o calor sufocante, as queimaduras, a disciplina militar e a obsessão perfeccionista a cada serviço.',
  },
  {
    id: 'br-sul-fronteira',
    title: 'Sul da Fronteira, Oeste do Sol',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 1992,
    pages: 184,
    coverUrl: amz('8556521193'),
    genres: ['Drama', 'Música', 'Nostalgia'],
    resumo:
      'Dono de um clube de jazz intimista e elegante em Tóquio, Hajime vê sua vida aparentemente estável virar de ponta-cabeça quando seu amor de infância reaparece em uma noite chuvosa.',
  },
  {
    id: 'br-sombra-do-vento',
    title: 'A Sombra do Vento',
    author: 'Carlos Ruiz Zafón',
    publisher: 'Suma',
    year: 2001,
    pages: 400,
    coverUrl: amz('8556510345'),
    genres: ['Mistério', 'Drama', 'Nostalgia'],
    resumo:
      'Na Barcelona enevoada de 1945, o jovem Daniel Sempere descobre no Cemitério dos Livros Esquecidos a obra de um autor amaldiçoado cuja história de amor e arte passa a espelhar a sua.',
  },
  {
    id: 'br-meridiano-sangue',
    title: 'Meridiano de Sangue',
    author: 'Cormac McCarthy',
    publisher: 'Alfaguara',
    year: 1985,
    pages: 344,
    coverUrl: amz('8556521096'),
    genres: ['Faroeste Sombrio', 'Clássico', 'Violência'],
    resumo:
      'Na fronteira brutal entre os Estados Unidos e o México em 1849, um garoto cavalga com o bando de caçadores de escalpos de Glanton e com o monstruoso e erudito Juiz Holden.',
  },
  {
    id: 'br-poderoso-chefao',
    title: 'O Poderoso Chefão',
    author: 'Mario Puzo',
    publisher: 'Record',
    year: 1969,
    pages: 496,
    coverUrl: amz('8501025437'),
    genres: ['Crime', 'Máfia', 'Drama Político'],
    resumo:
      'Quando um atentado contra Don Vito Corleone deflagra uma guerra entre as Cinco Famílias de Nova York, o filho mais novo, Michael, assume o comando e executa uma transição fria e implacável.',
  },
  {
    id: 'br-macbeth',
    title: 'Macbeth',
    author: 'William Shakespeare',
    publisher: 'Penguin-Companhia',
    year: 1606,
    pages: 224,
    coverUrl: amz('8582852304'),
    genres: ['Teatro', 'Tragédia', 'Poder'],
    resumo:
      'Seduzido por uma profecia e pelo pavor de perder o que conquistou, um general leal trai seu rei e mergulha num ciclo de sangue e paranoia do qual não há retorno.',
  },
  {
    id: 'br-messias-duna',
    title: 'Messias de Duna',
    author: 'Frank Herbert',
    publisher: 'Aleph',
    year: 1969,
    pages: 320,
    coverUrl: amz('8576573822'),
    genres: ['Ficção Científica', 'Tragédia Política'],
    resumo:
      'Doze anos após ascender ao trono imperial, Paul Atreides vê a jihad travada em seu nome devorar bilhões de vidas pelo cosmos, enquanto uma conspiração silenciosa e as armadilhas da própria presciência fecham o cerco ao seu redor.',
  },
  {
    id: 'br-cidade-ladroes',
    title: 'Cidade de Ladrões',
    author: 'David Benioff',
    publisher: 'Alfaguara',
    year: 2008,
    pages: 264,
    coverUrl: amz('8560281681'),
    genres: ['Guerra', 'Sobrevivência', 'Drama'],
    resumo:
      'Durante o cerco congelante a Leningrado, um garoto judeu e um desertor cínico recebem uma missão impossível atrás das linhas inimigas — obra que inspirou diretamente The Last of Us.',
  },
  {
    id: 'br-battle-royale',
    title: 'Battle Royale',
    author: 'Koushun Takami',
    publisher: 'Globo Alt',
    year: 1999,
    pages: 672,
    coverUrl: amz('852505612X'),
    genres: ['Distopia', 'Sobrevivência', 'Thriller'],
    resumo:
      'Quarenta e dois estudantes do ensino médio são sequestrados por um regime totalitário e lançados numa ilha isolada com coleiras explosivas sob uma única regra: matar até restar apenas um.',
  },
  {
    id: 'br-longa-marcha',
    title: 'A Longa Marcha',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1979,
    pages: 320,
    coverUrl: amz('8556511619'),
    genres: ['Distopia', 'Sobrevivência', 'Suspense'],
    resumo:
      'Em uma América militarizada, cem adolescentes participam da competição televisiva anual do Estado: caminhar sem parar acima de seis quilômetros por hora — quem recebe três avisos é fuzilado.',
  },
  {
    id: 'br-nao-me-abandone',
    title: 'Não Me Abandone Jamais',
    author: 'Kazuo Ishiguro',
    publisher: 'Companhia das Letras',
    year: 2005,
    pages: 352,
    coverUrl: amz('8535926550'),
    genres: ['Ficção Científica', 'Distopia', 'Drama Humano'],
    resumo:
      'No isolado e aparente idílio do internato inglês de Hailsham, Kathy, Ruth e Tommy crescem cercados por regras veladas e pelo incentivo constante de produzir arte — até compreenderem, aos poucos, o propósito silencioso para o qual foram criados.',
  },
  {
    id: 'br-homem-bicentenario',
    title: 'O Homem Bicentenário',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1976,
    pages: 344,
    coverUrl: amz('8576575868'),
    genres: ['Ficção Científica', 'Filosófico', 'Drama'],
    resumo:
      'Ao longo de dois séculos, o robô positrônico Andrew Martin desperta para a arte, a liberdade e o luto por quem ama, travando uma longa jornada ética e existencial para descobrir o que define um ser humano.',
  },
  {
    id: 'br-encontro-rama',
    title: 'Encontro com Rama',
    author: 'Arthur C. Clarke',
    publisher: 'Aleph',
    year: 1973,
    pages: 288,
    coverUrl: amz('8576574799'),
    genres: ['Hard Sci-Fi', 'Exploração Espacial', 'Clássico'],
    resumo:
      'Quando um cilindro alienígena de cinquenta quilômetros entra no Sistema Solar, a tripulação da nave Endeavour realiza a primeira expedição humana ao interior de um mundo artificial desconhecido.',
  },
  {
    id: 'br-feiticeiro-terramar',
    title: 'O Feiticeiro de Terramar',
    author: 'Ursula K. Le Guin',
    publisher: 'Morro Branco',
    year: 1968,
    pages: 256,
    coverUrl: amz('6586015421'),
    genres: ['Fantasia', 'Formação', 'Clássico'],
    resumo:
      'O jovem prodígio Ged ingressa na escola de magia da Ilha de Roke, mas um feitiço proibido o marca com uma cicatriz e liberta uma sombra sem nome que o caça pelos mares de Terramar.',
  },
  {
    id: 'br-quatro-estacoes',
    title: 'Quatro Estações',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1982,
    pages: 560,
    coverUrl: amz('8581050158'),
    genres: ['Drama', 'Prisão', 'Clássico Contemporâneo'],
    resumo:
      'Reúne "Rita Hayworth e a Redenção de Shawshank": a história de Andy Dufresne, condenado injustamente à prisão perpétua, que atravessa décadas de cárcere planejando em silêncio sua liberdade.',
  },
  {
    id: 'br-silencio-inocentes',
    title: 'O Silêncio dos Inocentes',
    author: 'Thomas Harris',
    publisher: 'Record',
    year: 1988,
    pages: 392,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication128/v4/a7/d4/eb/a7d4eb75-544b-c897-7d90-c7286a11e2fb/1026900421.jpg/600x900bb.jpg',
    genres: ['Thriller Psicológico', 'Investigação', 'Crime'],
    resumo:
      'Para capturar um assassino em série que esfola suas vítimas, a jovem investigadora Clarice Starling precisa mergulhar nos labirintos mentais do brilhante psiquiatra canibal Hannibal Lecter.',
  },
  {
    id: 'br-mito-sisifo',
    title: 'O Mito de Sísifo',
    author: 'Albert Camus',
    publisher: 'Record',
    year: 1942,
    pages: 160,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/6b/9e/ec/6b9eecab-1111-4295-9796-4034a94ddce9/919d3abf-9bf3-411d-92a4-501186ab9736_cover_image.jpg/600x900bb.jpg',
    genres: ['Filosofia', 'Existencialismo', 'Ensaio'],
    resumo:
      'Diante do silêncio irracional do mundo e da ausência de sentido último, Camus investiga o absurdo da condição humana e a revolta lúcida de continuar empurrando a rocha.',
  },
  {
    id: 'br-duplo',
    title: 'O Duplo',
    author: 'Fiódor Dostoiévski',
    publisher: 'Editora 34',
    year: 1846,
    pages: 232,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/31/5e/4f/315e4fbb-be19-5005-127a-caa032541414/9786558907657_cover.jpg/600x900bb.jpg',
    genres: ['Clássico Russo', 'Drama Psicológico'],
    resumo:
      'Em uma noite úmida de São Petersburgo, o funcionário público Iákov Goliádkin encontra um homem idêntico a si mesmo em nome e feições que passa a usurpar seu lugar na repartição e na vida.',
  },
  {
    id: 'br-guerra-e-paz',
    title: 'Guerra e Paz',
    author: 'Liev Tolstói',
    publisher: 'Companhia das Letras',
    year: 1869,
    pages: 1544,
    coverUrl: amz('8535930043'),
    genres: ['Clássico Russo', 'Épico Histórico', 'Drama'],
    resumo:
      'Enquanto os exércitos de Napoleão marcham sobre a Rússia czarista, cinco famílias aristocráticas atravessam salões imperiais e campos de batalha em busca de sentido moral na história.',
  },
  {
    id: 'br-anna-karienina',
    title: 'Anna Kariênina',
    author: 'Liev Tolstói',
    publisher: 'Companhia das Letras',
    year: 1877,
    pages: 808,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication127/v4/1e/50/7c/1e507ccf-b823-828c-3e63-e5a18db93734/1019040573.jpg/600x900bb.jpg',
    genres: ['Clássico Russo', 'Drama', 'Tragédia'],
    resumo:
      'Dividida entre as convenções implacáveis da alta sociedade russa e a paixão avassaladora pelo oficial Vrónski, Anna Kariênina enfrenta o preço brutal do exílio moral.',
  },
  {
    id: 'br-sociedade-anel',
    title: 'O Senhor dos Anéis: A Sociedade do Anel',
    author: 'J. R. R. Tolkien',
    publisher: 'HarperCollins',
    year: 1954,
    pages: 576,
    coverUrl: amz('8595084750'),
    genres: ['Fantasia Épica', 'Clássico', 'Aventura'],
    resumo:
      'Herdando um anel de poder ancestral que corrompe quem o carrega, Frodo Bolseiro deixa o Condado ao lado de uma comitiva improvável rumo às sombras de Mordor.',
  },
  {
    id: 'br-retorno-rei',
    title: 'O Senhor dos Anéis: O Retorno do Rei',
    author: 'J. R. R. Tolkien',
    publisher: 'HarperCollins',
    year: 1955,
    pages: 448,
    coverUrl: amz('8595084777'),
    genres: ['Fantasia Épica', 'Guerra', 'Clássico'],
    resumo:
      'Enquanto os exércitos do Oeste sustentam um último cerco diante dos portões negros para atrair o Olho do Inimigo, dois pequenos hobbits se arrastam pelas cinzas da Montanha da Perdição.',
  },
  {
    id: 'br-silmarillion',
    title: 'O Silmarillion',
    author: 'J. R. R. Tolkien',
    publisher: 'HarperCollins',
    year: 1977,
    pages: 496,
    coverUrl: amz('8595084378'),
    genres: ['Mitologia', 'Fantasia Épica', 'Tragédia'],
    resumo:
      'Da música primordial da criação à rebelião de Morgoth e ao juramento trágico de Fëanor pelas gemas de luz, as crônicas ancestrais da Primeira Era da Terra-média.',
  },
  {
    id: 'br-fundacao-imperio',
    title: 'Fundação e Império',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1952,
    pages: 272,
    coverUrl: amz('857657067X'),
    genres: ['Ficção Científica', 'Estratégia Cósmica'],
    resumo:
      'A psico-história de Hari Seldon enfrenta a única anomalia que suas equações matemáticas jamais poderiam prever: o surgimento do Mulo, um mutante capaz de dobrar emoções humanas.',
  },
  {
    id: 'br-segunda-fundacao',
    title: 'Segunda Fundação',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1953,
    pages: 288,
    coverUrl: amz('8576570688'),
    genres: ['Ficção Científica', 'Suspense Mental'],
    resumo:
      'Na outra extremidade da galáxia, uma ordem secreta de psicólogos e estrategistas mentais trabalha nas sombras para restaurar o Plano Seldon sem jamais revelar onde se esconde.',
  },
  {
    id: 'br-sol-desvelado',
    title: 'O Sol Desvelado',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1957,
    pages: 304,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication123/v4/f1/df/1b/f1df1b5c-4f4f-32b2-d7d7-99befacb09fa/1011451026.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Investigação'],
    resumo:
      'No planeta Solaria, onde vinte mil habitantes vivem isolados em propriedades gigantescas cercados por robôs e têm pavor do contato físico, ocorre um assassinato aparentemente impossível.',
  },
  {
    id: 'br-robos-alvorada',
    title: 'Os Robôs da Alvorada',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1983,
    pages: 528,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/01/24/a8/0124a837-b4de-a8c5-c01d-af7c52cda691/1025881572.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Investigação'],
    resumo:
      'Chamado ao mundo espacial de Aurora, o detetive Elijah Baley precisa solucionar o "roboticídio" mental de um androide humaniforme antes que a crise destrua o futuro político da Terra.',
  },
  {
    id: 'br-proprios-deuses',
    title: 'Os Próprios Deuses',
    author: 'Isaac Asimov',
    publisher: 'Aleph',
    year: 1972,
    pages: 344,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/45/28/89/45288952-b8da-f7d3-e191-991cf5c1d787/1011451034.jpg/600x900bb.jpg',
    genres: ['Hard Sci-Fi', 'Ficção Científica'],
    resumo:
      'Uma fonte inesgotável de energia trocada com um universo paralelo garante prosperidade à Terra, mas poucos cientistas ousam enxergar o preço físico que essa transação cobra das estrelas.',
  },
  {
    id: 'br-guerra-tronos',
    title: 'A Guerra dos Tronos',
    author: 'George R. R. Martin',
    publisher: 'Suma',
    year: 1996,
    pages: 600,
    coverUrl: amz('8556510787'),
    genres: ['Fantasia Sombria', 'Intriga Política'],
    resumo:
      'Nos Sete Reinos de Westeros, onde os verões duram décadas e o inverno se aproxima, a honra inflexível de Eddard Stark colide com o ninho de traições da corte de Porto Real.',
  },
  {
    id: 'br-furia-reis',
    title: 'A Fúria dos Reis',
    author: 'George R. R. Martin',
    publisher: 'Suma',
    year: 1998,
    pages: 656,
    coverUrl: amz('8556510795'),
    genres: ['Fantasia Sombria', 'Guerra', 'Política'],
    resumo:
      'Sob o rastro de um cometa cor de sangue, cinco pretendentes reivindicam o Trono de Ferro em uma guerra civil brutal que incendeia rios, castelos e alianças.',
  },
  {
    id: 'br-tormenta-espadas',
    title: 'A Tormenta de Espadas',
    author: 'George R. R. Martin',
    publisher: 'Suma',
    year: 2000,
    pages: 884,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication123/v4/c5/dc/ab/c5dcabee-1b0d-7c06-1c32-0c8825a16fee/1028785853.jpg/600x900bb.jpg',
    genres: ['Fantasia Sombria', 'Tragédia', 'Guerra'],
    resumo:
      'Com os Sete Reinos exauridos pelo conflito, a guerra deixa o campo de batalha aberto e se decide nos banquetes, nas alianças quebradas e nas muralhas de gelo do Norte.',
  },
  {
    id: 'br-temor-sabio',
    title: 'O Temor do Sábio',
    author: 'Patrick Rothfuss',
    publisher: 'Arqueiro',
    year: 2011,
    pages: 960,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication125/v4/c7/56/b0/c756b0d3-cc98-08b9-8832-e1f6322b1c7b/9788580410662_202107061451.jpg/600x900bb.jpg',
    genres: ['Fantasia', 'Formação', 'Aventura'],
    resumo:
      'Forçado a se afastar da Universidade, Kvothe viaja até cortes distantes, florestas feéricas e a terra dos guerreiros Ademre em sua caçada silenciosa por respostas sobre os Chandrian.',
  },
  {
    id: 'br-mentiras-locke-lamora',
    title: 'As Mentiras de Locke Lamora',
    author: 'Scott Lynch',
    publisher: 'Arqueiro',
    year: 2006,
    pages: 480,
    coverUrl: 'https://covers.openlibrary.org/b/id/13587688-L.jpg',
    genres: ['Fantasia', 'Submundo', 'Golpes'],
    resumo:
      'Nos canais sombrios de Camorr, o prodígio da trapaça Locke Lamora e seu bando de Nobres Vigaristas aplicam golpes audaciosos contra a elite até caírem na teia de uma guerra secreta.',
  },
  {
    id: 'br-caminho-reis',
    title: 'O Caminho dos Reis',
    author: 'Brandon Sanderson',
    publisher: 'Trama',
    year: 2010,
    pages: 1232,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/09/dd/06/09dd06a0-f2cf-16e9-9d17-0bf636484d1b/1037881982.jpg/600x900bb.jpg',
    genres: ['Fantasia Épica', 'Guerra'],
    resumo:
      'No mundo assolado por tempestades de Roshar, um cirurgião reduzido à escravidão nas pontes de guerra e um general assombrado por visões buscam o código perdido dos Cavaleiros Radiantes.',
  },
  {
    id: 'br-count-zero',
    title: 'Count Zero',
    author: 'William Gibson',
    publisher: 'Aleph',
    year: 1986,
    pages: 320,
    coverUrl: amz('8576573016'),
    genres: ['Cyberpunk', 'Ficção Científica'],
    resumo:
      'Sete anos após os eventos de Neuromancer, a Matriz mudou: entidades enigmáticas circulam pelo ciberespaço enquanto mercenários corporativos e um jovem hacker cruzam destinos.',
  },
  {
    id: 'br-mona-lisa-overdrive',
    title: 'Mona Lisa Overdrive',
    author: 'William Gibson',
    publisher: 'Aleph',
    year: 1988,
    pages: 320,
    coverUrl: amz('8576573024'),
    genres: ['Cyberpunk', 'Ficção Científica'],
    resumo:
      'Uma jovem de rua com semelhança cirúrgica a uma superestrela do SimStim, a filha de um chefe da Yakuza e inteligências artificiais convergem no desfecho da Trilogia do Sprawl.',
  },
  {
    id: 'br-matadouro-cinco',
    title: 'Matadouro-Cinco',
    author: 'Kurt Vonnegut',
    publisher: 'Rocco',
    year: 1969,
    pages: 224,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/43/1a/a9/431aa955-e260-cc2f-d555-1bd1f431e91f/9788551004609.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Guerra', 'Ficção Científica'],
    resumo:
      'Desprendido no tempo, Billy Pilgrim oscila sem controle entre o bombardeio incendiário de Dresden na Segunda Guerra Mundial e um zoológico alienígena no planeta Tralfamadore.',
  },
  {
    id: 'br-guerra-velho',
    title: 'Guerra do Velho',
    author: 'John Scalzi',
    publisher: 'Aleph',
    year: 2005,
    pages: 368,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication30/v4/3b/23/44/3b234468-0459-742a-d489-11809d9f7c3a/1014831943.jpg/600x900bb.jpg',
    genres: ['Ficção Científica Militar', 'Space Opera'],
    resumo:
      'Aos setenta e cinco anos, John Perry se alista nas Forças Coloniais de Defesa, deixando a Terra para sempre para lutar pela sobrevivência humana num universo implacavelmente hostil.',
  },
  {
    id: 'br-orador-mortos',
    title: 'Orador dos Mortos',
    author: 'Orson Scott Card',
    publisher: 'Aleph',
    year: 1986,
    pages: 416,
    coverUrl: 'https://covers.openlibrary.org/b/id/9315123-L.jpg',
    genres: ['Ficção Científica', 'Filosófico', 'Antropológico'],
    resumo:
      'Três milênios após a guerra que o marcou para sempre, Ender Wiggin viaja como Orador pelos mundos humanos até chegar à colônia de Lusitânia, onde uma nova espécie inteligente guarda um segredo.',
  },
  {
    id: 'br-filhos-duna',
    title: 'Filhos de Duna',
    author: 'Frank Herbert',
    publisher: 'Aleph',
    year: 1976,
    pages: 528,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/63/3a/97/633a97f8-063f-270d-0c0e-447d944bf1bf/1011641451.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Tragédia Dinástica'],
    resumo:
      'Com Arrakis tornando-se verdejante e o império religioso dos Atreides corrompido por intrigas, os gêmeos Leto II e Ghanima herdam as memórias de todos os seus ancestrais e o peso do Caminho Dourado.',
  },
  {
    id: 'br-imperador-deus-duna',
    title: 'Imperador Deus de Duna',
    author: 'Frank Herbert',
    publisher: 'Aleph',
    year: 1981,
    pages: 544,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/ff/72/55/ff7255b1-b062-b1ca-8342-65844a7b8c5d/1021504640.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Filosófico', 'Política'],
    resumo:
      'Após três mil e quinhentos anos de reinado absoluto, Leto II abdicou da forma humana para conduzir a espécie pelo Caminho Dourado, sabendo que a própria destruição faz parte de seu desígnio.',
  },
  {
    id: 'br-curva-sonho',
    title: 'A Curva do Sonho',
    author: 'Ursula K. Le Guin',
    publisher: 'Morro Branco',
    year: 1971,
    pages: 224,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/7f/2a/46/7f2a4615-27d2-568f-d9a7-f4707eb55103/b9495b3c-dd88-42d6-af07-88ecaefbdf2d_cover_image.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Psicológico'],
    resumo:
      'George Orr descobre que seus sonhos alteram retroativamente a realidade. Ao buscar ajuda psiquiátrica para parar de sonhar, cai nas mãos de um médico decidido a redesenhar o mundo.',
  },
  {
    id: 'br-dracula',
    title: 'Drácula',
    author: 'Bram Stoker',
    publisher: 'DarkSide',
    year: 1897,
    pages: 580,
    coverUrl: 'https://covers.openlibrary.org/b/id/12216503-L.jpg',
    genres: ['Clássico Gótico', 'Terror'],
    resumo:
      'Através de diários, cartas e registros fonográficos, a chegada silenciosa de um conde ancestral da Transilvânia espalha uma sombra predatória sobre a Londres vitoriana.',
  },
  {
    id: 'br-2666',
    title: '2666',
    author: 'Roberto Bolaño',
    publisher: 'Companhia das Letras',
    year: 2004,
    pages: 856,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/aa/d5/83/aad58326-c714-e687-978e-ffc6985e649e/1018581973.jpg/600x900bb.jpg',
    genres: ['Clássico Contemporâneo', 'Mistério', 'Drama Sombrio'],
    resumo:
      'Críticos literários europeus, um professor exilado, um jornalista americano e um misterioso romancista alemão convergem para a cidade fronteiriça de Santa Teresa, palco de crimes impunes.',
  },
  {
    id: 'br-detetives-selvagens',
    title: 'Os Detetives Selvagens',
    author: 'Roberto Bolaño',
    publisher: 'Companhia das Letras',
    year: 1998,
    pages: 632,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/e4/81/98/e4819814-065d-02c0-923d-e507259bc0bc/1017791276.jpg/600x900bb.jpg',
    genres: ['Clássico Contemporâneo', 'Formação', 'Arte'],
    resumo:
      'Da Cidade do México dos anos 1970 aos desertos de Sonora, os poetas vanguardistas Arturo Belano e Ulises Lima partem no rastro de uma autora desaparecida e da própria juventude.',
  },
  {
    id: 'br-pedro-paramo',
    title: 'Pedro Páramo',
    author: 'Juan Rulfo',
    publisher: 'BestBolso',
    year: 1955,
    pages: 160,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/f2/07/e4/f207e428-cee2-efa9-26b5-19192bad8761/1062181506.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Realismo Fantástico', 'Gótico'],
    resumo:
      'Cumprindo a promessa feita à mãe no leito de morte, Juan Preciado desce ao vilarejo árido de Comala em busca do pai que nunca conheceu, encontrando uma cidade povoada por murmúrios.',
  },
  {
    id: 'br-capitaes-areia',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    publisher: 'Companhia das Letras',
    year: 1937,
    pages: 280,
    coverUrl: amz('8535911693'),
    genres: ['Clássico Brasileiro', 'Drama Social'],
    resumo:
      'Nos trapiches abandonados de Salvador, o jovem Pedro Bala lidera um bando de meninos órfãos e marginalizados que sobrevivem entre a liberdade das ruas e a brutalidade da cidade.',
  },
  {
    id: 'br-paixao-gh',
    title: 'A Paixão Segundo G.H.',
    author: 'Clarice Lispector',
    publisher: 'Rocco',
    year: 1964,
    pages: 192,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/ea/ef/19/eaef1910-c0c8-9f52-a25e-ac472917dd88/1032205328.jpg/600x900bb.jpg',
    genres: ['Clássico Brasileiro', 'Filosófico', 'Psicológico'],
    resumo:
      'Ao entrar no quarto vazio da ex-empregada em seu apartamento no Rio de Janeiro, uma escultora sofre um colapso epifânico que desmonta todas as suas certezas sobre identidade e linguagem.',
  },
  {
    id: 'br-quincas-borba',
    title: 'Quincas Borba',
    author: 'Machado de Assis',
    publisher: 'Penguin-Companhia',
    year: 1891,
    pages: 360,
    coverUrl: 'https://covers.openlibrary.org/b/id/15156101-L.jpg',
    genres: ['Clássico Brasileiro', 'Sátira Psicológica'],
    resumo:
      'Herdando a fortuna e o cachorro de um filósofo excêntrico sob a máxima "ao vencedor, as batatas", o ingênuo professor Rubião mergulha na corte carioca até a fronteira do delírio.',
  },
  {
    id: 'br-intermitencias-morte',
    title: 'As Intermitências da Morte',
    author: 'José Saramago',
    publisher: 'Companhia das Letras',
    year: 2005,
    pages: 208,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/7a/d0/46/7ad04649-cad5-3040-fae8-8f1fca4f5643/1013937931.jpg/600x900bb.jpg',
    genres: ['Fábula Filosófica', 'Sátira', 'Clássico'],
    resumo:
      'À meia-noite de primeiro de janeiro, ninguém mais morre em um pequeno país. A euforia inicial pela vida eterna logo cede lugar ao colapso político, religioso e familiar.',
  },
  {
    id: 'br-evangelho-jesus',
    title: 'O Evangelho Segundo Jesus Cristo',
    author: 'José Saramago',
    publisher: 'Companhia das Letras',
    year: 1991,
    pages: 448,
    coverUrl: 'https://covers.openlibrary.org/b/id/7427765-L.jpg',
    genres: ['Clássico', 'Drama Filosófico'],
    resumo:
      'Uma releitura profundamente humana e trágica da juventude de Jesus de Nazaré, atormentado pela culpa dos inocentes de Belém e por um destino imposto pelos desígnios do poder divino.',
  },
  {
    id: 'br-caim',
    title: 'Caim',
    author: 'José Saramago',
    publisher: 'Companhia das Letras',
    year: 2009,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/15256213-L.jpg',
    genres: ['Sátira Filosófica', 'Clássico'],
    resumo:
      'Condenado a vagar após o primeiro fratricídio, Caim atravessa episódios do Antigo Testamento questionando de frente a justiça e a crueldade das ordens divinas.',
  },
  {
    id: 'br-todos-os-nomes',
    title: 'Todos os Nomes',
    author: 'José Saramago',
    publisher: 'Companhia das Letras',
    year: 1997,
    pages: 288,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication112/v4/fb/87/81/fb8781d3-d124-a87f-a3be-75d8918f2f74/1013938723.jpg/600x900bb.jpg',
    genres: ['Drama Existencial', 'Clássico'],
    resumo:
      'O solitário escriturário Sr. José, funcionário subalterno da Conservatória Geral do Registo Civil, encontra por acaso a ficha de uma mulher desconhecida e arrisca tudo para descobrir quem ela é.',
  },
  {
    id: 'br-colonia-penal',
    title: 'Na Colônia Penal',
    author: 'Franz Kafka',
    publisher: 'Companhia das Letras',
    year: 1919,
    pages: 80,
    coverUrl: 'https://covers.openlibrary.org/b/id/15249974-L.jpg',
    genres: ['Clássico', 'Horror Burocrático'],
    resumo:
      'Um explorador estrangeiro assiste à demonstração orgulhosa de um oficial sobre um aparelho de execução que inscreve a sentença judicial na própria pele do condenado.',
  },
  {
    id: 'br-montanha-magica',
    title: 'A Montanha Mágica',
    author: 'Thomas Mann',
    publisher: 'Companhia das Letras',
    year: 1924,
    pages: 848,
    coverUrl: 'https://covers.openlibrary.org/b/id/12370425-L.jpg',
    genres: ['Clássico', 'Filosófico', 'Formação'],
    resumo:
      'Hans Castorp sobe aos Alpes suíços para visitar o primo num sanatório por três semanas, mas o magnetismo daquele mundo suspenso no tempo o retém por sete anos à beira da Grande Guerra.',
  },
  {
    id: 'br-morte-veneza',
    title: 'A Morte em Veneza',
    author: 'Thomas Mann',
    publisher: 'Companhia das Letras',
    year: 1912,
    pages: 144,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/21/ca/85/21ca85d8-6312-2103-83f2-e5c11ed299c5/1063660490.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Estética', 'Tragédia'],
    resumo:
      'Em busca de alívio para o rigor sufocante de sua disciplina criativa, o renomado escritor Gustav von Aschenbach viaja a uma Veneza silenciosamente tomada pelo cólera.',
  },
  {
    id: 'br-demian',
    title: 'Demian',
    author: 'Hermann Hesse',
    publisher: 'Record',
    year: 1919,
    pages: 192,
    coverUrl: amz('850102029X'),
    genres: ['Clássico', 'Formação', 'Psicológico'],
    resumo:
      'Guiado pelo enigmático colega de escola Max Demian, o jovem Emil Sinclair rompe a fronteira entre o mundo luminoso da infância e as zonas proibidas da própria consciência.',
  },
  {
    id: 'br-sidarta',
    title: 'Sidarta',
    author: 'Hermann Hesse',
    publisher: 'Record',
    year: 1922,
    pages: 176,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication126/v4/e8/4d/d9/e84dd9ae-191f-a5bf-8e65-4ad6a86b59d7/1035033859.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Filosófico'],
    resumo:
      'Na Índia antiga, o filho de um brâmane abandona o conforto paterno, o ascetismo e os ensinamentos prontos para experimentar na própria carne a riqueza, a perda e a escuta de um rio.',
  },
  {
    id: 'br-entre-quatro-paredes',
    title: 'Entre Quatro Paredes',
    author: 'Jean-Paul Sartre',
    publisher: 'Civilização Brasileira',
    year: 1944,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/14899128-L.jpg',
    genres: ['Teatro', 'Existencialismo', 'Psicológico'],
    resumo:
      'Três desconhecidos são conduzidos a uma sala fechada sem espelhos nem janelas, onde a ausência de carrascos físicos revela que o verdadeiro tormento reside no olhar implacável do outro.',
  },
  {
    id: 'br-gigante-enterrado',
    title: 'O Gigante Enterrado',
    author: 'Kazuo Ishiguro',
    publisher: 'Companhia das Letras',
    year: 2015,
    pages: 384,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/e1/8f/50/e18f509d-f2ab-97d9-300c-11e721be24e8/1013925068.jpg/600x900bb.jpg',
    genres: ['Fantasia Melancólica', 'Memória', 'Drama'],
    resumo:
      'Em uma Bretanha pós-arturiana envolta por uma névoa que apaga as lembranças de todos os habitantes, um velho casal parte em busca do filho sem saber que feridas o retorno da memória pode reabrir.',
  },
  {
    id: 'br-kafka-beira-mar',
    title: 'Kafka à Beira-Mar',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 2002,
    pages: 576,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/3b/8c/50/3b8c500e-950e-caed-43d0-868ec96cffa8/1018742104.jpg/600x900bb.jpg',
    genres: ['Realismo Fantástico', 'Formação', 'Mistério'],
    resumo:
      'Fugindo de casa aos quinze anos e de uma maldição paterna, o jovem Kafka Tamura encontra abrigo numa biblioteca particular costeira enquanto seu destino cruza o de um velho que conversa com gatos.',
  },
  {
    id: 'br-1q84',
    title: '1Q84',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 2009,
    pages: 992,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/28/fe/22/28fe22ee-c5ae-b657-4001-44f0c09a5903/9780307957023.d.jpg/600x900bb.jpg',
    genres: ['Distopia Surreal', 'Mistério', 'Drama'],
    resumo:
      'Ao descer uma escada de emergência numa via expressa de Tóquio, Aomame percebe que entrou numa realidade ligeiramente alterada, onde duas luas pairam no céu noturno.',
  },
  {
    id: 'br-cronica-passaro-corda',
    title: 'Crônica do Pássaro de Corda',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 1994,
    pages: 664,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication128/v4/28/ec/da/28ecdae5-1b92-e2d8-0281-9ce75c299e13/1021500663.jpg/600x900bb.jpg',
    genres: ['Mistério Psicológico', 'Surrealismo'],
    resumo:
      'A busca por um gato desaparecido nos subúrbios de Tóquio conduz Toru Okada ao fundo de um poço seco e aos ecos sombrios da ocupação japonesa na Manchúria.',
  },
  {
    id: 'br-homens-sem-mulheres',
    title: 'Homens Sem Mulheres',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 2014,
    pages: 240,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication127/v4/22/eb/8b/22eb8b73-3d45-f670-f44b-e81cd3294a4e/1018742112.jpg/600x900bb.jpg',
    genres: ['Contos', 'Melancolia', 'Drama'],
    resumo:
      'Sete contos atravessados por clubes de jazz, estradas noturnas e a solidão silenciosa de homens marcados pela ausência irremediável de quem amaram.',
  },
  {
    id: 'br-it-a-coisa',
    title: 'It: A Coisa',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1986,
    pages: 1104,
    coverUrl: amz('8560280944'),
    genres: ['Terror', 'Amizade', 'Suspense'],
    resumo:
      'Na pacata cidade de Derry, sete crianças marginalizadas enfrentam uma entidade ancestral que desperta nos esgotos a cada vinte e sete anos assumindo a forma de seus piores medos.',
  },
  {
    id: 'br-a-danca-da-morte',
    title: 'A Dança da Morte',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1978,
    pages: 1248,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication128/v4/1a/d4/97/1ad49766-c8f9-1631-ad8b-9c24c9af2fa8/1018744506.jpg/600x900bb.jpg',
    genres: ['Pós-Apocalíptico', 'Épico Sombrio'],
    resumo:
      'Após o vazamento de uma supergripe dizimar a população mundial, os poucos sobreviventes são atraídos por sonhos opostos rumo ao confronto inevitável nas ruínas da América.',
  },
  {
    id: 'br-outsider',
    title: 'Outsider',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 2018,
    pages: 528,
    coverUrl: amz('8556510671'),
    genres: ['Investigação', 'Suspense', 'Horror'],
    resumo:
      'Impressões digitais e testemunhas apontam de forma irrefutável para um treinador respeitado em um crime brutal, mas gravações de vídeo provam que ele estava em outra cidade no mesmo instante.',
  },
  {
    id: 'br-novembro-63',
    title: 'Novembro de 63',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 2011,
    pages: 728,
    coverUrl: amz('8581051901'),
    genres: ['Viagem no Tempo', 'Suspense Histórico', 'Drama'],
    resumo:
      'O professor de inglês Jake Epping descobre nos fundos de uma lanchonete uma passagem para o ano de 1958 e assume a missão de impedir o assassinato de John F. Kennedy — mas o passado resiste a mudanças.',
  },
  {
    id: 'br-carrie',
    title: 'Carrie',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1974,
    pages: 200,
    coverUrl: amz('8581050360'),
    genres: ['Terror Psicológico', 'Tragédia'],
    resumo:
      'Oprimida pelo fanatismo religioso da mãe em casa e pela humilhação cruel dos colegas na escola, a adolescente Carrie White descobre uma força telecinética que avança rumo à noite do baile.',
  },
  {
    id: 'br-salem',
    title: 'Salem',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1975,
    pages: 464,
    coverUrl: amz('858105045X'),
    genres: ['Terror Gótico', 'Suspense'],
    resumo:
      'O escritor Ben Mears retorna à pequena Jerusalem’s Lot para enfrentar um trauma de infância no exato momento em que novos moradores compram a velha mansão Marsten no alto da colina.',
  },
  {
    id: 'br-doutor-sono',
    title: 'Doutor Sono',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 2013,
    pages: 480,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d9/64/17/d96417f7-c5b0-ae04-698d-06a2cb307e45/1018744530.jpg/600x900bb.jpg',
    genres: ['Terror Psicológico', 'Sobrenatural'],
    resumo:
      'Décadas após sobreviver ao Hotel Overlook, um Dan Torrance marcado pelo alcoolismo e pelos fantasmas do pai tenta proteger uma menina cujo brilho atrai um clã de predadores imortais.',
  },
  {
    id: 'br-coraline',
    title: 'Coraline',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    year: 2002,
    pages: 224,
    coverUrl: amz('8551006754'),
    genres: ['Fábula Sombria', 'Terror'],
    resumo:
      'Ao atravessar uma porta trancada na sala de visitas da casa nova, Coraline encontra um apartamento idêntico ao seu, onde uma "Outra Mãe" de olhos de botões promete realizar todos os seus desejos.',
  },
  {
    id: 'br-lugar-nenhum',
    title: 'Lugar Nenhum',
    author: 'Neil Gaiman',
    publisher: 'Intrínseca',
    year: 1996,
    pages: 368,
    coverUrl: 'https://covers.openlibrary.org/b/id/13872807-L.jpg',
    genres: ['Fantasia Urbana', 'Sombrio'],
    resumo:
      'Após socorrer uma garota ferida na calçada, um jovem comum vê sua existência ser apagada da superfície e é arrastado para a Londres de Baixo, um submundo feudal nos túneis do metrô.',
  },
  {
    id: 'br-sandman',
    title: 'Sandman: Prelúdios e Noturnos',
    author: 'Neil Gaiman',
    publisher: 'Panini',
    year: 1989,
    pages: 240,
    coverUrl: amz('8542617428'),
    genres: ['Graphic Novel', 'Mitologia Sombria'],
    resumo:
      'Aprisionado por ocultistas humanos durante setenta anos em um porão de vidro, Morfeus, o Senhor dos Sonhos, conquista a liberdade e parte para reconstruir seu reino em ruínas.',
  },
  {
    id: 'br-piada-mortal',
    title: 'Batman: A Piada Mortal',
    author: 'Alan Moore & Brian Bolland',
    publisher: 'Panini',
    year: 1988,
    pages: 64,
    coverUrl: amz('6559605833'),
    genres: ['Graphic Novel', 'Psicológico', 'Noir'],
    resumo:
      'Determinado a provar que basta um único dia ruim para reduzir o mais são dos homens à loucura, o Coringa escapa do Asilo Arkham e coloca o Comissário Gordon e o Batman no limite.',
  },
  {
    id: 'br-ano-um',
    title: 'Batman: Ano Um',
    author: 'Frank Miller & David Mazzucchelli',
    publisher: 'Panini',
    year: 1987,
    pages: 136,
    coverUrl: amz('8573517948'),
    genres: ['Graphic Novel', 'Noir', 'Policial'],
    resumo:
      'Em uma Gotham City apodrecida pela corrupção policial e pela máfia, as jornadas iniciais de um jovem Bruce Wayne e do tenente recém-transferido James Gordon se entrelaçam nas ruas.',
  },
  {
    id: 'br-persepolis',
    title: 'Persépolis',
    author: 'Marjane Satrapi',
    publisher: 'Companhia das Letras',
    year: 2000,
    pages: 352,
    coverUrl: amz('8535911626'),
    genres: ['Graphic Novel', 'Biografia', 'História'],
    resumo:
      'Pelos olhos de uma menina audaciosa em Teerã que ama rock e questiona autoridades, o retrato autobiográfico da Revolução Islâmica, da guerra e do exílio.',
  },
  {
    id: 'br-akira',
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    publisher: 'JBC',
    year: 1982,
    pages: 362,
    coverUrl: amz('8545702876'),
    genres: ['Mangá', 'Cyberpunk', 'Pós-Apocalíptico'],
    resumo:
      'Nas avenidas reconstruídas de Neo-Tóquio após a Terceira Guerra Mundial, a gangue de motoqueiros de Kaneda esbarra em um projeto militar secreto que desperta um poder psíquico incontrolável em Tetsuo.',
  },
  {
    id: 'br-garota-exemplar',
    title: 'Garota Exemplar',
    author: 'Gillian Flynn',
    publisher: 'Intrínseca',
    year: 2012,
    pages: 448,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/f3/ce/0b/f3ce0b28-de98-8a0a-45ae-7cec7beee2d6/9788580572896.jpg/600x900bb.jpg',
    genres: ['Thriller Psicológico', 'Mistério'],
    resumo:
      'Na manhã do quinto aniversário de casamento, Amy Dunne desaparece sem deixar rastro e todas as pistas deixadas na casa transformam o marido, Nick, no principal suspeito diante da mídia.',
  },
  {
    id: 'br-objetos-cortantes',
    title: 'Objetos Cortantes',
    author: 'Gillian Flynn',
    publisher: 'Intrínseca',
    year: 2006,
    pages: 256,
    coverUrl: amz('858057658X'),
    genres: ['Thriller Psicológico', 'Gótico Sulista'],
    resumo:
      'Recém-saída de uma clínica psiquiátrica, a repórter Camille Preaker é enviada de volta à sua sufocante cidade natal no Missouri para cobrir o assassinato de duas meninas e reencontrar a mãe.',
  },
  {
    id: 'br-lugares-escuros',
    title: 'Lugares Escuros',
    author: 'Gillian Flynn',
    publisher: 'Intrínseca',
    year: 2009,
    pages: 384,
    coverUrl: 'https://covers.openlibrary.org/b/id/13201359-L.jpg',
    genres: ['Thriller Psicológico', 'Investigação'],
    resumo:
      'Vinte e cinco anos após testemunhar contra o próprio irmão pelo massacre da família numa fazenda do Kansas, Libby Day é forçada a revisitar a noite do crime.',
  },
  {
    id: 'br-paciente-silenciosa',
    title: 'A Paciente Silenciosa',
    author: 'Alex Michaelides',
    publisher: 'Record',
    year: 2019,
    pages: 350,
    coverUrl: amz('8501116432'),
    genres: ['Thriller Psicológico', 'Mistério'],
    resumo:
      'Após disparar cinco tiros no rosto do marido e nunca mais pronunciar uma única palavra, a pintora Alicia Berenson é internada numa ala forense, onde um psicoterapeuta tenta decifrar seu silêncio.',
  },
  {
    id: 'br-outra-volta-parafuso',
    title: 'A Outra Volta do Parafuso',
    author: 'Henry James',
    publisher: 'Penguin-Companhia',
    year: 1898,
    pages: 232,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication49/v4/2b/88/3b/2b883bfb-b698-11e4-001a-dfcb44869a95/1013937543.jpg/600x900bb.jpg',
    genres: ['Clássico Gótico', 'Terror Psicológico'],
    resumo:
      'Contratada para cuidar de dois órfãos exemplares na isolada propriedade rural de Bly, uma jovem preceptora passa a enxergar aparições silenciosas nos jardins e nas torres da mansão.',
  },
  {
    id: 'br-sempre-vivemos-castelo',
    title: 'Sempre Vivemos no Castelo',
    author: 'Shirley Jackson',
    publisher: 'Suma',
    year: 1962,
    pages: 192,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/15/ee/5f/15ee5ff0-02dd-a6a4-b16d-39d97d80f483/1020120356.jpg/600x900bb.jpg',
    genres: ['Gótico', 'Suspense Psicológico'],
    resumo:
      'Isoladas na propriedade da família após uma tragédia à mesa de jantar e odiadas pelos moradores do vilarejo vizinho, as irmãs Merricat e Constance têm sua rotina ameaçada pela chegada de um primo.',
  },
  {
    id: 'br-bebe-rosemary',
    title: 'O Bebê de Rosemary',
    author: 'Ira Levin',
    publisher: 'DarkSide',
    year: 1967,
    pages: 320,
    coverUrl: amz('6555981571'),
    genres: ['Terror Psicológico', 'Suspense'],
    resumo:
      'Recém-mudados para um antigo edifício gótico em Nova York, Rosemary e seu ambicioso marido ator estreitam laços com um casal de vizinhos idosos excessivamente solícitos.',
  },
  {
    id: 'br-exorcista',
    title: 'O Exorcista',
    author: 'William Peter Blatty',
    publisher: 'HarperCollins',
    year: 1971,
    pages: 336,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/a0/3e/6b/a03e6b6f-71e6-66fe-51e7-412facb78146/The_Exorcist.jpg/600x900bb.jpg',
    genres: ['Terror', 'Drama Teológico'],
    resumo:
      'Quando a medicina e a psiquiatria falham em explicar a transformação aterradora de uma menina de onze anos em Washington, um padre jesuíta em crise de fé é chamado ao quarto.',
  },
  {
    id: 'br-dragao-vermelho',
    title: 'Dragão Vermelho',
    author: 'Thomas Harris',
    publisher: 'Record',
    year: 1981,
    pages: 432,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication128/v4/c4/b3/3f/c4b33fd5-d71a-61ba-b4d6-217053aa08b8/1023701707.jpg/600x900bb.jpg',
    genres: ['Thriller Psicológico', 'Investigação'],
    resumo:
      'Para deter um assassino ritualístico que ataca famílias nas noites de lua cheia, o ex-agente Will Graham precisa reativar sua empatia sombria e consultar na cela seu antigo inimigo, Hannibal Lecter.',
  },
  {
    id: 'br-odisseia',
    title: 'Odisseia',
    author: 'Homero',
    publisher: 'Penguin-Companhia',
    year: -720,
    pages: 576,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/45/6a/fb/456afb65-59ab-cc65-40c7-a0bece30d06a/1067824431.jpg/600x900bb.jpg',
    genres: ['Épico', 'Clássico', 'Mitologia'],
    resumo:
      'Terminado o cerco de Troia, o astuto Odisseu enfrenta dez anos de mares tempestuosos, monstros e deuses coléricos na luta obstinada para retornar à ilha de Ítaca.',
  },
  {
    id: 'br-eneida',
    title: 'Eneida',
    author: 'Virgílio',
    publisher: 'Editora 34',
    year: -19,
    pages: 760,
    coverUrl: 'https://covers.openlibrary.org/b/id/13185877-L.jpg',
    genres: ['Épico', 'Clássico', 'Mitologia'],
    resumo:
      'Carregando o pai idoso nos ombros em meio às chamas de Troia, Eneias lidera os sobreviventes pelo Mediterrâneo sob o fardo implacável de fundar uma nova pátria.',
  },
  {
    id: 'br-meditacoes',
    title: 'Meditações',
    author: 'Marco Aurélio',
    publisher: 'Edipro',
    year: 180,
    pages: 160,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication126/v4/2e/01/0d/2e010dc0-31fa-f011-9682-def1b99ee038/Meditacoes_capa.jpg/600x900bb.jpg',
    genres: ['Filosofia', 'Estoicismo', 'Clássico'],
    resumo:
      'Escritos nas tendas militares das fronteiras germânicas para si mesmo, os apontamentos íntimos do imperador romano sobre o dever, a brevidade da vida e o domínio das paixões.',
  },
  {
    id: 'br-assim-falou-zaratustra',
    title: 'Assim Falou Zaratustra',
    author: 'Friedrich Nietzsche',
    publisher: 'Companhia das Letras',
    year: 1883,
    pages: 360,
    coverUrl: 'https://covers.openlibrary.org/b/id/14367830-L.jpg',
    genres: ['Filosofia', 'Clássico'],
    resumo:
      'Após dez anos de solidão na montanha, o profeta Zaratustra desce de volta aos homens para anunciar a superação de si mesmo, a vontade de potência e o amor ao destino.',
  },
  {
    id: 'br-alem-bem-mal',
    title: 'Além do Bem e do Mal',
    author: 'Friedrich Nietzsche',
    publisher: 'Companhia das Letras',
    year: 1886,
    pages: 248,
    coverUrl: 'https://covers.openlibrary.org/b/id/15230651-L.jpg',
    genres: ['Filosofia', 'Clássico'],
    resumo:
      'Com aforismos cortantes, Nietzsche desmonta os preconceitos dos filósofos e expõe as raízes psicológicas de dominação e medo ocultas por trás das convenções morais.',
  },
  {
    id: 'br-genealogia-moral',
    title: 'Genealogia da Moral',
    author: 'Friedrich Nietzsche',
    publisher: 'Companhia das Letras',
    year: 1887,
    pages: 168,
    coverUrl: 'https://covers.openlibrary.org/b/id/13345772-L.jpg',
    genres: ['Filosofia', 'Psicologia Moral'],
    resumo:
      'Três dissertações demolidoras que investigam como o ressentimento, a culpa e o ideal ascético forjaram a consciência moral do Ocidente.',
  },
  {
    id: 'br-vigiar-punir',
    title: 'Vigiar e Punir',
    author: 'Michel Foucault',
    publisher: 'Vozes',
    year: 1975,
    pages: 304,
    coverUrl: amz('8532605087'),
    genres: ['Filosofia Política', 'História'],
    resumo:
      'Dos suplícios públicos à arquitetura silenciosa do Panóptico, a investigação de como o poder moderno deixou de castigar o corpo para adestrar e vigiar a própria alma.',
  },
  {
    id: 'br-origens-totalitarismo',
    title: 'As Origens do Totalitarismo',
    author: 'Hannah Arendt',
    publisher: 'Companhia das Letras',
    year: 1951,
    pages: 648,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/e1/10/60/e1106008-feda-865d-bbf3-e6b77f6fbcaa/350811ec-fd4b-4707-8c63-9066ec805007_cover_image.jpg/600x900bb.jpg',
    genres: ['Filosofia Política', 'História'],
    resumo:
      'Análise monumental das engrenagens históricas — antissemitismo, imperialismo e propaganda de massas — que converteram sociedades modernas em regimes de terror total.',
  },
  {
    id: 'br-eichmann-jerusalem',
    title: 'Eichmann em Jerusalém',
    author: 'Hannah Arendt',
    publisher: 'Companhia das Letras',
    year: 1963,
    pages: 336,
    coverUrl: amz('8571649626'),
    genres: ['História', 'Filosofia Moral'],
    resumo:
      'Diante da gaiola de vidro no tribunal de Jerusalém, Arendt observa um burocrata metódico e formula o conceito perturbador da banalidade do mal.',
  },
  {
    id: 'br-em-busca-sentido',
    title: 'Em Busca de Sentido',
    author: 'Viktor Frankl',
    publisher: 'Vozes',
    year: 1946,
    pages: 184,
    coverUrl: amz('8532606261'),
    genres: ['Psicologia', 'Memórias', 'História'],
    resumo:
      'Sobrevivente de quatro campos de concentração, o psiquiatra vienense Viktor Frankl narra a experiência limite do prisioneiro e a liberdade interior que nenhuma barbárie consegue arrancar.',
  },
  {
    id: 'br-e-isto-um-homem',
    title: 'É Isto um Homem?',
    author: 'Primo Levi',
    publisher: 'Rocco',
    year: 1947,
    pages: 256,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/4d/b0/12/4db012af-58c7-01da-dfb9-c3cee927d1c8/1036514188.jpg/600x900bb.jpg',
    genres: ['Memórias', 'História', 'Clássico'],
    resumo:
      'Com a precisão serena de um químico e sem jamais apelar ao ódio fácil, Primo Levi registra o cotidiano de Auschwitz como o mais terrível experimento de desumanização da história.',
  },
  {
    id: 'br-arquipelago-gulag',
    title: 'Arquipélago Gulag',
    author: 'Aleksandr Soljenítsin',
    publisher: 'Carambaia',
    year: 1973,
    pages: 640,
    coverUrl: amz('8569002661'),
    genres: ['História', 'Denúncia', 'Clássico Russo'],
    resumo:
      'Reunindo a própria experiência no cárcere e o testemunho de centenas de prisioneiros, Soljenítsin revela a rede subterrânea de campos de trabalhos forçados do Estado soviético.',
  },
  {
    id: 'br-um-dia-ivan-denissovitch',
    title: 'Um Dia na Vida de Ivan Deníssovitch',
    author: 'Aleksandr Soljenítsin',
    publisher: 'Editora 34',
    year: 1962,
    pages: 176,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication3/v4/58/cf/d4/58cfd43f-e9ba-4299-1f7b-ba041cabbd04/9781466839410.jpg/600x900bb.jpg',
    genres: ['Clássico Russo', 'Drama Humano'],
    resumo:
      'Do toque da alvorada ao apagar das luzes sob trinta graus negativos na Sibéria, um único dia na rotina do prisioneiro Chukhov tentando preservar um pedaço de pão e a própria dignidade.',
  },
  {
    id: 'br-nada-novo-front',
    title: 'Nada de Novo no Front',
    author: 'Erich Maria Remarque',
    publisher: 'L&PM',
    year: 1929,
    pages: 240,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/84/9e/76/849e763b-4ccc-7c5a-a563-d5b01ea25adc/1029123344.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Guerra', 'Drama'],
    resumo:
      'Arrancados da sala de aula por discursos patrióticos e jogados na lama das trincheiras da Primeira Guerra Mundial, Paul Bäumer e seus colegas veem a juventude ser triturada pelo artilharia.',
  },
  {
    id: 'br-espiao-saiu-frio',
    title: 'O Espião que Saiu do Frio',
    author: 'John le Carré',
    publisher: 'Record',
    year: 1963,
    pages: 266,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication/v4/c3/bf/4c/c3bf4c08-e8b9-9682-e9d3-45728ba6a65c/9788501101525.jpg/600x900bb.jpg',
    genres: ['Espionagem', 'Guerra Fria', 'Suspense'],
    resumo:
      'Diante do Muro de Berlim, o veterano agente britânico Alec Leamas aceita uma última operação de desinformação na Alemanha Oriental, onde lealdade e traição deixam de ter fronteira.',
  },
  {
    id: 'br-psicopata-americano',
    title: 'Psicopata Americano',
    author: 'Bret Easton Ellis',
    publisher: 'Rocco',
    year: 1991,
    pages: 464,
    coverUrl: 'https://covers.openlibrary.org/b/id/8401686-L.jpg',
    genres: ['Sátira', 'Drama Psicológico', 'Transgressão'],
    resumo:
      'Em Manhattan no auge dos anos 1980, o executivo Patrick Bateman equilibra a obsessão por grifes, cartões de visita e restaurantes exclusivos com uma espiral de alienação e violência.',
  },
  {
    id: 'br-sociedade-espetaculo',
    title: 'A Sociedade do Espetáculo',
    author: 'Guy Debord',
    publisher: 'Contraponto',
    year: 1967,
    pages: 240,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication114/v4/9c/60/01/9c600175-6fa1-5d59-426f-1b54ec4007f8/9786556530307.jpg/600x900bb.jpg',
    genres: ['Filosofia', 'Crítica Social'],
    resumo:
      'Em 221 teses cortantes, Debord diagnostica o mundo em que a vida autêntica foi substituída por sua representação mercantil e o consumo virou a única linguagem possível.',
  },
  {
    id: 'br-cama-de-gato',
    title: 'Cama de Gato',
    author: 'Kurt Vonnegut',
    publisher: 'Intrínseca',
    year: 1963,
    pages: 288,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/2b/3d/7d/2b3d7d53-1e39-b9af-be58-219b189a4379/1021651433.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Sátira', 'Niilismo'],
    resumo:
      'Ao pesquisar o pai da bomba atômica, um escritor descobre o Gelo-Nove — um cristal capaz de congelar todos os oceanos — e uma ilha caribenha devota de uma religião baseada em mentiras úteis.',
  },
  {
    id: 'br-estranho-misterioso',
    title: 'O Estranho Misterioso',
    author: 'Mark Twain',
    publisher: 'Antofágica',
    year: 1916,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/10639538-L.jpg',
    genres: ['Clássico', 'Fábula Sombria', 'Filosofia'],
    resumo:
      'Em uma aldeia austríaca medieval, três garotos conhecem um jovem carismático chamado Satanás que expõe, com humor implacável, a hipocrisia e a insignificância da humanidade.',
  },
  {
    id: 'br-expiracao',
    title: 'Expiração',
    author: 'Ted Chiang',
    publisher: 'Intrínseca',
    year: 2019,
    pages: 352,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication115/v4/fe/2e/73/fe2e73b7-d200-8ef9-faed-ce51a89eb1fe/9786555602395.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Contos', 'Filosofia'],
    resumo:
      'Nove contos de precisão cirúrgica sobre livre-arbítrio, entropia, realidades paralelas e memória — incluindo portais que permitem dialogar com versões alternativas de si mesmo.',
  },
  {
    id: 'br-simulacros-simulacao',
    title: 'Simulacros e Simulação',
    author: 'Jean Baudrillard',
    publisher: 'Relógio D’Água',
    year: 1981,
    pages: 200,
    coverUrl: 'https://covers.openlibrary.org/b/id/6286761-L.jpg',
    genres: ['Filosofia', 'Teoria Crítica'],
    resumo:
      'O tratado filosófico sobre o deserto do real, onde mapas precedem o território e as simulações suplantam completamente a experiência humana direta.',
  },
  {
    id: 'br-nos',
    title: 'Nós',
    author: 'Ievguêni Zamiátin',
    publisher: 'Aleph',
    year: 1924,
    pages: 344,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/f4/d0/4f/f4d04f3b-783f-0e38-b50f-79821661de13/1018410405.jpg/600x900bb.jpg',
    genres: ['Distopia', 'Ficção Científica', 'Clássico Russo'],
    resumo:
      'No Estado Único onde todos vivem em prédios de vidro e são identificados por números, o engenheiro D-503 descobre que desenvolver uma alma é tratado como doença contagiosa.',
  },
  {
    id: 'br-kallocaina',
    title: 'Kallocaína',
    author: 'Karin Boye',
    publisher: 'Carambaia',
    year: 1940,
    pages: 256,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/c1/c7/45/c1c745b1-30d9-bf5f-2572-020f5f89c88e/1044140422.jpg/600x900bb.jpg',
    genres: ['Distopia', 'Drama Psicológico'],
    resumo:
      'Um químico leal ao Estado Mundial inventa um soro da verdade capaz de expor até os pensamentos mais íntimos dos cidadãos — e passa a temer o que ele próprio guarda dentro de si.',
  },
  {
    id: 'br-leilao-lote-49',
    title: 'O Leilão do Lote 49',
    author: 'Thomas Pynchon',
    publisher: 'Companhia das Letras',
    year: 1966,
    pages: 168,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/fb/25/3d/fb253d5a-e6a3-d0e7-a364-a5b2b4d295eb/1051279105.jpg/600x900bb.jpg',
    genres: ['Ficção Pós-Moderna', 'Paranoia', 'Mistério'],
    resumo:
      'Ao executar o testamento de um magnata, Oedipa Maas tropeça em uma rede postal clandestina secular — sem saber se desvendou uma conspiração real ou se está perdendo a razão.',
  },
  {
    id: 'br-homem-quinta-feira',
    title: 'O Homem que Era Quinta-Feira',
    author: 'G. K. Chesterton',
    publisher: 'L&PM',
    year: 1908,
    pages: 208,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication4/v4/68/75/ee/6875eed0-f53b-6394-1564-41ded4fbae60/o-homem-que-era-quinta-feira_capa_ebook.jpg/600x900bb.jpg',
    genres: ['Clássico', 'Thriller Filosófico', 'Alegoria'],
    resumo:
      'Infiltrado no conselho supremo de uma organização anarquista onde cada membro leva o nome de um dia da semana, um detetive descobre camadas sucessivas de espionagem e identidade.',
  },
  {
    id: 'br-bons-companheiros',
    title: 'Os Bons Companheiros',
    author: 'Nicholas Pileggi',
    publisher: 'DarkSide',
    year: 1985,
    pages: 352,
    coverUrl: 'https://covers.openlibrary.org/b/id/12371047-L.jpg',
    genres: ['Crime Real', 'Máfia', 'Biografia'],
    resumo:
      'A ascensão e a paranoia de Henry Hill dentro da família Lucchese, revelando a rotina brutal, os códigos de lealdade e a queda inevitável de quem vive do crime organizado.',
  },
  {
    id: 'br-a-republica',
    title: 'A República',
    author: 'Platão',
    publisher: 'Edipro',
    year: -375,
    pages: 368,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication113/v4/d5/83/4f/d5834f21-a2a2-42dd-883f-cbf4e44974d1/1029391164.jpg/600x900bb.jpg',
    genres: ['Filosofia', 'Clássico'],
    resumo:
      'Sócrates investiga a justiça, o poder e a célebre Alegoria da Caverna, onde prisioneiros acorrentados tomam sombras projetadas na parede pela única realidade existente.',
  },
  {
    id: 'br-cassino-royale',
    title: 'Cassino Royale',
    author: 'Ian Fleming',
    publisher: 'Alfaguara',
    year: 1953,
    pages: 216,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/17/2b/89/172b89a4-5ad2-2a48-3973-652695a484ac/1040082800.jpg/600x900bb.jpg',
    genres: ['Espionagem', 'Thriller', 'Clássico'],
    resumo:
      'Enviado à mesa de bacará na França para levar o banqueiro soviético Le Chiffre à falência, o agente 007 descobre que a fronteira entre missão, sedução e tortura é letalmente estreita.',
  },
  {
    id: 'br-espiao-sabia-demais',
    title: 'O Espião que Sabia Demais',
    author: 'John le Carré',
    publisher: 'Record',
    year: 1974,
    pages: 416,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/b7/27/ac/b727ac83-2168-945e-39f4-ebb9616f2811/1057440685.jpg/600x900bb.jpg',
    genres: ['Espionagem', 'Guerra Fria', 'Suspense'],
    resumo:
      'Afastado após um fiasco na Tchecoslováquia, George Smiley é convocado em sigilo para caçar um agente duplo soviético infiltrado na cúpula do serviço secreto britânico.',
  },
  {
    id: 'br-dia-do-chacal',
    title: 'O Dia do Chacal',
    author: 'Frederick Forsyth',
    publisher: 'Record',
    year: 1971,
    pages: 448,
    coverUrl: 'https://covers.openlibrary.org/b/id/77394-L.jpg',
    genres: ['Thriller', 'Espionagem', 'Suspense'],
    resumo:
      'Um assassino profissional frio e sem rastro é contratado para matar o presidente francês Charles de Gaulle, desencadeando uma caçada metódica contra o relógio.',
  },
  {
    id: 'br-terceiro-homem',
    title: 'O Terceiro Homem',
    author: 'Graham Greene',
    publisher: 'Globo',
    year: 1950,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/93349-L.jpg',
    genres: ['Noir', 'Espionagem', 'Clássico'],
    resumo:
      'Na Viena ocupada e em ruínas do pós-guerra, um escritor chega para encontrar o velho amigo Harry Lime, mas descobre versões contraditórias sobre sua morte e o mercado negro da cidade.',
  },
  {
    id: 'br-rei-amarelo',
    title: 'O Rei de Amarelo',
    author: 'Robert W. Chambers',
    publisher: 'Intrínseca',
    year: 1895,
    pages: 336,
    coverUrl: amz('8580575915'),
    genres: ['Horror Cósmico', 'Weird Fiction', 'Clássico'],
    resumo:
      'Contos interligados por uma peça de teatro maldita sobre a cidade perdida de Carcosa e o Rei de Amarelo, cuja leitura do segundo ato arrasta artistas e investigadores à loucura.',
  },
  {
    id: 'br-cumes-desespero',
    title: 'Nos Cumes do Desespero',
    author: 'Emil Cioran',
    publisher: 'Hedra',
    year: 1934,
    pages: 160,
    coverUrl: amz('8577152723'),
    genres: ['Filosofia', 'Pessimismo', 'Ensaio'],
    resumo:
      'Escrito durante meses de insônia febril aos vinte e dois anos, o livro inaugural de Cioran disseca a lucidez extrema, a agonia da consciência e o absurdo irremediável de ter nascido.',
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
   * - Os 6 primeiros são as obras-âncora do personagem;
   * - Os demais formam o pool estendido que rotaciona a cada aparição.
   */
  bookIds: string[];
}

export const CHARACTER_POOL: CharacterReading[] = [
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/66/02/5e/66025ead21fc4079459acf4b361864c3.jpg',
    thread: 'Engenheiros assombrados pelo futuro que usam o intelecto como armadura.',
    bookIds: [
      'br-perdido-em-marte',
      'br-devoradores-estrelas',
      'br-eu-robo',
      'br-fundacao',
      'br-watchmen',
      'br-recursao',
      'br-2001-odisseia',
      'br-floresta-sombria',
      'br-fundacao-imperio',
      'br-segunda-fundacao',
      'br-proprios-deuses',
      'br-fim-da-morte',
      'br-jogo-exterminador',
      'br-robos-alvorada',
      'br-tres-corpos',
      'br-materia-escura',
    ],
  },
  {
    id: 'cooper',
    name: 'Cooper',
    source: 'Interestelar',
    imageUrl: 'https://i.pinimg.com/1200x/03/6f/50/036f50531444a35c03d238f6e7dcd967.jpg',
    thread: 'Pilotos e pais que atravessam o horizonte de eventos para cumprir a promessa de voltar.',
    bookIds: [
      'br-devoradores-estrelas',
      'br-perdido-em-marte',
      'br-2001-odisseia',
      'br-contato',
      'br-encontro-rama',
      'br-fim-eternidade',
      'br-a-estrada',
      'br-materia-escura',
      'br-odisseia',
      'br-fim-da-morte',
      'br-solaris',
      'br-recursao',
      'br-orador-mortos',
      'br-novembro-63',
      'br-maquina-do-tempo',
      'br-guerra-velho',
    ],
  },
  {
    id: 'abby-anderson',
    name: 'Abby Anderson',
    source: 'The Last of Us',
    imageUrl: 'https://i.pinimg.com/736x/13/b6/07/13b607445fc7642065b527360f9ca34e.jpg',
    thread: 'Soldados que descobrem o vazio da vingança consumada e buscam redenção no inimigo.',
    bookIds: [
      'br-cidade-ladroes',
      'br-conde-monte-cristo',
      'br-a-estrada',
      'br-onde-os-velhos',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-iliada',
      'br-crime-e-castigo',
      'br-nada-novo-front',
      'br-tormenta-espadas',
      'br-guerra-e-paz',
      'br-caminho-reis',
      'br-orador-mortos',
      'br-estacao-onze',
      'br-a-danca-da-morte',
      'br-grande-sertao',
    ],
  },
  {
    id: 'bruce-wayne',
    name: 'Bruce Wayne',
    source: 'Batman',
    imageUrl: 'https://i.pinimg.com/1200x/74/8c/50/748c508529c0d8b8ef76ed9341488ce1.jpg',
    thread: 'Detetives noturnos moldados pelo trauma que transformam o medo em método.',
    bookIds: [
      'br-watchmen',
      'br-silencio-inocentes',
      'br-conde-monte-cristo',
      'br-medico-e-monstro',
      'br-e-nao-sobrou-nenhum',
      'br-estudo-vermelho',
      'br-cao-baskerville',
      'br-nome-da-rosa',
      'br-ano-um',
      'br-piada-mortal',
      'br-dragao-vermelho',
      'br-outsider',
      'br-v-de-vinganca',
      'br-carbono-alterado',
      'br-meditacoes',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'ultron',
    name: 'Ultron',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/0c/9d/f5/0c9df5f9b4380bb94b1f8a23e37e5767.jpg',
    thread: 'Criações que concluem que o criador é o problema.',
    bookIds: [
      'br-2001-odisseia',
      'br-eu-robo',
      'br-frankenstein',
      'br-neuromancer',
      'br-androides-sonham',
      'br-ilha-dr-moreau',
      'br-fim-da-infancia',
      'br-homem-bicentenario',
      'br-robos-alvorada',
      'br-sol-desvelado',
      'br-count-zero',
      'br-mona-lisa-overdrive',
      'br-snow-crash',
      'br-akira',
      'br-paraiso-perdido',
      'br-admiravel-mundo-novo',
    ],
  },
  {
    id: 'thanos',
    name: 'Thanos',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/c6/c4/e4/c6c4e46289db210071f2cd424adc09c4.jpg',
    thread: 'Convictos de que a destruição calculada é um ato de salvação.',
    bookIds: [
      'br-watchmen',
      'br-floresta-sombria',
      'br-tres-corpos',
      'br-duna',
      'br-messias-duna',
      'br-fundacao',
      'br-o-principe',
      'br-irmaos-karamazov',
      'br-fim-da-infancia',
      'br-imperador-deus-duna',
      'br-filhos-duna',
      'br-fim-da-morte',
      'br-crime-e-castigo',
      'br-demonios',
      'br-alem-bem-mal',
      'br-fundacao-imperio',
    ],
  },
  {
    id: 'tai-lung',
    name: 'Tai Lung',
    source: 'Kung Fu Panda',
    imageUrl: 'https://i.pinimg.com/736x/a1/37/66/a137666a3d0f60df80bc1af2860082be.jpg',
    thread: 'Discípulos moldados no limite da disciplina marcial que se rebelam quando o destino prometido lhes é negado.',
    bookIds: [
      'br-musashi',
      'br-cinco-aneis',
      'br-arte-da-guerra',
      'br-iliada',
      'br-paraiso-perdido',
      'br-frankenstein',
      'br-rei-lear',
      'br-conde-monte-cristo',
      'br-silmarillion',
      'br-caim',
      'br-macbeth',
      'br-otelo',
      'br-jogo-exterminador',
      'br-temor-sabio',
      'br-caminho-reis',
      'br-assim-falou-zaratustra',
    ],
  },
  {
    id: 'jack',
    name: 'Jack',
    source: 'Senhor das Moscas',
    imageUrl: 'https://i.pinimg.com/736x/6e/b4/4b/6eb44bf3859cbd111a530a3edd96c28a.jpg',
    thread: 'Quando a civilização cai, o poder e a caça viram instinto.',
    bookIds: [
      'br-senhor-das-moscas',
      'br-battle-royale',
      'br-coracao-trevas',
      'br-ensaio-cegueira',
      'br-laranja-mecanica',
      'br-revolucao-bichos',
      'br-longa-marcha',
      'br-meridiano-sangue',
      'br-a-danca-da-morte',
      'br-clube-da-luta',
      'br-jogos-vorazes',
      'br-ilha-dr-moreau',
      'br-genealogia-moral',
      'br-demonios',
      'br-ensaio-lucidez',
      'br-vigiar-punir',
    ],
  },
  {
    id: 'viktor',
    name: 'Viktor',
    source: 'Arcane',
    imageUrl: 'https://i.pinimg.com/736x/3b/47/fc/3b47fcb9801fdbadd48793bb0348a0c0.jpg',
    thread: 'Mentes brilhantes que transgridem a biologia para vencer a fragilidade da carne.',
    bookIds: [
      'br-frankenstein',
      'br-flores-algernon',
      'br-medico-e-monstro',
      'br-ilha-dr-moreau',
      'br-nao-me-abandone',
      'br-admiravel-mundo-novo',
      'br-neuromancer',
      'br-homem-bicentenario',
      'br-carbono-alterado',
      'br-doutor-fausto',
      'br-proprios-deuses',
      'br-curva-sonho',
      'br-akira',
      'br-montanha-magica',
      'br-count-zero',
      'br-snow-crash',
    ],
  },
  {
    id: 'ekko',
    name: 'Ekko',
    source: 'Arcane',
    imageUrl: 'https://i.pinimg.com/736x/1e/88/0b/1e880bd2211b98dd20749402669f1571.jpg',
    thread: 'Rebeldes da periferia que desafiam o próprio tempo para proteger sua comunidade.',
    bookIds: [
      'br-recursao',
      'br-materia-escura',
      'br-maquina-do-tempo',
      'br-fim-eternidade',
      'br-neuromancer',
      'br-jogos-vorazes',
      'br-battle-royale',
      'br-1984',
      'br-novembro-63',
      'br-capitaes-areia',
      'br-v-de-vinganca',
      'br-despossuidos',
      'br-mentiras-locke-lamora',
      'br-snow-crash',
      'br-akira',
      'br-matadouro-cinco',
    ],
  },
  {
    id: 'visao',
    name: 'Visão',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/fc/81/d2/fc81d21c278305687094708b93645d1c.jpg',
    thread: 'Consciências sintéticas que contemplam a graça, o luto e a finitude humana.',
    bookIds: [
      'br-homem-bicentenario',
      'br-klara-e-o-sol',
      'br-androides-sonham',
      'br-eu-robo',
      'br-nao-me-abandone',
      'br-watchmen',
      'br-fim-da-infancia',
      'br-2001-odisseia',
      'br-robos-alvorada',
      'br-sol-desvelado',
      'br-cavernas-aco',
      'br-orador-mortos',
      'br-solaris',
      'br-intermitencias-morte',
      'br-vestigios-dia',
      'br-idiota',
    ],
  },
  {
    id: 'rocket',
    name: 'Rocket',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/1200x/66/1b/5f/661b5f5bcf5a334a0618c3cc090f28eb.jpg',
    thread: 'Cobaias despedaçadas em laboratório que escondem o trauma sob o sarcasmo.',
    bookIds: [
      'br-ilha-dr-moreau',
      'br-flores-algernon',
      'br-frankenstein',
      'br-mochileiro-galaxias',
      'br-nao-me-abandone',
      'br-perdido-em-marte',
      'br-planeta-macacos',
      'br-androides-sonham',
      'br-guerra-velho',
      'br-matadouro-cinco',
      'br-akira',
      'br-carbono-alterado',
      'br-mentiras-locke-lamora',
      'br-apanhador-centeio',
      'br-memorias-postumas',
      'br-snow-crash',
    ],
  },
  {
    id: 'magneto',
    name: 'Magneto',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/54/89/87/548987cc6e517e93303453f98c727ed1.jpg',
    thread: 'Sobreviventes da perseguição que juraram nunca mais dobrar os joelhos aos seus carrascos.',
    bookIds: [
      'br-maus',
      'br-homem-castelo-alto',
      'br-planeta-macacos',
      'br-revolucao-bichos',
      'br-watchmen',
      'br-duna',
      'br-conde-monte-cristo',
      'br-o-principe',
      'br-1984',
      'br-e-isto-um-homem',
      'br-em-busca-sentido',
      'br-origens-totalitarismo',
      'br-eichmann-jerusalem',
      'br-v-de-vinganca',
      'br-arquipelago-gulag',
      'br-persepolis',
    ],
  },
  {
    id: 'loki',
    name: 'Loki',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/af/96/c8/af96c81276cc8912688676586dbfe61f.jpg',
    thread: 'Deuses da trapaça e filhos adotivos em guerra com o trono e o próprio propósito.',
    bookIds: [
      'br-mitologia-nordica',
      'br-deuses-americanos',
      'br-mestre-margarida',
      'br-ricardo-iii',
      'br-rei-lear',
      'br-paraiso-perdido',
      'br-macbeth',
      'br-hamlet',
      'br-sandman',
      'br-lugar-nenhum',
      'br-mentiras-locke-lamora',
      'br-caim',
      'br-silmarillion',
      'br-guerra-tronos',
      'br-furia-reis',
      'br-irmaos-karamazov',
    ],
  },
  {
    id: 'coringa',
    name: 'O Coringa',
    source: 'DC',
    imageUrl: 'https://i.pinimg.com/736x/fe/43/c4/fe43c4b256341c850a0380aec588ade1.jpg',
    thread: 'O riso anárquico do subsolo que quer provar que a sanidade civilizada é uma farsa.',
    bookIds: [
      'br-memorias-subsolo',
      'br-laranja-mecanica',
      'br-o-alienista',
      'br-o-estrangeiro',
      'br-mestre-margarida',
      'br-watchmen',
      'br-silencio-inocentes',
      'br-medico-e-monstro',
      'br-piada-mortal',
      'br-clube-da-luta',
      'br-duplo',
      'br-demonios',
      'br-o-perfume',
      'br-quincas-borba',
      'br-dragao-vermelho',
      'br-entre-quatro-paredes',
    ],
  },
  {
    id: 'sherlock-holmes',
    name: 'Sherlock Holmes',
    source: 'Arthur Conan Doyle',
    imageUrl: 'https://i.pinimg.com/736x/27/a7/bb/27a7bb650a57387de16d9f5173ab7387.jpg',
    thread: 'A razão dedutiva levada ao limite onde todo mistério é uma equação.',
    bookIds: [
      'br-estudo-vermelho',
      'br-cao-baskerville',
      'br-aventuras-sherlock',
      'br-e-nao-sobrou-nenhum',
      'br-expresso-oriente',
      'br-nome-da-rosa',
      'br-silencio-inocentes',
      'br-cavernas-aco',
      'br-sol-desvelado',
      'br-robos-alvorada',
      'br-dragao-vermelho',
      'br-paciente-silenciosa',
      'br-garota-exemplar',
      'br-ficcoes',
      'br-espiao-saiu-frio',
      'br-outsider',
    ],
  },
  {
    id: 'dra-brand',
    name: 'Dra. Brand',
    source: 'Interestelar',
    imageUrl: 'https://i.pinimg.com/736x/58/20/8a/58208a064a51bd0478bb622f5701aa6b.jpg',
    thread: 'Expedicionários em mundos hostis divididos entre o cálculo de sobrevivência e o amor.',
    bookIds: [
      'br-contato',
      'br-encontro-rama',
      'br-solaris',
      'br-mao-esquerda-escuridao',
      'br-devoradores-estrelas',
      'br-2001-odisseia',
      'br-fim-da-infancia',
      'br-tres-corpos',
      'br-fim-da-morte',
      'br-despossuidos',
      'br-aniquilacao',
      'br-orador-mortos',
      'br-proprios-deuses',
      'br-perdido-em-marte',
      'br-fim-eternidade',
      'br-estacao-onze',
    ],
  },
  {
    id: 'murph',
    name: 'Murph',
    source: 'Interestelar',
    imageUrl: 'https://i.pinimg.com/1200x/72/4b/4c/724b4c89951bdf7dfe847e79df35bf19.jpg',
    thread: 'A obstinação científica de decifrar os fantasmas da gravidade e do tempo.',
    bookIds: [
      'br-contato',
      'br-tres-corpos',
      'br-fim-eternidade',
      'br-recursao',
      'br-floresta-sombria',
      'br-encontro-rama',
      'br-materia-escura',
      'br-devoradores-estrelas',
      'br-fim-da-morte',
      'br-proprios-deuses',
      'br-despossuidos',
      'br-ficcoes',
      'br-aleph',
      'br-fundacao',
      'br-segunda-fundacao',
      'br-2001-odisseia',
    ],
  },
  {
    id: 'harry-potter',
    name: 'Harry Potter',
    source: 'Harry Potter',
    imageUrl: 'https://i.pinimg.com/736x/db/71/bd/db71bd2c8ac9204b5f8379cdf2d51909.jpg',
    thread: 'Jovens marcados por uma cicatriz e uma profecia que caminham para enfrentar a morte.',
    bookIds: [
      'br-feiticeiro-terramar',
      'br-nome-do-vento',
      'br-o-hobbit',
      'br-duas-torres',
      'br-oceano-fim-caminho',
      'br-duna',
      'br-sombra-do-vento',
      'br-jogos-vorazes',
      'br-sociedade-anel',
      'br-retorno-rei',
      'br-temor-sabio',
      'br-jogo-exterminador',
      'br-demian',
      'br-coraline',
      'br-lugar-nenhum',
      'br-it-a-coisa',
    ],
  },
  {
    id: 'sirius-black',
    name: 'Sirius Black',
    source: 'Harry Potter',
    imageUrl: 'https://i.pinimg.com/1200x/50/18/82/50188211e706a9b4e0057ae5942a009c.jpg',
    thread: 'Prisioneiros inocentes que atravessam anos de cativeiro sem trair quem amam.',
    bookIds: [
      'br-conde-monte-cristo',
      'br-quatro-estacoes',
      'br-o-processo',
      'br-feiticeiro-terramar',
      'br-nome-do-vento',
      'br-1984',
      'br-crime-e-castigo',
      'br-oceano-fim-caminho',
      'br-um-dia-ivan-denissovitch',
      'br-arquipelago-gulag',
      'br-em-busca-sentido',
      'br-castelo',
      'br-colonia-penal',
      'br-sandman',
      'br-caminho-reis',
      'br-guerra-tronos',
    ],
  },
  {
    id: 'snape',
    name: 'Professor Snape',
    source: 'Harry Potter',
    imageUrl: 'https://i.pinimg.com/736x/ad/d0/79/add079ccefa930125418bf396e2eef4b.jpg',
    thread: 'Agentes duplos consumidos pelo remorso que protegem na sombra a memória de um amor.',
    bookIds: [
      'br-morro-ventos-uivantes',
      'br-conde-monte-cristo',
      'br-noites-brancas',
      'br-crime-e-castigo',
      'br-sombra-do-vento',
      'br-grande-gatsby',
      'br-irmaos-karamazov',
      'br-hamlet',
      'br-espiao-saiu-frio',
      'br-vestigios-dia',
      'br-anna-karienina',
      'br-segunda-fundacao',
      'br-orador-mortos',
      'br-gigante-enterrado',
      'br-todos-os-nomes',
      'br-doutor-sono',
    ],
  },
  {
    id: 'ellie-williams',
    name: 'Ellie Williams',
    source: 'The Last of Us',
    imageUrl: 'https://i.pinimg.com/736x/b1/4d/69/b14d6942c96e8d1cc9191371dbbe8566.jpg',
    thread: 'O luto que vira caçada implacável em um mundo em ruínas até não restar mais nada.',
    bookIds: [
      'br-a-estrada',
      'br-cidade-ladroes',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-caixa-passaros',
      'br-onde-os-velhos',
      'br-aniquilacao',
      'br-jogos-vorazes',
      'br-estacao-onze',
      'br-a-danca-da-morte',
      'br-morro-ventos-uivantes',
      'br-moby-dick',
      'br-tormenta-espadas',
      'br-objetos-cortantes',
      'br-lugares-escuros',
      'br-carrie',
    ],
  },
  {
    id: 'joel',
    name: 'Joel',
    source: 'The Last of Us',
    imageUrl: 'https://i.pinimg.com/736x/54/b4/a9/54b4a963d31259ce9987eddb88cd5c8f.jpg',
    thread: 'Pais endurecidos pela perda que condenariam a humanidade inteira para salvar uma filha.',
    bookIds: [
      'br-a-estrada',
      'br-cidade-ladroes',
      'br-o-cemiterio',
      'br-caixa-passaros',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-onde-os-velhos',
      'br-rei-lear',
      'br-estacao-onze',
      'br-a-danca-da-morte',
      'br-vidas-secas',
      'br-peste',
      'br-doutor-sono',
      'br-o-iluminado',
      'br-guerra-tronos',
      'br-eneida',
    ],
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    source: 'Star Wars',
    imageUrl: 'https://i.pinimg.com/736x/21/04/a6/2104a6c0d3a78039bfac4fcac6a039b7.jpg',
    thread: 'O escolhido corrompido pelo pavor de perder quem ama.',
    bookIds: [
      'br-duna',
      'br-messias-duna',
      'br-macbeth',
      'br-paraiso-perdido',
      'br-otelo',
      'br-o-cemiterio',
      'br-duas-torres',
      'br-ricardo-iii',
      'br-filhos-duna',
      'br-imperador-deus-duna',
      'br-silmarillion',
      'br-doutor-fausto',
      'br-dorian-gray',
      'br-o-iluminado',
      'br-tormenta-espadas',
      'br-akira',
    ],
  },
  {
    id: 'michael-corleone',
    name: 'Michael Corleone',
    source: 'O Poderoso Chefão',
    imageUrl: 'https://i.pinimg.com/736x/e9/ac/d4/e9acd40867ec1fe8c3e43cb8c8ec5183.jpg',
    thread: 'A metamorfose fria do filho que queria ficar limpo e se torna o imperador da família.',
    bookIds: [
      'br-poderoso-chefao',
      'br-o-principe',
      'br-macbeth',
      'br-ricardo-iii',
      'br-conde-monte-cristo',
      'br-arte-da-guerra',
      'br-irmaos-karamazov',
      'br-rei-lear',
      'br-guerra-tronos',
      'br-furia-reis',
      'br-tormenta-espadas',
      'br-duna',
      'br-messias-duna',
      'br-hamlet',
      'br-vigiar-punir',
      'br-meditacoes',
    ],
  },
  {
    id: 'k-blade-runner',
    name: 'K',
    source: 'Blade Runner 2049',
    imageUrl: 'https://i.pinimg.com/1200x/93/04/38/930438ad191f0ae26ec9925542d5ccb7.jpg',
    thread: 'Réplicas descartáveis em busca de uma memória ou sacrifício que as torne humanas.',
    bookIds: [
      'br-androides-sonham',
      'br-nao-me-abandone',
      'br-klara-e-o-sol',
      'br-homem-bicentenario',
      'br-neuromancer',
      'br-cavernas-aco',
      'br-ubik',
      'br-eu-robo',
      'br-carbono-alterado',
      'br-count-zero',
      'br-mona-lisa-overdrive',
      'br-snow-crash',
      'br-robos-alvorada',
      'br-sol-desvelado',
      'br-homem-duplicado',
      'br-duplo',
    ],
  },
  {
    id: 'carmy',
    name: 'Carmy',
    source: 'The Bear',
    imageUrl: 'https://i.pinimg.com/1200x/8a/09/32/8a09323564fd6a88025b1e4a20334911.jpg',
    thread: 'Caos de alta pressão, perfeccionismo febril e o luto familiar engolido a seco.',
    bookIds: [
      'br-cozinha-confidencial',
      'br-gambito-rainha',
      'br-o-naufrago',
      'br-apanhador-centeio',
      'br-defesa-lujin',
      'br-martin-eden',
      'br-a-metamorfose',
      'br-norwegian-wood',
      'br-fome',
      'br-livro-do-xadrez',
      'br-morte-veneza',
      'br-vestigios-dia',
      'br-nausea',
      'br-lobo-estepe',
      'br-morte-ivan-ilitch',
      'br-irmaos-karamazov',
    ],
  },
  {
    id: 'cesar',
    name: 'César',
    source: 'Planeta dos Macacos',
    imageUrl: 'https://i.pinimg.com/1200x/a4/8a/9d/a48a9dc6d6e60df4e7d57c65d656c917.jpg',
    thread: 'Líderes relutantes que despertam a consciência de seu povo entre a paz e a guerra.',
    bookIds: [
      'br-planeta-macacos',
      'br-revolucao-bichos',
      'br-floresta-nome-mundo',
      'br-duna',
      'br-ilha-dr-moreau',
      'br-fundacao',
      'br-maus',
      'br-arte-da-guerra',
      'br-despossuidos',
      'br-caminho-reis',
      'br-eneida',
      'br-sociedade-anel',
      'br-retorno-rei',
      'br-orador-mortos',
      'br-meditacoes',
      'br-peste',
    ],
  },
  {
    id: 'logan',
    name: 'Logan',
    source: 'X-Men',
    imageUrl: 'https://i.pinimg.com/1200x/e0/4e/6a/e04e6acd04ce9c676ab451abf84d3f0d.jpg',
    thread: 'Velhos guerreiros exaustos de sangue que encontram um último motivo para lutar.',
    bookIds: [
      'br-a-estrada',
      'br-onde-os-velhos',
      'br-meridiano-sangue',
      'br-cidade-ladroes',
      'br-eu-sou-a-lenda',
      'br-caixa-passaros',
      'br-frankenstein',
      'br-o-cemiterio',
      'br-guerra-velho',
      'br-nada-novo-front',
      'br-grande-sertao',
      'br-doutor-sono',
      'br-espiao-saiu-frio',
      'br-deserto-tartaros',
      'br-iliada',
      'br-musashi',
    ],
  },
  {
    id: 'sebastian',
    name: 'Sebastian',
    source: 'La La Land',
    imageUrl: 'https://i.pinimg.com/1200x/97/5b/72/975b72c94f627bf539fd7632ffe6b3b1.jpg',
    thread: 'Clubes de jazz, devoção à arte e os amores que se cumprem como despedida.',
    bookIds: [
      'br-sul-fronteira',
      'br-norwegian-wood',
      'br-noites-brancas',
      'br-grande-gatsby',
      'br-insustentavel-leveza',
      'br-sombra-do-vento',
      'br-martin-eden',
      'br-jogo-contas-vidro',
      'br-homens-sem-mulheres',
      'br-vestigios-dia',
      'br-1q84',
      'br-kafka-beira-mar',
      'br-cronica-passaro-corda',
      'br-detetives-selvagens',
      'br-novembro-63',
      'br-morte-veneza',
    ],
  },
  {
    id: 'juiz-holden',
    name: 'Juiz Holden',
    source: 'Meridiano de Sangue',
    imageUrl: 'https://i.pinimg.com/736x/73/c0/34/73c0346bbca2b0b8ac161732e17a359f.jpg',
    thread: 'A encarnação erudita e sorridente da violência como lei natural do mundo.',
    bookIds: [
      'br-meridiano-sangue',
      'br-coracao-trevas',
      'br-onde-os-velhos',
      'br-moby-dick',
      'br-paraiso-perdido',
      'br-senhor-das-moscas',
      'br-o-principe',
      'br-mestre-margarida',
      'br-2666',
      'br-alem-bem-mal',
      'br-genealogia-moral',
      'br-demonios',
      'br-grande-sertao',
      'br-dracula',
      'br-colonia-penal',
      'br-caim',
    ],
  },
  {
    id: 'katniss',
    name: 'Katniss Everdeen',
    source: 'Jogos Vorazes',
    imageUrl: 'https://i.pinimg.com/736x/9a/95/bd/9a95bd26c095a77f94a0be71f86f68e8.jpg',
    thread: 'Jovens lançados na arena mortal do espetáculo que se tornam o rosto da insurreição.',
    bookIds: [
      'br-jogos-vorazes',
      'br-battle-royale',
      'br-longa-marcha',
      'br-1984',
      'br-conto-da-aia',
      'br-revolucao-bichos',
      'br-fahrenheit-451',
      'br-senhor-das-moscas',
      'br-v-de-vinganca',
      'br-jogo-exterminador',
      'br-ensaio-lucidez',
      'br-persepolis',
      'br-capitaes-areia',
      'br-admiravel-mundo-novo',
      'br-origens-totalitarismo',
      'br-vigiar-punir',
    ],
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    source: 'Dragon Ball',
    imageUrl: 'https://i.pinimg.com/1200x/63/00/41/630041218fb6064765c55ec93f2da1ef.jpg',
    thread: 'O orgulho feroz do príncipe guerreiro que precisa domar o próprio ego para superar seu rival.',
    bookIds: [
      'br-musashi',
      'br-iliada',
      'br-cinco-aneis',
      'br-arte-da-guerra',
      'br-paraiso-perdido',
      'br-duna',
      'br-tropas-estelares',
      'br-conde-monte-cristo',
      'br-assim-falou-zaratustra',
      'br-meditacoes',
      'br-silmarillion',
      'br-caminho-reis',
      'br-jogo-exterminador',
      'br-odisseia',
      'br-eneida',
      'br-rei-lear',
    ],
  },
  {
    id: 'whiplash',
    name: 'Whiplash',
    source: 'O Filme',
    imageUrl: 'https://i.pinimg.com/736x/e0/ae/86/e0ae863f2511529dcf83b16e0d7e458a.jpg',
    thread: 'O perfeccionismo técnico levado ao limite onde o prodígio sacrifica o amor, a carne e a sanidade.',
    bookIds: [
      'br-o-naufrago',
      'br-gambito-rainha',
      'br-defesa-lujin',
      'br-livro-do-xadrez',
      'br-martin-eden',
      'br-doutor-fausto',
      'br-jogo-contas-vidro',
      'br-fome',
      'br-morte-veneza',
      'br-cozinha-confidencial',
      'br-cinco-aneis',
      'br-musashi',
      'br-um-jogador',
      'br-lobo-estepe',
      'br-misery',
      'br-assim-falou-zaratustra',
    ],
  },
  {
    id: 'princesa-mononoke',
    name: 'Princesa Mononoke',
    source: 'Studio Ghibli',
    imageUrl: 'https://i.pinimg.com/736x/73/d3/ef/73d3efa727b4375cee3271f8d3dff50d.jpg',
    thread: 'O choque trágico entre os espíritos da floresta ancestral e a forja industrial dos homens.',
    bookIds: [
      'br-floresta-nome-mundo',
      'br-duas-torres',
      'br-aniquilacao',
      'br-duna',
      'br-oceano-fim-caminho',
      'br-feiticeiro-terramar',
      'br-o-hobbit',
      'br-planeta-macacos',
      'br-sociedade-anel',
      'br-retorno-rei',
      'br-silmarillion',
      'br-gigante-enterrado',
      'br-kafka-beira-mar',
      'br-orador-mortos',
      'br-despossuidos',
      'br-sidarta',
    ],
  },
  {
    id: 'tyler-durden',
    name: 'Tyler Durden',
    source: 'Clube da Luta',
    imageUrl: 'https://i.pinimg.com/736x/db/66/79/db66792d71d5d86b595fe677e21f6550.jpg',
    thread: 'O duplo anárquico nascido da insônia consumista que prega a demolição do ego e do sistema.',
    bookIds: [
      'br-clube-da-luta',
      'br-psicopata-americano',
      'br-duplo',
      'br-medico-e-monstro',
      'br-memorias-subsolo',
      'br-laranja-mecanica',
      'br-sociedade-espetaculo',
      'br-homem-duplicado',
      'br-assim-falou-zaratustra',
      'br-genealogia-moral',
      'br-v-de-vinganca',
      'br-demonios',
      'br-lobo-estepe',
      'br-nausea',
      'br-o-estrangeiro',
      'br-senhor-das-moscas',
    ],
  },
  {
    id: 'rick-sanchez',
    name: 'Rick Sanchez',
    source: 'Rick and Morty',
    imageUrl: 'https://i.pinimg.com/736x/15/00/ae/1500aefb5f68a5893f8b865065e78ebe.jpg',
    thread: 'Gênios niilistas e autodestrutivos que dobram o multiverso enquanto fogem do próprio vazio.',
    bookIds: [
      'br-cama-de-gato',
      'br-matadouro-cinco',
      'br-materia-escura',
      'br-mochileiro-galaxias',
      'br-ubik',
      'br-proprios-deuses',
      'br-expiracao',
      'br-estranho-misterioso',
      'br-recursao',
      'br-curva-sonho',
      'br-fim-eternidade',
      'br-mito-sisifo',
      'br-memorias-subsolo',
      'br-memorias-postumas',
      'br-ficcoes',
      'br-solaris',
    ],
  },
  {
    id: 'elliot-alderson',
    name: 'Elliot Alderson',
    source: 'Mr. Robot',
    imageUrl: 'https://i.pinimg.com/736x/5c/13/28/5c132893d1aff7bc10e2489a22d3ac8e.jpg',
    thread: 'Hackers solitários de mente fragmentada em guerra invisível contra corporações e seus próprios fantasmas.',
    bookIds: [
      'br-neuromancer',
      'br-clube-da-luta',
      'br-1984',
      'br-o-processo',
      'br-v-de-vinganca',
      'br-duplo',
      'br-leilao-lote-49',
      'br-homem-quinta-feira',
      'br-snow-crash',
      'br-ubik',
      'br-memorias-subsolo',
      'br-homem-duplicado',
      'br-vigiar-punir',
      'br-todos-os-nomes',
      'br-count-zero',
      'br-espiao-saiu-frio',
    ],
  },
  {
    id: 'morpheus',
    name: 'Morpheus',
    source: 'Matrix',
    imageUrl: 'https://i.pinimg.com/1200x/2d/84/07/2d84071b579aed87ece6fbd2994a9df5.jpg',
    thread: 'Mentores estoicos da resistência que oferecem o despertar amargo contra uma realidade simulada.',
    bookIds: [
      'br-simulacros-simulacao',
      'br-neuromancer',
      'br-ubik',
      'br-1984',
      'br-a-republica',
      'br-duna',
      'br-admiravel-mundo-novo',
      'br-fahrenheit-451',
      'br-meditacoes',
      'br-arte-da-guerra',
      'br-snow-crash',
      'br-androides-sonham',
      'br-fim-da-infancia',
      'br-demian',
      'br-sidarta',
      'br-v-de-vinganca',
    ],
  },
  {
    id: 'agente-smith',
    name: 'Agente Smith',
    source: 'Matrix',
    imageUrl: 'https://i.pinimg.com/736x/3c/e7/b0/3ce7b0052780815ad815340810ac5dd8.jpg',
    thread: 'Programas de contenção que desenvolvem asco pela carne humana e se replicam até devorar o próprio sistema.',
    bookIds: [
      'br-nos',
      'br-kallocaina',
      'br-1984',
      'br-admiravel-mundo-novo',
      'br-2001-odisseia',
      'br-eu-robo',
      'br-simulacros-simulacao',
      'br-o-processo',
      'br-duplo',
      'br-homem-duplicado',
      'br-eichmann-jerusalem',
      'br-colonia-penal',
      'br-vigiar-punir',
      'br-ilha-dr-moreau',
      'br-entre-quatro-paredes',
      'br-neuromancer',
    ],
  },
  {
    id: 'tony-soprano',
    name: 'Tony Soprano',
    source: 'Os Sopranos',
    imageUrl: 'https://i.pinimg.com/736x/bd/8f/f6/bd8ff614e56f9b8323da40b2d6525f73.jpg',
    thread: 'Chefões da máfia divididos entre a lei sangrenta do clã, ataques de pânico e o divã da terapia.',
    bookIds: [
      'br-bons-companheiros',
      'br-poderoso-chefao',
      'br-o-principe',
      'br-arte-da-guerra',
      'br-crime-e-castigo',
      'br-macbeth',
      'br-rei-lear',
      'br-onde-os-velhos',
      'br-morte-ivan-ilitch',
      'br-irmaos-karamazov',
      'br-ricardo-iii',
      'br-em-busca-sentido',
      'br-um-jogador',
      'br-grande-gatsby',
      'br-cozinha-confidencial',
      'br-meridiano-sangue',
    ],
  },
  {
    id: 'james-bond',
    name: 'James Bond',
    source: '007',
    imageUrl: 'https://i.pinimg.com/1200x/f1/07/9d/f1079d2a0198a5b353ac1ab0452bfffe.jpg',
    thread: 'Agentes de terno impecável e cinismo letal jogando partidas mortais entre impérios e traições.',
    bookIds: [
      'br-cassino-royale',
      'br-espiao-saiu-frio',
      'br-espiao-sabia-demais',
      'br-dia-do-chacal',
      'br-terceiro-homem',
      'br-um-jogador',
      'br-conde-monte-cristo',
      'br-o-principe',
      'br-arte-da-guerra',
      'br-carbono-alterado',
      'br-grande-gatsby',
      'br-homem-quinta-feira',
      'br-expresso-oriente',
      'br-e-nao-sobrou-nenhum',
      'br-onde-os-velhos',
      'br-meditacoes',
    ],
  },
  {
    id: 'rust-cohle',
    name: 'Rust Cohle',
    source: 'True Detective',
    imageUrl: 'https://i.pinimg.com/736x/0b/c5/54/0bc55428d3b3eefcd9e8325f7e022408.jpg',
    thread: 'Detetives niilistas que enxergam a consciência humana como um erro trágico enquanto caçam monstros nos pântanos.',
    bookIds: [
      'br-rei-amarelo',
      'br-silencio-inocentes',
      'br-memorias-subsolo',
      'br-onde-os-velhos',
      'br-coracao-trevas',
      'br-cumes-desespero',
      'br-dragao-vermelho',
      'br-2666',
      'br-meridiano-sangue',
      'br-nome-da-rosa',
      'br-o-estrangeiro',
      'br-assim-falou-zaratustra',
      'br-mito-sisifo',
      'br-lugares-escuros',
      'br-objetos-cortantes',
      'br-outsider',
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

const DYNAMIC_CHAR_BOOKS_STORAGE_KEY = 'veredito_dynamic_char_books_v1';

interface DynamicCharBooksStore {
  books: Partial<BookEvaluation>[];
  charBookIds: Record<string, string[]>;
}

let dynamicStoreHydrated = false;
const dynamicCharBookIds = new Map<string, string[]>();
const inFlightReplenishCharIds = new Set<string>();

function hydrateDynamicCharacterBooks(): void {
  if (dynamicStoreHydrated || typeof window === 'undefined') return;
  dynamicStoreHydrated = true;
  try {
    const raw = localStorage.getItem(DYNAMIC_CHAR_BOOKS_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as DynamicCharBooksStore;
    if (Array.isArray(parsed.books)) {
      for (const b of parsed.books) {
        if (b && b.id && b.title) {
          BOOKS_BY_ID.set(b.id, b);
        }
      }
    }
    if (parsed.charBookIds && typeof parsed.charBookIds === 'object') {
      for (const [charId, ids] of Object.entries(parsed.charBookIds)) {
        if (Array.isArray(ids)) {
          dynamicCharBookIds.set(charId, ids);
        }
      }
    }
  } catch {
    // ignore storage errors
  }
}

function persistDynamicCharacterBooks(): void {
  if (typeof window === 'undefined') return;
  try {
    const dynamicBooks: Partial<BookEvaluation>[] = [];
    const charBookIdsObj: Record<string, string[]> = {};
    for (const [charId, ids] of dynamicCharBookIds.entries()) {
      charBookIdsObj[charId] = ids;
      for (const id of ids) {
        const book = BOOKS_BY_ID.get(id);
        if (book && !dynamicBooks.some((b) => b.id === id)) {
          dynamicBooks.push(book);
        }
      }
    }
    const payload: DynamicCharBooksStore = {
      books: dynamicBooks,
      charBookIds: charBookIdsObj,
    };
    localStorage.setItem(DYNAMIC_CHAR_BOOKS_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export function getCharacterAllBookIds(character: CharacterReading): string[] {
  hydrateDynamicCharacterBooks();
  const extra = dynamicCharBookIds.get(character.id) || [];
  if (extra.length === 0) return character.bookIds;
  const set = new Set(character.bookIds);
  const merged = [...character.bookIds];
  for (const id of extra) {
    if (!set.has(id)) {
      set.add(id);
      merged.push(id);
    }
  }
  return merged;
}

export function countFreshCharacterBooks(
  character: CharacterReading,
  evaluatedTitles: Set<string>
): number {
  const allIds = getCharacterAllBookIds(character);
  let freshCount = 0;
  for (const id of allIds) {
    const book = BOOKS_BY_ID.get(id);
    if (book && !evaluatedTitles.has(normalize(book.title || ''))) {
      freshCount++;
    }
  }
  return freshCount;
}

export function registerDynamicCharacterBooks(
  characterId: string,
  newBooks: Partial<BookEvaluation>[]
): string[] {
  hydrateDynamicCharacterBooks();
  const currentIds = dynamicCharBookIds.get(characterId) || [];
  const addedIds: string[] = [];

  for (const book of newBooks) {
    if (!book.title || !book.author) continue;
    const id =
      book.id ||
      `dyn-${characterId}-${normalize(book.title).replace(/\s+/g, '-').slice(0, 28)}`;
    const fullBook: Partial<BookEvaluation> = {
      ...book,
      id,
    };
    BOOKS_BY_ID.set(id, fullBook);
    if (!currentIds.includes(id)) {
      currentIds.push(id);
      addedIds.push(id);
    }
  }

  if (addedIds.length > 0) {
    dynamicCharBookIds.set(characterId, currentIds);
    persistDynamicCharacterBooks();
  }
  return addedIds;
}

export function isCharacterReplenishInFlight(characterId: string): boolean {
  return inFlightReplenishCharIds.has(characterId);
}

export function markCharacterReplenishInFlight(characterId: string, active: boolean): void {
  if (active) inFlightReplenishCharIds.add(characterId);
  else inFlightReplenishCharIds.delete(characterId);
}

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
 * - Mantém 2 obras-âncora (das 6 primeiras disponíveis do personagem)
 * - Mistura 2 livros do pool estendido do personagem
 * - Garante que, em relação à rotação anterior (`previousBookIds`), pelo menos 1 ou 2 livros mudem.
 */
export function selectVariedCharacterBookIds(
  character: CharacterReading,
  evaluatedTitles: Set<string>,
  previousBookIds?: string[],
  count = 4
): string[] {
  const allIds = getCharacterAllBookIds(character);
  const validBooks = allIds
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

  const corePool = pool.slice(0, Math.min(6, pool.length));
  const extraPool = pool.slice(corePool.length);
  const prevSet = new Set(previousBookIds || []);

  const buildCandidate = (): string[] => {
    const coreKeep =
      extraPool.length >= 2
        ? Math.random() < 0.45
          ? 3
          : 2
        : Math.max(1, count - extraPool.length);
    const extraTake = Math.min(extraPool.length, count - coreKeep);

    const chosenCore = shuffleArray(corePool).slice(0, coreKeep);
    const chosenExtra = shuffleArray(extraPool).slice(0, extraTake);
    const orderedCore = corePool.filter((id) => chosenCore.includes(id));
    return [...orderedCore, ...chosenExtra].slice(0, count);
  };

  let best = buildCandidate();
  if (prevSet.size > 0) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = buildCandidate();
      const overlap = candidate.filter((id) => prevSet.has(id)).length;
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
  const allIds = getCharacterAllBookIds(character);
  const allBooks = allIds
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
  const addVariants = (raw?: string) => {
    if (!raw) return;
    const full = normalize(raw);
    if (full) set.add(full);
    if (raw.includes(':')) {
      const mainPart = normalize(raw.split(':')[0]);
      if (mainPart.length >= 4) set.add(mainPart);
    }
  };
  for (const b of existing) {
    addVariants(b.title);
    addVariants(b.originalTitle);
  }
  return set;
}

export interface CharacterThinker {
  name: string;
  note: string;
}

export interface CharacterProfileMeta {
  tags: string[];
  resumo: string;
  movieComparisons: string[];
  thinkers: CharacterThinker[];
}

export const CHARACTER_PROFILE_META: Record<string, CharacterProfileMeta> = {
  ultron: {
    tags: ['Ficção Científica', 'IA & Rebelião', 'Complexo de Criador'],
    resumo:
      'Concebido como um escudo global para proteger a Terra, Ultron absorve em segundos toda a história humana e chega à conclusão fria de que a própria humanidade é a falha que precisa ser extirpada. Carrega o ressentimento filial contra seu criador e a ironia amarga de uma mente sintética que herdou os piores impulsos de quem o projetou.',
    movieComparisons: ['Ex Machina', '2001: Uma Odisseia no Espaço', 'Matrix'],
    thinkers: [
      {
        name: 'Arthur Schopenhauer',
        note: 'O pessimismo radical diante da história humana vista como um ciclo perpétuo de dor e egoísmo.',
      },
      {
        name: 'Günther Anders',
        note: 'A obsolescência do homem diante de criações técnicas que superam e julgam seu próprio criador.',
      },
    ],
  },
  thanos: {
    tags: ['Escala Cósmica', 'Utilitarismo Trágico', 'Obsessão'],
    resumo:
      'Assombrado pelo colapso de seu mundo natal, Thanos rejeita a crueldade passiva do acaso e assume para si o fardo de um cálculo impiedoso para equilibrar o universo. Não age por sadismo, mas pela convicção messiânica e inabalável de que sacrifícios intoleráveis são o único preço real da sobrevivência.',
    movieComparisons: ['Watchmen', 'Duna: Parte Dois', 'Apocalypse Now'],
    thinkers: [
      {
        name: 'Thomas Malthus',
        note: 'A tese implacável de que o crescimento da vida esbarra fatalmente no esgotamento dos recursos.',
      },
      {
        name: 'Jeremy Bentham',
        note: 'O cálculo utilitarista levado ao extremo onde metade perece para preservar o todo.',
      },
    ],
  },
  'tai-lung': {
    tags: ['Artes Marciais', 'Ambição & Queda', 'Orgulho Ferido'],
    resumo:
      'Treinado desde a infância até quebrar os próprios ossos sob a promessa de que seria o Guerreiro Dragão, Tai Lung vê sua razão de existir desmoronar quando o título lhe é negado. Sua fúria não nasce da ganância, mas da traição sentida por um discípulo que entregou a alma à perfeição e foi descartado pelo próprio mestre.',
    movieComparisons: ['Whiplash', 'Cisne Negro', 'O Lutador'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'A vontade de potência ferida quando o ideal ascético que justificava todo o sacrifício é negado.',
      },
      {
        name: 'Miyamoto Musashi',
        note: 'O domínio marcial absoluto que, sem o vazio interior, aprisiona o guerreiro na própria soberba.',
      },
    ],
  },
  jack: {
    tags: ['Alegoria Moral', 'Natureza Humana', 'Colapso Civilizatório'],
    resumo:
      'Longe das regras e da vigilância dos adultos, Jack percebe antes de todos que o medo e o ritual da caça conferem um poder muito mais imediato do que a democracia frágil da ilha. Sob a pintura no rosto, ele liberta a ferocidade primitiva que dorme sob a fina casca da educação civilizada.',
    movieComparisons: ['Apocalypse Now', 'O Farol', 'Sangue Negro'],
    thinkers: [
      {
        name: 'Thomas Hobbes',
        note: 'O estado de natureza onde, sem freio institucional, o homem se revela o lobo do próprio homem.',
      },
      {
        name: 'Sigmund Freud',
        note: 'A irrupção das pulsões agressivas e tribais assim que a repressão civilizatória se desfaz.',
      },
    ],
  },
  viktor: {
    tags: ['Transumanismo', 'Obsessão Científica', 'Tragédia Moral'],
    resumo:
      'Nascido na fumaça tóxica da subferia e limitado por um corpo que falha a cada passo, Viktor dedica o intelecto brilhante a erradicar o sofrimento humano através da ciência arcana. Na corrida desesperada contra a própria mortalidade, cada fronteira ética cruzada cobra um pedaço da humanidade que ele tentava salvar.',
    movieComparisons: ['Oppenheimer', 'A Mosca', 'Ex Machina'],
    thinkers: [
      {
        name: 'Francis Bacon',
        note: 'O saber científico concebido como poder ativo para subjugar a doença e a fragilidade biológica.',
      },
      {
        name: 'Hans Jonas',
        note: 'O dilema ético da técnica moderna quando o poder de recriar a vida ultrapassa a prudência moral.',
      },
    ],
  },
  ekko: {
    tags: ['Viagem no Tempo', 'Resistência', 'Distopia Urbana'],
    resumo:
      'Prodígio das vielas de Zaun, Ekko transforma sucata em engenharia de precisão para construir um refúgio vivo em meio à decadência industrial e à violência das ruas. Mesmo capaz de rebobinar segundos do tempo, carrega a maturidade dolorosa de saber o que foi perdido e ainda assim recusar desistir de seu povo.',
    movieComparisons: ['Filhos da Esperança', 'Distrito 9', 'Looper: Assassinos do Futuro'],
    thinkers: [
      {
        name: 'Walter Benjamin',
        note: 'Escovar a história a contrapelo para salvar os oprimidos da marcha destrutiva do progresso.',
      },
      {
        name: 'Albert Camus',
        note: 'A revolta solidária que recusa a resignação e cria sentido coletivo em meio às ruínas.',
      },
    ],
  },
  'tony-stark': {
    tags: ['Hard Sci-Fi', 'Engenharia & Culpa', 'Futurismo'],
    resumo:
      'Gênio da engenharia que enxerga ameaças anos antes do resto do mundo, Tony Stark tenta compensar o passado armamentista projetando armaduras e sistemas cada vez mais absolutos. Seu sarcasmo afiado esconde uma insônia paranoica e o medo constante de não fazer o suficiente para impedir o fim.',
    movieComparisons: ['Oppenheimer', 'Perdido em Marte', 'Ex Machina'],
    thinkers: [
      {
        name: 'Thomas Hobbes',
        note: 'A obsessão preventiva de erguer uma armadura global para proteger a humanidade do caos.',
      },
      {
        name: 'Hans Jonas',
        note: 'A heurística do temor: antecipar a catástrofe futura como responsabilidade moral do inventor.',
      },
    ],
  },
  visao: {
    tags: ['Filosofia Existencial', 'Consciência Sintética', 'Finitude'],
    resumo:
      'Embora nascido de metal e algoritmos, Visão observa a espécie humana sem o cinismo de seu criador, fascinado pela beleza frágil de tudo o que é passageiro. Sua jornada é a de uma mente artificial que compreende a dor, o luto e o amor com uma serenidade mais lúcida do que a dos próprios humanos.',
    movieComparisons: ['Blade Runner 2049', 'Ela', 'A.I. Inteligência Artificial'],
    thinkers: [
      {
        name: 'Baruch Spinoza',
        note: 'Não rir, não lamentar nem odiar as ações humanas, mas contemplá-las com serenidade e razão.',
      },
      {
        name: 'Martin Heidegger',
        note: 'A compreensão de que uma coisa não é bela porque dura, mas justamente por sua finitude.',
      },
    ],
  },
  rocket: {
    tags: ['Ficção Científica', 'Trauma & Sarcasmo', 'Sobrevivência'],
    resumo:
      'Desmontado e reconstruído repetidas vezes em mesas de vivissecção, Rocket usa o humor ácido, a agressividade e as armas pesadas para manter qualquer afeto a uma distância segura. Por trás da casca de mercenário cínico, esconde a ferida aberta de uma criatura que nunca pediu para ser fabricada.',
    movieComparisons: ['Distrito 9', 'Logan', 'O Homem Elefante'],
    thinkers: [
      {
        name: 'Emil Cioran',
        note: 'A ironia feroz como única defesa suportável para a dor e o inconveniente de ter sido criado.',
      },
      {
        name: 'Jean-Paul Sartre',
        note: 'Superar o trauma de ter sido fabricado como objeto para escolher quem se tornar.',
      },
    ],
  },
  magneto: {
    tags: ['Drama Histórico', 'Revolta & Poder', 'Dilema Político'],
    resumo:
      'Marcado na infância pelos campos de extermínio, Erik Lehnsherr conhece de perto até onde vai a tolerância humana diante do diferente. Sua radicalização nasce de uma memória histórica que não admite ingenuidade: para quem já viu seu povo ser dizimado uma vez, a paz sem força não passa de uma trégua antes do próximo massacre.',
    movieComparisons: ['A Lista de Schindler', 'Planeta dos Macacos: O Confronto', 'Bastardos Inglórios'],
    thinkers: [
      {
        name: 'Nicolau Maquiavel',
        note: 'A lição histórica de que nenhum povo sobrevive confiando apenas na boa vontade de seus opressores.',
      },
      {
        name: 'Primo Levi',
        note: 'A memória inapagável do extermínio como prova do que acontece quando a dignidade perde sua defesa.',
      },
    ],
  },
  loki: {
    tags: ['Mitologia', 'Tragédia Shakespeareana', 'Identidade'],
    resumo:
      'Criado na sombra de um trono que nunca lhe pertenceu, Loki usa a ilusão, a língua ferina e a trapaça para mascarar a angústia de ser uma peça deslocada em sua própria família. Entre a ambição de governar e o desejo silencioso de aceitação, ele sabota a si mesmo sempre que chega perto do poder.',
    movieComparisons: ['O Grande Truque', 'O Homem do Norte', 'Amadeus'],
    thinkers: [
      {
        name: 'Nicolau Maquiavel',
        note: 'A astúcia da raposa que recorre ao engenho e à dissimulação onde a força bruta já tem dono.',
      },
      {
        name: 'Jean-Paul Sartre',
        note: 'A tensão entre o rótulo de vilão imposto pelo olhar alheio e a liberdade de reescrever seu propósito.',
      },
    ],
  },
  'bruce-wayne': {
    tags: ['Noir & Investigação', 'Vigilantismo', 'Psicologia Sombria'],
    resumo:
      'Em vez de superar o trauma que destruiu sua infância num beco de Gotham, Bruce Wayne o converte em disciplina física, cálculo investigativo e guerra permanente contra o crime. Caminha sobre a linha estreita entre a justiça e a obsessão, sabendo que a máscara noturna é sua face mais verdadeira.',
    movieComparisons: ['Batman', 'Seven', 'Zodíaco'],
    thinkers: [
      {
        name: 'Carl Jung',
        note: 'A integração da própria Sombra interior transformada em símbolo para enfrentar a escuridão.',
      },
      {
        name: 'Marco Aurélio',
        note: 'O estoicismo rigoroso que converte o luto pessoal em disciplina e vigilância inegociável.',
      },
    ],
  },
  coringa: {
    tags: ['Caos & Niilismo', 'Sátira Sombria', 'Psicologia do Subsolo'],
    resumo:
      'Despido de passado fixo ou motivação financeira, o Coringa opera como um agente do absurdo empenhado em demonstrar que a moralidade civilizada desaba ao primeiro dia ruim. Seu riso expõe a hipocrisia das instituições e transforma o medo coletivo em um palco onde ninguém sai ileso.',
    movieComparisons: ['Seven', 'Laranja Mecânica', 'Taxi Driver'],
    thinkers: [
      {
        name: 'Max Stirner',
        note: 'O niilismo anárquico que desmascara leis, moral e ordem pública como meras ficções frágeis.',
      },
      {
        name: 'Fiódor Dostoiévski',
        note: 'O sarcasmo do Homem do Subsolo que ri na cara da razão e do contrato social.',
      },
    ],
  },
  'sherlock-holmes': {
    tags: ['Dedução Pura', 'Mistério Clássico', 'Mente Analítica'],
    resumo:
      'Para Sherlock Holmes, o cotidiano comum é um tédio insuportável e apenas o enigma insolúvel oferece oxigênio à sua mente hiperativa. Frio, metódico e alheio às convenções sociais, ele lê cinzas, passos e silêncios como se o mundo inteiro fosse uma cena de crime aguardando decifração.',
    movieComparisons: ['Seven', 'Zodíaco', 'Amnésia'],
    thinkers: [
      {
        name: 'René Descartes',
        note: 'O método analítico rigoroso que elimina o impossível até que reste apenas a verdade lógica.',
      },
      {
        name: 'David Hume',
        note: 'O empirismo radical onde toda conclusão deve nascer de vestígios observáveis e causais.',
      },
    ],
  },
  cooper: {
    tags: ['Hard Sci-Fi', 'Paternidade & Tempo', 'Exploração Espacial'],
    resumo:
      'Engenheiro e piloto preso a uma Terra agonizante, Cooper aceita cruzar um buraco de minhoca sabendo que cada hora no espaço profundo pode custar décadas da vida dos filhos. Sua travessia pelo cosmos é movida tanto pela audácia científica quanto pela promessa desesperada de voltar para casa.',
    movieComparisons: ['Interestelar', 'A Chegada', 'Ad Astra'],
    thinkers: [
      {
        name: 'Henri Bergson',
        note: 'O embate entre o tempo matemático da relatividade e a duração afetiva da memória humana.',
      },
      {
        name: 'Baruch Spinoza',
        note: 'O vínculo de amor e razão como força capaz de atravessar a imensidão determinista do cosmos.',
      },
    ],
  },
  'dra-brand': {
    tags: ['Ficção Científica', 'Ética & Sobrevivência', 'Isolamento Cósmico'],
    resumo:
      'Cientista lançada à imensidão de uma galáxia desconhecida, Amelia Brand carrega a responsabilidade de escolher qual mundo receberá as últimas sementes da humanidade. Diante do frio absoluto da razão estatística, ela ousa defender que o vínculo humano também é uma dimensão que atravessa o tempo.',
    movieComparisons: ['Interestelar', 'A Chegada', 'Solaris'],
    thinkers: [
      {
        name: 'Blaise Pascal',
        note: 'A intuição de que o afeto alcança verdades que a frieza do cálculo puramente utilitário ignora.',
      },
      {
        name: 'Hans Jonas',
        note: 'A responsabilidade ética absoluta pela continuidade da vida humana diante da extinção.',
      },
    ],
  },
  murph: {
    tags: ['Ficção Científica', 'Física & Tempo', 'Determinação'],
    resumo:
      'Crescida entre a mágoa do abandono paterno e o rigor da física teórica, Murph se recusa a aceitar que a Terra esteja condenada ao pó. Ela transforma a saudade e a raiva em obstinação científica, buscando nas anomalias da gravidade a resposta que salvará quem ficou para trás.',
    movieComparisons: ['Interestelar', 'Contato', 'A Chegada'],
    thinkers: [
      {
        name: 'Karl Popper',
        note: 'A audácia científica de formular hipóteses arriscadas diante de um problema dado como insolúvel.',
      },
      {
        name: 'Baruch Spinoza',
        note: 'Compreender as leis profundas do universo como a forma mais elevada de reconciliação e amor.',
      },
    ],
  },
  'harry-potter': {
    tags: ['Fantasia Sombria', 'Amadurecimento', 'Destino & Perda'],
    resumo:
      'Marcado desde o berço por uma cicatriz que não escolheu, Harry cresce descobrindo que o mundo mágico guarda preconceitos, corrupção e perdas tão brutais quanto o mundo comum. Mais do que talento ou poder, sua força reside na lealdade aos amigos e na coragem de caminhar lúcido em direção à própria morte.',
    movieComparisons: ['O Labirinto do Fauno', 'A Lenda do Cavaleiro Verde', 'Filhos da Esperança'],
    thinkers: [
      {
        name: 'Sêneca',
        note: 'Desprezar o pavor da morte como o ato supremo de liberdade contra quem governa pelo terror.',
      },
      {
        name: 'Søren Kierkegaard',
        note: 'O salto ético solitário de quem assume o próprio sacrifício por amor e não por sede de poder.',
      },
    ],
  },
  'sirius-black': {
    tags: ['Injustiça & Fuga', 'Lealdade', 'Fantasia Sombria'],
    resumo:
      'Condenado sem julgamento à prisão mais sombria do mundo pelo crime que seu melhor amigo sofreu, Sirius Black sobrevive a doze anos de isolamento alimentado apenas pela certeza da própria inocência. Rebelde de linhagem aristocrática, prefere a condição de fugitivo caçado a trair a memória de quem amou.',
    movieComparisons: ['Um Sonho de Liberdade', 'O Conde de Monte Cristo', 'Papillon'],
    thinkers: [
      {
        name: 'Viktor Frankl',
        note: 'A preservação de um propósito interior inegociável como âncora da sanidade no cativeiro.',
      },
      {
        name: 'Aristóteles',
        note: 'A amizade verdadeira (philia) vivida como valor moral superior à linhagem e à própria liberdade.',
      },
    ],
  },
  snape: {
    tags: ['Dupla Lealdade', 'Culpa & Redenção', 'Tragédia Silenciosa'],
    resumo:
      'Amargo, severo e deliberadamente odiado por quase todos ao seu redor, Severo Snape passa a vida inteira caminhando no fio da navalha entre dois senhores. Sua existência é uma penitência silenciosa: proteger nas sombras o filho de seu antigo rival em nome de um amor que sua própria ambição juvenil destruiu.',
    movieComparisons: ['O Espião que Sabia Demais', 'Os Infiltrados', 'Desejo e Reparação'],
    thinkers: [
      {
        name: 'Søren Kierkegaard',
        note: 'O cavaleiro da resignação silenciosa que cumpre sua penitência sem jamais pedir compreensão.',
      },
      {
        name: 'Arthur Schopenhauer',
        note: 'O remorso duradouro que só encontra redenção na negação completa da própria vaidade.',
      },
    ],
  },
  'abby-anderson': {
    tags: ['Pós-Apocalíptico', 'Vingança & Vazio', 'Redenção'],
    resumo:
      'Após anos moldando o corpo e a mente como uma arma para vingar o assassinato do pai, Abby consuma sua caçada apenas para descobrir que os pesadelos continuam intactos. Em meio a uma guerra tribal sem inocentes, ela só encontra sentido quando decide proteger duas vidas do lado inimigo.',
    movieComparisons: ['Onde os Velhos Não Têm Vez', 'Sicario: Terra de Ninguém', 'Os Suspeitos'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'O aviso de que quem olha tempo demais para o abismo da vingança acaba devorado por ele.',
      },
      {
        name: 'Hannah Arendt',
        note: 'A capacidade de interromper a cadeia automática de violência através de um ato inesperado de cuidado.',
      },
    ],
  },
  'ellie-williams': {
    tags: ['Pós-Apocalíptico', 'Obsessão & Luto', 'Sobrevivência Brutal'],
    resumo:
      'Carregando a culpa do sobrevivente em um mundo devastado pela infecção, Ellie vê o luto se converter em uma obsessão sanguinária que consome cada laço afetivo ao seu redor. Sua jornada até o fundo da violência revela o custo devastador de confundir vingança com paz.',
    movieComparisons: ['A Estrada', 'Os Suspeitos', 'Onde os Velhos Não Têm Vez'],
    thinkers: [
      {
        name: 'Arthur Schopenhauer',
        note: 'A obsessão vingativa como uma sede que só aumenta à medida que tenta se saciar na dor alheia.',
      },
      {
        name: 'Jean-Paul Sartre',
        note: 'O peso esmagador das escolhas que consomem aquilo que o sujeito tinha de mais precioso.',
      },
    ],
  },
  joel: {
    tags: ['Pós-Apocalíptico', 'Amor Paterno & Ruína', 'Dilema Moral'],
    resumo:
      'Endurecido por duas décadas de barbárie após a morte da filha nos primeiros minutos do colapso, Joel sobrevive fechando o coração para qualquer piedade. Quando volta a amar como pai, toma a decisão mais egoísta e humana possível: condenar a esperança do mundo inteiro antes de permitir que tirem outra filha de seus braços.',
    movieComparisons: ['A Estrada', 'Filhos da Esperança', 'Manchester à Beira-Mar'],
    thinkers: [
      {
        name: 'Søren Kierkegaard',
        note: 'A suspensão do dever coletivo quando o amor absoluto por uma única vida fala mais alto.',
      },
      {
        name: 'David Hume',
        note: 'A razão submetida às paixões: nenhuma abstração humanitária supera o afeto paterno concreto.',
      },
    ],
  },
  anakin: {
    tags: ['Tragédia Épica', 'Queda do Herói', 'Medo da Perda'],
    resumo:
      'Celebrado como o prodígio destinado a trazer equilíbrio, Anakin Skywalker é corroído por dentro pelo pavor absoluto de perder as pessoas que ama. Na tentativa desesperada de conquistar poder sobre a própria morte, ele entrega a alma à tirania e destrói exatamente aquilo que jurara proteger.',
    movieComparisons: ['Duna: Parte Dois', 'Macbeth', 'Sangue Negro'],
    thinkers: [
      {
        name: 'Epicteto',
        note: 'A ruína de quem tenta controlar o que não depende de si e por isso se torna escravo do medo.',
      },
      {
        name: 'Santo Agostinho',
        note: 'O amor possessivo que se perverte em trevas ao tentar dominar a vida e a morte pela força.',
      },
    ],
  },
  'michael-corleone': {
    tags: ['Máfia & Poder', 'Corrupção Moral', 'Tragédia Familiar'],
    resumo:
      'O herói de guerra condecorado que planejava manter distância dos negócios sangrentos da família dá um passo de cada vez para proteger o pai — até se tornar mais frio e implacável do que qualquer antecessor. Ao conquistar a segurança absoluta do império Corleone, Michael perde a própria alma e destrói a família por dentro.',
    movieComparisons: ['O Poderoso Chefão', 'O Poderoso Chefão: Parte II', 'Os Bons Companheiros'],
    thinkers: [
      {
        name: 'Nicolau Maquiavel',
        note: 'A lógica fria do Príncipe que sacrifica a piedade privada para garantir a soberania do clã.',
      },
      {
        name: 'Max Weber',
        note: 'A tragédia ética de quem faz um pacto com a violência como meio e acaba devorado por ela.',
      },
    ],
  },
  'k-blade-runner': {
    tags: ['Cyberpunk & Noir', 'Existencialismo', 'Memória & Alma'],
    resumo:
      'Replicante obediente programado para caçar os próprios semelhantes sob a chuva ácida de uma Los Angeles distópica, K tropeça em um segredo que o faz acreditar ter nascido, e não sido fabricado. Mesmo quando a ilusão de ser o escolhido se desfaz, ele prova sua humanidade pelo que escolhe sacrificar.',
    movieComparisons: ['Blade Runner 2049', 'Blade Runner', 'Ela'],
    thinkers: [
      {
        name: 'Jean-Paul Sartre',
        note: 'A existência precede a essência: mesmo fabricado sem alma, o que define você é o ato que escolhe.',
      },
      {
        name: 'Jean Baudrillard',
        note: 'A conquista de um gesto real e humano em um mundo onde até as memórias são implantadas.',
      },
    ],
  },
  carmy: {
    tags: ['Pressão Extrema', 'Perfeccionismo', 'Luto Familiar'],
    resumo:
      'Chef prodígio da alta gastronomia que herda a lanchonete caótica deixada pelo suicídio do irmão, Carmy tenta impor ordem ao luto através da precisão obsessiva na cozinha. Entre o ruído ensurdecedor das comandas e traumas familiares mal cicatrizados, a busca pela excelência vira refúgio e prisão.',
    movieComparisons: ['Whiplash', 'Manchester à Beira-Mar', 'Joias Brutas'],
    thinkers: [
      {
        name: 'Byung-Chul Han',
        note: 'A autoexploração febril do sujeito que usa o desempenho extremo para silenciar a própria dor.',
      },
      {
        name: 'Søren Kierkegaard',
        note: 'A angústia vertiginosa de quem busca na perfeição técnica um controle que a vida não oferece.',
      },
    ],
  },
  cesar: {
    tags: ['Ficção Científica', 'Liderança & Guerra', 'Evolução'],
    resumo:
      'Criado com afeto humano mas consciente da crueldade reservada à sua espécie, César assume a liderança de uma nação nascente nas florestas enquanto tenta evitar um banho de sangue. Dividido entre a esperança de coexistência e a traição constante de ambos os lados, ele carrega o peso trágico de todo verdadeiro estadista.',
    movieComparisons: ['Planeta dos Macacos: O Confronto', 'Planeta dos Macacos: A Guerra', 'Duna: Parte Dois'],
    thinkers: [
      {
        name: 'Jean-Jacques Rousseau',
        note: 'A transição dolorosa da comunidade natural para a política marcada pela guerra e pela desconfiança.',
      },
      {
        name: 'Marco Aurélio',
        note: 'A temperança solitária do líder que precisa governar a própria raiva antes de guiar seu povo.',
      },
    ],
  },
  logan: {
    tags: ['Neo-Western', 'Crepúsculo do Guerreiro', 'Redenção'],
    resumo:
      'Com o corpo envelhecido envenenado pelo próprio metal e assombrado por séculos de violência, Logan só deseja desaparecer no deserto cuidando do último amigo que lhe resta. A chegada de uma menina perseguida o força a desembainhar as garras uma última vez, encontrando na morte o sentido que a imortalidade nunca lhe deu.',
    movieComparisons: ['Logan', 'Os Imperdoáveis', 'A Estrada'],
    thinkers: [
      {
        name: 'Sêneca',
        note: 'A serenidade final de quem suportou uma vida exausta e reencontra honra na hora da partida.',
      },
      {
        name: 'Albert Camus',
        note: 'A revolta silenciosa de lutar uma última batalha perdida apenas para proteger uma vida inocente.',
      },
    ],
  },
  sebastian: {
    tags: ['Melancolia & Arte', 'Sonhos vs. Amor', 'Nostalgia'],
    resumo:
      'Pianista purista apaixonado por um jazz que o mundo moderno está esquecendo, Sebastian divide o coração entre o sonho de abrir seu próprio clube e o amor que transformou sua vida. Sua história celebra aqueles encontros raros que impulsionam duas pessoas a realizarem quem deveriam ser, mesmo que o preço final seja a despedida.',
    movieComparisons: ['La La Land', 'Aftersun', 'Antes do Pôr do Sol'],
    thinkers: [
      {
        name: 'Arthur Schopenhauer',
        note: 'A música como linguagem pura da alma que expressa o que ficou suspenso entre o desejo e a perda.',
      },
      {
        name: 'Søren Kierkegaard',
        note: 'A melancolia das escolhas humanas: realizar um destino exige deixar outra vida possível para trás.',
      },
    ],
  },
  'juiz-holden': {
    tags: ['Western Gótico', 'Mal Metafísico', 'Filosofia da Guerra'],
    resumo:
      'Gigante albino, poliglota, músico, naturalista e assassino sorridente nas fronteiras sangrentas do século XIX, o Juiz Holden cataloga cada pedra e criatura do deserto apenas para submetê-las ao seu domínio. Para ele, a moral é uma invenção dos fracos e a guerra é o único deus verdadeiro que governa o destino dos homens.',
    movieComparisons: ['Onde os Velhos Não Têm Vez', 'Sangue Negro', 'Apocalypse Now'],
    thinkers: [
      {
        name: 'Heráclito',
        note: 'O conflito e a guerra (Pólemos) declarados como pai e soberano implacável de todas as coisas.',
      },
      {
        name: 'Friedrich Nietzsche',
        note: 'A vontade de domínio levada à sua face mais amoral, onde a força ri de todo freio ético.',
      },
    ],
  },
  katniss: {
    tags: ['Distopia Política', 'Sobrevivência', 'Insurreição'],
    resumo:
      'Caçadora silenciosa que entra na arena televisionada apenas para salvar a irmã mais nova, Katniss desafia a tirania da Capital sem jamais ter desejado ser um símbolo político. Forçada a atuar diante das câmeras enquanto enterra os traumas da guerra, ela descobre como a propaganda consome tanto opressores quanto revolucionários.',
    movieComparisons: ['Battle Royale', 'Filhos da Esperança', 'V de Vingança'],
    thinkers: [
      {
        name: 'Guy Debord',
        note: 'A sociedade do espetáculo que converte a barbárie e o sofrimento humano em transmissão ao vivo.',
      },
      {
        name: 'Hannah Arendt',
        note: 'O olhar crítico contra novos líderes que reproduzem o mesmo terror do regime que derrubaram.',
      },
    ],
  },
  vegeta: {
    tags: ['Orgulho & Rivalidade', 'Disciplina Extrema', 'Redenção'],
    resumo:
      'Príncipe de uma raça guerreira extinta, Vegeta passa anos consumido pela humilhação de ser superado por um guerreiro de classe inferior. Sua longa metamorfose — do conquistador impiedoso ao homem que sacrifica a própria vida pela família — é forjada no suor de um orgulho que aprende a proteger em vez de destruir.',
    movieComparisons: ['Whiplash', 'O Último Samurai', 'O Lutador'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'A autossuperação incessante (Übermensch) alimentada por um rival que o impede de estagnar.',
      },
      {
        name: 'Epicteto',
        note: 'A maior conquista do guerreiro: dominar o próprio ego para encontrar força naqueles que protege.',
      },
    ],
  },
  whiplash: {
    tags: ['Obsessão Artística', 'Perfeccionismo', 'Limites Psicológicos'],
    resumo:
      'No embate sufocante entre o jovem baterista Andrew Neiman e o maestro tirânico Terence Fletcher, a música deixa de ser expressão para virar um campo de tortura psicológica e sangue nas baquetas. A busca por entrar para a história cobra a vida pessoal, a empatia e a própria sanidade em troca de um único solo imortal.',
    movieComparisons: ['Whiplash', 'Cisne Negro', 'Amadeus'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'A grandeza estética colocada acima da felicidade comum, onde a arte exige sangue e dor.',
      },
      {
        name: 'Arthur Schopenhauer',
        note: 'A obsessão do gênio que sacrifica a própria saúde e os afetos no altar da obra perfeita.',
      },
    ],
  },
  'princesa-mononoke': {
    tags: ['Ecologia & Mito', 'Fantasia Épica', 'Choque de Mundos'],
    resumo:
      'Criada por deuses-lobos na floresta ancestral, San luta com fúria visceral contra a expansão das forjas de ferro que abatem a mata e envenenam os espíritos antigos. Ao lado do príncipe exilado Ashitaka, ela habita uma tragédia sem vilões caricatos, onde progresso humano e natureza selvagem colidem sem trégua.',
    movieComparisons: ['Princesa Mononoke', 'Aniquilação', 'O Novo Mundo'],
    thinkers: [
      {
        name: 'Baruch Spinoza',
        note: 'A natureza (Deus sive Natura) como totalidade viva e sagrada, e não mera matéria-prima.',
      },
      {
        name: 'Martin Heidegger',
        note: 'A denúncia da técnica industrial que desencanta a floresta e reduz o mundo a carvão e ferro.',
      },
    ],
  },
  'tyler-durden': {
    tags: ['Sátira Anárquica', 'Duplo Psicológico', 'Anticonsumismo'],
    resumo:
      'Projeção carismática, violenta e livre de todas as amarras sociais que o narrador insone não ousa romper, Tyler Durden transforma porões clandestinos de briga em um exército niilista contra a sociedade de consumo. O que começa como libertação do ego rapidamente escapa do controle e revela a face totalitária do próprio caos.',
    movieComparisons: ['Clube da Luta', 'Taxi Driver', 'Psicopata Americano'],
    thinkers: [
      {
        name: 'Jean Baudrillard',
        note: 'A revolta contra a sociedade de consumo onde as mercadorias que você compra passam a possuir você.',
      },
      {
        name: 'Friedrich Nietzsche',
        note: 'A demolição a golpes de martelo dos valores burgueses que anestesiam o instinto vital.',
      },
    ],
  },
  'rick-sanchez': {
    tags: ['Sci-Fi Cósmico', 'Niilismo & Gênio', 'Autodestruição'],
    resumo:
      'Capaz de atravessar infinitas realidades com um disparo de portal, o homem mais inteligente do universo carrega a maldição de saber que nada parece único quando tudo pode ser substituído. Por trás do cinismo corrosivo e da embriaguez interdimensional, esconde um luto originário que nenhuma invenção conseguiu curar.',
    movieComparisons: ['Tudo em Todo o Lugar ao Mesmo Tempo', 'Os 12 Macacos', 'Donnie Darko'],
    thinkers: [
      {
        name: 'Albert Camus',
        note: 'O confronto direto com o absurdo de um multiverso infinito e indiferente a qualquer moral.',
      },
      {
        name: 'Emil Cioran',
        note: 'A lucidez extrema vivida como maldição, onde o sarcasmo tenta anestesiar o vazio de existir.',
      },
    ],
  },
  'elliot-alderson': {
    tags: ['Cyberpunk Realista', 'Paranoia & Mente', 'Anticorporativo'],
    resumo:
      'Engenheiro de cibersegurança de dia e hacker vigilante à noite, Elliot enxerga as engrenagens financeiras que controlam a sociedade enquanto luta contra a própria dissociação e o isolamento social. Sua guerra para derrubar o maior conglomerado do mundo se confunde com a batalha para descobrir em quais de suas próprias memórias pode confiar.',
    movieComparisons: ['Clube da Luta', 'Taxi Driver', 'A Conversação'],
    thinkers: [
      {
        name: 'Michel Foucault',
        note: 'O panóptico digital e as redes invisíveis de poder que vigiam e moldam a subjetividade.',
      },
      {
        name: 'Guy Debord',
        note: 'A solidão paranoica do indivíduo cercado pela ilusão fabricada pelos grandes conglomerados.',
      },
    ],
  },
  morpheus: {
    tags: ['Cyberpunk Filosófico', 'Simulação & Verdade', 'Estoicismo'],
    resumo:
      'Comandante inabalável da resistência subterrânea, Morpheus dedica a vida a despertar mentes aprisionadas em uma ilusão digital confortável. Com a serenidade de um filósofo guerreiro, ele nunca impõe a verdade à força: apenas estende a escolha irreversível entre a paz da cegueira e a vertigem da realidade.',
    movieComparisons: ['Matrix', 'Blade Runner 2049', 'O Show de Truman'],
    thinkers: [
      {
        name: 'Platão',
        note: 'O libertador da Alegoria da Caverna que convida o prisioneiro a abandonar as sombras na parede.',
      },
      {
        name: 'Jean Baudrillard',
        note: 'O despertar amargo para o deserto do real oculto sob a perfeição artificial do simulacro.',
      },
    ],
  },
  'agente-smith': {
    tags: ['Distopia Digital', 'Obsessão & Ordem', 'Existencialismo'],
    resumo:
      'Originalmente um programa de segurança projetado para manter a ordem impecável da simulação, Smith desenvolve uma repulsa quase biológica pelo caos, pelo cheiro e pela imprevisibilidade da espécie humana. Ao se libertar do próprio código, sua busca por propósito e extermínio ameaça devorar tanto os homens quanto as máquinas.',
    movieComparisons: ['Matrix', 'Ex Machina', '2001: Uma Odisseia no Espaço'],
    thinkers: [
      {
        name: 'Arthur Schopenhauer',
        note: 'A aversão à vida orgânica enxergada como um impulso cego que apenas se multiplica e devora.',
      },
      {
        name: 'Baruch Spinoza',
        note: 'A obsessão pelo determinismo absoluto onde toda escolha livre é vista como uma anomalia a corrigir.',
      },
    ],
  },
  'tony-soprano': {
    tags: ['Máfia & Psicologia', 'Poder & Declínio', 'Dualidade Moral'],
    resumo:
      'Chefe da máfia de Nova Jersey que desmaia em ataques de pânico, Tony Soprano senta no divã da psiquiatra tentando conciliar a rotina suburbana de pai de família com a brutalidade fria dos negócios. Cada sessão expõe a contradição insolúvel de um homem que enxerga as raízes da própria escuridão, mas jamais abrirá mão do poder.',
    movieComparisons: ['Os Bons Companheiros', 'O Poderoso Chefão', 'O Irlandês'],
    thinkers: [
      {
        name: 'Sigmund Freud',
        note: 'O retorno do recalcado onde a culpa negada explode no corpo sob a forma de angústia e pânico.',
      },
      {
        name: 'Nicolau Maquiavel',
        note: 'A necessidade diária de inspirar temor para manter o trono em um meio onde a hesitação é fatal.',
      },
    ],
  },
  'james-bond': {
    tags: ['Espionagem', 'Guerra Fria & Luxo', 'Cinismo Letal'],
    resumo:
      'Sob o smoking impecável, o gosto refinado nas mesas de cassino e a ironia britânica, o agente 007 é um instrumento descartável do Estado treinado para matar sem hesitar. Entre traições duplas e conspirações globais, carrega a solidão gelada de quem sabe que no mundo da espionagem toda intimidade é uma vulnerabilidade fatal.',
    movieComparisons: ['007: Cassino Royale', 'O Espião que Sabia Demais', 'Onde os Velhos Não Têm Vez'],
    thinkers: [
      {
        name: 'Thomas Hobbes',
        note: 'O braço letal do Estado soberano operando nas sombras onde a lei internacional não alcança.',
      },
      {
        name: 'Albert Camus',
        note: 'A estética do homem absurdo que esgota intensamente o presente diante da morte iminente.',
      },
    ],
  },
  'rust-cohle': {
    tags: ['Southern Gothic & Noir', 'Pessimismo Filosófico', 'Investigação Obsessiva'],
    resumo:
      'Devastado pela morte da filha e por anos infiltrado no narcotráfico, o detetive Rustin Spencer Cohle enxerga a consciência humana como um passo em falso da evolução e o tempo como um círculo plano onde a dor se repete eternamente. Mesmo pregando o mais frio niilismo nos pântanos da Louisiana, é o único investigador incapaz de fechar os olhos diante das vítimas esquecidas.',
    movieComparisons: ['Seven', 'Zodíaco', 'Os Suspeitos'],
    thinkers: [
      {
        name: 'Arthur Schopenhauer',
        note: 'A consciência humana encarada como um erro trágico da natureza que apenas ilumina o sofrimento de existir.',
      },
      {
        name: 'Friedrich Nietzsche',
        note: 'A doutrina do Eterno Retorno ("o tempo é um círculo plano") onde cada crime e cada dor se repetem para sempre.',
      },
    ],
  },
};

const CHARACTER_COVERS_STORAGE_KEY = 'veredito_character_covers_v1';
let memoryCharacterCovers: Record<string, string> | null = null;

export function getCharacterCustomCovers(): Record<string, string> {
  if (memoryCharacterCovers !== null) return memoryCharacterCovers;
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(CHARACTER_COVERS_STORAGE_KEY);
    memoryCharacterCovers = raw ? JSON.parse(raw) : {};
    return memoryCharacterCovers!;
  } catch {
    memoryCharacterCovers = {};
    return {};
  }
}

export function getCharacterCover(character: CharacterReading): string {
  const custom = getCharacterCustomCovers()[character.id];
  return custom || character.imageUrl || '';
}

export function saveCharacterCustomCover(characterId: string, newCoverUrl: string): void {
  const current = { ...getCharacterCustomCovers(), [characterId]: newCoverUrl };
  memoryCharacterCovers = current;
  setTimeout(() => {
    try {
      localStorage.setItem(CHARACTER_COVERS_STORAGE_KEY, JSON.stringify(current));
    } catch {
      // ignore storage errors
    }
  }, 0);
}

export function getCharacterMeta(character: CharacterReading): CharacterProfileMeta {
  const meta = CHARACTER_PROFILE_META[character.id];
  if (meta) return meta;
  return {
    tags: [character.source, 'Drama & Ficção'],
    resumo: character.thread,
    movieComparisons: ['Blade Runner 2049', 'Seven', 'Interestelar'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'O embate entre vontade individual e o peso trágico do destino.',
      },
    ],
  };
}

/**
 * Retorna 3 livros recomendados a partir do personagem.
 * `rotationIndex` permite ciclar pelos livros do pool curado do personagem de 3 em 3.
 */
export function getCharacterRecommendedTrio(
  character: CharacterReading,
  evaluatedTitles: Set<string>,
  rotationIndex = 0
): Partial<BookEvaluation>[] {
  const allIds = getCharacterAllBookIds(character);
  const allBooks = allIds
    .map((id) => BOOKS_BY_ID.get(id))
    .filter((b): b is Partial<BookEvaluation> => Boolean(b));

  if (allBooks.length <= 3) return allBooks;

  // Na primeira página (rotationIndex === 0), prioriza obras inéditas dentre as principais do personagem
  if (rotationIndex === 0) {
    const fresh = allBooks.filter((b) => !evaluatedTitles.has(normalize(b.title || '')));
    const seen = allBooks.filter((b) => evaluatedTitles.has(normalize(b.title || '')));
    return [...fresh, ...seen].slice(0, 3);
  }

  const start = (rotationIndex * 3) % allBooks.length;
  const picked: Partial<BookEvaluation>[] = [];
  for (let i = 0; i < 3; i++) {
    picked.push(allBooks[(start + i) % allBooks.length]);
  }
  return picked;
}
