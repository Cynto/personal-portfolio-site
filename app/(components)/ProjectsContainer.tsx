'use client';

import styles from './(styles)/PortfolioSection.module.scss';
import Image from 'next/image';
import { Cuprum } from '@next/font/google';
import { useState } from 'react';

const cuprum = Cuprum();
export default function ProjectsContainer({
  projects,
}: {
  projects: {
    id: string;
    name: string;
    collectionId: string;
    collectionName: string;
    live_site: string;
    github_repository: string;
    screenshot: string;
    built_with: string[];
    expand: {
      built_with: any[];
    };
  }[];
}) {
  const [projectsArr, setProjectsArr] = useState(projects);
  return (
    <div className={styles.projectsContainer}>
      {projectsArr[0] &&
        projectsArr.map((project: any) => {
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
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div
                  className={styles.overlay}
                  style={{
                    opacity: project.screenshot === '' ? 1 : 0,
                  }}
                >
                  <div className={styles.overlayText}>
                    <h3 className={cuprum.className}>{project.name}</h3>
                    <p className={cuprum.className}>
                      {project.expand.built_with.map(
                        (tech: any, index: number) => {
                          return (
                            <span key={tech.id}>
                              {index !== 0 ? ' / ' : ''} {tech.name}
                            </span>
                          );
                        }
                      )}
                    </p>
                  </div>
                  <div className={styles.overlayLinks}>
                    <a href={project.github_repository}></a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
