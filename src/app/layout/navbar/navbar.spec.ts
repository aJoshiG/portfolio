import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { NAV_ITEMS } from '../../data/navigation';
import { PROFILE } from '../../data/profile';

describe('Navbar', () => {
  async function render() {
    const fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('renders a numbered link for every section', async () => {
    const { el } = await render();
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('#nav-menu a:not(.btn)'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(NAV_ITEMS.map((i) => '#' + i.id));
    expect(links[0].textContent).toContain('01.');
  });

  it('shows a Resume button only when a resume is set', async () => {
    const { el } = await render();
    const link = el.querySelector(`a[href="${PROFILE.resumeUrl}"]`);
    if (PROFILE.resumeUrl) {
      expect(link?.textContent).toContain('Resume');
    } else {
      expect(el.textContent).not.toContain('Resume');
    }
  });

  it('opens and closes the mobile menu', async () => {
    const { fixture, el } = await render();
    const button = el.querySelector<HTMLButtonElement>('.menu-btn')!;
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('#nav-menu')!.classList.contains('open')).toBe(true);
    expect(document.body.classList.contains('menu-open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });

  it('makes the page behind the open menu inert and returns focus on Escape', async () => {
    const main = document.body.appendChild(document.createElement('main'));
    try {
      const { fixture, el } = await render();
      const button = el.querySelector<HTMLButtonElement>('.menu-btn')!;

      button.click();
      await fixture.whenStable();
      expect(main.hasAttribute('inert')).toBe(true);

      el.querySelector<HTMLAnchorElement>('#nav-menu a')!.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await fixture.whenStable();
      expect(main.hasAttribute('inert')).toBe(false);
      expect(document.activeElement).toBe(button);
    } finally {
      main.remove();
    }
  });

  it('ignores Escape while the menu is closed', async () => {
    const { el } = await render();
    const link = el.querySelector<HTMLAnchorElement>('.brand')!;
    link.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.activeElement).toBe(link);
  });

  it('closes the menu when the window grows past the mobile breakpoint', async () => {
    let onChange: ((e: { matches: boolean }) => void) | undefined;
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: true,
      media: query,
      addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => (onChange = cb),
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
    try {
      const { fixture, el } = await render();
      el.querySelector<HTMLButtonElement>('.menu-btn')!.click();
      await fixture.whenStable();
      expect(document.body.classList.contains('menu-open')).toBe(true);

      onChange!({ matches: false });
      await fixture.whenStable();
      expect(document.body.classList.contains('menu-open')).toBe(false);
    } finally {
      window.matchMedia = original;
    }
  });

  it('closes the menu when a link is clicked', async () => {
    const { fixture, el } = await render();
    el.querySelector<HTMLButtonElement>('.menu-btn')!.click();
    await fixture.whenStable();
    el.querySelector<HTMLAnchorElement>('#nav-menu a')!.click();
    await fixture.whenStable();
    expect(el.querySelector('#nav-menu')!.classList.contains('open')).toBe(false);
  });
});
