// src/pages/Portfolio.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  slug: string;
  title: string;
}

function Portfolio() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate fetching projects
    const fetchProjects = async () => {
      const response = await fetch('https://example.com/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Portfolio;