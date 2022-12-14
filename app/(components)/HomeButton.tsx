'use client';
import { Cuprum } from '@next/font/google';

const cuprum = Cuprum();

export default function HomeButton() {
  return (
    <button
      type={'button'}
      className={cuprum.className}
      onClick={() => {
        const portfolio = document.getElementById('portfolio');

        if (portfolio) {
          portfolio.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <span>View my portfolio </span>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
        />
      </svg>
    </button>
  );
}
