import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container inner">
        <p>
          © {{ year }} {{ profile.name }} · Built with
          <a href="https://angular.dev" target="_blank" rel="noopener noreferrer">Angular</a>
        </p>
        <ul class="socials">
          @for (social of profile.socials; track social.url) {
            <li>
              <a
                [href]="social.url"
                [attr.aria-label]="social.label"
                [attr.target]="social.icon === 'email' ? null : '_blank'"
                [attr.rel]="social.icon === 'email' ? null : 'noopener noreferrer'"
              >
                <app-icon [name]="social.icon" [size]="18" />
              </a>
            </li>
          }
        </ul>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: var(--space-24);
      border-top: 1px solid var(--color-border);
    }

    .inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      padding-block: var(--space-8);
      font-size: var(--text-sm);
      color: var(--color-text-muted);
    }

    .socials {
      display: flex;
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .socials a {
      display: grid;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: var(--radius-full);
      color: var(--color-text-muted);
    }

    .socials a:hover {
      color: var(--color-accent);
      background: var(--color-accent-soft);
    }
  `,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
