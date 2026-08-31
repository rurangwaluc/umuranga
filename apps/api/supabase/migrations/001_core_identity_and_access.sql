create extension if not exists "pgcrypto";

do $$ begin
  create type platform_role as enum (
    'platform_owner',
    'platform_admin',
    'platform_support'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type profile_status as enum (
    'pending',
    'active',
    'suspended',
    'rejected'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type agency_member_role as enum (
    'agency_owner',
    'agency_admin',
    'agency_agent'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  phone text,
  password_hash text not null,
  email_verified_at timestamptz,
  phone_verified_at timestamptz,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists platform_user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  role platform_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table if not exists landlord_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  display_name text not null,
  bio text,
  status profile_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agency_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references users(id) on delete restrict,
  agency_name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  status profile_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists agency_members (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agency_profiles(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role agency_member_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (agency_id, user_id)
);

create table if not exists agent_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  display_name text not null,
  bio text,
  license_number text,
  status profile_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists partner_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references users(id) on delete restrict,
  business_name text not null,
  slug text not null unique,
  category text not null,
  description text,
  status profile_status not null default 'pending',
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists refresh_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists email_verification_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists users_email_idx on users(email);
create index if not exists platform_user_roles_user_id_idx on platform_user_roles(user_id);
create index if not exists landlord_profiles_user_id_idx on landlord_profiles(user_id);
create index if not exists agency_profiles_owner_user_id_idx on agency_profiles(owner_user_id);
create index if not exists agency_members_user_id_idx on agency_members(user_id);
create index if not exists agent_profiles_user_id_idx on agent_profiles(user_id);
create index if not exists partner_profiles_owner_user_id_idx on partner_profiles(owner_user_id);
create index if not exists refresh_tokens_user_id_idx on refresh_tokens(user_id);
create index if not exists email_verification_tokens_user_id_idx on email_verification_tokens(user_id);
