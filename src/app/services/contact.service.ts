import { Injectable } from '@angular/core';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Thrown when the EmailJS keys in emailjs.config.ts have not been filled in yet. */
export class ContactNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured');
    this.name = 'ContactNotConfiguredError';
  }
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  readonly isConfigured = Boolean(
    EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey,
  );

  async send(message: ContactMessage): Promise<void> {
    if (!this.isConfigured) throw new ContactNotConfiguredError();

    // Loaded on demand so the SDK isn't part of the initial page bundle.
    const { send } = await import('@emailjs/browser');
    await send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      // These names must match the variables used in the EmailJS template.
      { from_name: message.name, reply_to: message.email, message: message.message },
      {
        publicKey: EMAILJS_CONFIG.publicKey,
        blockHeadless: true,
        // At most one message per 10 seconds from the same browser.
        limitRate: { id: 'portfolio-contact', throttle: 10_000 },
      },
    );
  }
}
