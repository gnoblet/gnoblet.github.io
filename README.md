# Guillaume Noblet's Personal Website

This repository contains the source code for my personal website built with React, TypeScript, and Vite. The website showcases my professional profile, projects, blog, and contact information.

## 🚀 Live Site

Visit the site at [gnoblet.github.io](https://gnoblet.github.io/)

## ✨ Features

- **Modern UI**: Built with React 19 and styled with CSS modules
- **Responsive Design**: Optimized viewing experience across all devices
- **Animations**: Smooth transitions and animations using Framer Motion
- **Dynamic Content**: Blog and portfolio with filtering capabilities
- **Type Safety**: Developed with TypeScript for robust code quality
- **Fast Performance**: Built with Vite for optimal development and production performance
- **SEO Friendly**: Properly structured content for better search engine visibility

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, logos)
│   ├── fonts/       # Custom fonts
│   ├── logo/        # Logo files
│   ├── placeholders/ # Placeholder images
│   └── projects/    # Project images
├── components/      # Reusable UI components
├── content/         # Static content
│   └── blog/        # Blog post content
├── data/            # Data files (projects, blog posts, timeline)
├── pages/           # Page components
├── styles/          # CSS modules
│   ├── components/  # Component-specific styles
│   └── pages/       # Page-specific styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 📋 Pages

- **Home**: Full-width landing page with timeline and project showcase
- **Portfolio**: Showcase of projects with filtering options
- **Blog**: Blog posts with search functionality
- **Contact**: Contact form and information

## 🖼️ Image Handling

The application supports various ways to specify project images:

- **Remote URLs**: Use a full URL starting with `http://` or `https://`
- **Absolute paths**: Use paths starting with `/` 
- **Local images**: Simply provide the filename (e.g., `image.jpg`), and it will be resolved to `/src/assets/projects/image.jpg`

The system includes fallback images that will be shown if:
- The specified image URL is empty or invalid
- The image fails to load for any reason

Local project images should be placed in the `/src/assets/projects/` directory.

## 🧩 Components

The website utilizes several reusable components, including:

- **ProjectCard**: Displays project information with image and tags
- **BlogList**: Renders a list of blog posts with filtering
- **Navbar**: Site navigation with responsive menu
- **Footer**: Site footer with links and information
- **LeafAnimation**: Decorative animated elements
- **TagCloud/TagFilter**: Interactive tag filtering

## 🛠️ Development

### Prerequisites

- Node.js (v18+)
- pnpm (preferred) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/gnoblet/gnoblet.github.io.git
cd gnoblet.github.io

# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## 🔧 Adding Content

### Adding Projects

Edit the file `src/data/projects.ts` to add new projects:

```typescript
{
  id: 9,  // Unique ID
  title: "Project Name", 
  slug: "project-name",  // URL-friendly name
  description: "Project description goes here",
  imageUrl: "project-image.jpg",  // Can be a URL or local file
  projectUrl: "https://example.com/project",
  tags: ["react", "typescript", "frontend"]  // Relevant tags
}
```

### Adding Timeline Entries

Edit the file `src/data/timeline.ts` to add or modify timeline experiences:

```typescript
{
  period: "2023 - Present",
  company: "Company Name",
  role: "Your Job Title",
  description: "Brief description of your responsibilities and achievements.",
  companyUrl: "https://example.com",  // Optional
  location: "City, Country",  // Optional
  skills: ["Skill 1", "Skill 2"],  // Optional
  achievements: ["Achievement 1", "Achievement 2"]  // Optional
}
```

### Adding Blog Posts

Add new Markdown files to the `src/content/blog/` directory following this format:

```markdown
---
title: "Blog Post Title"
date: "YYYY-MM-DD"
author: "Your Name"
excerpt: "A brief description of the blog post."
tags: [tag1, tag2, tag3]
coverImage: "https://example.com/image.jpg"
---

# Main Heading

Your content goes here...
```

The file `src/data/blogPosts.ts` contains fallback blog posts that are used if no Markdown files are found.

## 🚀 Deployment

The site is configured for deployment to GitHub Pages. When pushing to the main branch, the GitHub Actions workflow will automatically build and deploy the site.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📮 Contact

For questions or suggestions, please reach out through:

- Email: gnoblet@zaclys.net
- GitHub: [gnoblet](https://github.com/gnoblet)
- LinkedIn: [gnoblet](https://www.linkedin.com/in/gnoblet/)
- Bluesky: [@gnoblet.bsky.social](https://bsky.app/profile/gnoblet.bsky.social)