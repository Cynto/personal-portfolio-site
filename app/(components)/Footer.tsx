import styles from './(styles)/Footer.module.scss';
import { Cuprum } from '@next/font/google';

const cuprum = Cuprum();
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialsContainer}>
        <div className={styles.social}>
          <a
            href="https://www.linkedin.com/in/luca-garavello0/"
            title="Linkedin"
          >
            <i className="devicon-linkedin-plain"></i>
          </a>
        </div>
        <div className={styles.social}>
          <a href="https://github.com/Cynto" title="GitHub">
            <i className="devicon-github-original"></i>
          </a>
        </div>
      </div>
      <p className={cuprum.className}>
        Luca Garavello <span>&copy;{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}
