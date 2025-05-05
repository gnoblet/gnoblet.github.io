// src/components/BlogList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { BlogPostMetadata } from "../types/blog";
import { formatDate } from "../utils/blogUtils";
import styles from "../styles/components/BlogList.module.css";

interface BlogListProps {
  posts: BlogPostMetadata[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className={styles.blogGrid}>
      {posts.map((post) => (
        <article key={post.id} className={styles.blogCard}>
          <Link to={`/blog/${post.slug}`} className={styles.cardLink}>
            {post.coverImage && (
              <div className={styles.coverImage}>
                <img src={post.coverImage} alt={post.title} />
              </div>
            )}
            <div className={styles.cardContent}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <div className={styles.postMeta}>
                <span>{formatDate(post.date)}</span>
                <span> · </span>
                <span>{post.author}</span>
              </div>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
