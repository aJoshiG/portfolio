import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ExperienceItem } from '../../data/models';
import { EXPERIENCE } from '../../data/experience';
import { Icon } from '../../shared/icon/icon';
import { SectionHeader } from '../../shared/section-header/section-header';

/** Timeline of roles. The home page only renders this when EXPERIENCE has entries. */
@Component({
  selector: 'app-experience',
  imports: [SectionHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section container" aria-labelledby="experience-title">
      <app-section-header sectionId="experience" />
      <ol class="timeline">
        @for (item of items(); track item.role + item.organization) {
          <li class="entry">
            <p class="dates">{{ item.start }} — {{ item.end }}</p>
            <div class="card">
              <h3>
                {{ item.role }} <span class="org">· {{ item.organization }}</span>
              </h3>
              @if (item.location) {
                <p class="location"><app-icon name="map-pin" [size]="14" /> {{ item.location }}</p>
              }
              @if (item.highlights.length) {
                <ul class="highlights">
                  @for (point of item.highlights; track point) {
                    <li>{{ point }}</li>
                  }
                </ul>
              }
              @if (item.certificateUrl) {
                <a class="cert" [href]="item.certificateUrl" target="_blank" rel="noopener noreferrer">
                  View certificate <app-icon name="arrow-up-right" [size]="14" />
                </a>
              }
            </div>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .timeline {
      position: relative;
      margin: 0;
      padding: 0 0 0 var(--space-8);
      list-style: none;
    }

    .timeline::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      bottom: 0.5rem;
      left: 5px;
      width: 2px;
      background: var(--color-border);
    }

    .entry {
      position: relative;
    }

    .entry + .entry {
      margin-top: var(--space-8);
    }

    .entry::before {
      content: '';
      position: absolute;
      top: 0.45rem;
      left: calc(-1 * var(--space-8));
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--color-bg);
      border: 2px solid var(--color-accent);
    }

    .dates {
      margin-bottom: var(--space-2);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      color: var(--color-accent);
    }

    h3 {
      font-size: var(--text-lg);
    }

    .org {
      color: var(--color-accent);
    }

    .location {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      margin-top: var(--space-1);
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }

    .highlights {
      margin: var(--space-4) 0 0;
      padding-left: var(--space-6);
      color: var(--color-text-muted);
    }

    .highlights li + li {
      margin-top: var(--space-2);
    }

    .cert {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      margin-top: var(--space-4);
      font-size: var(--text-sm);
      font-weight: 600;
    }
  `,
})
export class Experience {
  readonly items = input<ExperienceItem[]>(EXPERIENCE);
}
