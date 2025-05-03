// src/pages/BlogPostPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPostComponent from "../components/BlogPost";
import { BlogPost } from "../types/blog";
import { getBlogPostBySlug } from "../utils/blogUtils";
import styles from "../styles/BlogPostPage.module.css";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }

      try {
        const postData = await getBlogPostBySlug(slug);

        if (!postData) {
          setError("Post not found");
          setLoading(false);
          return;
        }

        setPost(postData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post. Please try again later.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error || "Post not found"}</p>
        <button className={styles.backButton} onClick={() => navigate("/blog")}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className={styles.blogPostPageContainer}>
      <BlogPostComponent post={post} />
    </div>
  );
};

export default BlogPostPage;
