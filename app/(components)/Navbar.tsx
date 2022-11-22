'use client';

import styles from './(styles)/Navbar.module.scss';
import { Cuprum } from '@next/font/google';
import Link from 'next/link';

const cuprum = Cuprum();

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
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
    </nav>
  );
}
