import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/** Tracks which page section is currently in the middle of the viewport. */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  /** Id of the active section, or null when none is (e.g. at the top of the page). */
  readonly active = signal<string | null>(null);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());
  }

  observe(ids: string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') return;
    this.observer?.disconnect();

    const visible = new Set<string>();
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        this.active.set(ids.find((id) => visible.has(id)) ?? null);
      },
      // A thin band across the middle of the screen decides the active section.
      { rootMargin: '-45% 0px -54% 0px' },
    );

    for (const id of ids) {
      const el = this.doc.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }
}
