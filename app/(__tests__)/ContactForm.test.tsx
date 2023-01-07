import ContactForm from '../(components)/ContactForm';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEvent } from 'react';

jest.mock('../(components)/handlers', () => ({
  handleSubmit: async (
    e: FormEvent<HTMLFormElement>,
    setEmailSent: Function,
    setError: Function
  ) => {
    e.preventDefault();
    const name = screen.getByRole('textbox', {
      name: 'name',
    }) as HTMLInputElement;
    const email = screen.getByRole('textbox', {
      name: 'email',
    }) as HTMLInputElement;
    const subject = screen.getByRole('textbox', {
      name: 'subject',
    }) as HTMLInputElement;
    const message = screen.getByRole('textbox', {
      name: 'message',
    }) as HTMLTextAreaElement;

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          subject: subject.value,
          text: message.value,
        }),
      });
      const data = await res.json();
      if (data.error) {
        return new Error(data.error);
      } else if (data.success) {
        setEmailSent(true);
      }
    } catch (err) {
      console.error(err);
      setError(
        'Sorry, there was an error sending your message. Please try again later.'
      );
    }
  },
}));
window.fetch = jest.fn();
describe('Contact Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render without crashing', async () => {
    await render(<ContactForm />);
  });

  it('should render correct inputs, with correct placeholders', async () => {
    await render(<ContactForm />);

    const nameInput = screen.getByRole('textbox', { name: 'name' });
    const emailInput = screen.getByRole('textbox', { name: 'email' });
    const subjectInput = screen.getByRole('textbox', { name: 'subject' });
    const messageInput = screen.getByRole('textbox', { name: 'message' });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    expect(nameInput.getAttribute('placeholder')).toBe('Name');
    expect(emailInput.getAttribute('placeholder')).toBe('Your Email');
    expect(subjectInput.getAttribute('placeholder')).toBe('Subject');
    expect(messageInput.getAttribute('placeholder')).toBe('Your Message');
  });

  it('fetch should not be called if inputs are empty', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');

    await render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: 'submit' });

    await userEvent.click(submitButton);

    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });

  it('fetch should not be called if input values do not meet requirements', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');

    await render(<ContactForm />);

    const nameInput = screen.getByRole('textbox', { name: 'name' });
    const emailInput = screen.getByRole('textbox', { name: 'email' });
    const subjectInput = screen.getByRole('textbox', { name: 'subject' });
    const messageInput = screen.getByRole('textbox', { name: 'message' });
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await userEvent.type(nameInput, 'hi');
    await userEvent.type(emailInput, 'hi');
    await userEvent.type(subjectInput, 'hi');
    await userEvent.type(messageInput, 'hi');
    await userEvent.click(submitButton);

    expect(fetchSpy).toHaveBeenCalledTimes(0);
  });

  it('fetch should be called with correct parameters if input values meet requirements', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');

    await render(<ContactForm />);

    const nameInput = screen.getByRole('textbox', { name: 'name' });
    const emailInput = screen.getByRole('textbox', { name: 'email' });
    const subjectInput = screen.getByRole('textbox', { name: 'subject' });
    const messageInput = screen.getByRole('textbox', { name: 'message' });
    const submitButton = screen.getByRole('button', { name: 'submit' });

    await userEvent.type(nameInput, 'bob');
    await userEvent.type(emailInput, 'bob@gmail.com');
    await userEvent.type(subjectInput, 'hello');
    await userEvent.type(messageInput, 'hello there!');
    await userEvent.click(submitButton);

    expect(fetchSpy).toHaveBeenCalledWith('/api/send-email', {
      body: '{"name":"bob","email":"bob@gmail.com","subject":"hello","text":"hello there!"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
