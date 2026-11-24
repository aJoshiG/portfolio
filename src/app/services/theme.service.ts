import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { dark: '#0b1120', light: '#f8fafc' };

/**
 * Owns the color theme. The inline script in index.html applies the saved or
 * system theme before first paint; this service picks that up and handles toggling.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private transitionTimer?: ReturnType<typeof setTimeout>;

  readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    if (!this.isBrowser) return;
    // Follow the OS setting live, unless the visitor picked a theme themselves.
    window.matchMedia?.('(prefers-color-scheme: light)').addEventListener('change', (event) => {
      if (!this.hasSavedTheme()) this.apply(event.matches ? 'light' : 'dark', false);
    });
  }

  toggle(): void {
    this.apply(this.theme() === 'dark' ? 'light' : 'dark', true);
  }

  private apply(theme: Theme, persist: boolean): void {
    const root = this.doc.documentElement;
    // Animate colors only during a switch (see .theme-transition in styles.css).
    root.classList.add('theme-transition');
    clearTimeout(this.transitionTimer);
    this.transitionTimer = setTimeout(() => root.classList.remove('theme-transition'), 350);

    root.setAttribute('data-theme', theme);
    this.doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    this.theme.set(theme);

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage can be blocked (private mode); the theme still applies for this visit.
      }
    }
  }

  private readInitialTheme(): Theme {
    if (!this.isBrowser) return 'dark';
    return this.doc.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  private hasSavedTheme(): boolean {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark';
    } catch {
      return false;
    }
  }
}
