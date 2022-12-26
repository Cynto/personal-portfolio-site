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
          I&apos;m Luca, a full-stack web developer based in the UK.
        </p>
        <p data-testid="para">
          As a full-stack developer, I have a strong foundation in both
          front-end and back-end technologies. While my passion lies in the
          backend, where I can dive deep into complex logic and problem-solving,
          I am also comfortable and proficient in front-end development. I enjoy
          being able to bridge the gap between the visual design and the
          underlying technical architecture of a web application. Being able to
          work on both ends of the stack allows me to have a holistic
          understanding of the development process and enables me to build
          well-rounded, dynamic web applications.
        </p>
      </div>
    </section>
  );
}
