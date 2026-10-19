import { BookEvaluation, CriteriaScores, VereditoTipo } from '../types';
import { INITIAL_BOOKS } from '../data/initialBooks';

// Perfil de palavras-chave do usuário para calibração de encaixe
const POSITIVE_KEYWORDS = [
  'tragédia', 'trágico', 'culpa', 'dilema moral', 'queda', 'ambição', 'obsessão',
  'trauma', 'violência', 'guerra', 'distopia', 'totalitário', 'ficção científica',
  'sci-fi', 'filosófico', 'existencial', 'fantasia sombria', 'dark fantasy',
  'alegoria', 'fábula sombria', 'mistério', 'worldbuilding', 'consequência',
  'psicológico', 'opressivo', 'luto', 'morte', 'solidão', 'claustrofobia',
  'moralmente ambíguo', 'anti-herói', 'pesado', 'denso', 'crueldade', 'poder'
];

const NEGATIVE_KEYWORDS = [
  'romance contemporâneo', 'comédia romântica', 'clichê', 'enemies to lovers',
  'adolescente', 'young adult', 'ya', 'fofo', 'acolhedor', 'misticismo leve',
  'autoajuda', 'auto-ajuda', 'motivação', 'fórmula', 'água com açúcar',
  'triângulo amoroso', 'prolixo', 'sem payoff', 'infantil', 'escolar', 'cozy'
];

// Catálogo enriquecido de edições brasileiras populares e clássicos nacionais
const BRAZILIAN_EDITIONS_CATALOG: Partial<BookEvaluation>[] = [
  {
    id: 'br-duna',
    title: 'Duna',
    author: 'Frank Herbert',
    year: 1965,
    pages: 680,
    coverUrl: 'https://covers.openlibrary.org/b/id/11481354-L.jpg', // Edição Aleph
    genres: ['Ficção Científica', 'Space Opera', 'Distopia'],
    resumo: 'Em Arrakis, o planeta desértico governado por vermes colossais e cobiçado pela Especiaria, o jovem Paul Atreides enfrenta a traição do Império e assume seu destino trágico como messias e líder guerreiro dos Fremen.',
  },
  {
    id: 'br-neuromancer',
    title: 'Neuromancer',
    author: 'William Gibson',
    year: 1984,
    pages: 320,
    coverUrl: 'https://covers.openlibrary.org/b/id/13838027-L.jpg', // Edição Aleph pt-BR
    genres: ['Cyberpunk', 'Ficção Científica'],
    resumo: 'Case, um hacker decadente de Chiba City com o sistema nervoso queimado por trair seus chefes, recebe uma última chance de redenção em troca de invadir uma poderosa inteligência artificial corporativa.',
  },
  {
    id: 'br-fundacao',
    title: 'Fundação',
    author: 'Isaac Asimov',
    year: 1951,
    pages: 240,
    coverUrl: 'https://covers.openlibrary.org/b/id/8718915-L.jpg', // Edição Aleph
    genres: ['Ficção Científica', 'Clássico'],
    resumo: 'O matemático Hari Seldon prevê a queda inevitável do Império Galáctico e 30.000 anos de barbárie. Para encurtar essa era das trevas, ele cria a Fundação nas bordas da galáxia.',
  },
  {
    id: 'br-dom-casmurro',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    year: 1899,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/id/12369688-L.jpg',
    genres: ['Clássico Brasileiro', 'Drama Psicológico'],
    resumo: 'Bento Santiago narra, na velhice e sob o peso de um ciúme doentio, sua história de amor com Capitu e sua obsessão eterna com a suspeita de traição com seu melhor amigo Escobar.',
  },
  {
    id: 'br-memorias-postumas',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    year: 1881,
    pages: 192,
    coverUrl: 'https://covers.openlibrary.org/b/id/12369689-L.jpg',
    genres: ['Clássico Brasileiro', 'Sátira Filosófica'],
    resumo: 'Um defunto autor decide narrar sua vida de privilégios, vaidades e frustrações do além-túmulo, dissecando a sociedade do Rio de Janeiro com ironia demolidora e zero hipocrisia.',
  },
  {
    id: 'br-fahrenheit-451',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    pages: 216,
    coverUrl: 'https://covers.openlibrary.org/b/id/10574042-L.jpg', // Globo Livros
    genres: ['Distopia', 'Ficção Científica'],
    resumo: 'Guy Montag é um bombeiro encarregado de queimar livros numa sociedade totalitária onde pensar é proibido e as pessoas vivem entorpecidas por telas de parede.',
  },
  {
    id: 'br-laranja-mecanica',
    title: 'Laranja Mecânica',
    author: 'Anthony Burgess',
    year: 1962,
    pages: 288,
    coverUrl: 'https://covers.openlibrary.org/b/id/10376644-L.jpg', // Aleph
    genres: ['Distopia', 'Drama Psicológico'],
    resumo: 'Alex e seus druguis aterrorizam as noites de uma cidade decadente. Preso pelo Estado, ele é submetido ao condicionamento aversivo Ludovico, perdendo sua capacidade de livre-arbítrio.',
  },
  {
    id: 'br-o-processo',
    title: 'O Processo',
    author: 'Franz Kafka',
    year: 1925,
    pages: 264,
    coverUrl: 'https://covers.openlibrary.org/b/id/12370857-L.jpg', // Companhia das Letras
    genres: ['Clássico', 'Absurdo Existencial'],
    resumo: 'Josef K. é preso numa manhã qualquer sem saber que crime cometeu. O tribunal invisível e labiríntico o consome aos poucos sob um pesadelo burocrático e culpa inexplicável.',
  },
];

