import styles from './(styles)/ContactSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';
import ContactForm from './ContactForm';

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

        <ContactForm />
      </div>
    </section>
  );
}
