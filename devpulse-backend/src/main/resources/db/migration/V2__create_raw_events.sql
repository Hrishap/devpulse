create table raw_events (
  id uuid primary key,
  user_id uuid not null references users(id),
  session_id varchar(64) not null,
  event_type varchar(32) not null,
  ts timestamptz not null,
  repo varchar(255),
  branch varchar(255),
  filename varchar(512),
  language varchar(64),
  created_at timestamptz not null default now()
);

create index idx_raw_events_user_ts on raw_events(user_id, ts);
create unique index raw_event_dedupe on raw_events(user_id, session_id, ts, event_type, coalesce(filename, ''));
