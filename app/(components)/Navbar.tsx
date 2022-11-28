'use client';

import styles from './(styles)/Navbar.module.scss';
import { Cuprum } from '@next/font/google';
import { Squash as Hamburger } from 'hamburger-react';
import useWindowProperties from '../../hooks/useWindowProperties';

const cuprum = Cuprum();

export default function Navbar() {
  const { orientation } = useWindowProperties();
  const homeElement = document.getElementById('home');
  const aboutElement = document.getElementById('about');
  const portfolioElement = document.getElementById('portfolio');
  const contactElement = document.getElementById('contact');

  return (
    <nav className={styles.navbar}>
      {orientation === 'portrait' ? (
        <Hamburger size={40} />
      ) : (
        <ul className={cuprum.className}>
          <li>
            <button
              role="button"
              onClick={() => {
                if (homeElement) {
                  homeElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              HOME
            </button>{' '}
          </li>
          <li>
            <button
              role="button"
              onClick={() => {
                if (aboutElement) {
                  aboutElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              ABOUT
            </button>
          </li>
          <li>
            <button
              role="button"
              onClick={() => {
                if (portfolioElement) {
                  portfolioElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              PORTFOLIO
            </button>
          </li>
          <li>
            <button
              role="button"
              onClick={() => {
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              CONTACT
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
