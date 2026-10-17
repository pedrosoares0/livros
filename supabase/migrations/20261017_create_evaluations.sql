-- Protocolo: Tabela de Avaliações de Obras
create table if not exists public.evaluations (
  id text primary key,
  title text not null,
  author text not null,
  pages integer default 0,
  cover_url text,
  year integer,
  genres jsonb default '[]'::jsonb,
  resumo text default '',
  movie_comparisons jsonb default '[]'::jsonb,
  adaptacoes text default '',
  criteria jsonb default '{}'::jsonb,
  nota_tecnica numeric(4,1) not null,
  nota_encaixe numeric(4,1) not null,
  veredito text not null,
  veredito_tipo text not null,
  justificativa_encaixe text default '',
  created_at timestamptz default now()
);

-- Habilitar Row Level Security (RLS)
alter table public.evaluations enable row level security;

-- Políticas de acesso público anônimo (para o frontend com a chave pública)
drop policy if exists "Allow public read on evaluations" on public.evaluations;
create policy "Allow public read on evaluations" 
  on public.evaluations for select 
  using (true);

drop policy if exists "Allow public insert on evaluations" on public.evaluations;
create policy "Allow public insert on evaluations" 
  on public.evaluations for insert 
  with check (true);

drop policy if exists "Allow public update on evaluations" on public.evaluations;
create policy "Allow public update on evaluations" 
  on public.evaluations for update 
  using (true);

drop policy if exists "Allow public delete on evaluations" on public.evaluations;
create policy "Allow public delete on evaluations" 
  on public.evaluations for delete 
  using (true);

-- Índices de performance
create index if not exists idx_evaluations_created_at on public.evaluations (created_at desc);
create index if not exists idx_evaluations_nota_encaixe on public.evaluations (nota_encaixe desc);
