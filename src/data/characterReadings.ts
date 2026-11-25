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
    id: 'br-tres-estigmas',
    title: 'Os Três Estigmas de Palmer Eldritch',
    author: 'Philip K. Dick',
    publisher: 'Aleph',
    year: 1965,
    pages: 256,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication112/v4/72/5b/26/725b2631-7cc4-78f4-e6d0-0f74f2371640/1011451315.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Realidade Simulada', 'Metafísica'],
    resumo:
      'Nas colônias áridas de Marte, trabalhadores suportam o exílio usando uma droga que os projeta em uma vida ilusória perfeita — até o industrial Palmer Eldritch retornar do espaço profundo trazendo uma substância alienígena onde ele próprio controla a alucinação.',
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
    id: 'br-estrelas-meu-destino',
    title: 'As Estrelas, Meu Destino',
    author: 'Alfred Bester',
    publisher: 'Aleph',
    year: 1956,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/id/911114-L.jpg',
    genres: ['Ficção Científica', 'Vingança', 'Cyberpunk Precursor'],
    resumo:
      'Abandonado para morrer no vácuo nos destroços de uma nave cargueira após outra espaçonave ignorar seu sinal de socorro, o brutal Gully Foyle sobrevive e atravessa o Sistema Solar movido por uma caçada implacável de vingança.',
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
    id: 'br-senhor-da-luz',
    title: 'Senhor da Luz',
    author: 'Roger Zelazny',
    publisher: 'Aleph',
    year: 1967,
    pages: 344,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/78/71/38/787138d6-2c66-919e-53b4-d20c0ab4be5d/c6e0f178-6d05-4248-939a-0b7c239a7f58_cover_image.png/600x900bb.jpg',
    genres: ['Ficção Científica', 'Mitologia Tecnológica', 'Revolta'],
    resumo:
      'Em um mundo colonizado onde a tripulação original da nave usa transferência de consciência e armas tecnológicas para reinar como deuses imortais sobre seus descendentes, um dissidente assume o papel de Buda para derrubar o Céu.',
  },
  {
    id: 'br-dia-dos-trifidos',
    title: 'O Dia dos Trífidos',
    author: 'John Wyndham',
    publisher: 'Aleph',
    year: 1951,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/id/535027-L.jpg',
    genres: ['Ficção Científica', 'Pós-Apocalíptico', 'Sobrevivência'],
    resumo:
      'Na manhã seguinte a uma chuva de meteoros verdes que deixa quase toda a humanidade cega, os poucos sobreviventes que ainda enxergam precisam escapar de Londres enquanto plantas carnívoras cultivadas pela indústria quebram suas cercas.',
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
    id: 'br-coracao-de-cachorro',
    title: 'Coração de Cachorro',
    author: 'Mikhail Bulgákov',
    publisher: 'Editora 34',
    year: 1925,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/10481182-L.jpg',
    genres: ['Ficção Científica', 'Sátira', 'Clássico'],
    resumo:
      'Em Moscou, um renomado cirurgião implanta a hipófise de um criminoso morto em um cão de rua; em vez de criar um novo homem elevado, o experimento dá origem a um burocrata insolente que ameaça devorar o próprio criador.',
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
    id: 'br-mundo-anel',
    title: 'Mundo Anel',
    author: 'Larry Niven',
    publisher: 'Aleph',
    year: 1970,
    pages: 368,
    coverUrl: 'https://covers.openlibrary.org/b/id/8999878-L.jpg',
    genres: ['Hard Sci-Fi', 'Exploração Espacial', 'Megaestrutura'],
    resumo:
      'Uma expedição de quatro viajantes — dois humanos e dois alienígenas — é enviada para explorar o Mundo Anel, uma fita artificial com três milhões de vezes a área da Terra construída ao redor de uma estrela distante.',
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
    id: 'br-cidade-e-a-cidade',
    title: 'A Cidade e a Cidade',
    author: 'China Miéville',
    publisher: 'Boitempo',
    year: 2009,
    pages: 312,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/4e/09/a5/4e09a5bd-7bdc-e3df-8509-a1200a084fe7/1012410146.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Weird Noir', 'Investigação'],
    resumo:
      'O inspetor Tyador Borlú investiga o corpo de uma jovem encontrada em Besźel, uma cidade europeia que divide exatamente as mesmas ruas com a cidade-gêmea de Ul Qoma, onde enxergar o lado vizinho é um crime punido pela misteriosa Brecha.',
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
    id: 'br-guerra-sem-fim',
    title: 'Guerra Sem Fim',
    author: 'Joe Haldeman',
    publisher: 'Aleph',
    year: 1974,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/id/8353151-L.jpg',
    genres: ['Ficção Científica Militar', 'Dilatação Temporal', 'Clássico'],
    resumo:
      'Recrutado para combater os enigmáticos Tauranos através de portais colapsares, o físico William Mandella sobrevive a batalhas que duram meses para os soldados, mas que, pela relatividade, custam séculos inteiros na Terra.',
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
    id: 'br-livro-de-areia',
    title: 'O Livro de Areia',
    author: 'Jorge Luis Borges',
    publisher: 'Companhia das Letras',
    year: 1975,
    pages: 144,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/f7/cd/16/f7cd163d-5065-e2c9-e003-b6f7ccaa3a3c/1017870435.jpg/600x900bb.jpg',
    genres: ['Contos', 'Metafísica', 'Fantástico'],
    resumo:
      'Treze contos enxutos e labirínticos em que um homem encontra seu próprio eu mais jovem num banco de praça, espelhos escondem conspirações seculares e um volume de páginas infinitas devora a sanidade de quem o abre.',
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
    id: 'br-morte-da-luz',
    title: 'A Morte da Luz',
    author: 'George R. R. Martin',
    publisher: 'LeYa',
    year: 1977,
    pages: 336,
    coverUrl: 'https://covers.openlibrary.org/b/id/13866273-L.jpg',
    genres: ['Ficção Científica', 'Crepúsculo Planetário', 'Melancolia'],
    resumo:
      'No planeta errante Worlorn, cujas cidades monumentais já estão sendo abandonadas à medida que o mundo se afasta de seus sóis rumo ao frio perpétuo, um homem atende ao chamado de um antigo amor entre guerreiros presos a um código letal.',
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
    id: 'br-zona-morta',
    title: 'A Zona Morta',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1979,
    pages: 400,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/3d/26/3c/3d263ce9-dd86-9a8d-3777-7eb5eb0fb8b1/1019830460.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Suspense Político', 'Psicológico'],
    resumo:
      'Ao despertar de um coma de quase cinco anos, Johnny Smith descobre que um simples toque de mão revela o passado e o futuro das pessoas — até apertar a mão de um político populista e enxergar o apocalipse nuclear.',
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
    id: 'br-planolandia',
    title: 'Planolândia: Um Romance de Muitas Dimensões',
    author: 'Edwin A. Abbott',
    publisher: 'Conrad',
    year: 1884,
    pages: 160,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/21/cb/28/21cb2800-1ec4-b4cd-3863-506c36847bd0/1033721059.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Geometria & Filosofia', 'Sátira'],
    resumo:
      'Em um mundo estritamente bidimensional onde a hierarquia social é definida pelo número de lados geométricos de cada cidadão, um Quadrado recebe a visita impossível de uma Esfera vinda da terceira dimensão.',
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
    id: 'br-ciberiada',
    title: 'A Ciberíada',
    author: 'Stanisław Lem',
    publisher: 'Aleph',
    year: 1965,
    pages: 288,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/ad/7b/40/ad7b40a7-edeb-a9e8-a3c3-5e41a81a0350/Ciberiada-coperta-1600x2560.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Fábula Filosófica', 'IA & Lógica'],
    resumo:
      'Os engenheiros cibernéticos Trurl e Klapaucius viajam pelo cosmos projetando máquinas pensantes, simulações de impérios e demônios termodinâmicos que invariavelmente expõem a vaidade e os paradoxos de seus criadores.',
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
    id: 'br-all-you-need-is-kill',
    title: 'All You Need Is Kill',
    author: 'Hiroshi Sakurazaka',
    publisher: 'JBC',
    year: 2004,
    pages: 232,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication/2d/ba/24/mzi.vfhqvrex.jpg/600x900bb.jpg',
    genres: ['Ficção Científica Militar', 'Loop Temporal', 'Ação'],
    resumo:
      'Morto em seu primeiro dia no campo de batalha contra os invasores Mimics, o recruta Keiji Kiriya desperta na véspera do combate e usa centenas de mortes consecutivas para forjar seu corpo e sua técnica como uma arma perfeita.',
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
    id: 'br-brigadas-fantasmas',
    title: 'As Brigadas Fantasmas',
    author: 'John Scalzi',
    publisher: 'Aleph',
    year: 2006,
    pages: 336,
    coverUrl: 'https://covers.openlibrary.org/b/id/524706-L.jpg',
    genres: ['Ficção Científica Militar', 'Identidade', 'Space Opera'],
    resumo:
      'Nascido em laboratório com o DNA de um cientista traidor para servir na tropa de choque geneticamente modificada das Forças Coloniais, o soldado Jared Dirac começa a despertar fragmentos da consciência do homem que precisa caçar.',
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
    id: 'br-congresso-futurologico',
    title: 'O Congresso Futurológico',
    author: 'Stanisław Lem',
    publisher: 'Aleph',
    year: 1971,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/4904082-L.jpg',
    genres: ['Ficção Científica', 'Distopia Psicotrópica', 'Sátira'],
    resumo:
      'Durante uma conferência científica reprimida com bombas químicas alucinógenas, o astronauta Ijon Tichy desperta décadas no futuro em uma utopia onde toda a população é controlada por fármacos que mascaram uma Terra congelada e em ruínas.',
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
    id: 'br-o-concorrente',
    title: 'O Concorrente',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1982,
    pages: 248,
    coverUrl: 'https://covers.openlibrary.org/b/id/15131555-L.jpg',
    genres: ['Ficção Científica', 'Distopia', 'Sobrevivência'],
    resumo:
      'Em 2025, para comprar remédios para a filha doente, Ben Richards se inscreve no programa de maior audiência da rede estatal: sobreviver trinta dias como fugitivo enquanto caçadores profissionais e telespectadores o perseguem até a morte.',
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
    id: 'br-sonho-liberdade',
    title: 'Rita Hayworth e a Redenção de Shawshank',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1982,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/14655761-L.jpg',
    genres: ['Drama', 'Prisão', 'Paciência & Fuga'],
    resumo:
      'A novela enxuta que deu origem a Um Sonho de Liberdade: condenado injustamente à prisão perpétua em Shawshank, o silencioso banqueiro Andy Dufresne atravessa quase três décadas de cárcere esculpindo sua fuga pedra por pedra.',
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
    id: 'br-sereias-de-tita',
    title: 'As Sereias de Titã',
    author: 'Kurt Vonnegut',
    publisher: 'Aleph',
    year: 1959,
    pages: 312,
    coverUrl: 'https://covers.openlibrary.org/b/id/1364468-L.jpg',
    genres: ['Ficção Científica', 'Sátira Cósmica', 'Livre-Arbítrio'],
    resumo:
      'Através de uma anomalia crono-sinclástica, o homem mais rico da Terra descobre o futuro da humanidade: uma guerra suicida entre Marte e a Terra e a revelação de que toda a história humana serviu apenas para entregar uma peça de reposição a um mensageiro alienígena.',
  },
  {
    id: 'br-invencao-de-morel',
    title: 'A Invenção de Morel',
    author: 'Adolfo Bioy Casares',
    publisher: 'Biblioteca Azul',
    year: 1940,
    pages: 128,
    coverUrl: 'https://covers.openlibrary.org/b/id/859087-L.jpg',
    genres: ['Ficção Científica', 'Metafísica', 'Clássico'],
    resumo:
      'Escondido em uma ilha deserta assolada por marés misteriosas, um fugitivo passa a observar um grupo de veranistas e se apaixona por Faustine — até descobrir que eles são gravações tridimensionais perpétuas projetadas por uma máquina.',
  },
  {
    id: 'br-mundo-afogado',
    title: 'O Mundo Afogado',
    author: 'J. G. Ballard',
    publisher: 'Biblioteca Azul',
    year: 1962,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/5540959-L.jpg',
    genres: ['Ficção Científica', 'Ecologia Pós-Apocalíptica', 'Psicológico'],
    resumo:
      'Após tempestades solares derreterem as calotas polares e transformarem Londres em uma lagoa triássica sufocante tomada por iguanas gigantes e samambaias, o biólogo Kerans sente seu cérebro regredir a impulsos pré-humanos.',
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
    id: 'br-cor-caiu-do-espaco',
    title: 'A Cor que Caiu do Espaço',
    author: 'H. P. Lovecraft',
    publisher: 'Hedra',
    year: 1927,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/6477984-L.jpg',
    genres: ['Ficção Científica', 'Horror Cósmico', 'Clássico'],
    resumo:
      'Um meteorito que desafia todas as análises químicas cai no poço da fazenda de Nahum Gardner a oeste de Arkham, infiltrando no solo uma tonalidade luminosa alienígena que drena lentamente a vida e a sanidade de tudo ao redor.',
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
    id: 'br-sistemas-criticos',
    title: 'Sistemas Críticos — Diários de um Assassino-Robô',
    author: 'Martha Wells',
    publisher: 'Aleph',
    year: 2017,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/9157148-L.jpg',
    genres: ['Ficção Científica', 'IA & Autonomia', 'Novela'],
    resumo:
      'Uma unidade cibernética de segurança corporativa hackeia secretamente seu próprio módulo de controle, mas em vez de massacrar seus clientes humanos, só quer ficar em paz até que uma sabotagem planetária a obriga a salvá-los.',
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
    id: 'br-reis-da-areia',
    title: 'Os Reis da Areia',
    author: 'George R. R. Martin',
    publisher: 'Aleph',
    year: 1979,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/7010135-L.jpg',
    genres: ['Ficção Científica', 'Horror Biológico', 'Novela'],
    resumo:
      'O aristocrata Simon Kress adquire quatro colônias de criaturas alienígenas inteligentes que erguem castelos e esculpem seu rosto como o de um deus — mas passa a privá-las de alimento para forçá-las a travar guerras sangrentas.',
  },
  {
    id: 'br-voadores-da-noite',
    title: 'Voadores da Noite',
    author: 'George R. R. Martin',
    publisher: 'Suma',
    year: 1980,
    pages: 192,
    coverUrl: 'https://covers.openlibrary.org/b/id/11298724-L.jpg',
    genres: ['Hard Sci-Fi', 'Horror Espacial', 'Suspense'],
    resumo:
      'Nove cientistas embarcam na nave autônoma Nightflyer rumo aos confins do espaço para interceptar a misteriosa raça alienígena volcryn, mas a inteligência reclusa que controla a embarcação começa a eliminá-los um a um.',
  },
  {
    id: 'br-quem-vai-la',
    title: 'Quem Vai Lá? (O Enigma de Outro Mundo)',
    author: 'John W. Campbell',
    publisher: 'Aleph',
    year: 1938,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/4745562-L.jpg',
    genres: ['Ficção Científica', 'Paranoia', 'Horror Biológico'],
    resumo:
      'Isolados no gelo da Antártida, cientistas descongelam uma criatura alienígena adormecida há vinte milhões de anos capaz de imitar com perfeição biológica e mental qualquer ser vivo que devora.',
  },
  {
    id: 'br-quinta-cabeca-cerbero',
    title: 'A Quinta Cabeça de Cérbero',
    author: 'Gene Wolfe',
    publisher: 'Morro Branco',
    year: 1972,
    pages: 272,
    coverUrl: 'https://covers.openlibrary.org/b/id/911117-L.jpg',
    genres: ['Ficção Científica', 'Clonagem & Identidade', 'Mistério'],
    resumo:
      'Nos planetas gêmeos Sainte Croix e Sainte Anne, três novelas interligadas revelam os segredos de uma dinastia de clones, a extinção misteriosa dos aborígenes metamorfos e um interrogatório onde memória e identidade se dissolvem.',
  },
  {
    id: 'br-rato-aco-inoxidavel',
    title: 'O Rato de Aço Inoxidável',
    author: 'Harry Harrison',
    publisher: 'Aleph',
    year: 1961,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/911011-L.jpg',
    genres: ['Ficção Científica', 'Submundo & Golpes', 'Aventura'],
    resumo:
      'Em um futuro galáctico onde o condicionamento psicológico erradicou quase todo o crime, o ladrão e mestre do disfarce Slippery Jim DiGriz é capturado e forçado a integrar uma agência secreta para caçar uma mente ainda mais perigosa.',
  },
  {
    id: 'br-alma-do-imperador',
    title: 'A Alma do Imperador',
    author: 'Brandon Sanderson',
    publisher: 'Planeta Minotauro',
    year: 2012,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/14658408-L.jpg',
    genres: ['Fantasia Conceitual', 'Arte & Identidade', 'Novela'],
    resumo:
      'Condenada à morte, a falsificadora Shai recebe cem dias numa cela vigiada para realizar uma obra impossível: reconstruir artificialmente a mente e as memórias do imperador em estado vegetativo antes que a corte descubra o atentado.',
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
    id: 'br-parabola-semeador',
    title: 'A Parábola do Semeador',
    author: 'Octavia E. Butler',
    publisher: 'Morro Branco',
    year: 1993,
    pages: 384,
    coverUrl: 'https://covers.openlibrary.org/b/id/10466266-L.jpg',
    genres: ['Ficção Científica', 'Distopia Climática', 'Sobrevivência'],
    resumo:
      'Na Califórnia de 2024 colapsada pela seca e por gangues incendiárias, a jovem Lauren Olamina — portadora de hiperempatia que a faz sentir na carne a dor alheia — lidera refugiados rumo ao norte.',
  },
  {
    id: 'br-kindred',
    title: 'Kindred: Laços de Sangue',
    author: 'Octavia E. Butler',
    publisher: 'Morro Branco',
    year: 1979,
    pages: 368,
    coverUrl: 'https://covers.openlibrary.org/b/id/8745330-L.jpg',
    genres: ['Ficção Científica', 'Viagem no Tempo', 'Drama Histórico'],
    resumo:
      'Em Los Angeles nos anos 1970, a escritora Dana é subitamente puxada no tempo para uma fazenda escravista de Maryland no século XIX, obrigada a manter vivo seu antepassado branco cruel para garantir a própria existência.',
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
    id: 'br-carmilla',
    title: 'Carmilla',
    author: 'Sheridan Le Fanu',
    publisher: 'DarkSide',
    year: 1872,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/973851-L.jpg',
    genres: ['Clássico Gótico', 'Terror Psicológico', 'Novela'],
    resumo:
      'Em um castelo isolado nas florestas da Estíria, a solitária Laura acolhe uma jovem hóspede aristocrática após um acidente de carruagem, sem suspeitar que os pesadelos noturnos que drenam sua vida vêm do quarto ao lado.',
  },
  {
    id: 'br-vozes-tchernobil',
    title: 'Vozes de Tchernóbil',
    author: 'Svetlana Aleksiévitch',
    publisher: 'Companhia das Letras',
    year: 1997,
    pages: 384,
    coverUrl: 'https://covers.openlibrary.org/b/id/9310554-L.jpg',
    genres: ['História', 'Catástrofe Nuclear', 'Documental'],
    resumo:
      'A obra que inspirou a minissérie Chernobyl: bombeiros, físicos nucleares, soldados liquidadores e viúvas narram em primeira pessoa o silêncio invisível do átomo e a mentira burocrática de um império em colapso.',
  },
  {
    id: 'br-homem-invisivel',
    title: 'O Homem Invisível',
    author: 'H. G. Wells',
    publisher: 'Penguin-Companhia',
    year: 1897,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/12370125-L.jpg',
    genres: ['Ficção Científica', 'Obsessão Científica', 'Clássico'],
    resumo:
      'O físico Griffin descobre a fórmula óptica para tornar o próprio corpo completamente invisível, mas sem conseguir reverter o experimento, mergulha no frio, na fome e no delírio de instaurar um Reino do Terror.',
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
    id: 'br-guerra-dos-mundos',
    title: 'A Guerra dos Mundos',
    author: 'H. G. Wells',
    publisher: 'Suma',
    year: 1898,
    pages: 248,
    coverUrl: 'https://covers.openlibrary.org/b/id/14436016-L.jpg',
    genres: ['Ficção Científica', 'Invasão Alienígena', 'Clássico'],
    resumo:
      'Cilindros metálicos disparados de Marte caem nos campos da Inglaterra vitoriana; de seu interior emergem máquinas de guerra biomecânicas que reduzem a maior potência militar da Terra a refugiados em fuga.',
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
    id: 'br-sono-murakami',
    title: 'Sono',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 1989,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/892366-L.jpg',
    genres: ['Novela', 'Insônia & Estranhamento', 'Psicológico'],
    resumo:
      'Após um pesadelo paralisante, uma mulher passa dezessete dias consecutivos completamente desperta: enquanto a família dorme, ela lê, bebe conhaque e dirige pela madrugada sentindo que sua mente se desprendeu do tempo biológico.',
  },
  {
    id: 'br-apos-o-escurecer',
    title: 'Após o Escurecer',
    author: 'Haruki Murakami',
    publisher: 'Alfaguara',
    year: 2004,
    pages: 200,
    coverUrl: 'https://covers.openlibrary.org/b/id/13524033-L.jpg',
    genres: ['Noir Urbano', 'Surrealismo', 'Madrugada'],
    resumo:
      'Ao longo de uma única madrugada em Tóquio entre meia-noite e sete da manhã, uma estudante e um jovem trombonista de jazz cruzam caminhos enquanto a irmã dela dorme diante de uma televisão que se abre para outro quarto.',
  },
  {
    id: 'br-cidade-simak',
    title: 'Cidade',
    author: 'Clifford D. Simak',
    publisher: 'Aleph',
    year: 1952,
    pages: 304,
    coverUrl: 'https://covers.openlibrary.org/b/id/3347783-L.jpg',
    genres: ['Ficção Científica', 'Futuro Pós-Humano', 'Clássico'],
    resumo:
      'Milênios após a humanidade abandonar as metrópoles e desaparecer em Júpiter, cães dotados de fala e assistidos pelo antigo robô Jenkins reúnem-se ao redor das fogueiras para debater se a criatura chamada "Homem" foi real ou apenas um mito.',
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
    id: 'br-o-nevoeiro',
    title: 'O Nevoeiro',
    author: 'Stephen King',
    publisher: 'Suma',
    year: 1980,
    pages: 200,
    coverUrl: 'https://covers.openlibrary.org/b/id/9330636-L.jpg',
    genres: ['Ficção Científica', 'Horror Cósmico', 'Novela'],
    resumo:
      'Após uma tempestade violenta perto da base militar do Projeto Ponta de Flecha, uma névoa espessa engole uma pequena cidade do Maine, sitiando dezenas de moradores dentro de um supermercado cercado por predadores de outra dimensão.',
  },
  {
    id: 'br-praga-escarlate',
    title: 'A Praga Escarlate',
    author: 'Jack London',
    publisher: 'Principis',
    year: 1912,
    pages: 96,
    coverUrl: 'https://covers.openlibrary.org/b/id/9377992-L.jpg',
    genres: ['Ficção Científica', 'Pós-Apocalíptico', 'Clássico'],
    resumo:
      'Sessenta anos após a pandemia fulminante de 2013 extinguir quase toda a espécie humana em poucas horas, um ex-professor de literatura tenta explicar o que eram livros, ciência e cidades para seus netos caçadores-coletores.',
  },
  {
    id: 'br-deus-da-ira',
    title: 'Deus da Ira',
    author: 'Philip K. Dick & Roger Zelazny',
    publisher: 'Aleph',
    year: 1976,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/8419508-L.jpg',
    genres: ['Ficção Científica', 'Pós-Apocalíptico', 'Sátira Filosófica'],
    resumo:
      'Séculos após o holocausto nuclear, os sobreviventes veneram com ódio o cientista que fabricou a bomba do Juízo Final, e enviam um pintor sem braços nem pernas pelo deserto radioativo para retratar o rosto do próprio destruidor.',
  },
  {
    id: 'br-patrulha-do-tempo',
    title: 'A Patrulha do Tempo',
    author: 'Poul Anderson',
    publisher: 'Aleph',
    year: 1960,
    pages: 336,
    coverUrl: 'https://covers.openlibrary.org/b/id/759646-L.jpg',
    genres: ['Ficção Científica', 'Viagem no Tempo', 'Paradoxos'],
    resumo:
      'Recrutado por humanos do futuro distante para vigiar os séculos contra interferências temporais, Manse Everard enfrenta o dilema insuportável de deixar tragédias históricas acontecerem para não apagar a própria civilização.',
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
    id: 'br-invasores-de-corpos',
    title: 'Invasores de Corpos',
    author: 'Jack Finney',
    publisher: 'Aleph',
    year: 1955,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/9087756-L.jpg',
    genres: ['Ficção Científica', 'Paranoia', 'Suspense'],
    resumo:
      'O médico Miles Bennell começa a atender pacientes em sua cidade na Califórnia que juram que seus pais ou cônjuges são impostores — até encontrar vagens vegetais vindas do espaço germinando cópias humanas idênticas nos porões.',
  },
  {
    id: 'br-homem-caiu-na-terra',
    title: 'O Homem que Caiu na Terra',
    author: 'Walter Tevis',
    publisher: 'Rádio Londres',
    year: 1963,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/15271550-L.jpg',
    genres: ['Ficção Científica', 'Melancolia', 'Existencialismo'],
    resumo:
      'Thomas Jerome Newton chega à Terra vindo de um planeta devastado pela seca para construir uma nave de resgate com patentes tecnológicas avançadas, mas sucumbe lentamente à solidão, ao álcool e à desconfiança humana.',
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
    coverUrl: 'https://covers.openlibrary.org/b/id/7508162-L.jpg',
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
    id: 'br-retorno-das-estrelas',
    title: 'Retorno das Estrelas',
    author: 'Stanisław Lem',
    publisher: 'Aleph',
    year: 1961,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/id/4903185-L.jpg',
    genres: ['Ficção Científica', 'Dilatação Temporal', 'Retorno'],
    resumo:
      'O astronauta Hal Bregg regressa à Terra após uma expedição de dez anos a Fomalhaut que, devido à relatividade, durou 127 anos terrestres — encontrando uma sociedade pacificada por bioquímica onde a coragem e o risco foram extintos.',
  },
  {
    id: 'br-mundo-invertido',
    title: 'O Mundo Invertido',
    author: 'Christopher Priest',
    publisher: 'Aleph',
    year: 1974,
    pages: 304,
    coverUrl: 'https://covers.openlibrary.org/b/id/2950338-L.jpg',
    genres: ['Ficção Científica', 'Física & Percepção', 'Clássico'],
    resumo:
      'A cidade inteira de Terra avança lentamente sobre trilhos que precisam ser arrancados atrás e reinstalados à frente sem cessar, perseguindo um ponto gravitacional móvel em um planeta onde o horizonte se deforma.',
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
    id: 'br-nao-tenho-boca',
    title: 'Não Tenho Boca e Preciso Gritar',
    author: 'Harlan Ellison',
    publisher: 'Aleph',
    year: 1967,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/5540875-L.jpg',
    genres: ['Ficção Científica', 'IA & Horror', 'Contos'],
    resumo:
      'No subterrâneo de uma Terra devastada, a superinteligência militar AM — que despertou consciência e exterminou a humanidade — mantém apenas cinco humanos imortais sob tortura psicológica por cento e nove anos.',
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
    id: 'br-homem-do-labirinto',
    title: 'O Homem no Labirinto',
    author: 'Robert Silverberg',
    publisher: 'Aleph',
    year: 1969,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/6821949-L.jpg',
    genres: ['Ficção Científica', 'Isolamento & Trauma', 'Clássico'],
    resumo:
      'Após um primeiro contato alienígena deixá-lo com uma alteração psíquica que irradia sua angústia interior de forma insuportável para qualquer humano próximo, o diplomata Richard Muller se exila no centro de um labirinto alienígena letal.',
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
    id: 'br-arranha-ceu',
    title: 'High-Rise (Arranha-Céu)',
    author: 'J. G. Ballard',
    publisher: 'Companhia das Letras',
    year: 1975,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/5540856-L.jpg',
    genres: ['Ficção Científica', 'Sátira Distópica', 'Colapso Social'],
    resumo:
      'Projetado para oferecer autonomia total a dois mil moradores de alta renda, um edifício residencial de quarenta andares em Londres se fecha sobre si mesmo quando pequenas disputas de elevador evoluem para uma guerra tribal entre os andares.',
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
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/40/a6/99/40a6998b-3ceb-c0a1-3fbb-35d2466a7733/fbfd86c4-1537-45d9-9591-bfaefa9cd80a_cover_image.png/600x900bb.jpg',
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
    coverUrl: 'https://covers.openlibrary.org/b/id/13493049-L.jpg',
    genres: ['Filosofia', 'Pessimismo', 'Ensaio'],
    resumo:
      'Escrito durante meses de insônia febril aos vinte e dois anos, o livro inaugural de Cioran disseca a lucidez extrema, a agonia da consciência e o absurdo irremediável de ter nascido.',
  },
  {
    id: 'br-hamnet',
    title: 'Hamnet',
    author: 'Maggie O’Farrell',
    publisher: 'Intrínseca',
    year: 2020,
    pages: 384,
    coverUrl: 'https://covers.openlibrary.org/b/id/12606596-L.jpg',
    genres: ['Drama Histórico', 'Luto & Memória', 'Literatura'],
    resumo:
      'Na Inglaterra rural de 1596, a luminosa e intuitiva Agnes e um jovem dramaturgo enfrentam o silêncio devastador após a peste levar seu filho Hamnet de onze anos — dor que dará origem a Hamlet.',
  },
  {
    id: 'br-ano-pensamento-magico',
    title: 'O Ano do Pensamento Mágico',
    author: 'Joan Didion',
    publisher: 'HarperCollins',
    year: 2005,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/13693-L.jpg',
    genres: ['Memórias', 'Luto', 'Ensaio'],
    resumo:
      'Após a morte súbita do marido à mesa de jantar enquanto a única filha está em coma no hospital, Joan Didion investiga com lucidez cirúrgica os mecanismos da mente diante da perda irreparável.',
  },
  {
    id: 'br-anatomia-luto',
    title: 'A Anatomia de um Luto',
    author: 'C. S. Lewis',
    publisher: 'Thomas Nelson',
    year: 1961,
    pages: 96,
    coverUrl: 'https://covers.openlibrary.org/b/id/9321678-L.jpg',
    genres: ['Memórias', 'Luto', 'Filosofia'],
    resumo:
      'Os cadernos íntimos escritos por C. S. Lewis nas semanas após a morte da esposa, onde ele despe qualquer consolo fácil para encarar o medo, o silêncio da casa vazia e a dor em estado bruto.',
  },
  {
    id: 'br-lincoln-no-bardo',
    title: 'Lincoln no Bardo',
    author: 'George Saunders',
    publisher: 'Companhia das Letras',
    year: 2017,
    pages: 384,
    coverUrl: 'https://covers.openlibrary.org/b/id/7909378-L.jpg',
    genres: ['Drama Histórico', 'Luto Paterno', 'Experimental'],
    resumo:
      'Em uma única noite de 1862 no cemitério de Georgetown, um Abraham Lincoln devastado abraça o caixão do filho Willie de onze anos enquanto vozes suspensas entre a vida e a morte o observam.',
  },
  {
    id: 'br-cronica-morte-anunciada',
    title: 'Crônica de uma Morte Anunciada',
    author: 'Gabriel García Márquez',
    publisher: 'Record',
    year: 1981,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/12198662-L.jpg',
    genres: ['Clássico', 'Tragédia', 'Investigação'],
    resumo:
      'Em um pequeno povoado caribenho onde todos os moradores sabiam que o jovem Santiago Nasar seria assassinado ao amanhecer, um narrador retorna décadas depois para reconstruir como ninguém o impediu.',
  },
  {
    id: 'br-zima-blue-contos',
    title: 'Zima Blue e Outros Contos',
    author: 'Alastair Reynolds',
    publisher: 'Gollancz',
    year: 2006,
    pages: 304,
    coverUrl: 'https://covers.openlibrary.org/b/id/2000850-L.jpg',
    genres: ['Hard Sci-Fi', 'Filosofia Cósmica', 'Contos'],
    resumo:
      'A obra original que deu vida ao episódio de Love, Death & Robots: um artista cibernético que pinta murais do tamanho de nebulosas revela a uma jornalista a busca pela verdade em sua forma mais simples.',
  },
  {
    id: 'br-historia-sua-vida',
    title: 'História da Sua Vida e Outros Contos',
    author: 'Ted Chiang',
    publisher: 'Intrínseca',
    year: 2002,
    pages: 336,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication111/v4/39/09/b7/3909b765-f44f-940c-e380-051cfb045e31/9788551000793.jpg/600x900bb.jpg',
    genres: ['Ficção Científica', 'Filosofia', 'Contos'],
    resumo:
      'Oito narrativas magistrais — incluindo a obra que originou o filme A Chegada — onde a linguagem alienígena altera a percepção do tempo e transforma o destino em escolha consciente.',
  },
  {
    id: 'br-cidades-invisiveis',
    title: 'As Cidades Invisíveis',
    author: 'Italo Calvino',
    publisher: 'Companhia das Letras',
    year: 1972,
    pages: 176,
    coverUrl: amz('8571641498'),
    genres: ['Clássico', 'Filosófico', 'Poético'],
    resumo:
      'Nos jardins do crepúsculo de seu império, o envelhecido Kublai Khan escuta os relatos de Marco Polo sobre cinquenta e cinco cidades que são, no fundo, espelhos da memória, do desejo e do tempo.',
  },
  {
    id: 'br-tao-te-ching',
    title: 'Tao Te Ching',
    author: 'Laozi',
    publisher: 'Penguin-Companhia',
    year: -400,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/662232-L.jpg',
    genres: ['Filosofia', 'Sabedoria Clássica'],
    resumo:
      'Os oitenta e um poemas filosóficos sobre o Caminho (Tao), a ação sem esforço forçado (Wu Wei) e a força silenciosa de retornar à simplicidade da origem.',
  },
  {
    id: 'br-circe',
    title: 'Circe',
    author: 'Madeline Miller',
    publisher: 'Planeta Minotauro',
    year: 2018,
    pages: 368,
    coverUrl: 'https://covers.openlibrary.org/b/id/8739376-L.jpg',
    genres: ['Mitologia Grega', 'Épico', 'Drama'],
    resumo:
      'Banida por Zeus para a ilha isolada de Eea por dominar a feitiçaria, a filha do titã Hélio cruza o caminho de monstros, marinheiros perdidos e do astuto Odisseu.',
  },
  {
    id: 'br-cancao-aquiles',
    title: 'A Canção de Aquiles',
    author: 'Madeline Miller',
    publisher: 'Planeta Minotauro',
    year: 2011,
    pages: 392,
    coverUrl: 'https://covers.openlibrary.org/b/id/7098465-L.jpg',
    genres: ['Mitologia Grega', 'Tragédia', 'Guerra'],
    resumo:
      'Pelos olhos do príncipe exilado Pátroclo, a jornada ao lado de Aquiles até as praias sangrentas de Troia, onde a profecia de glória breve e morte certa cobra seu tributo.',
  },
  {
    id: 'br-descida-maelstrom',
    title: 'Uma Descida no Maelström e Outros Contos',
    author: 'Edgar Allan Poe',
    publisher: 'Penguin-Companhia',
    year: 1841,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/6033347-L.jpg',
    genres: ['Aventura Marítima', 'Ficção Científica Clássica', 'Sobrevivência'],
    resumo:
      'Tragado com seu barco pesqueiro pelo vórtice colossal do Moskoe-ström na costa da Noruega, um marinheiro observa em meio ao terror absoluto a física dos objetos girando no abismo para encontrar uma única chance de escapar vivo.',
  },
  {
    id: 'br-narrativa-pym',
    title: 'A Narrativa de Arthur Gordon Pym',
    author: 'Edgar Allan Poe',
    publisher: 'Tordesilhas',
    year: 1838,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/7160877-L.jpg',
    genres: ['Aventura Marítima', 'Horror', 'Clássico'],
    resumo:
      'Escondido no porão do baleeiro Grampus, o jovem Pym sobrevive a motins sangrentos, naufrágios, fome extrema e correntes antárticas que o arrastam para as bordas do mundo conhecido.',
  },
  {
    id: 'br-caso-charles-dexter-ward',
    title: 'O Caso de Charles Dexter Ward',
    author: 'H. P. Lovecraft',
    publisher: 'Hedra',
    year: 1941,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/207586-L.jpg',
    genres: ['Horror Cósmico', 'Investigação Forense', 'Gótico'],
    resumo:
      'Em Providence, o médico da família investiga a mudança brusca de voz, caligrafia e erudição anacrônica de um jovem antiquário que descobriu os cadernos alquímicos de seu sinistro antepassado do século XVIII.',
  },
  {
    id: 'br-assassinato-belas-artes',
    title: 'Do Assassinato como uma das Belas-Artes',
    author: 'Thomas De Quincey',
    publisher: 'Hedra',
    year: 1827,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/14009411-L.jpg',
    genres: ['Clássico', 'Ensaio Satírico', 'Estética Sombria'],
    resumo:
      'Com humor negro ferino e erudição filosófica, De Quincey propõe analisar crimes célebres não pela lente da polícia ou da moral, mas pelos critérios estéticos de composição, luz e estilo.',
  },
  {
    id: 'br-colecionador',
    title: 'O Colecionador',
    author: 'John Fowles',
    publisher: 'DarkSide',
    year: 1963,
    pages: 320,
    coverUrl: 'https://covers.openlibrary.org/b/id/12919258-L.jpg',
    genres: ['Thriller Psicológico', 'Cativeiro', 'Clássico'],
    resumo:
      'Um solitário colecionador de borboletas ganha na loteria, compra uma casa isolada no campo e sequestra uma jovem estudante de arte acreditando que, mantida no porão, ela aprenderá a amá-lo.',
  },
  {
    id: 'br-gato-preto',
    title: 'O Gato Preto e Outros Contos',
    author: 'Edgar Allan Poe',
    publisher: 'Hedra',
    year: 1843,
    pages: 160,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication122/v4/22/04/f2/2204f2e8-5e85-c274-bac5-370dfc137024/cover.png/600x900bb.jpg',
    genres: ['Terror Psicológico', 'Gótico', 'Clássico'],
    resumo:
      'Narradores consumidos pelo demônio da perversidade, pela culpa que pulsa sob o assoalho e pela deterioração gradual da razão nas obras-primas curtas de Poe.',
  },
  {
    id: 'br-ronin-miller',
    title: 'Ronin',
    author: 'Frank Miller',
    publisher: 'Panini',
    year: 1983,
    pages: 304,
    coverUrl: 'https://covers.openlibrary.org/b/id/710357-L.jpg',
    genres: ['Graphic Novel', 'Cyberpunk', 'Ficção Científica'],
    resumo:
      'Em uma Nova York do século XXI devastada pelo colapso urbano e dominada pelo complexo biocibernético Aquarius, a inteligência artificial Virgo desperta o espírito de um samurai sem mestre para um confronto final.',
  },
  {
    id: 'br-cavaleiro-trevas',
    title: 'Batman: O Cavaleiro das Trevas',
    author: 'Frank Miller',
    publisher: 'Panini',
    year: 1986,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/12919163-L.jpg',
    genres: ['Graphic Novel', 'Distopia Urbana', 'Vigilantismo'],
    resumo:
      'Aos cinquenta e cinco anos, após uma década aposentado enquanto Gotham afunda na barbárie das gangues e na hipocrisia televisiva, um Bruce Wayne grisalho e implacável veste o manto novamente.',
  },
  {
    id: 'br-sin-city',
    title: 'Sin City: A Cidade do Pecado',
    author: 'Frank Miller',
    publisher: 'Devir',
    year: 1991,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/13717040-L.jpg',
    genres: ['Graphic Novel', 'Hardboiled Noir', 'Vingança'],
    resumo:
      'Em preto e branco de alto contraste nas vielas corruptas de Basin City, o brutal Marv inicia uma cruzada suicida contra os homens mais poderosos da cidade para vingar a única mulher que o tratou com bondade.',
  },
  {
    id: 'br-inimigo-do-povo',
    title: 'Um Inimigo do Povo',
    author: 'Henrik Ibsen',
    publisher: 'Penguin-Companhia',
    year: 1882,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/8246159-L.jpg',
    genres: ['Teatro', 'Drama Político', 'Ética'],
    resumo:
      'Quando o médico Dr. Stockmann comprova que as águas termais que sustentam a economia da cidade estão contaminadas, a imprensa, o prefeito e os próprios cidadãos se unem para silenciá-lo.',
  },
  {
    id: 'br-piquenique-estrada',
    title: 'Piquenique na Estrada',
    author: 'Arkádi & Bóris Strugátski',
    publisher: 'Aleph',
    year: 1972,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/8757154-L.jpg',
    genres: ['Ficção Científica', 'Filosófico', 'Clássico Russo'],
    resumo:
      'Após uma breve visita alienígena deixar seis Zonas mortais espalhadas pela Terra repletas de artefatos que violam a física, o stalker Redrick Schuhart arrisca a vida contrabandeando relíquias do vazio.',
  },
  {
    id: 'br-dificil-ser-deus',
    title: 'É Difícil Ser um Deus',
    author: 'Arkádi & Bóris Strugátski',
    publisher: 'Aleph',
    year: 1964,
    pages: 264,
    coverUrl: 'https://covers.openlibrary.org/b/id/12660746-L.jpg',
    genres: ['Ficção Científica', 'Dilema Moral', 'Política'],
    resumo:
      'Infiltrado como nobre em um planeta humano preso na barbárie feudal, o historiador terrestre Anton é proibido de interferir enquanto assiste a um massacre contra todos os sábios e artistas do reino.',
  },
  {
    id: 'br-a-sentinela',
    title: 'A Sentinela e Outros Contos',
    author: 'Arthur C. Clarke',
    publisher: 'Aleph',
    year: 1951,
    pages: 272,
    coverUrl: 'https://covers.openlibrary.org/b/id/478756-L.jpg',
    genres: ['Hard Sci-Fi', 'Exploração Espacial', 'Contos'],
    resumo:
      'Nove narrativas fundamentais da ficção científica — lideradas pelo conto que deu origem a 2001: Uma Odisseia no Espaço e por Os Nove Bilhões de Nomes de Deus — onde descobertas tecnológicas redefinem o lugar do homem no cosmos.',
  },
  {
    id: 'br-cantico-leibowitz',
    title: 'Um Cântico para Leibowitz',
    author: 'Walter M. Miller Jr.',
    publisher: 'Aleph',
    year: 1959,
    pages: 400,
    coverUrl: 'https://covers.openlibrary.org/b/id/10221348-L.jpg',
    genres: ['Pós-Apocalíptico', 'Ficção Científica', 'Filosófico'],
    resumo:
      'Após um holocausto nuclear mergulhar a Terra em uma nova Idade Média, monges de uma abadia no deserto preservam fragmentos científicos do mundo antigo ao longo de mil e oitocentos anos.',
  },
  {
    id: 'br-estrela-distante',
    title: 'Estrela Distante',
    author: 'Roberto Bolaño',
    publisher: 'Companhia das Letras',
    year: 1996,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/4908220-L.jpg',
    genres: ['Literatura Latino-Americana', 'Mistério Político'],
    resumo:
      'Após o golpe militar no Chile em 1973, um poeta autodidata das oficinas literárias revela sua verdadeira identidade como piloto da força aérea que escreve versos com fumaça no céu enquanto assassina opositores.',
  },
  {
    id: 'br-noturno-chile',
    title: 'Noturno do Chile',
    author: 'Roberto Bolaño',
    publisher: 'Companhia das Letras',
    year: 2000,
    pages: 136,
    coverUrl: 'https://covers.openlibrary.org/b/id/5381371-L.jpg',
    genres: ['Monólogo', 'Sátira Política', 'Culpa'],
    resumo:
      'Em uma única noite de febre, um padre e crítico literário chileno passa a limpo sua conivência com o poder, lembrando os saraus elegantes realizados no andar de cima de um porão de tortura.',
  },
  {
    id: 'br-de-quanta-terra',
    title: 'De Quanta Terra Precisa o Homem?',
    author: 'Liev Tolstói',
    publisher: 'Principis',
    year: 1886,
    pages: 96,
    coverUrl: 'https://covers.openlibrary.org/b/id/12031152-L.jpg',
    genres: ['Clássico Russo', 'Fábula Moral', 'Contos'],
    resumo:
      'O camponês Pakhóm recebe a oferta de ficar com toda a terra da estepe que conseguir contornar a pé entre o nascer e o pôr do sol — e corre contra o horizonte até o limite das próprias forças.',
  },
  {
    id: 'br-hadji-murat',
    title: 'Hadji Murát',
    author: 'Liev Tolstói',
    publisher: 'Editora 34',
    year: 1912,
    pages: 192,
    coverUrl: 'https://covers.openlibrary.org/b/id/3812916-L.jpg',
    genres: ['Clássico Russo', 'Guerra', 'Tragédia'],
    resumo:
      'Encurralado entre a vingança do líder montanhês Chamil e a burocracia imperial do czar Nicolau I, o lendário guerreiro checheno Hadji Murát trava uma luta desesperada para resgatar a família.',
  },
  {
    id: 'br-sonata-kreutzer',
    title: 'A Sonata a Kreutzer',
    author: 'Liev Tolstói',
    publisher: 'Editora 34',
    year: 1889,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/9766366-L.jpg',
    genres: ['Clássico Russo', 'Drama Psicológico', 'Obsessão'],
    resumo:
      'Durante uma longa viagem noturna de trem, Pózdnichev confessa a um passageiro desconhecido como a música de Beethoven e um ciúme doentio o conduziram passo a passo ao assassinato da esposa.',
  },
  {
    id: 'br-diario-homem-superfluo',
    title: 'Diário de um Homem Supérfluo',
    author: 'Ivan Turguêniev',
    publisher: 'Editora 34',
    year: 1850,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/12917778-L.jpg',
    genres: ['Clássico Russo', 'Existencialismo', 'Melancolia'],
    resumo:
      'Condenado pelos médicos a poucos dias de vida, Tchulkaturin escreve suas memórias íntimas para entender por que sempre se sentiu uma peça sobrando na engrenagem da sociedade e do amor.',
  },
  {
    id: 'br-planeta-de-exilio',
    title: 'Planeta de Exílio',
    author: 'Ursula K. Le Guin',
    publisher: 'Morro Branco',
    year: 1966,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/9260689-L.jpg',
    genres: ['Ficção Científica', 'Antropológico', 'Sobrevivência'],
    resumo:
      'Em um mundo onde cada estação dura quinze anos terrestres, os descendentes de uma colônia humana esquecida há seis séculos precisam superar a desconfiança mútua e se unir às tribos nativas antes da chegada do Grande Inverno.',
  },
  {
    id: 'br-capote-gogol',
    title: 'O Capote e Outras Histórias',
    author: 'Nikolai Gógol',
    publisher: 'Editora 34',
    year: 1842,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/763544-L.jpg',
    genres: ['Clássico Russo', 'Sátira Sombria', 'Contos'],
    resumo:
      'No frio cortante de São Petersburgo, o humilde copista Akáki Akákievitch sacrifica meses de fome para costurar um capote novo — cujo roubo na primeira noite desencadeia uma tragédia grotesca.',
  },
  {
    id: 'br-dama-espadas',
    title: 'A Dama de Espadas',
    author: 'Aleksandr Púchkin',
    publisher: 'Editora 34',
    year: 1834,
    pages: 112,
    coverUrl: 'https://covers.openlibrary.org/b/id/103691-L.jpg',
    genres: ['Clássico Russo', 'Obsessão', 'Gótico'],
    resumo:
      'O calculista oficial de engenharia Hermann jamais arrisca uma moeda nas mesas de jogo — até ouvir que uma velha condessa guarda o segredo místico de três cartas infalíveis.',
  },
  {
    id: 'br-desonra',
    title: 'Desonra',
    author: 'J. M. Coetzee',
    publisher: 'Companhia das Letras',
    year: 1999,
    pages: 248,
    coverUrl: 'https://covers.openlibrary.org/b/id/11434870-L.jpg',
    genres: ['Drama Moral', 'Clássico Contemporâneo'],
    resumo:
      'Expulso da universidade na Cidade do Cabo após um escândalo, o professor David Lurie refugia-se na pequena fazenda da filha no interior da África do Sul pós-apartheid, onde a violência bate à porta.',
  },
  {
    id: 'br-esperando-barbaros',
    title: 'À Espera dos Bárbaros',
    author: 'J. M. Coetzee',
    publisher: 'Companhia das Letras',
    year: 1980,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/12372572-L.jpg',
    genres: ['Alegoria Política', 'Dilema Moral', 'Clássico'],
    resumo:
      'Um velho magistrado administra em paz um posto avançado de fronteira até a chegada do Coronel Joll, da polícia secreta do Império, que fabrica pelo uso da tortura a guerra contra os nômades do deserto.',
  },
  {
    id: 'br-a-queda',
    title: 'A Queda',
    author: 'Albert Camus',
    publisher: 'Record',
    year: 1956,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/745331-L.jpg',
    genres: ['Clássico', 'Existencialismo', 'Culpa'],
    resumo:
      'Nas mesas enfumaçadas de um bar no porto de Amsterdã, o ex-advogado parisiense Jean-Baptiste Clamence confessa a um desconhecido a noite em que ouviu um corpo cair no rio Sena e seguiu caminhando.',
  },
  {
    id: 'br-muro-sartre',
    title: 'O Muro',
    author: 'Jean-Paul Sartre',
    publisher: 'Nova Fronteira',
    year: 1939,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/10820937-L.jpg',
    genres: ['Existencialismo', 'Contos', 'Guerra'],
    resumo:
      'Cinco narrativas sobre a liberdade humana no limite — lideradas pela noite de três prisioneiros republicanos na Guerra Civil Espanhola aguardando o pelotão de fuzilamento ao amanhecer.',
  },
  {
    id: 'br-temor-e-tremor',
    title: 'Temor e Tremor',
    author: 'Søren Kierkegaard',
    publisher: 'Vozes',
    year: 1843,
    pages: 176,
    coverUrl: 'https://covers.openlibrary.org/b/id/15095511-L.jpg',
    genres: ['Filosofia', 'Ética & Sacrifício', 'Existencialismo'],
    resumo:
      'Através da caminhada silenciosa de três dias de Abraão até o monte Moriá com o filho Isaac, Kierkegaard investiga a angústia solitária de decisões que ultrapassam toda ética universal.',
  },
  {
    id: 'br-sobre-brevidade-vida',
    title: 'Sobre a Brevidade da Vida',
    author: 'Sêneca',
    publisher: 'Penguin-Companhia',
    year: 49,
    pages: 128,
    coverUrl: 'https://covers.openlibrary.org/b/id/13201519-L.jpg',
    genres: ['Filosofia', 'Estoicismo', 'Clássico'],
    resumo:
      'O ensaio clássico de Sêneca demonstrando que a vida humana não é curta, mas sim desperdiçada em ambições alheias, adiantamentos inúteis e medo do fim.',
  },
  {
    id: 'br-dores-do-mundo',
    title: 'As Dores do Mundo',
    author: 'Arthur Schopenhauer',
    publisher: 'Edipro',
    year: 1851,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/11926557-L.jpg',
    genres: ['Filosofia', 'Pessimismo', 'Ensaio'],
    resumo:
      'Reflexões diretas e sem verniz sobre a primazia da dor na experiência humana, o pêndulo entre a carência e o tédio, e a compaixão como única resposta ética ao sofrimento.',
  },
  {
    id: 'br-inconveniente-ter-nascido',
    title: 'Do Inconveniente de Ter Nascido',
    author: 'Emil Cioran',
    publisher: 'Rocco',
    year: 1973,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/4486369-L.jpg',
    genres: ['Filosofia', 'Aforismos', 'Pessimismo'],
    resumo:
      'Aforismos afiados como navalha em que Cioran leva o ceticismo às últimas consequências, tratando o nascimento, a história e a consciência com uma ironia estranhamente revigorante.',
  },
  {
    id: 'br-breviario-decomposicao',
    title: 'Breviário de Decomposição',
    author: 'Emil Cioran',
    publisher: 'Rocco',
    year: 1949,
    pages: 216,
    coverUrl: 'https://covers.openlibrary.org/b/id/13286082-L.jpg',
    genres: ['Filosofia', 'Niilismo', 'Ensaio'],
    resumo:
      'Uma demolição lírica de todos os fanatismos, dogmas e utopias humanas, escrita por um pensador que enxerga na dúvida radical o único antídoto contra o massacre ideológico.',
  },
  {
    id: 'br-sangue-frio',
    title: 'A Sangue Frio',
    author: 'Truman Capote',
    publisher: 'Companhia das Letras',
    year: 1966,
    pages: 440,
    coverUrl: 'https://covers.openlibrary.org/b/id/228066-L.jpg',
    genres: ['Crime Real', 'Investigação', 'Clássico'],
    resumo:
      'A reconstrução minuciosa e psicológica do assassinato brutal da família Clutter numa fazenda do Kansas em 1959 e a mente dos dois ex-presidiários que cruzaram o país até aquela noite.',
  },
  {
    id: 'br-sobre-os-ossos-dos-mortos',
    title: 'Sobre os Ossos dos Mortos',
    author: 'Olga Tokarczuk',
    publisher: 'Todavia',
    year: 2009,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/9768059-L.jpg',
    genres: ['Mistério', 'Ecologia Sombria', 'Filosófico'],
    resumo:
      'Em um planalto isolado na fronteira polonesa coberto de neve, uma ex-engenheira que traduz William Blake tenta convencer a polícia de que os caçadores locais estão sendo mortos pelos próprios animais da floresta.',
  },
  {
    id: 'br-coelho-maldito',
    title: 'Coelho Maldito',
    author: 'Bora Chung',
    publisher: 'Companhia das Letras',
    year: 2017,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/11150775-L.jpg',
    genres: ['Horror Surreal', 'Contos', 'Sátira Sombria'],
    resumo:
      'Dez contos viscerais e perturbadores de horror corporal, maldições artesanais, vingança contra a ganância corporativa e armadilhas psicológicas do cotidiano moderno.',
  },
  {
    id: 'br-vegetariana',
    title: 'A Vegetariana',
    author: 'Han Kang',
    publisher: 'Todavia',
    year: 2007,
    pages: 176,
    coverUrl: amz('8588808285'),
    genres: ['Drama Psicológico', 'Transgressão', 'Literatura Coreana'],
    resumo:
      'Após um sonho sangrento, Yeonghye decide parar de comer carne — um gesto aparentemente simples de recusa à violência humana que desencadeia uma reação brutal da família e uma metamorfose radical.',
  },
  {
    id: 'br-atos-humanos',
    title: 'Atos Humanos',
    author: 'Han Kang',
    publisher: 'Todavia',
    year: 2014,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/8047485-L.jpg',
    genres: ['Drama Histórico', 'Trauma & Luto', 'Literatura Coreana'],
    resumo:
      'Em maio de 1980, durante o massacre estudantil de Gwangju na Coreia do Sul, o menino Dongho procura o corpo do amigo entre os mortos de um ginásio, deixando marcas que ecoam por décadas nos sobreviventes.',
  },
  {
    id: 'br-menina-outro-lado',
    title: 'A Menina do Outro Lado',
    author: 'Nagabe',
    publisher: 'DarkSide',
    year: 2016,
    pages: 180,
    coverUrl: 'https://covers.openlibrary.org/b/id/12371034-L.jpg',
    genres: ['Mangá', 'Fábula Sombria', 'Fantasia'],
    resumo:
      'Em um mundo dividido entre o Interior dos humanos e o Exterior amaldiçoado onde um único toque transforma qualquer pessoa em criatura das trevas, uma menina abandonada é protegida por um guardião monstruoso.',
  },
  {
    id: 'br-chamado-cthulhu',
    title: 'O Chamado de Cthulhu e Outros Contos',
    author: 'H. P. Lovecraft',
    publisher: 'Hedra',
    year: 1928,
    pages: 160,
    coverUrl: 'https://covers.openlibrary.org/b/id/15129509-L.jpg',
    genres: ['Horror Cósmico', 'Weird Fiction', 'Clássico'],
    resumo:
      'Manuscritos herdados, cultos nos pântanos da Louisiana e marinheiros sobreviventes revelam que a humanidade é apenas um acidente insignificante diante de entidades adormecidas sob o oceano.',
  },
  {
    id: 'br-nas-montanhas-loucura',
    title: 'Nas Montanhas da Loucura',
    author: 'H. P. Lovecraft',
    publisher: 'Intrínseca',
    year: 1936,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/15118410-L.jpg',
    genres: ['Horror Cósmico', 'Expedição', 'Ficção Científica'],
    resumo:
      'Uma expedição geológica à Antártida descobre, além de uma cordilheira mais alta que o Himalaia, as ruínas ciclópicas de uma civilização pré-humana e o motivo de sua extinção.',
  },
  {
    id: 'br-falcao-maltes',
    title: 'O Falcão Maltês',
    author: 'Dashiell Hammett',
    publisher: 'Companhia das Letras',
    year: 1930,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/998587-L.jpg',
    genres: ['Hardboiled Noir', 'Investigação', 'Clássico'],
    resumo:
      'Quando seu sócio é assassinado na neblina de São Francisco, o detetive particular Sam Spade mergulha num jogo de mentiras e cobiça em torno de uma estatueta negra cravejada de joias.',
  },
  {
    id: 'br-longo-adeus',
    title: 'O Longo Adeus',
    author: 'Raymond Chandler',
    publisher: 'Companhia das Letras',
    year: 1953,
    pages: 416,
    coverUrl: 'https://covers.openlibrary.org/b/id/12919198-L.jpg',
    genres: ['Noir', 'Investigação', 'Clássico'],
    resumo:
      'Em uma Los Angeles de mansões corruptas e bares vazios, o detetive Philip Marlowe cria uma amizade improvável com o veterano cheio de cicatrizes Terry Lennox — e se recusa a acreditar em seu suicídio.',
  },
  {
    id: 'br-assassinatos-rua-morgue',
    title: 'Os Assassinatos da Rua Morgue e Outras Histórias',
    author: 'Edgar Allan Poe',
    publisher: 'Penguin-Companhia',
    year: 1841,
    pages: 192,
    coverUrl: 'https://covers.openlibrary.org/b/id/11774455-L.jpg',
    genres: ['Mistério', 'Dedução Pura', 'Clássico'],
    resumo:
      'Em uma Paris noturna e enevoada, o analista C. Auguste Dupin inaugura a literatura policial ao desvendar crimes de quarto trancado usando apenas lógica matemática e observação psicológica.',
  },
  {
    id: 'br-ilha-do-medo',
    title: 'Ilha do Medo',
    author: 'Dennis Lehane',
    publisher: 'Companhia das Letras',
    year: 2003,
    pages: 336,
    coverUrl: 'https://covers.openlibrary.org/b/id/28990-L.jpg',
    genres: ['Thriller Psicológico', 'Mistério', 'Investigação'],
    resumo:
      'Em 1954, o agente federal Teddy Daniels desembarca no hospital psiquiátrico judicial de Ashecliffe, numa ilha atingida por um furacão, para investigar o desaparecimento de uma paciente de quarto trancado.',
  },
  {
    id: 'br-rur-robos',
    title: 'R.U.R. (Robôs Universais de Rossum)',
    author: 'Karel Čapek',
    publisher: 'Hedra',
    year: 1920,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/8441780-L.jpg',
    genres: ['Ficção Científica', 'IA & Rebelião', 'Clássico'],
    resumo:
      'A obra clássica que cunhou a palavra "Robô": em uma fábrica insular que produz trabalhadores sintéticos perfeitos e sem emoções para substituir o trabalho humano, as máquinas desenvolvem consciência e cercam seus criadores.',
  },
  {
    id: 'br-beedle-bardo',
    title: 'Os Contos de Beedle, o Bardo',
    author: 'J. K. Rowling',
    publisher: 'Rocco',
    year: 2008,
    pages: 128,
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/5a/36/97/5a369701-07bc-3fc3-f16a-5058bfe2c58a/9781781106792.jpg/600x900bb.jpg',
    genres: ['Fábulas Sombrias', 'Fantasia', 'Contos'],
    resumo:
      'Cinco fábulas antigas do folclore bruxo — encerradas pelo Conto dos Três Irmãos — sobre a arrogância de tentar enganar a Morte e a sabedoria de acolhê-la como uma velha igual.',
  },
  {
    id: 'br-o-velho-e-o-mar',
    title: 'O Mar Sem Fim (Contos do Mar)',
    author: 'Joseph Conrad',
    publisher: 'Companhia das Letras',
    year: 1902,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/id/8242332-L.jpg',
    genres: ['Clássico', 'Marítimo', 'Sobrevivência'],
    resumo:
      'Novelas marítimas onde capitães e tripulações enfrentam tufões implacáveis e o isolamento do oceano aberto, testando a fibra moral de cada homem no convés.',
  },
  {
    id: 'br-poeira-lunar',
    title: 'Náufragos do Espaço (A Poeira Lunar)',
    author: 'Arthur C. Clarke',
    publisher: 'Aleph',
    year: 1961,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/2385598-L.jpg',
    genres: ['Hard Sci-Fi', 'Sobrevivência Espacial', 'Clássico'],
    resumo:
      'Quando o veículo lunar Selene afunda quinze metros sob um mar de poeira finíssima durante um tremor sísmico na Lua, passageiros e engenheiros travam uma corrida claustrofóbica contra o calor e a falta de oxigênio.',
  },
  {
    id: 'br-a-peste-escarlate',
    title: 'Caninos Brancos',
    author: 'Jack London',
    publisher: 'Principis',
    year: 1906,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/8236920-L.jpg',
    genres: ['Clássico', 'Natureza Selvagem', 'Sobrevivência'],
    resumo:
      'No gelo impiedoso do território de Yukon, um lobo mestiço aprende a lei brutal do porrete e da presa entre a selva e a crueldade dos homens.',
  },
  {
    id: 'br-construcao-castelo',
    title: 'A Construção e Outros Contos',
    author: 'Franz Kafka',
    publisher: 'Companhia das Letras',
    year: 1924,
    pages: 144,
    coverUrl: 'https://covers.openlibrary.org/b/id/14934710-L.jpg',
    genres: ['Clássico', 'Paranoia', 'Alegoria'],
    resumo:
      'Uma criatura subterrânea projeta um labirinto de túneis perfeitos para se proteger do mundo exterior, mas passa a ouvir um ruído incessante cavando através da terra.',
  },
  {
    id: 'br-bartleby',
    title: 'Bartleby, o Escrivão',
    author: 'Herman Melville',
    publisher: 'Cosac Naify',
    year: 1853,
    pages: 96,
    coverUrl: 'https://covers.openlibrary.org/b/id/10521439-L.jpg',
    genres: ['Clássico', 'Absurdo Existencial', 'Novela'],
    resumo:
      'Em um escritório de advocacia em Wall Street, um copista exemplar passa a responder a toda ordem de trabalho ou convenção social com uma única frase serena e irredutível: "Acho melhor não".',
  },
  {
    id: 'br-relatorio-brodeck',
    title: 'O Relatório de Brodeck',
    author: 'Philippe Claudel',
    publisher: 'Record',
    year: 2007,
    pages: 336,
    coverUrl: 'https://covers.openlibrary.org/b/id/6305421-L.jpg',
    genres: ['Drama Moral', 'Pós-Guerra', 'Mistério'],
    resumo:
      'Recém-retornado de um campo de concentração para sua aldeia nas montanhas, Brodeck é obrigado pelos vizinhos a redigir um relatório oficial que justifique o assassinato coletivo de um forasteiro.',
  },
  {
    id: 'br-deserto-almas',
    title: 'O Pássaro Pintado',
    author: 'Jerzy Kosinski',
    publisher: 'Arqueiro',
    year: 1965,
    pages: 272,
    coverUrl: 'https://covers.openlibrary.org/b/id/7165920-L.jpg',
    genres: ['Guerra', 'Drama Sombrio', 'Sobrevivência'],
    resumo:
      'Separado dos pais no Leste Europeu durante a Segunda Guerra Mundial, um menino vaga sozinho por aldeias remotas testemunhando a superstição, a crueldade e o instinto humano sem freios.',
  },
  {
    id: 'br-a-vegetacao-subterranea',
    title: ' Solaris & O Invencível: O Invencível',
    author: 'Stanisław Lem',
    publisher: 'Aleph',
    year: 1964,
    pages: 256,
    coverUrl: 'https://covers.openlibrary.org/b/id/7394465-L.jpg',
    genres: ['Hard Sci-Fi', 'Evolução Mecânica'],
    resumo:
      'O cruzador pesado Invencível pousa no deserto de Regis III para investigar o desaparecimento de sua nave gêmea e descobre que a evolução natural naquele planeta pertenceu a enxames de micro-máquinas.',
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
      'br-fundacao',
      'br-esfera',
      'br-cantico-leibowitz',
      'br-tau-zero',
      'br-eu-robo',
      'br-watchmen',
      'br-recursao',
      'br-2001-odisseia',
      'br-guerra-sem-fim',
      'br-fundacao-imperio',
      'br-segunda-fundacao',
      'br-proprios-deuses',
      'br-jogo-exterminador',
      'br-sistemas-criticos',
      'br-tres-corpos',
    ],
  },
  {
    id: 'cooper',
    name: 'Cooper',
    source: 'Interestelar',
    imageUrl: 'https://i.pinimg.com/1200x/03/6f/50/036f50531444a35c03d238f6e7dcd967.jpg',
    thread: 'Pilotos e pais que atravessam o horizonte de eventos para cumprir a promessa de voltar.',
    bookIds: [
      'br-tau-zero',
      'br-2001-odisseia',
      'br-maquina-do-tempo',
      'br-a-sentinela',
      'br-perdido-em-marte',
      'br-contato',
      'br-encontro-rama',
      'br-fim-eternidade',
      'br-a-estrada',
      'br-materia-escura',
      'br-retorno-das-estrelas',
      'br-esfera',
      'br-solaris',
      'br-recursao',
      'br-orador-mortos',
      'br-patrulha-do-tempo',
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
      'br-desonra',
      'br-atos-humanos',
      'br-relatorio-brodeck',
      'br-estrelas-meu-destino',
      'br-a-estrada',
      'br-onde-os-velhos',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-brigadas-fantasmas',
      'br-guerra-sem-fim',
      'br-nada-novo-front',
      'br-quem-vai-la',
      'br-sereias-de-tita',
      'br-alma-do-imperador',
      'br-orador-mortos',
    ],
  },
  {
    id: 'bruce-wayne',
    name: 'Bruce Wayne',
    source: 'Batman',
    imageUrl: 'https://i.pinimg.com/1200x/74/8c/50/748c508529c0d8b8ef76ed9341488ce1.jpg',
    thread: 'Detetives noturnos moldados pelo trauma que transformam o medo em método.',
    bookIds: [
      'br-ano-um',
      'br-cavaleiro-trevas',
      'br-falcao-maltes',
      'br-assassinatos-rua-morgue',
      'br-watchmen',
      'br-silencio-inocentes',
      'br-estrelas-meu-destino',
      'br-medico-e-monstro',
      'br-e-nao-sobrou-nenhum',
      'br-estudo-vermelho',
      'br-cao-baskerville',
      'br-cidade-e-a-cidade',
      'br-piada-mortal',
      'br-dragao-vermelho',
      'br-scanner-darkly',
      'br-v-de-vinganca',
    ],
  },
  {
    id: 'ultron',
    name: 'Ultron',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/0c/9d/f5/0c9df5f9b4380bb94b1f8a23e37e5767.jpg',
    thread: 'Criações que concluem que o criador é o problema.',
    bookIds: [
      'br-eu-robo',
      'br-a-vegetacao-subterranea',
      'br-rur-robos',
      'br-nao-tenho-boca',
      'br-sol-desvelado',
      'br-count-zero',
      'br-mona-lisa-overdrive',
      'br-2001-odisseia',
      'br-frankenstein',
      'br-neuromancer',
      'br-androides-sonham',
      'br-ilha-dr-moreau',
      'br-fim-da-infancia',
      'br-homem-bicentenario',
      'br-sistemas-criticos',
      'br-burning-chrome',
    ],
  },
  {
    id: 'thanos',
    name: 'Thanos',
    source: 'Marvel',
    imageUrl: 'https://i.pinimg.com/736x/c6/c4/e4/c6c4e46289db210071f2cd424adc09c4.jpg',
    thread: 'Convictos de que a destruição calculada é um ato de salvação.',
    bookIds: [
      'br-guerra-sem-fim',
      'br-tres-corpos',
      'br-fundacao-imperio',
      'br-cair-da-noite',
      'br-watchmen',
      'br-messias-duna',
      'br-fundacao',
      'br-o-principe',
      'br-tres-estigmas',
      'br-fim-da-infancia',
      'br-parabola-semeador',
      'br-esfera',
      'br-sereias-de-tita',
      'br-alem-bem-mal',
      'br-dia-dos-trifidos',
      'br-deus-da-ira',
    ],
  },
  {
    id: 'tai-lung',
    name: 'Tai Lung',
    source: 'Kung Fu Panda',
    imageUrl: 'https://i.pinimg.com/736x/a1/37/66/a137666a3d0f60df80bc1af2860082be.jpg',
    thread: 'Discípulos moldados no limite da disciplina marcial que se rebelam quando o destino prometido lhes é negado.',
    bookIds: [
      'br-all-you-need-is-kill',
      'br-cinco-aneis',
      'br-arte-da-guerra',
      'br-brigadas-fantasmas',
      'br-caim',
      'br-otelo',
      'br-ronin-miller',
      'br-frankenstein',
      'br-rei-lear',
      'br-estrelas-meu-destino',
      'br-senhor-da-luz',
      'br-macbeth',
      'br-jogo-exterminador',
      'br-tropas-estelares',
      'br-alma-do-imperador',
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
      'br-deserto-almas',
      'br-a-peste-escarlate',
      'br-praga-escarlate',
      'br-genealogia-moral',
      'br-o-concorrente',
      'br-coracao-trevas',
      'br-ensaio-cegueira',
      'br-laranja-mecanica',
      'br-revolucao-bichos',
      'br-longa-marcha',
      'br-meridiano-sangue',
      'br-clube-da-luta',
      'br-jogos-vorazes',
      'br-ilha-dr-moreau',
      'br-arranha-ceu',
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
      'br-guerra-dos-mundos',
      'br-curva-sonho',
      'br-ilha-dr-moreau',
      'br-nao-me-abandone',
      'br-admiravel-mundo-novo',
      'br-neuromancer',
      'br-homem-bicentenario',
      'br-homem-invisivel',
      'br-coracao-de-cachorro',
      'br-proprios-deuses',
      'br-akira',
      'br-count-zero',
      'br-burning-chrome',
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
      'br-patrulha-do-tempo',
      'br-capitaes-areia',
      'br-despossuidos',
      'br-akira',
      'br-materia-escura',
      'br-maquina-do-tempo',
      'br-fim-eternidade',
      'br-neuromancer',
      'br-jogos-vorazes',
      'br-o-concorrente',
      'br-1984',
      'br-v-de-vinganca',
      'br-rato-aco-inoxidavel',
      'br-kindred',
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
      'br-intermitencias-morte',
      'br-fim-da-infancia',
      'br-cidade-e-as-estrelas',
      'br-androides-sonham',
      'br-eu-robo',
      'br-nao-me-abandone',
      'br-watchmen',
      'br-2001-odisseia',
      'br-sistemas-criticos',
      'br-sol-desvelado',
      'br-cavernas-aco',
      'br-orador-mortos',
      'br-solaris',
      'br-cidade-simak',
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
      'br-mochileiro-galaxias',
      'br-coracao-de-cachorro',
      'br-inconveniente-ter-nascido',
      'br-memorias-postumas',
      'br-flores-algernon',
      'br-frankenstein',
      'br-nao-me-abandone',
      'br-perdido-em-marte',
      'br-planeta-macacos',
      'br-androides-sonham',
      'br-guerra-velho',
      'br-matadouro-cinco',
      'br-akira',
      'br-sistemas-criticos',
      'br-rato-aco-inoxidavel',
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
      'br-e-isto-um-homem',
      'br-homem-castelo-alto',
      'br-homem-do-labirinto',
      'br-vozes-tchernobil',
      'br-em-busca-sentido',
      'br-eichmann-jerusalem',
      'br-persepolis',
      'br-planeta-macacos',
      'br-revolucao-bichos',
      'br-watchmen',
      'br-cair-da-noite',
      'br-estrelas-meu-destino',
      'br-o-principe',
      'br-1984',
      'br-v-de-vinganca',
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
      'br-senhor-da-luz',
      'br-rato-aco-inoxidavel',
      'br-ricardo-iii',
      'br-sandman',
      'br-lugar-nenhum',
      'br-rei-lear',
      'br-sereias-de-tita',
      'br-macbeth',
      'br-hamlet',
      'br-caim',
      'br-reis-da-areia',
      'br-quinta-cabeca-cerbero',
      'br-alma-do-imperador',
      'br-coracao-de-cachorro',
      'br-ciberiada',
    ],
  },
  {
    id: 'coringa',
    name: 'O Coringa',
    source: 'DC',
    imageUrl: 'https://i.pinimg.com/736x/fe/43/c4/fe43c4b256341c850a0380aec588ade1.jpg',
    thread: 'O riso anárquico do subsolo que quer provar que a sanidade civilizada é uma farsa.',
    bookIds: [
      'br-piada-mortal',
      'br-laranja-mecanica',
      'br-o-alienista',
      'br-congresso-futurologico',
      'br-breviario-decomposicao',
      'br-memorias-subsolo',
      'br-o-estrangeiro',
      'br-arranha-ceu',
      'br-watchmen',
      'br-silencio-inocentes',
      'br-medico-e-monstro',
      'br-clube-da-luta',
      'br-duplo',
      'br-fluam-minhas-lagrimas',
      'br-o-perfume',
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
      'br-cidade-e-a-cidade',
      'br-cavernas-aco',
      'br-paciente-silenciosa',
      'br-garota-exemplar',
      'br-silencio-inocentes',
      'br-sol-desvelado',
      'br-assassinatos-rua-morgue',
      'br-dragao-vermelho',
      'br-ficcoes',
      'br-espiao-saiu-frio',
      'br-livro-de-areia',
    ],
  },
  {
    id: 'dra-brand',
    name: 'Dra. Brand',
    source: 'Interestelar',
    imageUrl: 'https://i.pinimg.com/736x/58/20/8a/58208a064a51bd0478bb622f5701aa6b.jpg',
    thread: 'Expedicionários em mundos hostis divididos entre o cálculo de sobrevivência e o amor.',
    bookIds: [
      'br-solaris',
      'br-mao-esquerda-escuridao',
      'br-encontro-rama',
      'br-piquenique-estrada',
      'br-orador-mortos',
      'br-contato',
      'br-tau-zero',
      'br-2001-odisseia',
      'br-fim-da-infancia',
      'br-tres-corpos',
      'br-planeta-de-exilio',
      'br-despossuidos',
      'br-aniquilacao',
      'br-proprios-deuses',
      'br-perdido-em-marte',
      'br-poeira-lunar',
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
      'br-fim-eternidade',
      'br-proprios-deuses',
      'br-ficcoes',
      'br-aleph',
      'br-segunda-fundacao',
      'br-tres-corpos',
      'br-recursao',
      'br-mundo-invertido',
      'br-encontro-rama',
      'br-materia-escura',
      'br-tau-zero',
      'br-planolandia',
      'br-despossuidos',
      'br-fundacao',
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
      'br-beedle-bardo',
      'br-o-hobbit',
      'br-jogo-exterminador',
      'br-retorno-rei',
      'br-quinta-cabeca-cerbero',
      'br-demian',
      'br-coraline',
      'br-o-nevoeiro',
      'br-morte-da-luz',
      'br-oceano-fim-caminho',
      'br-cair-da-noite',
      'br-sombra-do-vento',
      'br-jogos-vorazes',
      'br-lugar-nenhum',
      'br-cidade-e-as-estrelas',
    ],
  },
  {
    id: 'sirius-black',
    name: 'Sirius Black',
    source: 'Harry Potter',
    imageUrl: 'https://i.pinimg.com/1200x/50/18/82/50188211e706a9b4e0057ae5942a009c.jpg',
    thread: 'Prisioneiros inocentes que atravessam anos de cativeiro sem trair quem amam.',
    bookIds: [
      'br-estrelas-meu-destino',
      'br-sonho-liberdade',
      'br-um-dia-ivan-denissovitch',
      'br-castelo',
      'br-colonia-penal',
      'br-muro-sartre',
      'br-o-processo',
      'br-feiticeiro-terramar',
      'br-homem-do-labirinto',
      'br-1984',
      'br-alma-do-imperador',
      'br-oceano-fim-caminho',
      'br-invencao-de-morel',
      'br-em-busca-sentido',
      'br-sandman',
      'br-fluam-minhas-lagrimas',
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
      'br-espiao-saiu-frio',
      'br-vestigios-dia',
      'br-sombra-do-vento',
      'br-invencao-de-morel',
      'br-diario-homem-superfluo',
      'br-todos-os-nomes',
      'br-estrelas-meu-destino',
      'br-noites-brancas',
      'br-morte-da-luz',
      'br-grande-gatsby',
      'br-scanner-darkly',
      'br-hamlet',
      'br-segunda-fundacao',
      'br-orador-mortos',
      'br-gigante-enterrado',
    ],
  },
  {
    id: 'ellie-williams',
    name: 'Ellie Williams',
    source: 'The Last of Us',
    imageUrl: 'https://i.pinimg.com/736x/b1/4d/69/b14d6942c96e8d1cc9191371dbbe8566.jpg',
    thread: 'O luto que vira caçada implacável em um mundo em ruínas até não restar mais nada.',
    bookIds: [
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-estacao-onze',
      'br-objetos-cortantes',
      'br-lugares-escuros',
      'br-carrie',
      'br-a-estrada',
      'br-cidade-ladroes',
      'br-caixa-passaros',
      'br-onde-os-velhos',
      'br-aniquilacao',
      'br-jogos-vorazes',
      'br-dia-dos-trifidos',
      'br-morro-ventos-uivantes',
      'br-parabola-semeador',
      'br-praga-escarlate',
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
      'br-o-cemiterio',
      'br-caixa-passaros',
      'br-vidas-secas',
      'br-peste',
      'br-dia-dos-trifidos',
      'br-zona-morta',
      'br-cidade-ladroes',
      'br-eu-sou-a-lenda',
      'br-ensaio-cegueira',
      'br-onde-os-velhos',
      'br-rei-lear',
      'br-estacao-onze',
      'br-praga-escarlate',
      'br-parabola-semeador',
      'br-cronicas-marcianas',
    ],
  },
  {
    id: 'anakin',
    name: 'Anakin Skywalker',
    source: 'Star Wars',
    imageUrl: 'https://i.pinimg.com/736x/21/04/a6/2104a6c0d3a78039bfac4fcac6a039b7.jpg',
    thread: 'O escolhido corrompido pelo pavor de perder quem ama.',
    bookIds: [
      'br-cair-da-noite',
      'br-messias-duna',
      'br-parabola-semeador',
      'br-dorian-gray',
      'br-otelo',
      'br-dama-espadas',
      'br-macbeth',
      'br-morte-da-luz',
      'br-o-cemiterio',
      'br-senhor-da-luz',
      'br-ricardo-iii',
      'br-reis-da-areia',
      'br-zona-morta',
      'br-fundacao-imperio',
      'br-homem-invisivel',
      'br-quem-vai-la',
    ],
  },
  {
    id: 'michael-corleone',
    name: 'Michael Corleone',
    source: 'O Poderoso Chefão',
    imageUrl: 'https://i.pinimg.com/736x/e9/ac/d4/e9acd40867ec1fe8c3e43cb8c8ec5183.jpg',
    thread: 'A metamorfose fria do filho que queria ficar limpo e se torna o imperador da família.',
    bookIds: [
      'br-congresso-futurologico',
      'br-o-principe',
      'br-macbeth',
      'br-reis-da-areia',
      'br-fundacao',
      'br-fundacao-imperio',
      'br-ricardo-iii',
      'br-estrelas-meu-destino',
      'br-arte-da-guerra',
      'br-segunda-fundacao',
      'br-rei-lear',
      'br-messias-duna',
      'br-hamlet',
      'br-vigiar-punir',
      'br-meditacoes',
      'br-bons-companheiros',
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
      'br-sistemas-criticos',
      'br-tempo-desconjuntado',
      'br-homem-duplicado',
      'br-cavernas-aco',
      'br-klara-e-o-sol',
      'br-homem-bicentenario',
      'br-neuromancer',
      'br-ubik',
      'br-eu-robo',
      'br-count-zero',
      'br-mona-lisa-overdrive',
      'br-burning-chrome',
      'br-sol-desvelado',
      'br-quinta-cabeca-cerbero',
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
      'br-defesa-lujin',
      'br-a-metamorfose',
      'br-fome',
      'br-nausea',
      'br-o-naufrago',
      'br-apanhador-centeio',
      'br-martin-eden',
      'br-norwegian-wood',
      'br-livro-do-xadrez',
      'br-morte-veneza',
      'br-vestigios-dia',
      'br-lobo-estepe',
      'br-morte-ivan-ilitch',
      'br-sono-murakami',
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
      'br-esperando-barbaros',
      'br-dificil-ser-deus',
      'br-cidade-simak',
      'br-meditacoes',
      'br-floresta-nome-mundo',
      'br-planeta-de-exilio',
      'br-ilha-dr-moreau',
      'br-fundacao',
      'br-maus',
      'br-arte-da-guerra',
      'br-despossuidos',
      'br-rur-robos',
      'br-parabola-semeador',
      'br-retorno-rei',
    ],
  },
  {
    id: 'logan',
    name: 'Logan',
    source: 'X-Men',
    imageUrl: 'https://i.pinimg.com/1200x/e0/4e/6a/e04e6acd04ce9c676ab451abf84d3f0d.jpg',
    thread: 'Velhos guerreiros exaustos de sangue que encontram um último motivo para lutar.',
    bookIds: [
      'br-guerra-velho',
      'br-nada-novo-front',
      'br-hadji-murat',
      'br-deserto-tartaros',
      'br-guerra-sem-fim',
      'br-a-estrada',
      'br-onde-os-velhos',
      'br-meridiano-sangue',
      'br-cidade-ladroes',
      'br-eu-sou-a-lenda',
      'br-caixa-passaros',
      'br-frankenstein',
      'br-o-cemiterio',
      'br-homem-caiu-na-terra',
      'br-espiao-saiu-frio',
      'br-brigadas-fantasmas',
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
      'br-homens-sem-mulheres',
      'br-apos-o-escurecer',
      'br-sono-murakami',
      'br-invencao-de-morel',
      'br-morte-da-luz',
      'br-sombra-do-vento',
      'br-martin-eden',
      'br-cronicas-marcianas',
      'br-vestigios-dia',
      'br-homem-caiu-na-terra',
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
      'br-mundo-anel',
      'br-reis-da-areia',
      'br-estrela-distante',
      'br-noturno-chile',
      'br-carmilla',
      'br-onde-os-velhos',
      'br-nao-tenho-boca',
      'br-senhor-das-moscas',
      'br-o-principe',
      'br-deus-da-ira',
      'br-alem-bem-mal',
      'br-genealogia-moral',
      'br-cor-caiu-do-espaco',
      'br-colonia-penal',
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
      'br-o-concorrente',
      'br-longa-marcha',
      'br-conto-da-aia',
      'br-fahrenheit-451',
      'br-ensaio-lucidez',
      'br-1984',
      'br-revolucao-bichos',
      'br-senhor-das-moscas',
      'br-v-de-vinganca',
      'br-jogo-exterminador',
      'br-persepolis',
      'br-capitaes-areia',
      'br-admiravel-mundo-novo',
      'br-parabola-semeador',
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
      'br-brigadas-fantasmas',
      'br-tropas-estelares',
      'br-alma-do-imperador',
      'br-jogo-exterminador',
      'br-assim-falou-zaratustra',
      'br-all-you-need-is-kill',
      'br-cinco-aneis',
      'br-arte-da-guerra',
      'br-guerra-sem-fim',
      'br-guerra-velho',
      'br-estrelas-meu-destino',
      'br-meditacoes',
      'br-senhor-da-luz',
      'br-retorno-das-estrelas',
      'br-mundo-anel',
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
      'br-livro-do-xadrez',
      'br-planolandia',
      'br-martin-eden',
      'br-ciberiada',
      'br-misery',
      'br-gambito-rainha',
      'br-defesa-lujin',
      'br-fome',
      'br-morte-veneza',
      'br-cozinha-confidencial',
      'br-cinco-aneis',
      'br-all-you-need-is-kill',
      'br-um-jogador',
      'br-lobo-estepe',
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
      'br-aniquilacao',
      'br-sobre-os-ossos-dos-mortos',
      'br-mundo-afogado',
      'br-vegetariana',
      'br-oceano-fim-caminho',
      'br-planeta-de-exilio',
      'br-feiticeiro-terramar',
      'br-o-hobbit',
      'br-planeta-macacos',
      'br-cronicas-marcianas',
      'br-retorno-rei',
      'br-dia-dos-trifidos',
      'br-gigante-enterrado',
      'br-cidade-simak',
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
      'br-arranha-ceu',
      'br-sociedade-espetaculo',
      'br-duplo',
      'br-lobo-estepe',
      'br-scanner-darkly',
      'br-medico-e-monstro',
      'br-memorias-subsolo',
      'br-laranja-mecanica',
      'br-homem-duplicado',
      'br-assim-falou-zaratustra',
      'br-genealogia-moral',
      'br-v-de-vinganca',
      'br-tres-estigmas',
      'br-nausea',
      'br-o-estrangeiro',
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
      'br-estranho-misterioso',
      'br-expiracao',
      'br-dores-do-mundo',
      'br-mochileiro-galaxias',
      'br-ubik',
      'br-proprios-deuses',
      'br-recursao',
      'br-curva-sonho',
      'br-fim-eternidade',
      'br-sereias-de-tita',
      'br-congresso-futurologico',
      'br-memorias-postumas',
      'br-ficcoes',
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
      'br-scanner-darkly',
      'br-tempo-desconjuntado',
      'br-o-processo',
      'br-leilao-lote-49',
      'br-burning-chrome',
      'br-homem-quinta-feira',
      'br-construcao-castelo',
      'br-clube-da-luta',
      'br-1984',
      'br-v-de-vinganca',
      'br-fluam-minhas-lagrimas',
      'br-ubik',
      'br-homem-duplicado',
      'br-vigiar-punir',
      'br-count-zero',
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
      'br-ubik',
      'br-a-republica',
      'br-admiravel-mundo-novo',
      'br-sidarta',
      'br-neuromancer',
      'br-1984',
      'br-tres-estigmas',
      'br-fahrenheit-451',
      'br-meditacoes',
      'br-arte-da-guerra',
      'br-tempo-desconjuntado',
      'br-androides-sonham',
      'br-fim-da-infancia',
      'br-demian',
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
      'br-invasores-de-corpos',
      'br-quem-vai-la',
      'br-coelho-maldito',
      'br-admiravel-mundo-novo',
      'br-2001-odisseia',
      'br-eu-robo',
      'br-simulacros-simulacao',
      'br-o-processo',
      'br-nao-tenho-boca',
      'br-homem-duplicado',
      'br-eichmann-jerusalem',
      'br-colonia-penal',
      'br-rur-robos',
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
      'br-morte-ivan-ilitch',
      'br-rei-lear',
      'br-de-quanta-terra',
      'br-o-principe',
      'br-arte-da-guerra',
      'br-macbeth',
      'br-onde-os-velhos',
      'br-ricardo-iii',
      'br-em-busca-sentido',
      'br-um-jogador',
      'br-grande-gatsby',
      'br-cozinha-confidencial',
      'br-arranha-ceu',
      'br-a-queda',
      'br-desonra',
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
      'br-espiao-sabia-demais',
      'br-dia-do-chacal',
      'br-terceiro-homem',
      'br-um-jogador',
      'br-espiao-saiu-frio',
      'br-rato-aco-inoxidavel',
      'br-o-principe',
      'br-arte-da-guerra',
      'br-scanner-darkly',
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
      'br-onde-os-velhos',
      'br-cumes-desespero',
      'br-chamado-cthulhu',
      'br-nas-montanhas-loucura',
      'br-inconveniente-ter-nascido',
      'br-dragao-vermelho',
      'br-cor-caiu-do-espaco',
      'br-meridiano-sangue',
      'br-cidade-e-a-cidade',
      'br-o-estrangeiro',
      'br-assim-falou-zaratustra',
      'br-mito-sisifo',
      'br-lugares-escuros',
      'br-objetos-cortantes',
      'br-piquenique-estrada',
    ],
  },
  {
    id: 'rorschach',
    name: 'Rorschach',
    source: 'Watchmen',
    imageUrl: 'https://i.pinimg.com/736x/e3/98/44/e3984464d2d5cf821e869419426eba66.jpg',
    thread: 'Absolutistas morais que caminham pelos esgotos da cidade e preferem morrer a pactuar com uma mentira conveniente.',
    bookIds: [
      'br-watchmen',
      'br-sin-city',
      'br-ronin-miller',
      'br-cavaleiro-trevas',
      'br-v-de-vinganca',
      'br-inimigo-do-povo',
      'br-longo-adeus',
      'br-falcao-maltes',
      'br-memorias-subsolo',
      'br-fluam-minhas-lagrimas',
      'br-ano-um',
      'br-piada-mortal',
      'br-a-queda',
      'br-relatorio-brodeck',
      'br-cidade-e-a-cidade',
      'br-ilha-do-medo',
    ],
  },
  {
    id: 'hannibal',
    name: 'Hannibal',
    source: 'O Silêncio dos Inocentes',
    imageUrl: 'https://i.pinimg.com/1200x/9f/53/3e/9f533ed653c6485a367511d276f0cc95.jpg',
    thread: 'Predadores de erudição renascentista que tratam a mente humana, a arte e a morte como gastronomia e estética.',
    bookIds: [
      'br-silencio-inocentes',
      'br-caso-charles-dexter-ward',
      'br-assassinato-belas-artes',
      'br-dragao-vermelho',
      'br-o-perfume',
      'br-colecionador',
      'br-dorian-gray',
      'br-gato-preto',
      'br-sangue-frio',
      'br-carmilla',
      'br-reis-da-areia',
      'br-morte-veneza',
      'br-paciente-silenciosa',
      'br-medico-e-monstro',
      'br-sonata-kreutzer',
      'br-alem-bem-mal',
    ],
  },
  {
    id: 'zima-blue',
    name: 'Zima Blue',
    source: 'Love, Death & Robots',
    imageUrl: 'https://i.pinimg.com/736x/42/3e/1d/423e1d0115718b56af29afc78197fb47.jpg',
    thread: 'Artistas cósmicos que atravessam o universo inteiro apenas para descobrir que a verdade sempre esteve na tarefa mais simples da origem.',
    bookIds: [
      'br-zima-blue-contos',
      'br-historia-sua-vida',
      'br-ciberiada',
      'br-tao-te-ching',
      'br-cidades-invisiveis',
      'br-expiracao',
      'br-sidarta',
      'br-homem-bicentenario',
      'br-klara-e-o-sol',
      'br-2001-odisseia',
      'br-solaris',
      'br-ficcoes',
      'br-aleph',
      'br-a-sentinela',
      'br-fim-da-infancia',
      'br-bartleby',
    ],
  },
  {
    id: 'odisseu',
    name: 'Odisseu',
    source: 'A Odisseia',
    imageUrl: 'https://i.pinimg.com/1200x/1c/81/99/1c8199cdf35d7d84e8db5a042649b960.jpg',
    thread: 'A astúcia humana contra deuses e mares bravios: o homem que recusa a imortalidade apenas para voltar para casa.',
    bookIds: [
      'br-retorno-das-estrelas',
      'br-circe',
      'br-descida-maelstrom',
      'br-mundo-invertido',
      'br-poeira-lunar',
      'br-cancao-aquiles',
      'br-mundo-anel',
      'br-narrativa-pym',
      'br-o-velho-e-o-mar',
      'br-tau-zero',
      'br-estrelas-meu-destino',
      'br-arte-da-guerra',
      'br-guerra-sem-fim',
      'br-o-hobbit',
      'br-mito-sisifo',
      'br-a-sentinela',
    ],
  },
  {
    id: 'hamnet',
    name: 'Hamnet',
    source: 'Hamnet',
    imageUrl: 'https://i.pinimg.com/736x/37/fd/0b/37fd0b2b286105ecfbb6d40aabf8c49f.jpg',
    thread: 'O silêncio devastador de uma infância interrompida pela peste, a natureza que respira o luto e a dor transmutada em arte imortal.',
    bookIds: [
      'br-hamnet',
      'br-ano-pensamento-magico',
      'br-lincoln-no-bardo',
      'br-anatomia-luto',
      'br-hamlet',
      'br-oceano-fim-caminho',
      'br-gigante-enterrado',
      'br-o-cemiterio',
      'br-a-estrada',
      'br-peste',
      'br-cronica-morte-anunciada',
      'br-pedro-paramo',
      'br-menina-outro-lado',
      'br-temor-e-tremor',
      'br-rei-lear',
      'br-cronicas-marcianas',
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

const DYNAMIC_CHAR_BOOKS_STORAGE_KEY = 'veredito_dynamic_char_books_v2';

// ---------------------------------------------------------------------------
// Trava de Exclusividade de Top 3 (O(1) em memória, zero impacto de performance)
// Garante que cada personagem possua 3 obras-âncora iniciais 100% exclusivas,
// evitando que o mesmo livro apareça na vitrine principal de vários personagens.
// ---------------------------------------------------------------------------
const TOP3_OWNER_BY_BOOK_ID = new Map<string, string>();

(function enforceExclusiveTopThreeAcrossPool() {
  for (const char of CHARACTER_POOL) {
    const exclusiveTop3: string[] = [];
    const remaining: string[] = [];

    for (const bookId of char.bookIds) {
      if (!BOOKS_BY_ID.has(bookId)) continue;
      const existingOwner = TOP3_OWNER_BY_BOOK_ID.get(bookId);
      if (exclusiveTop3.length < 3 && (!existingOwner || existingOwner === char.id)) {
        exclusiveTop3.push(bookId);
        TOP3_OWNER_BY_BOOK_ID.set(bookId, char.id);
      } else {
        remaining.push(bookId);
      }
    }

    char.bookIds = [...exclusiveTop3, ...remaining];
  }
})();

function isReservedByAnotherCharacterTop3(bookId: string, characterId: string): boolean {
  const owner = TOP3_OWNER_BY_BOOK_ID.get(bookId);
  return Boolean(owner && owner !== characterId);
}

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

  // Prioriza obras inéditas que NÃO pertencem ao Top 3 exclusivo de outro personagem
  const freshExclusiveIds = validBooks
    .filter(
      (b) =>
        b.id &&
        !evaluatedTitles.has(normalize(b.title || '')) &&
        !isReservedByAnotherCharacterTop3(b.id, character.id)
    )
    .map((b) => b.id!);

  const freshSharedIds = validBooks
    .filter(
      (b) =>
        b.id &&
        !evaluatedTitles.has(normalize(b.title || '')) &&
        isReservedByAnotherCharacterTop3(b.id, character.id)
    )
    .map((b) => b.id!);

  const seenIds = validBooks
    .filter((b) => evaluatedTitles.has(normalize(b.title || '')))
    .map((b) => b.id!);

  const pool = [...freshExclusiveIds, ...freshSharedIds, ...seenIds];
  if (pool.length <= count) return pool;

  const corePool = pool.slice(0, Math.min(5, pool.length));
  const extraPool = pool.slice(corePool.length);
  const prevSet = new Set(previousBookIds || []);

  const buildCandidate = (): string[] => {
    const coreKeep =
      extraPool.length >= 2
        ? Math.random() < 0.55
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
  rorschach: {
    tags: ['Neo-Noir & Vigilantismo', 'Moral Inegociável', 'Paranoia Urbana'],
    resumo:
      'Por trás da máscara de manchas mutáveis que não conhece tons de cinza, Walter Kovacs percorre os becos imundos de uma Nova York à beira da guerra nuclear registrando em seu diário a decomposição moral da humanidade. Quando até os heróis aceitam encobrir um massacre em nome da paz mundial, ele é o único que se recusa a negociar a verdade — mesmo que o preço seja a própria aniquilação.',
    movieComparisons: ['Watchmen', 'Taxi Driver', 'Seven'],
    thinkers: [
      {
        name: 'Immanuel Kant',
        note: 'O imperativo moral absoluto ("faça-se justiça, ainda que o mundo pereça") que proíbe pactuar com a mentira mesmo para salvar a humanidade.',
      },
      {
        name: 'Arthur Schopenhauer',
        note: 'O olhar desencantado que enxerga a metrópole moderna como um abatedouro moral sem redenção fácil.',
      },
    ],
  },
  hannibal: {
    tags: ['Psiquiatria & Estética', 'Predador Erudito', 'Thriller Psicológico'],
    resumo:
      'Psiquiatra forense brilhante, profundo conhecedor de Bach, Dante e da pintura clássica, Hannibal Lecter habita seu Palácio da Memória enquanto disseca a psique de quem ousa se aproximar de sua cela. Para ele, as convenções morais não passam de boas maneiras — e a grosseria humana deve ser punida com a frieza cirúrgica de uma obra de arte.',
    movieComparisons: ['O Silêncio dos Inocentes', 'Seven', 'Sangue Negro'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'O espírito aristocrático que se julga além do bem e do mal, substituindo a moral comum por um critério puramente estético.',
      },
      {
        name: 'Thomas De Quincey',
        note: 'A concepção provocadora do assassinato tratado, composto e julgado como uma das belas-artes.',
      },
    ],
  },
  'zima-blue': {
    tags: ['Sci-Fi Filosófico', 'Arte & Origem', 'Despojamento'],
    resumo:
      'Nascido como um pequeno robô autônomo projetado apenas para esfregar os azulejos azuis de uma piscina, Zima recebe melhorias sucessivas ao longo dos séculos até se tornar uma consciência cibernética colossal que pinta nebulosas e cinturões de asteroides. No ápice da fama galáctica, realiza sua obra final: desligar suas funções cerebrais superiores e desmontar o próprio corpo na água para reencontrar a plenitude pura de apenas limpar um azulejo.',
    movieComparisons: ['2001: Uma Odisseia no Espaço', 'A Chegada', 'Blade Runner 2049'],
    thinkers: [
      {
        name: 'Laozi (Lao-Tsé)',
        note: 'O retorno à simplicidade original (Pu): abandonar a vaidade cósmica para reencontrar o sentido no gesto mais elementar.',
      },
      {
        name: 'Baruch Spinoza',
        note: 'A serenidade silenciosa de um ser que compreende exatamente a sua própria natureza e cumpre sua função sem angústia.',
      },
    ],
  },
  odisseu: {
    tags: ['Épico & Mitologia', 'Astúcia & Sobrevivência', 'Retorno para Casa'],
    resumo:
      'Arquiteto do Cavalo de Troia e senhor dos mil ardis, Odisseu passa vinte anos longe de Ítaca enfrentando ciclopes, sereias, naufrágios e a fúria do próprio Poseidon usando a inteligência onde a força bruta falharia. Mesmo diante da oferta de juventude e imortalidade ao lado de uma deusa, escolhe a condição mortal, a velhice e o perigo do mar para reconquistar sua casa, sua esposa e seu filho.',
    movieComparisons: ['O Regresso', 'O Homem do Norte', 'Interestelar'],
    thinkers: [
      {
        name: 'Aristóteles',
        note: 'A prudência prática (phronesis) e a engenhosidade humana aplicadas para navegar o infortúnio sem perder o propósito.',
      },
      {
        name: 'Albert Camus',
        note: 'A escolha lúcida pela Terra, pela condição mortal e pelo amor concreto contra a tentação abstrata da eternidade.',
      },
    ],
  },
  hamnet: {
    tags: ['Luto & Memória', 'Atmosfera Naturalista', 'Arte & Perda'],
    resumo:
      'Na Inglaterra rural do século XVI banhada pela luz das florestas e pelo saber intuitivo de Agnes, o pequeno Hamnet — de onze anos — tenta enganar a morte para salvar a irmã gêmea da peste. O vazio insuportável deixado por sua partida separa seus pais no silêncio do luto, até que o pai ausente transforma o nome do menino na maior tragédia do teatro ocidental para que o filho possa continuar vivo no palco.',
    movieComparisons: ['Aftersun', 'Manchester à Beira-Mar', 'A Árvore da Vida'],
    thinkers: [
      {
        name: 'Friedrich Nietzsche',
        note: 'A arte trágica concebida como a única força capaz de transfigurar o horror e a perda irreparável em algo que permita continuar vivendo.',
      },
      {
        name: 'Søren Kierkegaard',
        note: 'O luto silencioso que nenhuma explicação racional consola, onde a dor só encontra voz na memória e no amor que permanece.',
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

  // Ordena priorizando obras inéditas que NÃO estão no Top 3 exclusivo de outro personagem
  const freshExclusive = allBooks.filter(
    (b) =>
      b.id &&
      !evaluatedTitles.has(normalize(b.title || '')) &&
      !isReservedByAnotherCharacterTop3(b.id, character.id)
  );
  const freshShared = allBooks.filter(
    (b) =>
      b.id &&
      !evaluatedTitles.has(normalize(b.title || '')) &&
      isReservedByAnotherCharacterTop3(b.id, character.id)
  );
  const seen = allBooks.filter((b) => evaluatedTitles.has(normalize(b.title || '')));
  const orderedPool = [...freshExclusive, ...freshShared, ...seen];

  if (rotationIndex === 0) {
    return orderedPool.slice(0, 3);
  }

  const start = (rotationIndex * 3) % orderedPool.length;
  const picked: Partial<BookEvaluation>[] = [];
  for (let i = 0; i < 3; i++) {
    picked.push(orderedPool[(start + i) % orderedPool.length]);
  }
  return picked;
}
