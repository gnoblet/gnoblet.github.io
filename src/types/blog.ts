// src/types/blog.ts
export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

export type BlogPostMetadata = Omit<BlogPost, "content">;
