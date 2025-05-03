// src/pages/Blog.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  slug: string;
  title: string;
}

function Blog() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate fetching posts
    const fetchPosts = async () => {
      const response = await fetch('https://example.com/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Blog;