const STOPWORDS = new Set([
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
  'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'sem', 'sob', 'sobre', 'e', 'ou'
]);

function normalizeSearchText(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .trim();
}

function extractSignificantKeywords(query: string): string[] {
  return normalizeSearchText(query)
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

export async function searchBookApi(query: string): Promise<Partial<BookEvaluation>[]> {
  const cleanQuery = normalizeSearchText(query);
  if (!cleanQuery) return [];

  const keywords = extractSignificantKeywords(query);

  // 1. Verificar se a busca é um ISBN (BrasilAPI / OpenLibrary ISBN)
  const isbnMatch = query.replace(/[-\s]/g, '').match(/^(97[89])?\d{9}[\dX]$/i);
  if (isbnMatch) {
    const rawIsbn = isbnMatch[0];
    try {
      const brasilApiRes = await fetch(`https://brasilapi.com.br/api/isbn/v1/${rawIsbn}`);
      if (brasilApiRes.ok) {
        const cblData = await brasilApiRes.json();
        return [{
          id: `cbl-${cblData.isbn}`,
          title: cblData.title,
          author: cblData.authors ? cblData.authors.join(', ') : 'Autor',
          year: cblData.year,
          pages: cblData.page_count && cblData.page_count > 15 ? cblData.page_count : undefined,
          coverUrl: cblData.cover_url || `https://covers.openlibrary.org/b/isbn/${rawIsbn}-L.jpg`,
          genres: cblData.subjects || ['Literatura'],
          resumo: cblData.synopsis || '',
        }];
      }
    } catch (err) {
      console.warn('BrasilAPI (CBL) lookup fallback:', err);
    }

    try {
      const olIsbnRes = await fetch(`https://openlibrary.org/isbn/${rawIsbn}.json`);
      if (olIsbnRes.ok) {
        const olIsbnData = await olIsbnRes.json();
        const cover = olIsbnData.covers && olIsbnData.covers[0]
          ? `https://covers.openlibrary.org/b/id/${olIsbnData.covers[0]}-L.jpg`
          : `https://covers.openlibrary.org/b/isbn/${rawIsbn}-L.jpg`;
        return [{
          id: `ol-isbn-${rawIsbn}`,
          title: olIsbnData.title,
          author: 'Autor via ISBN',
          pages: olIsbnData.number_of_pages,
          coverUrl: cover,
          genres: ['Literatura'],
          resumo: typeof olIsbnData.description === 'string' ? olIsbnData.description : olIsbnData.description?.value || '',
        }];
      }
    } catch (err) {
      console.warn('OpenLibrary ISBN lookup fallback:', err);
    }
  }

  const candidates: (Partial<BookEvaluation> & { score: number })[] = [];

  // 2. Open Library como Motor Primário com suporte a edições em português
  try {
    const encoded = encodeURIComponent(query.trim());
    const fields = [
      'key',
      'title',
      'author_name',
      'first_publish_year',
      'cover_i',
      'isbn',
      'language',
      'number_of_pages_median',
      'subject',
      'editions',
      'editions.key',
      'editions.title',
      'editions.cover_i',
      'editions.language',
      'editions.isbn',
      'editions.number_of_pages',
      'editions.publish_date'
    ].join(',');

    const olRes = await fetch(
      `https://openlibrary.org/search.json?q=${encoded}&fields=${fields}&limit=15`
    );

    if (olRes.ok) {
      const olData = await olRes.json();
      for (const doc of olData.docs || []) {
        const workTitle = doc.title || '';
        const workTitleNorm = normalizeSearchText(workTitle);
        const author = (doc.author_name || []).join(', ');
        const authorNorm = normalizeSearchText(author);

        // Descartar registros exclusivamente em idiomas não ocidentais se explicitamente marcados
        if (doc.language && Array.isArray(doc.language) && doc.language.length === 1) {
          const l = doc.language[0];
          if (['rus', 'jpn', 'chi', 'kor', 'ara', 'heb'].includes(l)) continue;
        }

        let bestTitle = workTitle;
        let bestCover = doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : '';
        let bestPages =
          doc.number_of_pages_median && doc.number_of_pages_median > 20
            ? doc.number_of_pages_median
            : undefined;
        let isPtEdition = false;

        const editions = doc.editions?.docs || [];

        // Priorizar edição brasileira / em português ou edição que case o termo pesquisado
        for (const ed of editions) {
          const edTitle = ed.title || '';
          const edTitleNorm = normalizeSearchText(edTitle);
          const isPor =
            ed.language &&
            (ed.language.includes('por') || ed.language.includes('pt'));
          const edMatchesKw = keywords.some((kw) => edTitleNorm.includes(kw));

          if (isPor || edMatchesKw) {
            if (!isPtEdition || (isPor && edMatchesKw)) {
              bestTitle = edTitle;
              if (ed.cover_i && ed.cover_i > 0) {
                bestCover = `https://covers.openlibrary.org/b/id/${ed.cover_i}-L.jpg`;
              }
              if (ed.number_of_pages && ed.number_of_pages > 20) {
                bestPages = ed.number_of_pages;
              }
              if (isPor) isPtEdition = true;
            }
          }
        }

        // Fallback de capa via ISBN se ainda não possuir
        if (!bestCover && doc.isbn && doc.isbn[0]) {
          bestCover = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`;
        }

        const titleToCheckNorm = normalizeSearchText(bestTitle);
        const edTitlesNorm = editions.map((e: any) => normalizeSearchText(e.title || ''));

        // Validação de relevância considerando o título da edição, o título da obra original e o autor
        const matchesKeyword =
          keywords.length === 0 ||
          keywords.some(
            (kw) =>
              titleToCheckNorm.includes(kw) ||
              workTitleNorm.includes(kw) ||
              authorNorm.includes(kw) ||
              edTitlesNorm.some((et: string) => et.includes(kw))
          );

        if (!matchesKeyword) continue;

        let score = 0;
        if (titleToCheckNorm === cleanQuery) score += 70;
        else if (titleToCheckNorm.startsWith(cleanQuery)) score += 45;
        else if (titleToCheckNorm.includes(cleanQuery)) score += 30;

        const matchedKw = keywords.filter(
          (kw) => titleToCheckNorm.includes(kw) || workTitleNorm.includes(kw)
        ).length;
        score += matchedKw * 15;

        if (isPtEdition) score += 40;
        if (bestCover) score += 25;
        if (author) score += 10;

        candidates.push({
          id: `ol-${doc.key || Math.random()}`,
          title: bestTitle,
          originalTitle: workTitle !== bestTitle ? workTitle : undefined,
          author: author || 'Autor a verificar',
          year: doc.first_publish_year,
          pages: bestPages,
          coverUrl: bestCover,
          genres: doc.subject ? doc.subject.slice(0, 3) : ['Literatura'],
          resumo: '',
          score,
        });
      }
    }
  } catch (err) {
    console.warn('OpenLibrary search error:', err);
  }

  // 3. Google Books como fallback apenas se a Open Library não retornar candidatos
  if (candidates.length === 0) {
    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encoded}&langRestrict=pt&printType=books&maxResults=8`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          for (const item of data.items) {
            const info = item.volumeInfo || {};
            const titleNorm = normalizeSearchText(info.title || '');
            const authorNorm = normalizeSearchText((info.authors || []).join(' '));

            const matchesKeyword =
              keywords.length === 0 ||
              keywords.some(
                (kw) => titleNorm.includes(kw) || authorNorm.includes(kw)
              );
            if (!matchesKeyword) continue;

            let cover =
              info.imageLinks?.extraLarge ||
              info.imageLinks?.large ||
              info.imageLinks?.medium ||
              info.imageLinks?.thumbnail ||
              '';
            if (cover.startsWith('http://')) {
              cover = cover.replace('http://', 'https://');
            }

            let score = 0;
            if (titleNorm === cleanQuery) score += 45;
            else if (titleNorm.startsWith(cleanQuery)) score += 30;
            else if (titleNorm.includes(cleanQuery)) score += 20;

            const matchedKw = keywords.filter((kw) => titleNorm.includes(kw)).length;
            score += matchedKw * 10;
            if (cover) score += 20;

            candidates.push({
              id: `gb-${item.id}`,
              title: info.title || query,
              author: info.authors ? info.authors.join(', ') : 'Autor desconhecido',
              year: info.publishedDate ? parseInt(info.publishedDate.substring(0, 4)) : undefined,
              pages: info.pageCount && info.pageCount > 15 ? info.pageCount : undefined,
              coverUrl: cover,
              genres: info.categories || ['Literatura'],
              resumo: info.description || '',
              score,
            });
          }
        }
      }
    } catch (err) {
      console.warn('Google Books fallback indisponível:', err);
    }
  }

  // 4. Deduplicação inteligente e ordenação por relevância
  const seen = new Set<string>();
  const results: Partial<BookEvaluation>[] = [];

  candidates.sort((a, b) => b.score - a.score);

  for (const item of candidates) {
    const key = normalizeSearchText(item.title || '');
    if (!key || seen.has(key)) continue;
    seen.add(key);

    const { score, ...cleanBook } = item;
    results.push(cleanBook);
  }

  return results.slice(0, 8);
}

// Calibração e avaliação inteligente com base no algoritmo do Veredito
export function evaluateBook(
  rawBook: {
    title: string;
    author?: string;
    pages?: number;
    description?: string;
    genres?: string[];
    coverUrl?: string;
  }
): BookEvaluation {
  const text = `${rawBook.title} ${rawBook.author || ''} ${rawBook.description || ''} ${(rawBook.genres || []).join(' ')}`.toLowerCase();

  // 1. Detecção de infantilidade (0 = adulto/sombrio, 10 = infantil)
  let infantilidade = 2; // base adulta para ficção geral
  if (text.includes('infantil') || text.includes('criança') || text.includes('middle grade')) {
    infantilidade = 9;
  } else if (text.includes('young adult') || text.includes('juvenil') || text.includes('adolescente') || text.includes('colegial')) {
    infantilidade = 7;
  } else if (text.includes('fábula') || text.includes('conto de fadas') || text.includes('aventura leve')) {
    infantilidade = 4;
  } else if (text.includes('sombrio') || text.includes('horror') || text.includes('guerra') || text.includes('morte') || text.includes('distopia')) {
    infantilidade = 1;
  }

  let infantilidadeStatus: 'ideal' | 'aceitavel' | 'risco' | 'rejeicao' = 'ideal';
  if (infantilidade <= 2) infantilidadeStatus = 'ideal';
  else if (infantilidade <= 5) infantilidadeStatus = 'aceitavel';
  else if (infantilidade === 6) infantilidadeStatus = 'risco';
  else infantilidadeStatus = 'rejeicao';

  // 2. Genericidade (0 = extremamente original, 10 = clichê)
  let genericidade = 3;
  if (text.includes('enemies to lovers') || text.includes('romance contemporâneo') || text.includes('triângulo')) {
    genericidade = 9;
  } else if (text.includes('fórmula') || text.includes('clichê') || text.includes('best-seller convencional')) {
    genericidade = 7;
  } else if (text.includes('distopia original') || text.includes('linguística') || text.includes('alegoria') || text.includes('inovador') || text.includes('experimental')) {
    genericidade = 1;
  }

  // 3. Tom sombrio / psicológico (0 = leve, 10 = visceralmente sombrio/noir/perturbador)
  let tomSombrio = 5;
  let sombrioMatches = 0;
  ['morte', 'luto', 'culpa', 'tragédia', 'opressivo', 'guerra', 'pesado', 'terror', 'horror', 'violência', 'psicológico', 'trauma', 'cyberpunk', 'noir', 'distopia', 'submundo', 'crime', 'drogas', 'decadente', 'decadência', 'niilista', 'sombrio', 'chiba', 'hacker'].forEach(w => {
    if (text.includes(w)) sombrioMatches++;
  });
  if (text.includes('cyberpunk') || text.includes('noir') || text.includes('distopia') || text.includes('dark fantasy')) {
    tomSombrio = Math.min(10, Math.max(7.5, 6.5 + sombrioMatches * 0.8));
  } else {
    tomSombrio = Math.min(10, Math.max(1, 4 + sombrioMatches * 1.5));
  }
  if (text.includes('comédia') || text.includes('romance fofo') || text.includes('leve') || text.includes('humor')) {
    tomSombrio = Math.max(1, tomSombrio - 4);
  }

  // 4. Impacto emocional / moral (0 = raso, 10 = dilemas fortes)
  let impactoEmocional = 6;
  let moralMatches = 0;
  ['dilema', 'culpa', 'escolha', 'consequência', 'perda', 'moral', 'humano', 'queda', 'sacrifício'].forEach(w => {
    if (text.includes(w)) moralMatches++;
  });
  impactoEmocional = Math.min(10, Math.max(2, 5 + moralMatches * 1.5));
  if (text.includes('água com açúcar') || genericidade > 7) {
    impactoEmocional = Math.max(1, impactoEmocional - 3);
  }

  // 5. Worldbuilding / Complexidade
  let worldbuilding = 5;
  if (text.includes('ficção científica') || text.includes('fantasia') || text.includes('distopia') || text.includes('universo') || text.includes('império') || text.includes('sociedade')) {
    worldbuilding = 8;
  } else if (text.includes('histórico') || text.includes('política') || text.includes('filosófico')) {
    worldbuilding = 7;
  } else if (text.includes('romance contemporâneo') || text.includes('cotidiano')) {
    worldbuilding = 3;
  }

  // 6. Ritmo & Páginas
  let defaultPages = 320;
  if (text.includes('sanderson') || text.includes('tolkien') || text.includes('guerra e paz') || text.includes('ritmo da guerra') || text.includes('caminho dos reis') || text.includes('palavras de radiância')) {
    defaultPages = 1200;
  }
  const pages = rawBook.pages && rawBook.pages > 30 ? rawBook.pages : defaultPages;

  let ritmo = 7;
  let ritmoDescricao = 'Leitura ágil com boa cadência dramática.';
  if (pages < 180) {
    ritmo = 8;
    ritmoDescricao = 'Tiro curto: leitura rápida de fim de semana, com alta densidade.';
  } else if (pages > 700) {
    ritmo = 4;
    ritmoDescricao = 'Extremamente extenso e detalhado, ritmo cadenciado com desenvolvimento lento de mundo e cerco.';
  } else if (pages > 500) {
    ritmo = 5;
    ritmoDescricao = 'Mais lento e introspectivo, exige fôlego para mergulhar no mundo.';
  } else if (text.includes('lento') || text.includes('contemplativo')) {
    ritmo = 4;
    ritmoDescricao = 'Cadência pausada e reflexiva, sem pressa para resoluções.';
  }

  // Qualidade técnica objetiva
  let qualidadeTecnica = 8;
  if (text.includes('clássico') || text.includes('nobel') || text.includes('pulitzer') || text.includes('premiado') || text.includes('dostoiévski') || text.includes('tolstói') || text.includes('orwell')) {
    qualidadeTecnica = 9.5;
  } else if (genericidade >= 8) {
    qualidadeTecnica = 5.5;
  }

  // CÁLCULO DA NOTA TÉCNICA (Objetiva, ponderada)
  const notaTecnicaRaw = (
    qualidadeTecnica * 0.35 +
    (10 - genericidade) * 0.20 +
    worldbuilding * 0.20 +
    impactoEmocional * 0.15 +
    Math.min(10, ritmo + 2) * 0.10
  );
  const notaTecnica = Math.floor(Math.min(10, Math.max(1, notaTecnicaRaw)));

  // CÁLCULO DA NOTA DE ENCAIXE (Pesos estritos do usuário)
  let fitScore = 5.0;

  // Pontos positivos
  let positiveScore = 0;
  POSITIVE_KEYWORDS.forEach(kw => {
    if (text.includes(kw)) positiveScore += 0.8;
  });
  fitScore += Math.min(4.5, positiveScore);

  // Se páginas forem curtas a médias (ideal do usuário: livros curtos a médios em português)
  if (pages <= 320) {
    fitScore += 0.8;
  } else if (pages > 650) {
    fitScore -= 0.5; // usuário prefere curtos a médios
  }

  // Penalidades severas para elementos que o usuário rejeita
  let negativeScore = 0;
  NEGATIVE_KEYWORDS.forEach(kw => {
    if (text.includes(kw)) negativeScore += 1.8;
  });
  fitScore -= negativeScore;

  // Penalidade de Infantilidade
  if (infantilidadeStatus === 'ideal') {
    fitScore += 0.8;
  } else if (infantilidadeStatus === 'risco') {
    fitScore -= 2.0;
  } else if (infantilidadeStatus === 'rejeicao') {
    fitScore -= 4.5;
  }

  // Se for comédia romântica ou clichê, despenca o encaixe mesmo se a prosa for razoável
  if (genericidade >= 8) {
    fitScore = Math.min(fitScore, 3.0);
  }

  // Se for contemplativo lento sem tensão (como Clarke / Hemingway para ele)
  if (ritmo <= 3 && tomSombrio < 5 && impactoEmocional < 5) {
    fitScore = Math.min(fitScore, 4.0);
  }

  const notaEncaixe = Math.floor(Math.min(10, Math.max(1, fitScore)));

  // GERAÇÃO DE VEREDITO E COMPARAÇÕES COM FILMES
  let veredito = 'Vale a pena conferir.';
  let vereditoTipo: VereditoTipo = 'leia';
  let justificativaEncaixe = '';

  if (notaEncaixe >= 8) {
    vereditoTipo = 'leia';
    veredito = notaEncaixe >= 9 
      ? 'Leia imediatamente: casamento perfeito com suas obsessões temáticas.' 
      : 'Recomendação certeira: alta carga dramática e peso moral.';
    justificativaEncaixe = 'Sintonia alta: ausência de sentimentalismo barato, presença de conflito humano grave e tom condizente com seu perfil.';
  } else if (notaEncaixe >= 6) {
    vereditoTipo = 'ressalvas';
    veredito = 'Vale com ressalvas: bons elementos, mas prepare-se para momentos fora da sua zona de conforto.';
    justificativaEncaixe = 'Possui virtudes objetivas fortes, porém com ritmo ou elementos periféricos que demandam concessão de sua parte.';
  } else {
    vereditoTipo = 'evite';
    veredito = notaTecnica >= 7 
      ? 'Evite: tem qualidade técnica, mas o tom ou ritmo vai contra tudo o que você busca.'
      : 'Evite sem remorso: fórmula vazia e ausência de risco dramático.';
    justificativaEncaixe = 'Alto risco de frustração: tropes que seu perfil rejeita (romance central, ritmo sem tensão, ou tom excessivamente leve/juvenil).';
  }

  // Comparações com filmes do perfil
  const movieComparisons: string[] = [];
  if (text.includes('sanderson') || text.includes('alta fantasia') || text.includes('stormlight') || text.includes('cosmere') || (text.includes('fantasia') && text.includes('guerra'))) {
    movieComparisons.push('Duna', 'O Senhor dos Anéis: As Duas Torres', 'O Resgate do Soldado Ryan');
  } else if (tomSombrio >= 8 && impactoEmocional >= 8) {
    movieComparisons.push('Seven', 'Manchester à Beira-Mar');
  } else if (text.includes('sci-fi') || text.includes('futuro') || worldbuilding >= 8) {
    movieComparisons.push('Blade Runner 2049', 'Interestelar');
  } else if (infantilidade <= 2 && tomSombrio >= 7) {
    movieComparisons.push('O Poderoso Chefão', 'Chernobyl');
  } else if (text.includes('distopia')) {
    movieComparisons.push('Clube da Luta', 'Planeta dos Macacos');
  } else {
    movieComparisons.push('O Homem do Norte', 'Duna');
  }

  // Resumo sintetizado em 2 a 3 linhas sem spoilers
  let resumo = rawBook.description || '';
  if (!resumo || resumo.length < 40) {
    resumo = `Uma narrativa envolvente explorando as tensões entre escolhas individuais e sistemas implacáveis. Com atmosfera densa e foco em dilemas morais, a obra confronta o leitor com as consequências definitivas de cada decisão.`;
  } else {
    resumo = resumo.replace(/<[^>]*>?/gm, '').trim();
    if (resumo.length > 240) {
      resumo = resumo.substring(0, 235) + '...';
    }
  }

  return {
    id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: rawBook.title,
    author: rawBook.author || 'Autor a verificar',
    pages,
    coverUrl: rawBook.coverUrl || 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    resumo,
    movieComparisons: movieComparisons.slice(0, 2),
    adaptacoes: text.includes('filme') || text.includes('cinema') ? 'Possui adaptação cinematográfica ou televisiva.' : 'Nenhuma adaptação relevante catalogada.',
    criteria: {
      genericidade,
      infantilidade,
      infantilidadeStatus,
      qualidadeTecnica,
      worldbuilding,
      ritmo,
      ritmoDescricao,
      tomSombrio,
      impactoEmocional,
    },
    notaTecnica,
    notaEncaixe,
    veredito,
    vereditoTipo,
    justificativaEncaixe,
    genres: rawBook.genres && rawBook.genres.length > 0 ? rawBook.genres : ['Ficção'],
    userStatus: 'analyzed',
    categoryShelf: 'Avaliados Recentemente'
  };
}

// Analisador de listas em massa
export function evaluateBulkList(rawText: string): BookEvaluation[] {
  const lines = rawText
    .split(/[\n;]+/)
    .map(l => l.trim())
    .filter(l => l.length > 2);

  const results: BookEvaluation[] = lines.map(line => {
    let title = line;
    let author = 'Autor a confirmar';
    if (line.includes('—')) {
      const parts = line.split('—');
      title = parts[0].trim();
      author = parts[1].trim();
    } else if (line.includes('-')) {
      const parts = line.split('-');
      title = parts[0].trim();
      author = parts[1].trim();
    } else if (line.toLowerCase().includes(' por ')) {
      const parts = line.split(/ por /i);
      title = parts[0].trim();
      author = parts[1].trim();
    }

    return evaluateBook({
      title,
      author,
      pages: 250,
      description: `Avaliação do Veredito para "${title}". Premissa com foco em tensão psicológica, moralidade e identidade estilística.`,
    });
  });

  return results.sort((a, b) => b.notaEncaixe - a.notaEncaixe);
}
