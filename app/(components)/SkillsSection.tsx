import styles from './(styles)/SkillsSection.module.scss';
import Image from 'next/image';
import { Alegreya, Cuprum } from '@next/font/google';
import AuthData from '../(interfaces)/AuthData.interface';
import Skill from '../(interfaces)/Skill.interface';

const cuprum = Cuprum();
const alegreya = Alegreya();
export async function getSkills(authData: AuthData) {
  try {
    const res = await fetch(
      `${process.env.DB_HOST}/api/collections/skills/records`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    const data = await res.json();
    // Add property to each skill that points to the url of the icon
    const skills = data?.items
      ? data.items.map((skill: Skill) => {
          return {
            ...skill,
            iconURL: `${process.env.DB_HOST}/api/files/${skill.collectionName}/${skill.id}/${skill.icon}`,
          };
        })
      : [];
    return await skills;
  } catch (err) {
    console.log(err);
  }
}
export default async function SkillsSection({
  authData,
}: {
  authData: AuthData;
}) {
  const skills = await getSkills(authData);

  return (
    <section className={styles.skillsSectionContainer} id="skills">
      <h2 className={alegreya.className}>SKILLS</h2>
      <div className={styles.frontAndBackContainer}>
        <div>
          <h3 className={cuprum.className}>Frontend</h3>
          <div className={styles.skillsContainer}>
            {skills[0] &&
              skills.map((skill: any) => {
                if (skill.category === 'frontend') {
                  return (
                    <div className={styles.skill} key={skill.id}>
                      {skill.name}
                      <div className={styles.imageContainer}>
                        <Image
                          src={skill.iconURL}
                          alt={skill.name}
                          width={0}
                          height={0}
                          sizes="50px"
                          title={skill.name}
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div>
          <h3 className={cuprum.className}>Backend</h3>
          <div className={styles.skillsContainer}>
            {skills.map((skill: any) => {
              if (skill.category === 'backend') {
                return (
                  <div className={styles.skill} key={skill.id}>
                    {skill.name}
                    <div className={styles.imageContainer}>
                      <Image
                        src={skill.iconURL}
                        alt={skill.name}
                        width={0}
                        height={0}
                        sizes="50px"
                        title={skill.name}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className={styles.miscContainer}>
        <h3 className={cuprum.className}>Miscellaneous</h3>
        <div className={styles.skillsContainer}>
          {skills.map((skill: any) => {
            if (skill.category === 'misc') {
              return (
                <div className={styles.skill} key={skill.id}>
                  {skill.name}
                  <div className={styles.imageContainer}>
                    <Image
                      src={skill.iconURL}
                      alt={skill.name}
                      width={0}
                      height={0}
                      sizes="50px"
                      title={skill.name}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
