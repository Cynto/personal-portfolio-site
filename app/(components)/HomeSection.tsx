import styles from './(styles)/HomeSection.module.scss';
import { Alegreya } from '@next/font/google';
import HomeBackground from './HomeBackground';
import HomeButton from './HomeButton';

const alegreya = Alegreya();

const HomeSection = () => {
  return (
    <>
      <HomeBackground />
      <div className={styles.homeContainer} id="home">
        <h2 className={alegreya.className}>
          Hello there, I&apos;m <span>Luca Garavello</span>. <br />
          I&apos;m a full-stack web developer.
        </h2>
        <HomeButton />
      </div>
    </>
  );
};

export default HomeSection;
