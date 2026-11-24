import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { NAV_ITEMS, sectionNumber } from '../../data/navigation';
import { PROFILE } from '../../data/profile';
import { ScrollSpyService } from '../../services/scroll-spy.service';
import { Icon } from '../../shared/icon/icon';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  imports: [Icon, ThemeToggle],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Navbar {
  protected readonly items = NAV_ITEMS;
  protected readonly profile = PROFILE;
  protected readonly sectionNumber = sectionNumber;
  protected readonly spy = inject(ScrollSpyService);

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    // Lock page scroll behind the open mobile menu.
    const body = inject(DOCUMENT).body;
    effect(() => body.classList.toggle('menu-open', this.menuOpen()));
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
}
