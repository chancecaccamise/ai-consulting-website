# Contributing

Thanks for working on the AI consulting website. This guide covers how to get set up, where things live, and the workflow we use so `main` stays stable.

## Getting started

You'll need [Node.js](https://nodejs.org/) 20+ and npm.

```bash
# 1. Clone the repo
git clone https://github.com/chancecaccamise/ai-consulting-website.git
cd ai-consulting-website

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev
```

### Useful commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload          |
| `npm run build`   | Type-check and build for production           |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run the linter                                |

**Always run `npm run build` before opening a PR** — it type-checks the whole project and catches errors the dev server won't.

## Project structure

```
src/
  site.config.ts        # Single source of truth for copy, nav, services, pricing, projects
  index.css             # Tailwind import + theme tokens
  styles/
    legacy-house.css    # Design system: tokens, fonts, type, surfaces, buttons
  components/           # Shared UI (Nav, Footer, Button, CTABand, BeamsBackground, etc.)
  pages/                # One file per route (Home, Audit, Services, Proof, About, Book)
public/
  fonts/                # Media Sans Extended + Montserrat
  brand/                # Legacy House logo marks
```

**Editing copy?** Most text (services, pricing tiers, projects, nav, taglines) lives in `src/site.config.ts`. Change it there rather than hunting through components.

## Design system

This site uses the **Legacy House** design system. A few rules keep it consistent:

- **Light theme.** The site is light and clean. The one intentional exception is the dark hero band on the home page.
- **Accent color is emerald** (`#059669`). Use the `text-green` / `bg-green` utilities or the `lh-accent-text` class, not arbitrary greens.
- **Cards are flat** — white with a hairline border (`lh-surface-d`). No drop shadows or neumorphic 3D.
- **Type uses the `lh-*` classes** (`lh-h1`, `lh-h2`, `lh-h4`, `lh-body-lg`, etc.) so sizing and the display font stay consistent.
- **No em dashes** in any copy. Use commas, colons, or periods instead.
- **Respect `prefers-reduced-motion`** for any animation.

Tokens live in `src/styles/legacy-house.css`; Tailwind color/font aliases are in `src/index.css`.

## Workflow

We work on branches and merge through Pull Requests. Don't push directly to `main`.

```bash
# 1. Start from an up-to-date main
git checkout main
git pull

# 2. Create a branch
git checkout -b feature/short-description

# 3. Make changes, then commit
git add -A
git commit -m "Add the thing"

# 4. Push your branch
git push -u origin feature/short-description
```

Then open a Pull Request on GitHub against `main` and request a review.

### Branch names

Use a short prefix and a kebab-case description:

- `feature/pricing-cards`
- `fix/nav-mobile-overflow`
- `copy/services-rewrite`

### Commit messages

- Write in the imperative mood: "Add hero animation", not "Added" or "Adds".
- Keep the first line under ~72 characters; add detail in the body if needed.
- One logical change per commit where practical.

## Before you open a PR

- [ ] `npm run build` passes (no type errors).
- [ ] You checked the change in the browser (desktop and mobile widths).
- [ ] No em dashes in any new copy.
- [ ] No secrets, API keys, or `.env` files committed.

Questions? Open an issue or ask in the team channel.
