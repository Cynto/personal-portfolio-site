import styles from './(styles)/PortfolioSection.module.scss';
import { Alegreya, Cuprum } from '@next/font/google';
import AuthData from '../(interfaces)/AuthData.interface';
import Image from 'next/image';

const cuprum = Cuprum();
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

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
export default async function PortfolioSection({
  authData,
}: {
  authData: AuthData;
}) {
  const projectsData = await getProjects(authData);
  const projects = projectsData?.items ? projectsData.items : [];

  console.log(projects);
  return (
    <section className={styles.portfolioSection} id={'portfolio'}>
      <h2 className={alegreya.className}>Portfolio</h2>

      <div className={styles.projectsContainer}>
        {projects[0] &&
          projects.map((project: any) => {
            return (
              <div className={styles.project} key={project.id}>
                <div className={styles.imageContainer}>
                  {project.screenshot !== '' && (
                    <Image
                      src={`${process.env.DB_HOST}/api/files/${project.collectionName}/${project.id}/${project.screenshot}`}
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
    </section>
  );
}
