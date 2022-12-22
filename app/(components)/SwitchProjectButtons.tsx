import styles from './(styles)/PortfolioSection.module.scss';
import Project from '../(interfaces)/Project.interface';
import { Dispatch, SetStateAction } from 'react';

export default function SwitchProjectButtons({
  projectsArr,
  setProjectsArr,
}: {
  projectsArr: Project[];
  setProjectsArr: Dispatch<SetStateAction<Project[]>>;
}) {
  return (
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
  );
}
