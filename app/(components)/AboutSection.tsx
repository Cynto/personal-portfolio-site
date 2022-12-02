import styles from './(styles)/AboutSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';
import Image from 'next/image';

const cuprum = Cuprum();
const alegreya = Alegreya();

export default function AboutSection() {
  return (
    <section className={styles.aboutContainer} id="about">
      <h2 className={alegreya.className}>ABOUT </h2>
      <div className={styles.aboutMe}>
        <h3 className={cuprum.className}>A little bit about me</h3>

        <p>
          I am a full stack developer with a passion for creating beautiful,
          user friendly, fast, and secure web applications.
        </p>
        <p>
          I prefer working with the backend, but I am very comfortable and
          capable at working with the frontend as well.
        </p>
      </div>
    </section>
  );
}
