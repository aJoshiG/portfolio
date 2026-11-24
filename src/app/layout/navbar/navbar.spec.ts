import { TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { NAV_ITEMS } from '../../data/navigation';

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

  it('hides the Resume button while there is no resume', async () => {
    const { el } = await render();
    expect(el.textContent).not.toContain('Resume');
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

  it('closes the menu when a link is clicked', async () => {
    const { fixture, el } = await render();
    el.querySelector<HTMLButtonElement>('.menu-btn')!.click();
    await fixture.whenStable();
    el.querySelector<HTMLAnchorElement>('#nav-menu a')!.click();
    await fixture.whenStable();
    expect(el.querySelector('#nav-menu')!.classList.contains('open')).toBe(false);
  });
});
