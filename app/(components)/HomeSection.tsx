import styles from './(styles)/HomeSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';
import HomeBackground from './HomeBackground';

const cuprum = Cuprum();
const alegreya = Alegreya();

const HomeSection = () => {
  return (
    <>
      <HomeBackground />
      <div className={styles.homeContainer}>
        <h2 className={alegreya.className}>
          Hello there, I&apos;m <span>Luca Garavello</span>. <br />
          I&apos;m a full-stack web developer.
        </h2>
        <button type={'button'} className={cuprum.className}>
          <span>View my portfolio </span>
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HomeSection;
