import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-about',
  imports: [SectionHeader, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section container" aria-labelledby="about-title">
      <app-section-header sectionId="about" />
      <div class="layout" appReveal>
        <p class="summary">{{ profile.summary }}</p>
        <dl class="facts">
          @for (fact of profile.quickFacts; track fact.label) {
            <div class="card fact">
              <dt>{{ fact.label }}</dt>
              <dd>{{ fact.value }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: var(--space-12);
      align-items: start;
    }

    .summary {
      font-size: var(--text-lg);
      color: var(--color-text-muted);
    }

    .facts {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
      margin: 0;
    }

    .fact {
      padding: var(--space-4) var(--space-6);
    }

    dt {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-accent);
    }

    dd {
      margin: var(--space-1) 0 0;
      font-weight: 600;
    }

    @media (max-width: 820px) {
      .layout {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }
  `,
})
export class About {
  protected readonly profile = PROFILE;
}
