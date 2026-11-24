import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { Icon } from '../../shared/icon/icon';
import { ProjectCard } from '../../shared/project-card/project-card';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-projects',
  imports: [SectionHeader, ProjectCard, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="section container" aria-labelledby="projects-title">
      <app-section-header sectionId="projects" />

      <div class="featured-list">
        @for (project of featured; track project.slug) {
          <app-project-card [project]="project" />
        }
      </div>

      <h3 class="more-title">Other things I've built</h3>
      <div class="grid">
        @for (project of others; track project.slug) {
          <app-project-card [project]="project" />
        }
        <a class="card more" [href]="githubUrl" target="_blank" rel="noopener noreferrer">
          <app-icon name="github" [size]="28" />
          <span class="more-label">More on GitHub</span>
          <span class="more-sub">Experiments, coursework and what I'm building next</span>
          <span class="more-arrow"><app-icon name="arrow-up-right" [size]="18" /></span>
        </a>
      </div>
    </section>
  `,
  styles: `
    .featured-list {
      display: grid;
      gap: var(--space-24);
    }

    .more-title {
      margin: var(--space-24) 0 var(--space-6);
      font-size: var(--text-xl);
      text-align: center;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
      gap: var(--space-4);
    }

    .more {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: var(--space-2);
      min-height: 14rem;
      border-style: dashed;
      background: transparent;
      color: var(--color-text-muted);
    }

    .more:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .more-label {
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--color-text);
    }

    .more-sub {
      font-size: var(--text-sm);
    }

    .more-arrow {
      margin-top: var(--space-2);
      transition: transform var(--duration-fast) ease;
    }

    .more:hover .more-arrow {
      transform: translate(3px, -3px);
    }
  `,
})
export class Projects {
  protected readonly featured = PROJECTS.filter((p) => p.featured);
  protected readonly others = PROJECTS.filter((p) => !p.featured);
  protected readonly githubUrl =
    PROFILE.socials.find((s) => s.icon === 'github')?.url ?? 'https://github.com';
}
