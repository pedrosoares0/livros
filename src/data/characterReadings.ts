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
    coverUrl: amz('8573263350'),
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
      'Em uma Guerra Fria alternativa à beira do apocalipse nuclear, o assassinato do Comediante expõe vigilantes quebrados, um semideus indiferente e um plano genocida para salvar o mundo.',
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
      'br-ilha-dr-moreau',
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
    thread: 'Convictos de que a destruição calculada é um ato de salvação.',
    bookIds: [
      'br-watchmen',
      'br-crime-e-castigo',
      'br-irmaos-karamazov',
      'br-tres-corpos',
      'br-duna',
      'br-floresta-sombria',
      'br-admiravel-mundo-novo',
      'br-paraiso-perdido',
      'br-o-principe',
      'br-fim-da-infancia',
    ],
  },
  {
    id: 'tai-lung',
    name: 'Tai Lung',
    source: 'Kung Fu Panda',
    imageUrl: 'https://i.pinimg.com/736x/a1/37/66/a137666a3d0f60df80bc1af2860082be.jpg',
    thread: 'Discípulos moldados no limite da disciplina que se rebelam quando o trono prometido lhes é negado.',
    bookIds: [
      'br-arte-da-guerra',
      'br-tropas-estelares',
      'br-paraiso-perdido',
      'br-conde-monte-cristo',
      'br-rei-lear',
      'br-frankenstein',
      'br-moby-dick',
      'br-otelo',
      'br-memorias-subsolo',
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
      'br-laranja-mecanica',
      'br-ensaio-cegueira',
      'br-ricardo-iii',
      'br-revolucao-bichos',
      'br-coracao-trevas',
      'br-medico-e-monstro',
      'br-o-perfume',
      'br-1984',
      'br-onde-os-velhos',
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
      'br-a-metamorfose',
      'br-recursao',
      'br-neuromancer',
      'br-o-alienista',
      'br-2001-odisseia',
    ],
  },
  {
    id: 'ekko',
    name: 'Ekko',
    source: 'Arcane',
    imageUrl: 'https://i.pinimg.com/736x/1e/88/0b/1e880bd2211b98dd20749402669f1571.jpg',
    thread: 'Rebeldes da periferia que desafiam o próprio tempo para proteger sua comunidade.',
    bookIds: [
      'br-fim-eternidade',
      'br-maquina-do-tempo',
      'br-recursao',
      'br-neuromancer',
      'br-jogos-vorazes',
      'br-materia-escura',
      'br-fahrenheit-451',
      'br-1984',
    ],
  },
  {
    id: 'tony-stark',
    name: 'Tony Stark',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/dc/fc/a2/dcfca2bb4dc9e17587718688304d9c2b.jpg',
    thread: 'Engenheiros assombrados pelo futuro que usam o intelecto como armadura.',
    bookIds: [
      'br-perdido-em-marte',
      'br-devoradores-estrelas',
      'br-eu-robo',
      'br-fundacao',
      'br-watchmen',
      'br-recursao',
      'br-2001-odisseia',
      'br-cavernas-aco',
      'br-floresta-sombria',
    ],
  },
  {
    id: 'visao',
    name: 'Visão',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/fc/81/d2/fc81d21c278305687094708b93645d1c.jpg',
    thread: 'Consciências sintéticas que contemplam a graça, o luto e a finitude humana.',
    bookIds: [
      'br-klara-e-o-sol',
      'br-androides-sonham',
      'br-eu-robo',
      'br-watchmen',
      'br-fim-da-infancia',
      'br-2001-odisseia',
      'br-flores-algernon',
      'br-solaris',
      'br-cavernas-aco',
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
      'br-mochileiro-galaxias',
      'br-frankenstein',
      'br-revolucao-bichos',
      'br-planeta-macacos',
      'br-neuromancer',
      'br-perdido-em-marte',
      'br-androides-sonham',
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
      'br-hamlet',
      'br-dorian-gray',
      'br-otelo',
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
      'br-conde-monte-cristo',
      'br-medico-e-monstro',
      'br-e-nao-sobrou-nenhum',
      'br-estudo-vermelho',
      'br-crime-e-castigo',
      'br-cao-baskerville',
      'br-nome-da-rosa',
      'br-coracao-trevas',
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
      'br-o-perfume',
      'br-medico-e-monstro',
      'br-crime-e-castigo',
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
      'br-cavernas-aco',
      'br-gambito-rainha',
      'br-medico-e-monstro',
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
      'br-fim-eternidade',
      'br-a-estrada',
      'br-maquina-do-tempo',
      'br-materia-escura',
      'br-solaris',
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
      'br-solaris',
      'br-mao-esquerda-escuridao',
      'br-devoradores-estrelas',
      'br-aniquilacao',
      'br-fim-da-infancia',
      'br-tres-corpos',
      'br-insustentavel-leveza',
      'br-2001-odisseia',
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
      'br-fundacao',
      'br-materia-escura',
      'br-devoradores-estrelas',
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
      'br-nome-do-vento',
      'br-o-hobbit',
      'br-duas-torres',
      'br-oceano-fim-caminho',
      'br-duna',
      'br-jogos-vorazes',
      'br-hamlet',
      'br-fim-da-infancia',
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
      'br-o-processo',
      'br-apanhador-centeio',
      'br-nome-do-vento',
      'br-oceano-fim-caminho',
      'br-crime-e-castigo',
      'br-1984',
      'br-hamlet',
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
      'br-dorian-gray',
      'br-dom-casmurro',
      'br-grande-gatsby',
      'br-irmaos-karamazov',
      'br-hamlet',
    ],
  },
  {
    id: 'abby-anderson',
    name: 'Abby Anderson',
    source: 'The Last of Us',
    imageUrl: 'https://i.pinimg.com/736x/13/b6/07/13b607445fc7642065b527360f9ca34e.jpg',
    thread: 'Soldados que descobrem o vazio da vingança consumada e buscam redenção no inimigo.',
    bookIds: [
      'br-conde-monte-cristo',
      'br-onde-os-velhos',
      'br-a-estrada',
      'br-tropas-estelares',
      'br-eu-sou-a-lenda',
      'br-moby-dick',
      'br-ensaio-cegueira',
      'br-crime-e-castigo',
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
      'br-eu-sou-a-lenda',
      'br-caixa-passaros',
      'br-ensaio-cegueira',
      'br-onde-os-velhos',
      'br-aniquilacao',
      'br-jogos-vorazes',
      'br-o-cemiterio',
      'br-moby-dick',
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
      'br-caixa-passaros',
      'br-o-cemiterio',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-onde-os-velhos',
      'br-rei-lear',
      'br-crime-e-castigo',
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
      'br-paraiso-perdido',
      'br-o-iluminado',
      'br-o-cemiterio',
      'br-rei-lear',
      'br-otelo',
      'br-duas-torres',
      'br-ricardo-iii',
      'br-crime-e-castigo',
    ],
  },
  {
    id: 'michael-corleone',
    name: 'Michael Corleone',
    source: 'O Poderoso Chefão',
    imageUrl: 'https://i.pinimg.com/736x/e9/ac/d4/e9acd40867ec1fe8c3e43cb8c8ec5183.jpg',
    thread: 'A metamorfose fria do filho que queria ficar limpo e se torna o imperador da família.',
    bookIds: [
      'br-o-principe',
      'br-ricardo-iii',
      'br-rei-lear',
      'br-irmaos-karamazov',
      'br-conde-monte-cristo',
      'br-cem-anos-solidao',
      'br-arte-da-guerra',
      'br-hamlet',
      'br-crime-e-castigo',
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
      'br-klara-e-o-sol',
      'br-noites-brancas',
      'br-cavernas-aco',
      'br-ubik',
      'br-eu-robo',
      'br-norwegian-wood',
      'br-frankenstein',
      'br-neuromancer',
    ],
  },
  {
    id: 'carmy',
    name: 'Carmy',
    source: 'The Bear',
    imageUrl: 'https://i.pinimg.com/1200x/8a/09/32/8a09323564fd6a88025b1e4a20334911.jpg',
    thread: 'Perfeccionismo febril, luto familiar engolido a seco e a angústia de nunca bastar.',
    bookIds: [
      'br-o-iluminado',
      'br-gambito-rainha',
      'br-apanhador-centeio',
      'br-a-metamorfose',
      'br-um-jogador',
      'br-memorias-subsolo',
      'br-norwegian-wood',
      'br-o-processo',
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
      'br-jogos-vorazes',
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
      'br-eu-sou-a-lenda',
      'br-caixa-passaros',
      'br-frankenstein',
      'br-o-cemiterio',
      'br-ensaio-cegueira',
      'br-coracao-trevas',
    ],
  },
  {
    id: 'sebastian',
    name: 'Sebastian',
    source: 'La La Land',
    imageUrl: 'https://i.pinimg.com/1200x/97/5b/72/975b72c94f627bf539fd7632ffe6b3b1.jpg',
    thread: 'Nostalgia, devoção à arte e os amores que se cumprem como despedida.',
    bookIds: [
      'br-norwegian-wood',
      'br-noites-brancas',
      'br-grande-gatsby',
      'br-insustentavel-leveza',
      'br-dom-casmurro',
      'br-nome-do-vento',
      'br-memorias-postumas',
      'br-apanhador-centeio',
    ],
  },
  {
    id: 'juiz-holden',
    name: 'Juiz Holden',
    source: 'Meridiano de Sangue',
    imageUrl: 'https://i.pinimg.com/736x/73/c0/34/73c0346bbca2b0b8ac161732e17a359f.jpg',
    thread: 'A encarnação erudita e sorridente da violência como lei natural do mundo.',
    bookIds: [
      'br-coracao-trevas',
      'br-onde-os-velhos',
      'br-moby-dick',
      'br-paraiso-perdido',
      'br-senhor-das-moscas',
      'br-o-principe',
      'br-mestre-margarida',
      'br-nome-da-rosa',
      'br-ricardo-iii',
    ],
  },
  {
    id: 'katniss',
    name: 'Katniss Everdeen',
    source: 'Jogos Vorazes',
    imageUrl: 'https://i.pinimg.com/736x/9a/95/bd/9a95bd26c095a77f94a0be71f86f68e8.jpg',
    thread: 'Jovens lançados na arena do espetáculo que se tornam o rosto da insurreição.',
    bookIds: [
      'br-jogos-vorazes',
      'br-conto-da-aia',
      'br-1984',
      'br-revolucao-bichos',
      'br-homem-castelo-alto',
      'br-senhor-das-moscas',
      'br-admiravel-mundo-novo',
      'br-floresta-nome-mundo',
      'br-fahrenheit-451',
    ],
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    source: 'Dragon Ball',
    imageUrl: 'https://i.pinimg.com/1200x/63/00/41/630041218fb6064765c55ec93f2da1ef.jpg',
    thread: 'A fúria do príncipe guerreiro que precisa vencer a própria soberba para superar seus limites.',
    bookIds: [
      'br-arte-da-guerra',
      'br-tropas-estelares',
      'br-moby-dick',
      'br-paraiso-perdido',
      'br-conde-monte-cristo',
      'br-duna',
      'br-rei-lear',
      'br-ricardo-iii',
    ],
  },
  {
    id: 'whiplash',
    name: 'Whiplash',
    source: 'O Filme',
    imageUrl: 'https://i.pinimg.com/736x/e0/ae/86/e0ae863f2511529dcf83b16e0d7e458a.jpg',
    thread: 'A obsessão implacável pela grandeza artística que sangra as mãos e destrói o resto da vida.',
    bookIds: [
      'br-gambito-rainha',
      'br-um-jogador',
      'br-misery',
      'br-o-iluminado',
      'br-o-perfume',
      'br-moby-dick',
      'br-dorian-gray',
      'br-crime-e-castigo',
      'br-memorias-subsolo',
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
      'br-o-hobbit',
      'br-mao-esquerda-escuridao',
      'br-planeta-macacos',
      'br-deuses-americanos',
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
