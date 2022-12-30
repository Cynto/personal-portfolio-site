'use client';

import styles from './(styles)/PortfolioSection.module.scss';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import Project from '../(interfaces)/Project.interface';
import { Cuprum } from '@next/font/google';
import useWindowProperties from '../../hooks/useWindowProperties';

const cuprum = Cuprum();

export default function SingleProject({ project }: { project: Project }) {
  const { orientation } = useWindowProperties();
  const [elementsZIndex, setElementsZIndex] = useState({
    image: 3,
    overlay: project.screenshot !== '' ? 2 : 3,
  });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orientation === 'portrait') {
      setElementsZIndex({
        image: 3,
        overlay: project.screenshot !== '' ? 2 : 3,
      });
    }
    if (orientation === 'landscape') {
      setElementsZIndex({
        image: 2,
        overlay: 3,
      });
    }
  }, [orientation]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        orientation === 'portrait' &&
        elementsZIndex.overlay === 3
      ) {
        setElementsZIndex({
          image: 3,
          overlay: 2,
        });
      }
    }

    if (overlayRef.current && orientation === 'portrait') {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [overlayRef, orientation, elementsZIndex]);

  return (
    <div className={styles.project} key={project.id}>
      <div className={styles.imageContainer}>
        {project.screenshot !== '' && (
          <Image
            src={project.screenshot}
            alt={project.name}
            quality={100}
            sizes={' 100vw, 50vw'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: project.imagePosition,
              zIndex: elementsZIndex.image,
            }}
            onClick={() => {
              if (orientation === 'portrait') {
                setElementsZIndex({ image: 2, overlay: 3 });
              }
            }}
          />
        )}
        <div
          className={styles.overlay}
          ref={overlayRef}
          style={
            orientation === 'portrait'
              ? {
                  zIndex: elementsZIndex.overlay,
                  opacity:
                    elementsZIndex.overlay >= elementsZIndex.image ||
                    project.screenshot === ''
                      ? 1
                      : 0,
                }
              : {
                  zIndex: elementsZIndex.overlay,
                  opacity: project.screenshot === '' ? 1 : 0,
                }
          }
          onMouseLeave={() => {
            if (orientation === 'portrait') {
              setElementsZIndex({ image: 3, overlay: 2 });
            }
          }}
        >
          <div className={styles.overlayText}>
            <h3 className={cuprum.className}>{project.name}</h3>
            <p className={cuprum.className}>
              {project.expand.built_with.map((tech: any, index: number) => {
                return (
                  <span key={tech.id}>
                    {index !== 0 ? ' / ' : ''} {tech.name}
                  </span>
                );
              })}
            </p>
          </div>
          <div className={styles.overlayLinks}>
            <button>
              <a href={project.github_repository}>View on Github</a>
            </button>
            {project.live_site !== '' && (
              <button>
                <a href={project.live_site}>View Live Demo</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
