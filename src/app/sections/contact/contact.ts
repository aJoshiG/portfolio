import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';
import { SectionHeader } from '../../shared/section-header/section-header';
import { ContactForm } from './contact-form';

@Component({
  selector: 'app-contact',
  imports: [SectionHeader, Icon, ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section container" aria-labelledby="contact-title">
      <app-section-header sectionId="contact" />
      <div class="layout">
        <div class="intro">
          <p class="lead">Let's build something together.</p>
          <p class="text">
            I'm looking for internships and interesting projects. Whether you have an opportunity, a
            question or just want to say hi, send me a message and I'll get back to you.
          </p>

          <ul class="direct" aria-label="Other ways to reach me">
            @if (email) {
              <li>
                <a [href]="email.url">
                  <app-icon name="email" [size]="18" />
                  {{ emailAddress }}
                </a>
              </li>
            }
            @if (linkedin) {
              <li>
                <a [href]="linkedin.url" target="_blank" rel="noopener noreferrer">
                  <app-icon name="linkedin" [size]="18" />
                  Connect on LinkedIn
                </a>
              </li>
            }
            <li class="location">
              <app-icon name="map-pin" [size]="18" />
              {{ location }}
            </li>
          </ul>
        </div>

        <!-- The form (and Angular Forms) loads only when it scrolls into view. -->
        @defer (on viewport) {
          <app-contact-form />
        } @placeholder {
          <div class="card form-placeholder" aria-hidden="true"></div>
        }
      </div>
    </section>
  `,
  styles: `
    .layout {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: var(--space-12);
      align-items: start;
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

    .direct {
      display: grid;
      gap: var(--space-3);
      margin: var(--space-8) 0 0;
      padding: 0;
      list-style: none;
    }

    .direct a,
    .location {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      color: var(--color-text-muted);
      word-break: break-word;
    }

    .direct a:hover {
      color: var(--color-accent);
    }

    .form-placeholder {
      min-height: 27rem;
    }

    @media (max-width: 900px) {
      .layout {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
    }
  `,
})
export class Contact {
  protected readonly email = PROFILE.socials.find((s) => s.icon === 'email');
  protected readonly emailAddress = this.email?.url.replace('mailto:', '') ?? '';
  protected readonly linkedin = PROFILE.socials.find((s) => s.icon === 'linkedin');
  protected readonly location = PROFILE.location;
}
