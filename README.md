# Aditya Joshi · Portfolio

Personal portfolio site. Angular 21, prerendered to static HTML. See [PLAN.md](PLAN.md) for the full plan and progress.

## Commands

| Task | Command |
|---|---|
| Dev server (http://localhost:4200) | `npm start` |
| Production build (static files in `dist/portfolio/browser`) | `npm run build` |
| Unit tests (Vitest) | `npm test` |

> **Installing packages:** npm 10.9 has a bug (`Cannot read properties of null (reading 'edgesOut')`) with this
> project's dependencies. Use npm 11 through npx instead: `npx npm@11 install`.

## Editing content

All text lives in `src/app/data/`, so no HTML changes are needed:

| File | What it holds |
|---|---|
| `profile.ts` | Name, headline, summary, social links, quick facts, resume link |
| `skills.ts` | Skill groups |
| `experience.ts` | Internships and work (section is hidden while empty) |
| `projects.ts` | Projects (set `featured: true` for the large card) |
| `achievements.ts` | Certifications and leadership roles |

## Structure

```
src/
├── index.html          meta tags + no-flash theme script
├── styles.css          design tokens (colors, type, spacing) + base styles
└── app/
    ├── data/           all site content (typed)
    ├── pages/home/     the single scrolling page
    ├── layout/         navbar, footer, theme toggle        (step 2)
    ├── sections/       hero, about, skills, ...            (step 3)
    ├── shared/         reusable UI pieces                  (steps 2–3)
    └── services/       theme + contact                     (steps 2 and 4)
```
