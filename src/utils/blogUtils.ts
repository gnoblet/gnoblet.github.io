// src/utils/blogUtils.ts
import { BlogPost, BlogPostMetadata } from "../types/blog";
import matter from "gray-matter";
import { marked } from "marked";

// Load blog posts metadata for listings (without full content)
export const loadBlogPostsMetadata = async (): Promise<BlogPostMetadata[]> => {
  const fullPosts = await loadBlogPosts();
  return fullPosts.map(({ content, ...metadata }) => metadata);
};

// Load all blog posts from markdown files
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const posts: BlogPost[] = [];

    // Use Vite's glob import with updated syntax (query instead of as)
    const markdownFiles = import.meta.glob("/src/blog/posts/*.md", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    for (const path in markdownFiles) {
      try {
        // Extract filename and slug
        const fileName = path.split("/").pop() || "";
        const slug = fileName.replace(/\.md$/, "");

        // Get the raw markdown content
        const markdown = markdownFiles[path] as string;

        // Parse front matter and content
        const { data, content: markdownContent } = matter(markdown);

        // Validate required front matter
        if (!data.title || !data.date) {
          console.warn(`Missing required front matter in ${fileName}`);
          continue;
        }

        // Convert markdown to HTML - use the synchronous version
        const htmlContent = marked.parse(markdownContent, {
          async: false,
        }) as string;

        // Create blog post object
        const post: BlogPost = {
          id: data.id || slug,
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt || "No excerpt available",
          author: data.author || "Anonymous",
          tags: data.tags || [],
          coverImage: data.coverImage,
          content: htmlContent,
          format: "html",
        };

        posts.push(post);
      } catch (error) {
        console.error(`Error processing markdown file: ${path}`, error);
      }
    }

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);

    // Return empty array in case of error
    return [];
  }
};

// Get a specific blog post by slug
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  const posts = await loadBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
