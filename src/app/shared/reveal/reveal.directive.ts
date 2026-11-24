import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Fades an element up the first time it scrolls into view.
 *
 * Safe by design: the prerendered HTML is always fully visible. Only in the
 * browser, and only for elements that start below the fold, is the hidden
 * state applied, so there's no flash for content already on screen and
 * nothing is lost if JavaScript fails. Reduced-motion users get no animation
 * (global rule in styles.css).
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective {
  /** Stagger delay in ms, e.g. for cards in a grid. */
  readonly appRevealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    let observer: IntersectionObserver | undefined;
    inject(DestroyRef).onDestroy(() => observer?.disconnect());

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      // Already visible on load: leave it alone.
      if (el.getBoundingClientRect().top < window.innerHeight) return;

      el.style.setProperty('--reveal-delay', `${this.appRevealDelay()}ms`);
      el.classList.add('reveal');
      // Once shown, drop the reveal classes so the element's own transitions
      // and hover transforms (e.g. card lift) work normally again.
      const cleanUp = (event: TransitionEvent) => {
        if (event.target !== el || event.propertyName !== 'opacity') return;
        if (!el.classList.contains('revealed')) return; // only after the fade-in
        el.classList.remove('reveal', 'revealed');
        el.style.removeProperty('--reveal-delay');
        el.removeEventListener('transitionend', cleanUp);
      };
      el.addEventListener('transitionend', cleanUp);
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.add('revealed');
            observer?.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
    });
  }
}
