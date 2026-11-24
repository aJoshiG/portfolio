import { TestBed } from '@angular/core/testing';
import { ContactForm, MIN_FILL_TIME_MS } from './contact-form';
import { ContactNotConfiguredError, ContactService } from '../../services/contact.service';

describe('ContactForm', () => {
  let send: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
    send = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      providers: [{ provide: ContactService, useValue: { isConfigured: true, send } }],
    });
  });

  afterEach(() => vi.useRealTimers());

  async function setup() {
    const fixture = TestBed.createComponent(ContactForm);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const type = (selector: string, value: string) => {
      const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    const fillValid = () => {
      type('#cf-name', '  Riya Sharma ');
      type('#cf-email', ' riya@example.com ');
      type('#cf-message', '  Hi Aditya, we have an internship opening for you.  ');
    };
    const submit = async () => {
      el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
      await fixture.whenStable();
      await Promise.resolve();
      await fixture.whenStable();
    };
    const waitLikeAHuman = () => vi.setSystemTime(Date.now() + MIN_FILL_TIME_MS + 1000);

    return { fixture, el, type, fillValid, submit, waitLikeAHuman };
  }

  it('shows an error for every empty field and does not send', async () => {
    const { el, submit } = await setup();
    await submit();

    expect(el.querySelector('#cf-name-error')?.textContent).toContain('enter your name');
    expect(el.querySelector('#cf-email-error')?.textContent).toContain('enter your email');
    expect(el.querySelector('#cf-message-error')?.textContent).toContain('write a message');
    expect(el.querySelector('#cf-name')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.activeElement?.id).toBe('cf-name');
    expect(send).not.toHaveBeenCalled();
  });

  it('validates email format and message length', async () => {
    const { el, type, submit } = await setup();
    type('#cf-name', 'Riya');
    type('#cf-email', 'not-an-email');
    type('#cf-message', 'Too short');
    await submit();

    expect(el.querySelector('#cf-email-error')?.textContent).toContain('valid email');
    expect(el.querySelector('#cf-message-error')?.textContent).toContain('at least 10');
    expect(send).not.toHaveBeenCalled();
  });

  it('sends trimmed values and shows the success message', async () => {
    const { el, fillValid, submit, waitLikeAHuman } = await setup();
    fillValid();
    waitLikeAHuman();
    await submit();

    expect(send).toHaveBeenCalledWith({
      name: 'Riya Sharma',
      email: 'riya@example.com',
      message: 'Hi Aditya, we have an internship opening for you.',
    });
    expect(el.querySelector('.success')?.textContent).toContain('Message sent');
  });

  it('lets the visitor send another message after success', async () => {
    const { fixture, el, fillValid, submit, waitLikeAHuman } = await setup();
    fillValid();
    waitLikeAHuman();
    await submit();

    el.querySelector<HTMLButtonElement>('.success button')!.click();
    await fixture.whenStable();
    expect(el.querySelector('form')).toBeTruthy();
    expect(el.querySelector<HTMLInputElement>('#cf-name')!.value).toBe('');
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const { el, fillValid, type, submit, waitLikeAHuman } = await setup();
    fillValid();
    type('#cf-website', 'https://spam.example');
    waitLikeAHuman();
    await submit();

    expect(send).not.toHaveBeenCalled();
    expect(el.querySelector('.success')).toBeTruthy();
  });

  it('silently drops submissions made faster than a human could', async () => {
    const { fillValid, submit } = await setup();
    fillValid();
    await submit();
    expect(send).not.toHaveBeenCalled();
  });

  it('explains when the form is not connected yet and offers email', async () => {
    send.mockRejectedValue(new ContactNotConfiguredError());
    const { el, fillValid, submit, waitLikeAHuman } = await setup();
    fillValid();
    waitLikeAHuman();
    await submit();

    const error = el.querySelector('.form-error');
    expect(error?.textContent).toContain("isn't connected yet");
    expect(error?.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });

  it('shows a retry message on network errors and keeps the typed text', async () => {
    send.mockRejectedValue(new Error('network down'));
    const { el, fillValid, submit, waitLikeAHuman } = await setup();
    fillValid();
    waitLikeAHuman();
    await submit();

    expect(el.querySelector('.form-error')?.textContent).toContain('Something went wrong');
    expect(el.querySelector<HTMLTextAreaElement>('#cf-message')!.value).toContain('internship');
  });
});
