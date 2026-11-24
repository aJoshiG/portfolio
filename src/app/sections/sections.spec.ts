import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Experience } from './experience/experience';
import { Projects } from './projects/projects';
import { Achievements } from './achievements/achievements';
import { Contact } from './contact/contact';
import { HomePage } from '../pages/home/home';
import { NAV_ITEMS } from '../data/navigation';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { SKILL_GROUPS } from '../data/skills';

async function render<T>(component: Type<T>, inputs: Record<string, unknown> = {}) {
  const fixture = TestBed.createComponent(component);
  for (const [key, value] of Object.entries(inputs)) fixture.componentRef.setInput(key, value);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Home page', () => {
  it('renders a section for every nav item, in nav order', async () => {
    const el = await render(HomePage);
    const ids = Array.from(el.querySelectorAll('section[id]'))
      .map((s) => s.id)
      .filter((id) => id !== 'hero');
    expect(ids).toEqual(NAV_ITEMS.map((i) => i.id));
  });

  it('has exactly one h1', async () => {
    const el = await render(HomePage);
    expect(el.querySelectorAll('h1').length).toBe(1);
  });
});

describe('Hero', () => {
  it('shows name, tagline and the availability pill', async () => {
    const el = await render(Hero);
    expect(el.querySelector('h1')?.textContent).toContain(PROFILE.name);
    expect(el.textContent).toContain(PROFILE.tagline);
    expect(el.textContent).toContain(PROFILE.availability);
  });

  it('hides the Resume button while resumeUrl is empty', async () => {
    const el = await render(Hero);
    expect(el.textContent).not.toContain('Resume');
  });
});

describe('About', () => {
  it('lists every quick fact', async () => {
    const el = await render(About);
    expect(el.querySelectorAll('dt').length).toBe(PROFILE.quickFacts.length);
  });
});

describe('Skills', () => {
  it('renders every skill as a chip', async () => {
    const el = await render(Skills);
    const total = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);
    expect(el.querySelectorAll('.chip').length).toBe(total);
  });
});

describe('Experience', () => {
  it('renders timeline entries with optional certificate link', async () => {
    const el = await render(Experience, {
      items: [
        {
          role: 'Software Intern',
          organization: 'Acme',
          start: 'May 2026',
          end: 'Jul 2026',
          highlights: ['Built a thing'],
          certificateUrl: 'https://example.com/cert.pdf',
        },
      ],
    });
    expect(el.querySelectorAll('.entry').length).toBe(1);
    expect(el.textContent).toContain('Software Intern');
    expect(el.querySelector('a[href="https://example.com/cert.pdf"]')).toBeTruthy();
  });
});

describe('Projects', () => {
  it('renders every project plus the More on GitHub card', async () => {
    const el = await render(Projects);
    expect(el.querySelectorAll('app-project-card').length).toBe(PROJECTS.length);
    expect(el.querySelector('.featured h3')?.textContent).toContain('SkillSwap');
    expect(el.textContent).toContain('More on GitHub');
  });

  it('opens every external link safely in a new tab', async () => {
    const el = await render(Projects);
    el.querySelectorAll('a[target="_blank"]').forEach((a) =>
      expect(a.getAttribute('rel')).toContain('noopener'),
    );
  });
});

describe('Achievements', () => {
  it('links the certificate credential', async () => {
    const el = await render(Achievements);
    expect(el.querySelector('a[href*="coursera.org/verify"]')).toBeTruthy();
  });
});

describe('Contact', () => {
  it('offers a mailto link', async () => {
    const el = await render(Contact);
    expect(el.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });
});
