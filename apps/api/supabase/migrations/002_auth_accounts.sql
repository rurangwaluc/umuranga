create extension if not exists "pgcrypto";

do $$ begin
  create type auth_provider as enum (
    'google'
  );
exception
  when duplicate_object then null;
end $$;

alter table users
  alter column password_hash drop not null;

create table if not exists auth_accounts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references users(id) on delete cascade,

  provider auth_provider not null,
  provider_account_id text not null,
  provider_email text not null,
  provider_full_name text,
  provider_avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (provider, provider_account_id),
  unique (user_id, provider)
);

create index if not exists auth_accounts_user_id_idx
  on auth_accounts(user_id);

create index if not exists auth_accounts_provider_email_idx
  on auth_accounts(lower(provider_email));

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists auth_accounts_set_updated_at on auth_accounts;

create trigger auth_accounts_set_updated_at
before update on auth_accounts
for each row
execute function set_updated_at();