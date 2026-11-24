import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROFILE } from '../../data/profile';
import { ContactNotConfiguredError, ContactService } from '../../services/contact.service';
import { Icon } from '../../shared/icon/icon';

type Status = 'idle' | 'sending' | 'success' | 'error';

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;
/** Humans take longer than this to fill the form; faster submits are treated as bots. */
export const MIN_FILL_TIME_MS = 3000;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly contact = inject(ContactService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private renderedAt = Date.now();

  protected readonly email = PROFILE.socials.find((s) => s.icon === 'email');
  protected readonly messageMin = MESSAGE_MIN;
  protected readonly messageMax = MESSAGE_MAX;

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(200)],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(MESSAGE_MIN),
        Validators.maxLength(MESSAGE_MAX),
      ],
    }),
    /** Honeypot: hidden from people, bots tend to fill it in. */
    website: new FormControl('', { nonNullable: true }),
  });

  protected readonly status = signal<Status>('idle');
  protected readonly errorKind = signal<'config' | 'network'>('network');
  protected readonly submitted = signal(false);

  private readonly messageValue = toSignal(this.form.controls.message.valueChanges, {
    initialValue: '',
  });
  protected readonly messageLength = computed(() => this.messageValue().length);

  /** Show a field's error once the visitor has left it or tried to submit. */
  protected showError(name: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    if (this.status() === 'sending') return;
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }

    const { website, ...raw } = this.form.getRawValue();
    const message = { name: raw.name.trim(), email: raw.email.trim(), message: raw.message.trim() };

    // Likely a bot: pretend it worked so it doesn't retry, but send nothing.
    if (website || Date.now() - this.renderedAt < MIN_FILL_TIME_MS) {
      this.finishSuccess();
      return;
    }

    this.status.set('sending');
    try {
      await this.contact.send(message);
      this.finishSuccess();
    } catch (error) {
      this.errorKind.set(error instanceof ContactNotConfiguredError ? 'config' : 'network');
      this.status.set('error');
    }
  }

  protected sendAnother(): void {
    this.status.set('idle');
    this.renderedAt = Date.now();
  }

  private finishSuccess(): void {
    this.form.reset();
    this.submitted.set(false);
    this.status.set('success');
    // Move focus to the confirmation so keyboard and screen-reader users hear it.
    afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>('.success h3')?.focus(), {
      injector: this.injector,
    });
  }

  private focusFirstInvalid(): void {
    this.host.nativeElement.querySelector<HTMLElement>('.field .ng-invalid')?.focus();
  }
}
