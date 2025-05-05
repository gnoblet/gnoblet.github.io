// src/components/BlogPost.tsx
import React, { useEffect } from "react";
import { BlogPost } from "../types/blog";
import { formatDate } from "../utils/blogUtils";
import styles from "../styles/components/BlogPost.module.css";
import { Link } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import ShareButtons from "./ShareButtons";
import { marked } from "marked"; // Import the marked library

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent: React.FC<BlogPostProps> = ({ post }) => {
  // Convert markdown to HTML
  const htmlContent = post.content ? marked(post.content) : "";

  // Initialize syntax highlighting
  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  return (
    <article className={styles.blogPost}>
      <Link to="/blog" className={styles.backLink}>
        ← Back to all posts
      </Link>

      <header className={styles.postHeader}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.postMeta}>
          <span className={styles.postDate}>{formatDate(post.date)}</span>
          <span className={styles.postAuthor}>by {post.author}</span>
        </div>

        {post.coverImage && (
          <div className={styles.coverImageContainer}>
            <img
              src={post.coverImage}
              alt={post.title}
              className={styles.coverImage}
            />
          </div>
        )}

        <div className={styles.postTags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <ShareButtons title={post.title} url={window.location.href} />
    </article>
  );
};

export default BlogPostComponent;
