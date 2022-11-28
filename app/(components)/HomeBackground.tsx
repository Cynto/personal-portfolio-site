'use client';
import './(styles)/HomeBackground.scss';
import { useEffect } from 'react';
import createBirdBackground from '../../utils/createBirdBackground';

export default function HomeBackground() {
  useEffect(() => {
    createBirdBackground();
  }, []);

  return (
    <div className="home-background-container">
      <canvas id="canv"></canvas>
      <div className="sky">
        <div className="clouds">
          <div className="c1 one"></div>
          <div className="c1 two"></div>
          <div className="c1 three"></div>
          <div className="c1 four"></div>
          <div className="c2 one"></div>
          <div className="c2 two"></div>
          <div className="c2 three"></div>
          <div className="c2 four"></div>
        </div>
      </div>
    </div>
  );
}
