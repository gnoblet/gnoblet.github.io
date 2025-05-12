// src/utils/quartoUtils.ts
import { useState, useEffect } from "react";

// Define QuartoPost interface
export interface QuartoPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  categories: string[];
  coverImage?: string;
}

export type QuartoPostMetadata = Omit<QuartoPost, "content">;

// Cache for loaded Quarto posts
const quartoPostCache = new Map<string, QuartoPost>();

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

// Load all Quarto posts
export const loadQuartoPosts = async (): Promise<QuartoPost[]> => {
  try {
    // Use Vite's import.meta.glob to get the raw content of all rendered Quarto markdown files
    const quartoPostModules = import.meta.glob("../content/quarto-md/*.md", {
      as: "raw",
      eager: true,
    });
    
    const allQuartoPosts: QuartoPost[] = [];

    for (const path in quartoPostModules) {
      try {
        const rawContent = quartoPostModules[path] as string;

        // Parse frontmatter and content
        const { frontmatter, content } = parseFrontmatter(rawContent);

        // Extract slug from filename
        const filename = path.split("/").pop() || "";
        const slug = filename.replace(/\.md$/, "");
        
        // Handle tags and categories (Quarto uses both)
        const tags = frontmatter.tags || [];
        const categories = frontmatter.categories || [];
        
        // Create Quarto post object
        const post: QuartoPost = {
          id: slug,
          slug,
          title: frontmatter.title || "Untitled Quarto Post",
          date: frontmatter.date || new Date().toISOString(),
          author: frontmatter.author || "Anonymous",
          excerpt: frontmatter.excerpt || frontmatter.description || "",
          content: content, 
          tags: Array.isArray(tags)
            ? tags
            : typeof tags === "string"
              ? tags.split(",").map((tag: string) => tag.trim())
              : [],
          categories: Array.isArray(categories)
            ? categories
            : typeof categories === "string"
              ? categories.split(",").map((cat: string) => cat.trim())
              : [],
          coverImage: frontmatter.image || "",
        };

        console.log(
          `Loaded Quarto post: ${post.title} with tags: ${post.tags.join(", ")}`,
        );
        allQuartoPosts.push(post);
        quartoPostCache.set(slug, post);
      } catch (err) {
        console.error(`Error processing Quarto file: ${path}`, err);
      }
    }

    // Sort posts by date (newest first)
    return allQuartoPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (err) {
    console.error("Failed to load Quarto posts:", err);
    return []; // Return empty array if there's an error
  }
};

// Get a specific Quarto post by slug
export const getQuartoPostBySlug = async (
  slug: string,
): Promise<QuartoPost | null> => {
  try {
    // Check cache first
    if (quartoPostCache.has(slug)) {
      return quartoPostCache.get(slug) || null;
    }

    // If not in cache, load all posts first
    const allPosts = await loadQuartoPosts();
    const post = allPosts.find((p) => p.slug === slug) || null;

    if (post) {
      quartoPostCache.set(slug, post);
    }

    return post;
  } catch (err) {
    console.error("Error loading Quarto post:", err);
    return null;
  }
};

// Load all Quarto posts (React hook)
export const useQuartoPosts = () => {
  const [posts, setPosts] = useState<QuartoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await loadQuartoPosts();
        setPosts(allPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error in useQuartoPosts:", err);
        setError("Failed to load Quarto posts");
        setPosts([]);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

// Get a single Quarto post by slug (React hook)
export const useQuartoPost = (slug: string) => {
  const [post, setPost] = useState<QuartoPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getQuartoPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error("Error in useQuartoPost:", err);
        setError("Failed to load Quarto post");
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

// Get all unique tags with counts from Quarto posts
export const useQuartoTags = () => {
  const { posts, loading, error } = useQuartoPosts();
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

// Get all unique categories with counts
export const useQuartoCategories = () => {
  const { posts, loading, error } = useQuartoPosts();
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (!loading && !error && posts.length > 0) {
      const categoryCounts = new Map<string, number>();

      posts.forEach((post) => {
        post.categories.forEach((category) => {
          categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
        });
      });

      const categoryArray = Array.from(categoryCounts.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      setCategories(categoryArray);
    } else {
      setCategories([]);
    }
  }, [posts, loading, error]);

  return { categories, loading, error };
};