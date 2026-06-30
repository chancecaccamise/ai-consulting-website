# AI Consulting Website

Marketing site for an AI consulting practice serving local small businesses.

**Core promise:** We get AI working inside small businesses that don't have time to figure it out.

**Funnel:** Everyone starts with an **Audit** → routes into one of three tiers (Consulting / Team Training / Done-For-You) → optional **Monthly Support** retainer.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router** for the 6 pages
- **Framer Motion** + **GSAP** (installed for the scroll narrative — Phase 3)

## Pages

| Route       | Page        |
| ----------- | ----------- |
| `/`         | Home        |
| `/audit`    | Audit       |
| `/services` | Services    |
| `/proof`    | Proof       |
| `/about`    | About       |
| `/book`     | Book a Call |

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Where to edit

- **Copy, nav, tiers, steps** — `src/site.config.ts` (single source of truth)
- **Pages** — `src/pages/`
- **Global components** — `src/components/` (Nav, Footer, CTABand, Button, Layout)
- **Design tokens / theme** — `src/index.css` (`@theme` block; swap once brand is finalized)

## Build phases

1. ✅ Scaffold routes + global nav/footer
2. ✅ Home static version (all sections, no animation)
3. ⬜ Layer in scroll animation + reduced-motion fallback
4. ✅ Services page (tiers)
5. ✅ Audit page
6. ✅ Proof, About, Book (static)
7. ⬜ Wire booking + forms to a real backend/scheduler
8. ⬜ Polish, performance pass, mobile QA

## Open decisions

- [ ] Brand name (placeholder: "AI Consulting" in `src/site.config.ts`)
- [ ] Pricing per tier (currently "TBD")
- [ ] Audit: paid or comped, and the price
- [ ] Booking tool (Calendly / Cal.com / Square) — form is a placeholder
- [ ] Domain + hosting
