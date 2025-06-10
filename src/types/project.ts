// src/types/project.ts
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  /**
   * Image URL can be:
   * - A full URL (http/https) for remote images
   * - A path starting with '/' for absolute paths
   * - A filename (e.g. 'image.jpg') which will be resolved to /src/assets/projects/image.jpg
   */
  imageUrl: string;
  projectUrl: string;
  tags: string[];
}
