-- ============================================================================
-- Booking system schema for the AI consulting site.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste this whole
-- file → Run. Safe to re-run; it uses "if not exists" / "drop policy if exists".
-- ============================================================================

-- 1. The bookings table -------------------------------------------------------
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  service_id  text not null,              -- matches an id in booking.config.ts
  focus       text[] not null default '{}', -- selected focus-area ids (may be empty)
  date        date not null,              -- chosen day (YYYY-MM-DD)
  "time"      text not null,              -- slot label, e.g. "10:00 AM"

  name        text not null,
  email       text not null,
  business    text,
  phone       text,
  notes       text,

  status      text not null default 'new'
              check (status in ('new', 'confirmed', 'completed', 'cancelled'))
);

-- Admin dashboard sorts newest bookings first.
create index if not exists bookings_date_idx on public.bookings (date desc);

-- 2. Row-level security -------------------------------------------------------
-- With RLS on, NO access is allowed unless a policy grants it. That means the
-- public (anon) key can create bookings but cannot read anyone's data.
alter table public.bookings enable row level security;

-- Anyone (the public booking form) may submit a booking. We force new rows to
-- start as 'new' so a visitor can't pre-mark themselves confirmed.
drop policy if exists "anon can create bookings" on public.bookings;
create policy "anon can create bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (status = 'new');

-- Only signed-in admins may read bookings.
drop policy if exists "authenticated can read bookings" on public.bookings;
create policy "authenticated can read bookings"
  on public.bookings
  for select
  to authenticated
  using (true);

-- Only signed-in admins may change a booking's status.
drop policy if exists "authenticated can update bookings" on public.bookings;
create policy "authenticated can update bookings"
  on public.bookings
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- IMPORTANT — lock down who can sign in (do this in the dashboard, not SQL):
--   Authentication → Providers → Email → turn OFF "Allow new users to sign up".
--   Then create your admin account under Authentication → Users → Add user.
-- Otherwise anyone could self-register and read bookings.
-- ============================================================================
