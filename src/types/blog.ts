// src/types/blog.ts - Simplified types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  coverImage?: string;
  format?: string;
}

export interface BlogPostMetadata {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
  format?: string;
}
