// src/pages/BlogPostPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogPostComponent from "../components/BlogPost";
import { useBlogPost } from "../utils/blogUtils";
import styles from "../styles/pages/BlogPostPage.module.css";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug || "");

  if (loading) {
    return <div className={styles.loading}>Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className={styles.error}>
        <p>{error || "Post not found"}</p>
        <button onClick={() => navigate("/blog")}>Back to Blog</button>
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
