import styles from './(styles)/PortfolioSection.module.scss';
import { Alegreya } from '@next/font/google';
import AuthData from '../(interfaces)/AuthData.interface';
import ProjectsContainer from './ProjectsContainer';

const alegreya = Alegreya();

const getProjects = async (authData: AuthData) => {
  try {
    const res = await fetch(
      `${process.env.DB_HOST}/api/collections/projects/records?expand=built_with`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    const data = await res.json();
    const projects = data?.items
      ? data.items.map((project: any) => {
          return {
            ...project,
            screenshot:
              project.screenshot !== ''
                ? `${process.env.DB_HOST}/api/files/${project.collectionName}/${project.id}/${project.screenshot}`
                : '',
          };
        })
      : [];

    const featuredIndex = projects.findIndex(
      (project: any) => project.featured
    );
    const secondProject = projects[1];
    projects[1] = projects[featuredIndex];
    projects[featuredIndex] = secondProject;
    return await projects;
  } catch (err) {
    console.log(err);
  }
};
export default async function PortfolioSection({
  authData,
}: {
  authData: AuthData;
}) {
  const projects = await getProjects(authData);
  return (
    <section className={styles.portfolioSection} id={'portfolio'}>
      <h2 className={alegreya.className}>PORTFOLIO</h2>
      <ProjectsContainer projects={projects} />
    </section>
  );
}
