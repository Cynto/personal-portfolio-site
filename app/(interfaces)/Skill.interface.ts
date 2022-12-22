export default interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  learnt: boolean;
  collectionName: string;
  collectionId: string;
  created: Date;
  updated: Date;
}
