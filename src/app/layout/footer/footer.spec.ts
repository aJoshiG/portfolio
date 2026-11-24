import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { PROFILE } from '../../data/profile';

describe('Footer', () => {
  it('shows the current year and a labelled link per social profile', async () => {
    const fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain(String(new Date().getFullYear()));
    const links = el.querySelectorAll('.socials a');
    expect(links.length).toBe(PROFILE.socials.length);
    links.forEach((a) => expect(a.getAttribute('aria-label')).toBeTruthy());
  });

  it('opens external profiles in a new tab but not the email link', async () => {
    const fixture = TestBed.createComponent(Footer);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const mail = el.querySelector('a[href^="mailto:"]')!;
    const github = el.querySelector('a[href*="github.com"]')!;
    expect(mail.getAttribute('target')).toBeNull();
    expect(github.getAttribute('target')).toBe('_blank');
    expect(github.getAttribute('rel')).toContain('noopener');
  });
});
