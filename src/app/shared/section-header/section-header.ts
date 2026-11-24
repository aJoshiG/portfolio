import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NAV_ITEMS, sectionNumber } from '../../data/navigation';
import { RevealDirective } from '../reveal/reveal.directive';

/** "02. Skills ———" style heading. Its id is `<sectionId>-title` for aria-labelledby. */
@Component({
  selector: 'app-section-header',
  hostDirectives: [RevealDirective],
  host: { style: 'display: block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="header" [id]="sectionId() + '-title'">
      <span class="num">{{ number() }}.</span>
      {{ title() }}
    </h2>
  `,
  styles: `
    .header {
      display: flex;
      align-items: baseline;
      gap: var(--space-3);
      margin-bottom: var(--space-12);
      font-size: var(--text-2xl);
      font-weight: 700;
    }

    .header::after {
      content: '';
      flex: 1;
      max-width: 18rem;
      height: 1px;
      margin-left: var(--space-4);
      background: var(--color-border);
      align-self: center;
    }

    .num {
      font-family: var(--font-mono);
      font-size: 0.6em;
      font-weight: 500;
      color: var(--color-accent);
    }
  `,
})
export class SectionHeader {
  readonly sectionId = input.required<string>();
  /** Defaults to the section's nav label. */
  readonly heading = input<string>();

  protected readonly number = computed(() => sectionNumber(this.sectionId()));
  protected readonly title = computed(
    () => this.heading() ?? NAV_ITEMS.find((item) => item.id === this.sectionId())?.label ?? '',
  );
}
