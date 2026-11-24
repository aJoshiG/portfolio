import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let root: HTMLElement;

  beforeEach(() => {
    localStorage.clear();
    root = TestBed.inject(DOCUMENT).documentElement;
    root.removeAttribute('data-theme');
    root.classList.remove('theme-transition');
  });

  it('defaults to dark when no theme was applied', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('picks up the theme set by the index.html script', () => {
    root.setAttribute('data-theme', 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('toggles the theme, updates <html> and saves the choice', () => {
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('light');
    expect(root.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');

    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('adds the transition class only while switching', () => {
    vi.useFakeTimers();
    try {
      const service = TestBed.inject(ThemeService);
      expect(root.classList.contains('theme-transition')).toBe(false);
      service.toggle();
      expect(root.classList.contains('theme-transition')).toBe(true);
      vi.advanceTimersByTime(400);
      expect(root.classList.contains('theme-transition')).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});
