-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Brand Kits table
create table if not exists brand_kits (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  primary_color text not null default '#6366f1',
  secondary_color text not null default '#8b5cf6',
  font_family text not null default 'Inter',
  logo_url text,
  watermark_url text,
  caption_style jsonb not null default '{
    "fontSize": 32,
    "fontColor": "#ffffff",
    "backgroundColor": "#000000",
    "backgroundOpacity": 0.6,
    "position": "bottom",
    "bold": true
  }'::jsonb
);

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  youtube_url text not null,
  title text,
  thumbnail_url text,
  video_storage_path text,
  clip_count integer not null default 3,
  aspect_ratio text not null default '9:16' check (aspect_ratio in ('9:16', '1:1', '16:9')),
  plan text not null default 'free' check (plan in ('free', 'pro')),
  brand_kit_id uuid references brand_kits(id) on delete set null,
  language text not null default 'en',
  status text not null default 'pending' check (status in (
    'pending', 'downloading', 'transcribing', 'analyzing',
    'clipping', 'captioning', 'completed', 'failed'
  )),
  error_message text,
  workflow_run_id text,
  transcript jsonb
);

-- Clips table
create table if not exists clips (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  storage_path text,
  public_url text,
  start_time numeric not null,
  end_time numeric not null,
  score numeric not null default 0,
  reason text,
  captions_srt text,
  has_watermark boolean not null default false,
  status text not null default 'processing' check (status in ('processing', 'completed', 'failed')),
  error_message text
);

-- Indexes
create index if not exists projects_status_idx on projects(status);
create index if not exists projects_created_at_idx on projects(created_at desc);
create index if not exists clips_project_id_idx on clips(project_id);
create index if not exists clips_status_idx on clips(status);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

create trigger brand_kits_updated_at
  before update on brand_kits
  for each row execute function update_updated_at();

-- Storage bucket (run this manually in Supabase dashboard or via API)
-- insert into storage.buckets (id, name, public) values ('clypai-videos', 'clypai-videos', true);

-- RLS policies - public access (no auth for now)
alter table projects enable row level security;
alter table clips enable row level security;
alter table brand_kits enable row level security;

create policy "public_projects_select" on projects for select using (true);
create policy "public_projects_insert" on projects for insert with check (true);
create policy "public_projects_update" on projects for update using (true);

create policy "public_clips_select" on clips for select using (true);
create policy "public_clips_insert" on clips for insert with check (true);
create policy "public_clips_update" on clips for update using (true);

create policy "public_brand_kits_select" on brand_kits for select using (true);
create policy "public_brand_kits_insert" on brand_kits for insert with check (true);
create policy "public_brand_kits_update" on brand_kits for update using (true);

-- Seed default brand kit
insert into brand_kits (name, primary_color, secondary_color, font_family, caption_style)
values (
  'Default',
  '#6366f1',
  '#8b5cf6',
  'Inter',
  '{
    "fontSize": 32,
    "fontColor": "#ffffff",
    "backgroundColor": "#000000",
    "backgroundOpacity": 0.6,
    "position": "bottom",
    "bold": true
  }'::jsonb
);
