import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NAV_ITEMS, sectionNumber } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { ScrollSpyService } from '../../services/scroll-spy.service';
import { Icon } from '../../shared/icon/icon';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

/** Must match the breakpoint in navbar.css where the mobile menu takes over. */
const MOBILE_QUERY = '(max-width: 820px)';

@Component({
  selector: 'app-navbar',
  imports: [Icon, ThemeToggle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class Navbar {
  protected readonly items = NAV_ITEMS;
  protected readonly profile = PROFILE;
  protected readonly sectionNumber = sectionNumber;
  protected readonly spy = inject(ScrollSpyService);

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    const doc = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    // While the mobile menu is open: lock page scroll, and make everything behind
    // the menu unreachable by keyboard and screen readers.
    effect(() => {
      const open = this.menuOpen();
      doc.body.classList.toggle('menu-open', open);
      for (const el of doc.querySelectorAll('main, app-footer')) el.toggleAttribute('inert', open);
    });

    afterNextRender(() => {
      // Correct navbar background when the page loads already scrolled (refresh, #anchor).
      this.onScroll();

      // Close the menu if the window grows past the mobile breakpoint, so the page
      // never stays scroll-locked behind a menu that is no longer shown.
      const mobile = window.matchMedia?.(MOBILE_QUERY);
      const onChange = (event: MediaQueryListEvent) => {
        if (!event.matches) this.closeMenu();
      };
      mobile?.addEventListener('change', onChange);
      destroyRef.onDestroy(() => mobile?.removeEventListener('change', onChange));
    });
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Escape closes the menu and returns focus to the button that opened it. */
  protected onEscape(): void {
    if (!this.menuOpen()) return;
    this.closeMenu();
    this.menuButton().nativeElement.focus();
  }
}
