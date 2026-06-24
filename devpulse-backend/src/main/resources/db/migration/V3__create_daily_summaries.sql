create table daily_summaries (
  id uuid primary key,
  user_id uuid not null references users(id),
  day date not null,
  total_active_ms bigint not null,
  flow_sessions_json text not null,
  context_switches integer not null,
  top_repo varchar(255),
  top_language varchar(64),
  flow_score integer not null,
  updated_at timestamptz not null default now(),
  constraint daily_summary_unique unique (user_id, day)
);
