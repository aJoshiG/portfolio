import { TestBed } from '@angular/core/testing';
import { ContactNotConfiguredError, ContactService } from './contact.service';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

describe('ContactService', () => {
  it('reports whether all EmailJS keys are set', () => {
    const service = TestBed.inject(ContactService);
    const allSet = Object.values(EMAILJS_CONFIG).every(Boolean);
    expect(service.isConfigured).toBe(allSet);
  });

  it('refuses to send while not configured', async () => {
    const service = TestBed.inject(ContactService);
    if (service.isConfigured) return; // only meaningful before keys are added
    await expect(
      service.send({ name: 'a', email: 'a@b.co', message: 'hello there' }),
    ).rejects.toBeInstanceOf(ContactNotConfiguredError);
  });
});
