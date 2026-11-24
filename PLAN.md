# Portfolio Website — Plan

Reference: the earlier vibe-coded Angular portfolio at `D:\Angular\AngularLearning\aditya-portfolio` (used only as a content/idea reference; nothing is reused directly).

## Concept

A **single scrolling page a recruiter can read in about 30 seconds**: who I am, what I've built, how to reach me. Everything important is visible without clicking, and every project shows proof (code, demo, tech used).

### What to fix from the old site
- Content split across 4 routes; key info hidden behind a sidebar toggle
- Placeholder project links (`github.com/yourusername/...`)
- No tech tags, screenshots, or live demos on projects
- Hard-coded "2025" on the home page and in the footer
- Dark mode doesn't persist and ignores the system preference
- Contact form has no error state or spam protection; Firestore rules need checking
- Birth date publicly shown
- No Experience section, no resume, no SEO/meta tags
- Old `*ngIf` / `*ngFor` syntax

## Tech Choices

| Decision | Choice | Why |
|---|---|---|
| Framework | Angular 21, standalone components, prerendered (SSG) | Continues Angular learning; prerendering fixes SEO and first-load speed. Angular 22 needs Node ≥ 22.22; 21 works on the installed Node 22.13 and is supported until ~May 2027 |
| Styling | Plain CSS + CSS variables, no UI library | Light, full control, easy theming |
| Content | Typed data files (`src/app/data/*.ts`) | Adding a project means editing data, not HTML |
| Contact form | EmailJS | Messages go straight to the inbox; no backend to secure |
| Hosting | Vercel | Free, fast static hosting, custom domain + SSL |

## Page Structure (one page, sticky nav, smooth scroll)

