-- Veredito: Notas pessoais do leitor ("Já li")
-- Uma nota por livro. Serve como sinal de calibração para as próximas avaliações da IA.
-- Rode este script no SQL Editor do Supabase.

create table if not exists public.user_ratings (
  book_id text primary key,
  rating smallint not null check (rating between 1 and 10),
  tags text[] not null default '{}',
  rated_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Habilitar Row Level Security (RLS)
alter table public.user_ratings enable row level security;

-- Políticas de acesso público anônimo (mesmo padrão da tabela evaluations)
drop policy if exists "Allow public read on user_ratings" on public.user_ratings;
create policy "Allow public read on user_ratings"
  on public.user_ratings for select
  using (true);

drop policy if exists "Allow public insert on user_ratings" on public.user_ratings;
create policy "Allow public insert on user_ratings"
  on public.user_ratings for insert
  with check (true);

drop policy if exists "Allow public update on user_ratings" on public.user_ratings;
create policy "Allow public update on user_ratings"
  on public.user_ratings for update
  using (true);

drop policy if exists "Allow public delete on user_ratings" on public.user_ratings;
create policy "Allow public delete on user_ratings"
  on public.user_ratings for delete
  using (true);

-- Índice para buscar as leituras mais recentes (usado no prompt da IA)
create index if not exists idx_user_ratings_updated_at on public.user_ratings (updated_at desc);
