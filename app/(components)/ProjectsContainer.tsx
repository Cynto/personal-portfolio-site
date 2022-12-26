'use client';

import styles from './(styles)/PortfolioSection.module.scss';
import { useState, useEffect } from 'react';
import Project from '../(interfaces)/Project.interface';
import SwitchProjectButtons from './SwitchProjectButtons';
import useWindowProperties from '../..//hooks/useWindowProperties';
import SingleProject from './SingleProject';

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
            return <SingleProject project={project} key={project.id} />;
          })}
      </div>
      <SwitchProjectButtons
        projectsArr={projectsArr}
        setProjectsArr={setProjectsArr}
      />
    </>
  );
}
