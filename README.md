# Veredito — Sistema de Curadoria e Avaliação Crítica de Livros

Guia técnico e arquitetural voltado para desenvolvedores e agentes de IA que venham manter ou expandir esta base de código.

---

## 1. Visão Geral da Aplicação

O **Veredito** é um web app pessoal focado em avaliação crítica, encaixe de leitura e catálogo de livros, HQs e edições consagradas.
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Motion (Framer Motion) + Supabase + Google Gemini API.
- **Diferencial Crítico:** O app prioriza a experiência de catálogo editorial brasileiro moderno (equivalente ao acervo e bestsellers da Amazon Brasil, Antofágica, Companhia das Letras, Aleph, DarkSide, Todavia, Editora 34, Principis, Record, Rocco e Zahar), com foco em obras densas, ficção científica, distopias, clássicos e dramas humanos.

---

## 2. Mapa de Diretórios e Arquivos-Chave

```
src/
├── components/
│   ├── EvaluateModal.tsx     # Modal principal: busca de livro único e avaliação em lote
│   ├── BookCover.tsx         # Renderizador de capa com fallback tipográfico em couro
│   ├── DiscoverView.tsx      # Grade de descoberta e feed de leituras
│   ├── DetailModal.tsx       # Ficha analítica detalhada da obra avaliada
│   └── ScoreBadge.tsx        # Badges visuais de nota técnica e encaixe
├── services/
│   ├── geminiEvaluator.ts    # Motor de busca rápida IA + Avaliação crítica aprofundada
│   ├── evaluator.ts          # Orquestrador de busca, catálogo em memória e regras do Veredito
│   ├── amazonRecognizer.ts   # Parser de links Amazon (ASIN/ISBN10) e resolução de edição
│   ├── coverSearch.ts        # Resolução de capas alternativas e aliases internacionais
│   ├── ratings.ts            # Histórico pessoal de notas do leitor para calibração
│   └── supabase.ts           # Persistência de avaliações e avaliações do usuário
├── data/
│   ├── curatedCovers.ts      # Banco de capas verificadas em alta definição (0ms)
│   └── initialBooks.ts       # Livros iniciais de referência do acervo
└── types/
    └── index.ts              # Interfaces: BookEvaluation, CriteriaScores, VereditoTipo
```

---

## 3. O Motor de Busca Comercial (Atualização Crítica)

### 3.1. Contexto do Problema Anterior
No passado, a busca por texto consultava prioritariamente a **Open Library** (`openlibrary.org`). Como a Open Library é um arquivo voluntário internacional de bibliotecas físicas dos anos 70/80/90, ela não conhece edições comerciais brasileiras recentes e ranqueava livros acadêmicos aleatórios (ex: *"O nariz do morto"* de 1975 em vez do clássico de Nikolai Gógol, e zero resultados para livros recentes como *"Quarta Asa"*). Além disso, a API pública do Google Books atinge erro 429 (quota exceeded) sem autenticação OAuth.

### 3.2. A Nova Arquitetura de Busca em `searchBookApi` ([evaluator.ts](file:///c:/Users/Suporte/Desktop/livros/src/services/evaluator.ts))
A ordem de resolução é estritamente em camadas:

1. **Link da Amazon direto:** Se a entrada for URL da Amazon (`isAmazonUrl`), aciona [amazonRecognizer.ts](file:///c:/Users/Suporte/Desktop/livros/src/services/amazonRecognizer.ts), que extrai o ASIN e baixa a capa oficial via CDN.
2. **Busca por ISBN:** Se for código ISBN (10 ou 13 dígitos), consulta BrasilAPI (CBL) e OpenLibrary ISBN.
3. **Catálogo Curado em Memória:** Se o termo coincidir com os clássicos canônicos (`BRAZILIAN_EDITIONS_CATALOG`), responde em 0ms.
4. **Motor Comercial Inteligente via Gemini:** Invoca `searchPopularBooksWithGemini` em [geminiEvaluator.ts](file:///c:/Users/Suporte/Desktop/livros/src/services/geminiEvaluator.ts).
5. **Fallback:** Caso a rede ou IA falhe, a Open Library atua como contingência secundária.

---

## 4. Regras Fundamentais para Novas IAs (Performance e Busca)

> [!IMPORTANT]
> **NÃO utilize modelos pesados ou prompts prolixos no autocomplete da busca!**
> Usuários esperam que a lista de edições surja em menos de 2 a 3 segundos ao digitar.

### Regras de Ouro:
1. **Modelos para a Busca Rápida:**
   - Use estritamente: `gemini-3.1-flash-lite`, `gemini-flash-lite-latest` ou `gemini-3.5-flash-lite`.
   - **NUNCA** use `gemini-3.8-flash` ou `gemini-pro` no autocomplete: eles demoram mais de 8 a 10 segundos para gerar JSON e travam o fluxo de digitação.
2. **Carga Enxuta de Tokens:**
   - O prompt da busca rápida **deve retornar apenas 3 a 4 itens** com campos objetivos: `title`, `author`, `publisher`, `year`, `pages`, `isbn13`.
   - **NÃO** peça sinopses (`resumo`), análises de ritmo ou comparações na busca rápida. Toda a análise aprofundada é gerada apenas na avaliação completa (`evaluateWithGemini`).
3. **Resolução de Capas em 3 Estágios:**
   - **Estágio 1 (0ms):** [curatedCovers.ts](file:///c:/Users/Suporte/Desktop/livros/src/data/curatedCovers.ts) (`getCuratedCovers`). Sempre adicione novos bestsellers aqui.
   - **Estágio 2:** CDN da Amazon via ISBN-10/ASIN: `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.01.LZZZZZZZ.jpg`.
   - **Estágio 3:** Fallback Open Library: `https://covers.openlibrary.org/b/isbn/${isbn13}-L.jpg`.
   - **Fallback Visual:** [BookCover.tsx](file:///c:/Users/Suporte/Desktop/livros/src/components/BookCover.tsx) detecta imagens quebradas ou gifs 1x1 (43 bytes) e desenha uma capa tipográfica em couro clássica.
4. **Debounce no Input:**
   - Em [EvaluateModal.tsx](file:///c:/Users/Suporte/Desktop/livros/src/components/EvaluateModal.tsx), mantenha o debounce entre 350ms e 400ms para evitar chamadas sobrepostas enquanto o usuário digita.
   - Ao teclar `Enter`, o envio é imediato.
5. **Cache em Memória:**
   - `searchMemoryCache` em [geminiEvaluator.ts](file:///c:/Users/Suporte/Desktop/livros/src/services/geminiEvaluator.ts) armazena resultados de buscas recentes para resposta instantânea (0ms).

---

## 5. Como Testar e Fazer Build

```bash
# Validar tipagem TypeScript
npx tsc --noEmit

# Gerar bundle de produção
npm run build

# Executar ambiente local
npm run dev
```
