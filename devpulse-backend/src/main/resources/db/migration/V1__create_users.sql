create table users (
  id uuid primary key,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  api_key_hash varchar(128) not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
