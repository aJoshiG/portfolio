import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ACHIEVEMENTS } from '../../data/achievements';
import { Icon } from '../../shared/icon/icon';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-achievements',
  imports: [SectionHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="achievements" class="section container" aria-labelledby="achievements-title">
      <app-section-header sectionId="achievements" />

      <h3 class="group-title"><app-icon name="award" [size]="18" /> Certifications</h3>
      <div class="grid">
        @for (cert of certifications; track cert.title) {
          <article class="card card-hover cert">
            <div class="cert-head">
              <h4>{{ cert.title }}</h4>
              @if (cert.date) {
                <span class="date">{{ cert.date }}</span>
              }
            </div>
            <p class="issuer">{{ cert.issuer }}</p>
            @if (cert.detail) {
              <p class="detail">{{ cert.detail }}</p>
            }
            @if (cert.url) {
              <a class="credential" [href]="cert.url" target="_blank" rel="noopener noreferrer">
                View credential <app-icon name="arrow-up-right" [size]="14" />
              </a>
            }
          </article>
        }
      </div>

      <h3 class="group-title"><app-icon name="users" [size]="18" /> Leadership</h3>
      <div class="grid">
        @for (role of leadership; track role.title) {
          <article class="card card-hover">
            <h4>{{ role.title }}</h4>
            <p class="issuer">{{ role.issuer }}</p>
            @if (role.detail) {
              <p class="detail">{{ role.detail }}</p>
            }
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .group-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin: var(--space-12) 0 var(--space-4);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--color-accent);
    }

    .group-title:first-of-type {
      margin-top: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
      gap: var(--space-4);
    }

    .cert {
      grid-column: 1 / -1;
      max-width: 40rem;
    }

    .cert-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--space-2) var(--space-4);
    }

    h4 {
      font-size: var(--text-lg);
    }

    .date {
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--color-text-muted);
    }

    .issuer {
      margin-top: var(--space-1);
      font-size: var(--text-sm);
      color: var(--color-accent);
    }

    .detail {
      margin-top: var(--space-3);
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }

    .credential {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      margin-top: var(--space-4);
      font-size: var(--text-sm);
      font-weight: 600;
    }
  `,
})
export class Achievements {
  protected readonly certifications = ACHIEVEMENTS.filter((a) => a.kind === 'certification');
  protected readonly leadership = ACHIEVEMENTS.filter((a) => a.kind === 'leadership');
}
