import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'email'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'arrow-up-right'
  | 'download';

/** Brand marks are filled shapes; everything else is a 24px stroke icon. */
const FILLED: ReadonlySet<IconName> = new Set(['github', 'linkedin', 'x']);

/**
 * Inline SVG icon set. Decorative by default (aria-hidden): give the parent
 * link or button an accessible label.
 */
@Component({
  selector: 'app-icon',
  host: { class: 'icon', 'aria-hidden': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
  `,
  template: `
    <svg
      [attr.viewBox]="name() === 'github' ? '0 0 16 16' : '0 0 24 24'"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.fill]="filled() ? 'currentColor' : 'none'"
      [attr.stroke]="filled() ? null : 'currentColor'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
    >
      @switch (name()) {
        @case ('github') {
          <svg:path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        }
        @case ('linkedin') {
          <svg:path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        }
        @case ('x') {
          <svg:path
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
          />
        }
        @case ('email') {
          <svg:rect x="2" y="4" width="20" height="16" rx="2" />
          <svg:path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        }
        @case ('sun') {
          <svg:circle cx="12" cy="12" r="4" />
          <svg:path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        }
        @case ('moon') {
          <svg:path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        }
        @case ('menu') {
          <svg:path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('close') {
          <svg:path d="M18 6 6 18M6 6l12 12" />
        }
        @case ('arrow-up-right') {
          <svg:path d="M7 7h10v10M7 17 17 7" />
        }
        @case ('download') {
          <svg:path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<number>(20);
  protected readonly filled = computed(() => FILLED.has(this.name()));
}
