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
    portfolio: false,
    about: false,
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
          portfolio:
            portfolioElement.getBoundingClientRect().top < 100 &&
            portfolioElement.getBoundingClientRect().bottom > 100,
          about:
            aboutElement.getBoundingClientRect().top < 100 &&
            aboutElement.getBoundingClientRect().bottom > 100,
          contact:
            contactElement.getBoundingClientRect().top < 100 &&
            contactElement.getBoundingClientRect().bottom > 100,
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [homeElement, aboutElement, portfolioElement, contactElement]);

  // add wheel event listener to scroll to the next section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        if (currentlyActive.home) {
          console.log('hi');
          portfolioElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.portfolio) {
          aboutElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.about) {
          contactElement?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.deltaY < 0) {
        if (currentlyActive.portfolio) {
          homeElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.about) {
          portfolioElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.contact) {
          aboutElement?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  });

  // add keydown event listener to scroll to the next section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentlyActive.home) {
          portfolioElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.portfolio) {
          aboutElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.about) {
          contactElement?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentlyActive.portfolio) {
          homeElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.about) {
          portfolioElement?.scrollIntoView({ behavior: 'smooth' });
        } else if (currentlyActive.contact) {
          aboutElement?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

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
