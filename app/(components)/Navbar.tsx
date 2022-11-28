'use client';

import styles from './(styles)/Navbar.module.scss';
import { Cuprum } from '@next/font/google';
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import useWindowProperties from '../../hooks/useWindowProperties';

const cuprum = Cuprum({
  subsets: ['latin'],
});

export default function Navbar() {
  const { orientation } = useWindowProperties();

  return (
    <nav className={styles.navbar}>
      {orientation === 'portrait' ? (
        <Hamburger size={40} />
      ) : (
        <ul className={cuprum.className}>
          <li>
            <Link href={'/#home'}>HOME</Link>{' '}
          </li>
          <li>
            <Link href={'/#about'}>ABOUT</Link>
          </li>
          <li>
            <Link href={'/#portfolio'}>PORTFOLIO</Link>
          </li>
          <li>
            <Link href={'/#contact'}>CONTACT</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
