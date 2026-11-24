import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `<div appReveal [appRevealDelay]="120">content</div>`,
})
class Host {}

describe('RevealDirective', () => {
  let observed: Element[];
  let trigger: (isIntersecting: boolean) => void;
  let rectTop: number;

  beforeEach(() => {
    observed = [];
    rectTop = 2000; // below the fold by default
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () => ({ top: rectTop }) as DOMRect,
    );
    // Minimal IntersectionObserver stand-in (jsdom has none).
    globalThis.IntersectionObserver = class {
      constructor(private cb: IntersectionObserverCallback) {
        trigger = (isIntersecting) =>
          this.cb([{ isIntersecting } as IntersectionObserverEntry], this as never);
      }
      observe(el: Element) {
        observed.push(el);
      }
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
  });

  async function render() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    return fixture.nativeElement.querySelector('div') as HTMLElement;
  }

  it('hides below-the-fold content, then reveals it when scrolled into view', async () => {
    const el = await render();
    expect(el.classList.contains('reveal')).toBe(true);
    expect(el.style.getPropertyValue('--reveal-delay')).toBe('120ms');
    expect(observed).toContain(el);

    trigger(true);
    expect(el.classList.contains('revealed')).toBe(true);
  });

  it('removes its classes after the fade so hover effects work', async () => {
    const el = await render();
    trigger(true);
    const done = new Event('transitionend') as TransitionEvent;
    Object.defineProperty(done, 'propertyName', { value: 'opacity' });
    el.dispatchEvent(done);
    expect(el.classList.contains('reveal')).toBe(false);
    expect(el.classList.contains('revealed')).toBe(false);
  });

  it('stays hidden if a transition ends before it was revealed', async () => {
    const el = await render();
    const early = new Event('transitionend') as TransitionEvent;
    Object.defineProperty(early, 'propertyName', { value: 'opacity' });
    el.dispatchEvent(early);
    expect(el.classList.contains('reveal')).toBe(true);
  });

  it('leaves content that is already on screen untouched', async () => {
    rectTop = 100;
    const el = await render();
    expect(el.classList.contains('reveal')).toBe(false);
    expect(observed.length).toBe(0);
  });
});
