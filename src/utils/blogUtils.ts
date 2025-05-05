// src/utils/blogUtils.ts
import { useState, useEffect } from "react";
import { BlogPost } from "../types/blog";
import { mockBlogPosts } from "../data/blogPosts";

// Cache for loaded blog posts
const postCache = new Map<string, BlogPost>();

// Helper function to parse frontmatter from markdown
function parseFrontmatter(markdown: string): {
  frontmatter: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(markdown);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const frontmatterBlock = match[1];
  const content = markdown.replace(frontmatterRegex, "").trim();

  // Parse the frontmatter block
  const frontmatter: Record<string, any> = {};
  const lines = frontmatterBlock.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      // Handle quoted strings
      if (value.startsWith('"') && value.endsWith('"')) {
        frontmatter[key] = value.slice(1, -1);
      }
      // Handle arrays (tags: [item1, item2])
      else if (value.startsWith("[") && value.endsWith("]")) {
        const arrayContent = value.slice(1, -1);
        frontmatter[key] = arrayContent.split(",").map((item) => item.trim());
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content };
}

// Load all blog posts
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Use Vite's import.meta.glob to get the raw content of all markdown files
    const postModules = import.meta.glob("../content/blog/*.md", {
      as: "raw",
      eager: true,
    });
    const allPosts: BlogPost[] = [];

    for (const path in postModules) {
      try {
        const rawContent = postModules[path] as string;

        // Parse frontmatter and content
        const { frontmatter, content } = parseFrontmatter(rawContent);

        // Extract slug from filename
        const filename = path.split("/").pop() || "";
        const slug = filename.replace(/\.md$/, "");

        // Create post object
        const post: BlogPost = {
          id: slug,
          slug,
          title: frontmatter.title || "Untitled Post",
          date: frontmatter.date || new Date().toISOString(),
          author: frontmatter.author || "Anonymous",
          excerpt: frontmatter.excerpt || "",
          content: content, // This is the markdown content without frontmatter
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags
            : typeof frontmatter.tags === "string"
              ? frontmatter.tags.split(",").map((tag: string) => tag.trim())
              : [],
          coverImage: frontmatter.coverImage || "",
        };

        console.log(
          `Loaded post: ${post.title} with tags: ${post.tags.join(", ")}`,
        );
        allPosts.push(post);
        postCache.set(slug, post);
      } catch (err) {
        console.error(`Error processing markdown file: ${path}`, err);
      }
    }

    // If no posts were loaded, use mock data as fallback
    if (allPosts.length === 0) {
      console.warn("No markdown posts found, using mock data");
      return mockBlogPosts;
    }

    // Sort posts by date (newest first)
    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    console.error("Failed to load blog posts:", err);
    return mockBlogPosts; // Return mock data as fallback
  }
};

// Get a specific blog post by slug
export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  try {
    // Check cache first
    if (postCache.has(slug)) {
      return postCache.get(slug) || null;
    }

    // If not in cache, load all posts first (this helps with SSG)
    const allPosts = await loadBlogPosts();
    const post = allPosts.find((p) => p.slug === slug) || null;

    if (post) {
      postCache.set(slug, post);
    }

    return post;
  } catch (err) {
    console.error("Error loading blog post:", err);
    // Try to find in mock data as fallback
    const mockPost = mockBlogPosts.find((p) => p.slug === slug) || null;
    return mockPost;
  }
};

// Load all blog posts (React hook)
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await loadBlogPosts();
        setPosts(allPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error in useBlogPosts:", err);
        setError("Failed to load blog posts");
        setPosts([]);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

// Get a single post by slug (React hook)
export const useBlogPost = (slug: string) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getBlogPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error("Error in useBlogPost:", err);
        setError("Failed to load blog post");
        setPost(null);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
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

// Get all unique tags with counts
export const useBlogTags = () => {
  const { posts, loading, error } = useBlogPosts();
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (!loading && !error && posts.length > 0) {
      const tagCounts = new Map<string, number>();

      posts.forEach((post) => {
        post.tags.forEach((tag) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });

      const tagArray = Array.from(tagCounts.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      setTags(tagArray);
    } else {
      setTags([]);
    }
  }, [posts, loading, error]);

  return { tags, loading, error };
};
