'use client';
import { useState } from 'react';
import { Alegreya, Cuprum } from '@next/font/google';

const cuprum = Cuprum();
const alegreya = Alegreya();

export default function ContactForm() {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, subject, text } = e.target;
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
          text: text.value,
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
      <label htmlFor="name">
        <input type="text" name="name" id="name" placeholder="Name" required />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
      </label>
      <label htmlFor="subject">
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Subject"
          required
        />
      </label>
      <label htmlFor="message">
        <textarea
          name="message"
          id="message"
          placeholder="Your Message"
          wrap="hard"
          required
        />
      </label>
      <button type="submit">SUBMIT</button>
      {emailSent && <p>Message sent successfully!</p>}
    </form>
  );
}
