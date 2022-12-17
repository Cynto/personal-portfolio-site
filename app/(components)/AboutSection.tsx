import styles from './(styles)/AboutSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';
import photoOfMe from '../../public/photo_of_me.jpg';
import Image from 'next/image';

const cuprum = Cuprum();
const alegreya = Alegreya();

export default function AboutSection() {
  return (
    <section className={styles.aboutContainer} id="about">
      <h2 className={alegreya.className}>ABOUT </h2>
      <div className={styles.aboutMe}>
        <Image src={photoOfMe} alt="Luca Garavello" />
        <h3 className={cuprum.className}>A little bit about me</h3>

        <p data-testid="para">
          I am a full stack developer with a passion for creating beautiful,
          user friendly, fast, and secure web applications.
        </p>
        <p data-testid="para">
          Although I am full stack developer, my passion lies more within the
          backend side of developing. This however, does not mean I&apos;m
          uncomfortable at working on the frontend side of developing. I
          thoroughly enjoy working with the latest technology to implement APIs
          and databases. Additionally, I&apos;m a big fan of clean code and
          I&apos;m always looking to learn further ways in improving my code.
        </p>
      </div>
    </section>
  );
}
