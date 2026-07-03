-- ============================================================================
-- Booking system schema for the AI consulting site.
--
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste this whole
-- file → Run. Safe to re-run: everything uses "if not exists" /
-- "create or replace" / "drop policy if exists".
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

-- Double-booking guard: at most one ACTIVE booking per date+time. A cancelled
-- booking frees the slot again. If this errors, you have existing duplicates to
-- clean up first.
create unique index if not exists bookings_active_slot_uniq
  on public.bookings (date, "time")
  where status <> 'cancelled';

-- 2. Manual availability blocks ----------------------------------------------
-- Rows the admin adds by hand to make a slot unavailable (e.g. "busy that hour").
create table if not exists public.blocked_slots (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  date        date not null,              -- YYYY-MM-DD
  "time"      text not null,              -- slot label, e.g. "2:00 PM"
  reason      text,                       -- optional, admin-only note
  unique (date, "time")
);

create index if not exists blocked_slots_date_idx on public.blocked_slots (date);

-- 3. Row-level security -------------------------------------------------------
-- With RLS on, NO access is allowed unless a policy grants it. The public (anon)
-- key can create bookings but cannot read anyone's data.
alter table public.bookings enable row level security;
alter table public.blocked_slots enable row level security;

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

-- Only signed-in admins may create/read/delete manual blocks. The public never
-- touches this table directly (see the view below).
drop policy if exists "authenticated manage blocked_slots" on public.blocked_slots;
create policy "authenticated manage blocked_slots"
  on public.blocked_slots
  for all
  to authenticated
  using (true)
  with check (true);

-- 4. Public availability view -------------------------------------------------
-- The booking form needs to know which slots are taken WITHOUT seeing client
-- names/emails. This view exposes only date + time for every occupied slot
-- (active bookings + manual blocks). It runs with the view owner's rights
-- (security_invoker = false) so the anon role can read it while the underlying
-- bookings table stays private.
create or replace view public.unavailable_slots
  with (security_invoker = false) as
    select date, "time" from public.bookings where status <> 'cancelled'
    union
    select date, "time" from public.blocked_slots;

grant select on public.unavailable_slots to anon, authenticated;

-- Nudge PostgREST to pick up the new objects immediately.
notify pgrst, 'reload schema';

-- ============================================================================
-- IMPORTANT — lock down who can sign in (do this in the dashboard, not SQL):
--   Authentication → Providers → Email → turn OFF "Allow new users to sign up".
--   Then create your admin account under Authentication → Users → Add user
--   (check "Auto Confirm User").
-- Otherwise anyone could self-register and read bookings.
-- ============================================================================
