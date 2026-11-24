import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/skills';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-skills',
  imports: [SectionHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section container" aria-labelledby="skills-title">
      <app-section-header sectionId="skills" />
      <div class="grid">
        @for (group of groups; track group.title) {
          <article class="card card-hover group">
            <h3>{{ group.title }}</h3>
            <ul class="chip-list">
              @for (skill of group.skills; track skill) {
                <li class="chip">{{ skill }}</li>
              }
            </ul>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
      gap: var(--space-4);
    }

    h3 {
      margin-bottom: var(--space-4);
      font-size: var(--text-base);
      font-weight: 600;
    }
  `,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
