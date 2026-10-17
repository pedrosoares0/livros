// Catálogo expandido de posters do cinema mundial para a Vibe de Filmes
// Suporta cinema clássico, sci-fi, cinema europeu, asiático, latino e contemporâneo

const MOVIE_POSTERS: Record<string, string> = {
  // Sci-Fi & Conceitual
  'blade runner 2049': 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg',
  'blade runner': 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtNjkzNzU3Nzk5NGFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'interestelar': 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  'interstellar': 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  'a chegada': 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg',
  'arrival': 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg',
  'matrix': 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'the matrix': 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'duna': 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtODExMg@@._V1_SX300.jpg',
  'dune': 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtODExMg@@._V1_SX300.jpg',
  'stalker': 'https://m.media-amazon.com/images/M/MV5BMDlhNmYzN2YtOWU3My00NDc0LTg4MWEtZDRiMmY4NjA3N2ZkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  'solaris': 'https://m.media-amazon.com/images/M/MV5BNDc1Y2ZkYjctNDU2YS00OGM1LWIwOTItMTM2NmJmYjRlZjQzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  'filhos da esperança': 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzkwOF5BMl5BanBnXkFtZTcwNzU4MDQ2MQ@@._V1_SX300.jpg',
  'children of men': 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzkwOF5BMl5BanBnXkFtZTcwNzU4MDQ2MQ@@._V1_SX300.jpg',
  '2001': 'https://m.media-amazon.com/images/M/MV5BMmNkNzg3NTctOGRiMi00OWI2LWIyMTItMmE2NzUwOGVmM2EwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'melancolia': 'https://m.media-amazon.com/images/M/MV5BMTk4NjM0MjI3MV5BMl5BanBnXkFtZTcwOTA5OTgzNQ@@._V1_SX300.jpg',
  'oppenheimer': 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',

  // Drama Humano, Luto & Tragédia
  'aftersun': 'https://m.media-amazon.com/images/M/MV5BNWUwY2YxMmMtNWIxZC00ZGM5LTlhYTMtY2ViOWQxZTBkMjkyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  'manchester à beira-mar': 'https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg',
  'manchester by the sea': 'https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg',
  'brilho eterno': 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg',
  'her': 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjE5MDE@._V1_SX300.jpg',
  'antes do amanhecer': 'https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'viver': 'https://m.media-amazon.com/images/M/MV5BZmM0NGY3NzUtMTU4Ny00YWVmLWFjOGUtZTE1N2JlOTU3NjEyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  'ikiru': 'https://m.media-amazon.com/images/M/MV5BZmM0NGY3NzUtMTU4Ny00YWVmLWFjOGUtZTE1N2JlOTU3NjEyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  'living': 'https://m.media-amazon.com/images/M/MV5BMjA1OTY0MDU4NV5BMl5BanBnXkFtZTgwMTQ2NTEwOTE@._V1_SX300.jpg',
  'a vida dos outros': 'https://m.media-amazon.com/images/M/MV5BNmJhZDU4ZWMtM2RmMi00OTcwLTk1YmYtNjAyMDU1Yjg0YjY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'the lives of others': 'https://m.media-amazon.com/images/M/MV5BNmJhZDU4ZWMtM2RmMi00OTcwLTk1YmYtNjAyMDU1Yjg0YjY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',

  // Sombrio, Crime, Filosofia & Poder
  'seven': 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk3LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'se7en': 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk3LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'o poderoso chefão': 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'the godfather': 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'apocalypse now': 'https://m.media-amazon.com/images/M/MV5BYmQyNTA1ZGItNjZjMi00NzFlLWEzMWEtNWMwN2Q2MjJhYzEyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
  'chernobyl': 'https://m.media-amazon.com/images/M/MV5BNTdkN2MwZGYtNDc4YS00Zjc3LThkNzAtZmU3OGRhZjk0ZDA3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
  'clube da luta': 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'fight club': 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'sangue negro': 'https://m.media-amazon.com/images/M/MV5BMjAxODQ4MDU5NV5BMl5BanBnXkFtZTcwMDU4MjU1MQ@@._V1_SX300.jpg',
  'there will be blood': 'https://m.media-amazon.com/images/M/MV5BMjAxODQ4MDU5NV5BMl5BanBnXkFtZTcwMDU4MjU1MQ@@._V1_SX300.jpg',
  'o farol': 'https://m.media-amazon.com/images/M/MV5BZmE0MGJhNmYtOWNjYi00Njc5LWE2YjEtMDRhNzBiMTYzNzExXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'the lighthouse': 'https://m.media-amazon.com/images/M/MV5BZmE0MGJhNmYtOWNjYi00Njc5LWE2YjEtMDRhNzBiMTYzNzExXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'o abutre': 'https://m.media-amazon.com/images/M/MV5BN2U1Nzg4OTMtNzU2Ny00MzUzLWI1M2MtNWJhYzk5NDZhNWQ3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  'nightcrawler': 'https://m.media-amazon.com/images/M/MV5BN2U1Nzg4OTMtNzU2Ny00MzUzLWI1M2MtNWJhYzk5NDZhNWQ3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  'fargo': 'https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg',
  'de olhos bem fechados': 'https://m.media-amazon.com/images/M/MV5BOGJmNGUzNmEtMGNmMS00YjVjLWEwYjMtOTdmNTk5NDBhYmQ2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'eyes wide shut': 'https://m.media-amazon.com/images/M/MV5BOGJmNGUzNmEtMGNmMS00YjVjLWEwYjMtOTdmNTk5NDBhYmQ2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'o sétimo selo': 'https://m.media-amazon.com/images/M/MV5BM2I1ZWU4YjMtYzU0My00YmMzLWFmNTAtZDJhZGYwMmRjODIxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
  'the seventh seal': 'https://m.media-amazon.com/images/M/MV5BM2I1ZWU4YjMtYzU0My00YmMzLWFmNTAtZDJhZGYwMmRjODIxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
  'o iluminado': 'https://m.media-amazon.com/images/M/MV5BZWFlYmptMmQtYzIzSA@@._V1_SX300.jpg',
  'the shining': 'https://m.media-amazon.com/images/M/MV5BZWFlYmptMmQtYzIzSA@@._V1_SX300.jpg',
  '12 homens e uma sentença': 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg2NDAtYTUzODIxNzg4ZDA4XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
  '12 angry men': 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg2NDAtYTUzODIxNzg4ZDA4XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',

  // Fábulas Góticas & Fantasia Sombria
  'o labirinto do fauno': 'https://m.media-amazon.com/images/M/MV5BMzcwOWI1YzQtOGZlMi00Mjc5LTk4ZTMtYzk4ODc3N2FjZTc3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  'pan\'s labyrinth': 'https://m.media-amazon.com/images/M/MV5BMzcwOWI1YzQtOGZlMi00Mjc5LTk4ZTMtYzk4ODc3N2FjZTc3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  'klaus': 'https://m.media-amazon.com/images/M/MV5BMWYwOThjM2ItZGYxNy00NTQwLWJhZWEtM2NzZGJlWjMmYTNjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
  'o conto da princesa kaguya': 'https://m.media-amazon.com/images/M/MV5BMzFhNjA0OTMtYjcxNi00NzliLTg3NmYtNWFhMGZkNzFmN2JmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'amnésia': 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'memento': 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  'garota exemplar': 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3OTAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg',
  'gone girl': 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3OTAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg',
  'os suspeitos': 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg',
  'prisoners': 'https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg',
  'o segredo dos seus olhos': 'https://m.media-amazon.com/images/M/MV5BODg3ZjAwMGUtZjA4NS00ZTI0LWI5OWYtYTk4NDQ2YTk0OWMzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  'nada de novo no front': 'https://m.media-amazon.com/images/M/MV5BMzM4ZDJhYDVtOTgyNy00NTYzLWIxMTAtMDc5MjFlN2ZlNjVhXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SX300.jpg',
  '1984': 'https://m.media-amazon.com/images/M/MV5BMjA5Nzk5NjM4OF5BMl5BanBnXkFtZTgwMDU2NzEyMDE@._V1_SX300.jpg',
  'planeta dos macacos': 'https://m.media-amazon.com/images/M/MV5BMTgwODk3NDc1N15BMl5BanBnXkFtZTgwNTc0NzEyMTE@._V1_SX300.jpg',
  'bastardos inglórios': 'https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWQtNTVjOC00MjlhLWEzN2MtKF5BMl5BanBnXkFtZTcwNjExNjkxOA@@._V1_SX300.jpg',
  'the last of us': 'https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTkyMDY1NDU@._V1_SX300.jpg',
  'o nevoeiro': 'https://m.media-amazon.com/images/M/MV5BMTU2NjQ3MDk4NV5BMl5BanBnXkFtZTcwMzY5Nzg3NA@@._V1_SX300.jpg',
  'cidadão kane': 'https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItZmRkYS00YWI3LWFhMjctYWM2OWYwODk2YTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  'parasita': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZS00YzU4LWEyYmMtOGQ1NWFiZDAxNzkzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
  'vidas secas': 'https://m.media-amazon.com/images/M/MV5BYTY2NWYzZTYtZjg2MS00YWFmLWE1ZjYtNjY1MzZkYjE4YTk4XkEyXkFqcGdeQXVyNTc3MjUzNTI@._V1_SX300.jpg',
};

// Normalizador e buscador
export function getMoviePosterUrl(movieTitle: string): string | null {
  if (!movieTitle) return null;
  const clean = movieTitle.toLowerCase().trim();
  
  for (const [key, url] of Object.entries(MOVIE_POSTERS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return url;
    }
  }
  return null;
}
