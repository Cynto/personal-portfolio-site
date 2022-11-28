'use client';
import { useEffect, useState } from 'react';
import styles from './(styles)/Navbar.module.scss';
import { Cuprum } from '@next/font/google';
import { Squash as Hamburger } from 'hamburger-react';
import useWindowProperties from '../../hooks/useWindowProperties';

const cuprum = Cuprum();

export default function Navbar() {
  const { orientation } = useWindowProperties();
  const [currentlyActive, setCurrentlyActive] = useState({
    home: true,
    about: false,
    portfolio: false,
    contact: false,
  });

  const homeElement = document.getElementById('home');
  const aboutElement = document.getElementById('about');
  const portfolioElement = document.getElementById('portfolio');
  const contactElement = document.getElementById('contact');

  useEffect(() => {
    const handleScroll = () => {
      if (homeElement && aboutElement && portfolioElement && contactElement) {
        setCurrentlyActive({
          home:
            homeElement.getBoundingClientRect().top < 100 &&
            homeElement.getBoundingClientRect().bottom > 100,
          about:
            aboutElement.getBoundingClientRect().top < 100 &&
            aboutElement.getBoundingClientRect().bottom > 100,
          portfolio:
            portfolioElement.getBoundingClientRect().top < 100 &&
            portfolioElement.getBoundingClientRect().bottom > 100,
          contact:
            contactElement.getBoundingClientRect().top < 100 &&
            contactElement.getBoundingClientRect().bottom > 100,
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homeElement, aboutElement, portfolioElement, contactElement]);

  return (
    <nav className={styles.navbar}>
      {orientation === 'portrait' ? (
        <Hamburger size={40} />
      ) : (
        <ul className={cuprum.className}>
          <li>
            <button
              className={currentlyActive.home ? styles.active : ''}
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
              className={currentlyActive.about ? styles.active : ''}
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
              className={currentlyActive.portfolio ? styles.active : ''}
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
              className={currentlyActive.contact ? styles.active : ''}
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
