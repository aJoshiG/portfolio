/**
 * EmailJS keys for the contact form (https://dashboard.emailjs.com).
 * These are public by design: they only allow sending through the template below,
 * and the EmailJS dashboard limits which domains may use them.
 *
 * While any value is empty, the form still works for validation but shows an
 * "email me directly" message instead of sending. See README → Contact form setup.
 */
export const EMAILJS_CONFIG = {
  serviceId: '',
  templateId: '',
  publicKey: '',
} as const;
