import styles from './(styles)/PortfolioSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';

const cuprum = Cuprum();
const alegreya = Alegreya();
export default function PortfolioSection() {
  return (
    <section className={styles.portfolioSection} id={'portfolio'}>
      <h2 className={alegreya.className}>Portfolio</h2>
    </section>
  );
}
