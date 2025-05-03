// src/components/BlogList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { BlogPostMetadata } from "../types/blog";
import { formatDate } from "../utils/blogUtils";
import styles from "../styles/BlogList.module.css";
import { motion } from "framer-motion";

interface BlogListProps {
  posts: BlogPostMetadata[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className={styles.blogList}>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          className={styles.blogCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {post.coverImage && (
            <div className={styles.coverImage}>
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}
          <div className={styles.cardContent}>
            <h2 className={styles.postTitle}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
              <span className={styles.postAuthor}>by {post.author}</span>
            </div>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <div className={styles.postTags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
            <Link to={`/blog/${post.slug}`} className={styles.readMoreLink}>
              Read More →
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default BlogList;
