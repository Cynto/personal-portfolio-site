'use client';
import { useState } from 'react';
import { Cuprum } from '@next/font/google';

const cuprum = Cuprum();

export default function ContactForm() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, subject, message } = e.target;

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
    }
  };
  return (
    <form className={cuprum.className} onSubmit={handleSubmit}>
      {emailSent ? (
        <p>Message sent successfully!</p>
      ) : (
        <>
          <label htmlFor="name">
            <input
              type="text"
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
              id="message"
              placeholder="Your Message"
              wrap="hard"
              required
              minLength={3}
              maxLength={900}
            />
          </label>
          <button type="submit">SUBMIT</button>
        </>
      )}
    </form>
  );
}
