import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Icon } from '../../shared/icon/icon';

/**
 * Both icons are always rendered and CSS picks one from <html data-theme>,
 * so the prerendered HTML is correct for either theme (no hydration mismatch).
 * Dark theme shows the sun (switch to light); light theme shows the moon.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="toggle"
      aria-label="Dark theme"
      [attr.aria-pressed]="theme.theme() === 'dark'"
      title="Toggle color theme"
      (click)="theme.toggle()"
    >
      <span class="when-dark"><app-icon name="sun" /></span>
      <span class="when-light"><app-icon name="moon" /></span>
    </button>
  `,
  styles: `
    .toggle {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-full);
      background: transparent;
      color: var(--color-text-muted);
      cursor: pointer;
      transition:
        color var(--duration-fast) ease,
        border-color var(--duration-fast) ease;
    }

    .toggle:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }

    .when-dark,
    .when-light {
      display: inline-flex;
    }

    .when-light,
    :host-context(html[data-theme='light']) .when-dark {
      display: none;
    }

    :host-context(html[data-theme='light']) .when-light {
      display: inline-flex;
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
