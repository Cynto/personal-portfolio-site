'use client';

import styles from './(styles)/PortfolioSection.module.scss';
import Image from 'next/image';
import { Cuprum } from '@next/font/google';
import { useState, useEffect } from 'react';
import Project from '../(interfaces)/Project.interface';
import SwitchProjectButtons from './SwitchProjectButtons';
import useWindowProperties from '../..//hooks/useWindowProperties';

const cuprum = Cuprum();
export default function ProjectsContainer({
  projects,
}: {
  projects: Project[];
}) {
  const [projectsArr, setProjectsArr] = useState(projects);
  const { orientation } = useWindowProperties();

  useEffect(() => {
    if (orientation === 'portrait' && !projectsArr[0].featured) {
      // swap the first two projects
      const firstProject = projectsArr[0];
      const secondProject = projectsArr[1];
      const newProjectsArr = [...projectsArr];
      newProjectsArr[0] = secondProject;
      newProjectsArr[1] = firstProject;
      setProjectsArr(newProjectsArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation]);

  return (
    <>
      <div className={styles.projectsContainer}>
        {projectsArr[0] &&
          projectsArr.map((project: Project) => {
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
                        objectPosition: 'top center',
                      }}
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
          })}
      </div>
      <SwitchProjectButtons
        projectsArr={projectsArr}
        setProjectsArr={setProjectsArr}
      />
    </>
  );
}
