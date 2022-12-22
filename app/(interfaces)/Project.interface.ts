import Skill from './Skill.interface';

export default interface Project {
  id: string;
  name: string;
  featured: boolean;
  screenshot: string;
  live_site: string;
  github_repository: string;
  built_with: string[];
  collectionName: string;
  collectionId: string;
  created: Date;
  updated: Date;
  expand: {
    built_with: Skill[];
  };
}
