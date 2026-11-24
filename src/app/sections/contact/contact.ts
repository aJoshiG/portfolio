import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SectionHeader } from '../../shared/section-header/section-header';

/** Contact intro + direct links. The EmailJS form is added in step 4. */
@Component({
  selector: 'app-contact',
  imports: [SectionHeader, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section container" aria-labelledby="contact-title">
      <app-section-header sectionId="contact" />
      <div class="intro">
        <p class="lead">Let's build something together.</p>
        <p class="text">
          I'm looking for internships and interesting projects. Whether you have an opportunity, a
          question or just want to say hi, my inbox is open and I'll get back to you.
        </p>
        <div class="actions">
          @if (email) {
            <a class="btn btn-primary" [href]="email.url">
              <app-icon name="email" [size]="18" /> Say hello
            </a>
          }
          @if (linkedin) {
            <a class="btn btn-ghost" [href]="linkedin.url" target="_blank" rel="noopener noreferrer">
              <app-icon name="linkedin" [size]="16" /> Connect on LinkedIn
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .intro {
      max-width: 40rem;
    }

    .lead {
      font-size: var(--text-2xl);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: var(--leading-tight);
    }

    .text {
      margin-top: var(--space-4);
      font-size: var(--text-lg);
      color: var(--color-text-muted);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-8);
    }
  `,
})
export class Contact {
  protected readonly email = PROFILE.socials.find((s) => s.icon === 'email');
  protected readonly linkedin = PROFILE.socials.find((s) => s.icon === 'linkedin');
}
