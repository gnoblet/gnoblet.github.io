// src/components/BlogPost.tsx - Simplified version
import React, { useEffect } from "react";
import { BlogPost } from "../types/blog";
import { formatDate } from "../utils/blogUtils";
import styles from "../styles/BlogPost.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

interface BlogPostProps {
  post: BlogPost;
}

const BlogPostComponent: React.FC<BlogPostProps> = ({ post }) => {
  // Initialize syntax highlighting when component mounts
  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  // Get the current URL for sharing
  const currentUrl = window.location.href;

  return (
    <motion.article
      className={styles.blogPost}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share buttons */}
      <ShareButtons title={post.title} url={currentUrl} />
    </motion.article>
  );
};

export default BlogPostComponent;