1. **Hero**: name, one-line positioning, short subtext, 2 buttons ("View Projects", "Resume"), illustrated avatar (`avatar.svg`), social icons
2. **About**: short paragraph in my own voice + quick-facts strip (JNU, B.Tech + M.Tech dual degree, graduating 2027, New Delhi, focus areas)
3. **Skills**: grouped chips: Languages, Frameworks, ML/Data, Tools
4. **Experience**: timeline of internships, research, freelance work, hackathons (hidden until there's at least one entry)
5. **Projects**: 1–2 featured projects as large cards with screenshots + a grid for the rest. Each has problem, outcome, tech tags, GitHub link, demo link
6. **Achievements**: ML Specialization (DeepLearning.AI, Feb 2025) and leadership roles (Akshar, Kreeda, Phoenix at JNU)
7. **Contact**: form + direct links (email, LinkedIn)
8. **Footer**: socials, current year (computed), "Built with Angular"

Not included on purpose: birth date, separate About route, sidebar toggle.

## Component Structure

```
src/app/
├── layout/
│   ├── navbar/            sticky, highlights current section on scroll, mobile hamburger
│   ├── footer/
│   └── theme-toggle/      light/dark, persisted, follows system default
├── sections/
│   ├── hero/  about/  skills/  experience/  projects/  achievements/  contact/
├── shared/
│   ├── section-header/    consistent "02. Projects" style headings
│   ├── project-card/      featured + compact variants
│   ├── skill-chip/
│   ├── timeline-item/
│   ├── button/            primary / ghost
│   └── reveal.directive   fade-in on scroll (off for reduced-motion users)
├── services/
│   ├── theme.service      signal-based theme state + localStorage
│   └── contact.service    EmailJS send, loading/success/error states
└── data/
    ├── profile.ts  skills.ts  experience.ts  projects.ts  achievements.ts
```

Angular conventions: standalone components, signals, new control flow (`@if` / `@for`), OnPush change detection.

## Features

### Must-have (v1)
- [ ] Responsive, mobile-first layout
- [ ] Dark/light theme with no flash of the wrong theme on load
- [ ] Scroll-spy nav with smooth scrolling
- [ ] Contact form: validation, loading/error/success states, honeypot spam field, sends via EmailJS
- [ ] Resume PDF download (`/public/resume.pdf`)
- [ ] SEO: title, meta description, Open Graph image, favicon
- [ ] Accessibility: semantic HTML, keyboard navigation, focus states, alt text, AA contrast
- [ ] Lighthouse score 95+

### Nice-to-have (v2)
- [ ] Project filters by tech (ML / Web / etc.)
- [ ] Project detail pages (`/projects/:slug`) with write-ups
- [ ] Live GitHub stats / pinned repos
- [ ] Blog or notes section (ML learning posts)
- [ ] Analytics (Firebase or Plausible)
- [ ] Custom domain (e.g. `adityajoshi.dev`)

## Design Direction

Minimal and calm, in the style of Brittany Chiang or Lee Robinson:
- Neutral background, one accent color, Inter font, content max-width ~1100px
- Generous spacing, subtle motion only
- Projects carry the visual weight: real screenshots, not emoji buttons

## Build Steps

1. [x] **Scaffold**: Angular 21 project, static prerender, self-hosted fonts, theme tokens, typed data files, local git (done 2026-11-25)
2. [x] **Layout**: sticky navbar with scroll spy + mobile menu, theme toggle, footer, icon set, section headers + shells (done 2026-11-25)
3. [x] **Content sections**: hero, about, skills, experience (hidden until filled), projects (SkillSwap featured + screenshot), achievements, contact intro (done 2026-11-25)
4. [x] **Contact**: validated form (EmailJS, loaded on demand), honeypot + fill-time + rate-limit spam protection, accessible errors/success, lazy-loaded with @defer (done 2026-11-25; needs EmailJS keys, see README)
5. [ ] **Polish**: animations, responsive pass, accessibility + Lighthouse fixes, SEO tags
6. [ ] **Final check & publish**: full bug/mistake review, then GitHub + Vercel deploy (+ custom domain if wanted)

## Decisions

| Question | Decision | Reasoning |
|---|---|---|
| Target role | **Full-stack developer with an ML focus** | SkillSwap (MEAN stack, real-time, transactions, CI) is the strongest work and is full-stack; the ML Specialization backs up the ML side. |
| Headline | "Full-stack developer building real-time web apps, with a growing focus on machine learning." | Leads with proven skill, signals direction |
| Project order | 1. **SkillSwap** (featured) · 2. **This portfolio** | Only solid work is shown. ChatBot and the resume-uploader are left out on purpose. The grid looks good with 1–2 projects and ends with a "More on GitHub" card. |
| Experience | Section built now, **hidden until the internship entry is added** | Internship certificate coming later |
| Resume | "Resume" button **hidden until `public/resume.pdf` exists** | No dead links |
| Avatar | **Illustrated avatar** (`avatar.svg`, made from the LinkedIn photo: curly hair, short beard, light-blue shirt) instead of the real photo | Friendly, matches the teal theme, also used as the favicon / Open Graph image base |
| Look | **Dark-first, minimal, techy**: deep navy background (`#0b1120`), teal accent (`#2dd4bf`), Inter + JetBrains Mono for small labels; full light theme as well | Fits a developer portfolio, high contrast, one accent keeps it calm |
| Contact form | **EmailJS** | Messages go straight to the inbox, no database to secure or check |
| Hosting | **Vercel** (free, prerendered static site) | Firebase no longer needed since there's no Firestore. Deploy happens only at the very end. |

> Tech-table update: with EmailJS, Firebase/Firestore is **not** used. `contact.service` sends through EmailJS instead.

## Projects Data

### SkillSwap (featured)
- **Repo**: https://github.com/aJoshiG/skillswap
- **Live demo**: https://skillswap-7dfr.onrender.com (has a "Try the demo account" button; free hosting takes ~50s to wake)
- **Tagline**: Trade what you know for what you want to learn: a peer-to-peer skill-exchange platform.
- **Stack**: Angular 20, TypeScript (strict), Tailwind CSS 4, Node.js 22, Express 5, MongoDB/Mongoose, Socket.io 4, Playwright, Docker, GitHub Actions CI
- **Highlights**:
  - Smart matching via a single MongoDB aggregation pipeline, ranking two-way swaps first, with Bayesian-averaged ratings
  - Real-time chat over JWT-authenticated sockets: typing indicators, read receipts, presence
  - Time-credit economy with escrow, refunds and auto-completion, every step in a MongoDB transaction with an append-only ledger
  - Secure auth: in-memory access token + rotating httpOnly refresh token with reuse detection
- **Images**: screenshots in the repo's `docs/images/` (`tour.gif`, `matches.png`, `chat.png`, `sessions.png`, `profile.png`, `mobile-matches.png`)

### This Portfolio
- Angular 21 prerendered site; repo link added once it's on GitHub

## Pending From Me
- [ ] Internship details + certificate (adds the Experience entry)
- [ ] Resume PDF (enables the Resume button)
- [ ] EmailJS account (service ID, template ID, public key), needed when building the contact form
- [ ] New projects as they're made: add an entry to `src/app/data/projects.ts`

## Ground Rules
- **No GitHub until done.** Local git only, no remote, no push. Finish everything, check for bugs and mistakes, then publish.
- The old project folder is reference only: never modified.

## Existing Content to Carry Over

- **Name**: Aditya Joshi
- **Education**: B.Tech + M.Tech (dual degree) in CSE, School of Engineering, JNU New Delhi, 2022–2027
- **Skills**: C, Java, Python, HTML, CSS, JavaScript, SQL · VS Code, Jupyter, Colab, GitHub, GCP · ML, DSA, OOP
- **Certification**: Machine Learning Specialization, DeepLearning.AI / Coursera (Feb 2025): https://coursera.org/verify/specialization/IZJM5KK1L9MF
- **Leadership**: Executive at Akshar (Literary Society), Kreeda (Sports Club), Phoenix (Entrepreneurship Club)
- **Projects**: SkillSwap (featured), this portfolio (see Projects Data above)
- **Links**: GitHub `aJoshiG`, LinkedIn `aditya-joshi-358b2132a`, X `AdityaAdi0310`
