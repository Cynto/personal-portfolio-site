import styles from './(styles)/ContactSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';

const cuprum = Cuprum();
const alegreya = Alegreya();

export default function ContactSection() {
  return (
    <section className={styles.contactContainer} id="contact">
      <h2 className={alegreya.className}>CONTACT </h2>
      <div className={styles.contactContent}>
        <h3>
          Have a question that you&apos;re dying to ask? <br /> Or maybe you
          just want to say hi? <br /> Either way, I&apos;d love to hear from
          you!
        </h3>
        <form className={cuprum.className}>
          <label htmlFor="name">
            <input type="text" name="name" id="name" placeholder="Name" />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
            />
          </label>
          <label htmlFor="message">
            <textarea
              name="message"
              id="message"
              placeholder="Your Message"
              wrap="hard"
            />
          </label>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </section>
  );
}
