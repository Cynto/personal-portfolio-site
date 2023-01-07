'use client';
import { FormEvent, useState } from 'react';
import { Cuprum } from '@next/font/google';
import { handleSubmit } from './handlers';
const cuprum = Cuprum();

export default function ContactForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={cuprum.className}
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        handleSubmit(e, setEmailSent, setError)
      }
    >
      {emailSent ? (
        <p>Message sent successfully!</p>
      ) : (
        <>
          <label htmlFor="name">
            <input
              type="text"
              aria-label="name"
              name="name"
              id="name"
              placeholder="Name"
              required
              minLength={3}
              maxLength={50}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              aria-label="email"
              name="email"
              id="email"
              placeholder="Your Email"
              required
              minLength={3}
              maxLength={50}
            />
          </label>
          <label htmlFor="subject">
            <input
              type="text"
              aria-label="subject"
              name="subject"
              id="subject"
              placeholder="Subject"
              required
              minLength={3}
              maxLength={50}
            />
          </label>
          <label htmlFor="message">
            <textarea
              name="message"
              aria-label="message"
              id="message"
              placeholder="Your Message"
              wrap="hard"
              required
              minLength={3}
              maxLength={900}
            />
          </label>
          <button type="submit" aria-label="submit">
            SUBMIT
          </button>
          <p></p>
          {error && <p className="error">{error}</p>}
        </>
      )}
    </form>
  );
}
