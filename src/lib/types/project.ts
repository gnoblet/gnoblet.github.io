export interface Project {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
  badge?: "new" | "ongoing" | "V1";
}
