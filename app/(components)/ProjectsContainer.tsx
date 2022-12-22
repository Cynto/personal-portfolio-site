'use client';

import styles from './(styles)/PortfolioSection.module.scss';
import Image from 'next/image';
import { Cuprum } from '@next/font/google';
import { useState } from 'react';
import Project from '../(interfaces)/Project.interface';

const cuprum = Cuprum();
export default function ProjectsContainer({
  projects,
}: {
  projects: Project[];
}) {
  const [projectsArr, setProjectsArr] = useState(projects);

  return (
    <>
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
      <div className={styles.switchProjectButtons}>
        <button
          className={styles.switchProjectLeft}
          onClick={() => {
            if (projectsArr[0] !== undefined) {
              const projectsArrCopy = [...projectsArr];
              const lastProject = projectsArrCopy.pop();
              if (lastProject) {
                projectsArrCopy.unshift(lastProject);
                setProjectsArr(projectsArrCopy);
              }
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <button
          className={styles.switchProjectRight}
          onClick={() => {
            const projectsArrCopy = [...projectsArr];
            const firstProject = projectsArrCopy.shift();
            if (firstProject) {
              projectsArrCopy.push(firstProject);
              setProjectsArr(projectsArrCopy);
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </div>
    </>
  );
}
