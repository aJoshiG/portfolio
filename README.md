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

## Contact form setup (EmailJS)

The form sends messages to your inbox through [EmailJS](https://www.emailjs.com) (free plan: 200 emails/month).
Until the three keys below are filled in, the form validates normally but tells visitors to email you directly.

1. **Sign up** at https://dashboard.emailjs.com/sign-up.
2. **Add an email service:** *Email Services → Add New Service → Gmail*, connect your Gmail account,
   and copy the **Service ID** (e.g. `service_abc123`).
3. **Create a template:** *Email Templates → Create New Template*, then set:
   - **Subject:** `New portfolio message from {{from_name}}`
   - **Content:**
     ```
     Name: {{from_name}}
     Email: {{reply_to}}

     {{message}}
     ```
   - **To Email:** your own address
   - **Reply To:** `{{reply_to}}` (so pressing "Reply" answers the sender)

   Save and copy the **Template ID** (e.g. `template_xyz789`).
4. **Copy your Public Key:** *Account → General → Public Key*.
5. Paste all three into `src/app/config/emailjs.config.ts`.
6. **Lock it down** (after deploying): *Account → Security → Allowed origins*, add only your live site's URL
   so nobody else can use your keys.

The keys are designed to be public (they only allow sending through your template). Spam protection on the
site: a hidden honeypot field, a minimum fill time, EmailJS headless-browser blocking, and a limit of one
message per 10 seconds per browser.
