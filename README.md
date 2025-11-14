# Guillaume Noblet's Personal Website

This repository contains the source code for my personal website built with React, TypeScript, and Vite. The website showcases my professional profile, projects, blog, and contact information. It features a modular theming system and efficient Quarto document rendering with caching.

## 🚀 Live Site

Visit the site at [gnoblet.github.io](https://gnoblet.github.io/)

## ✨ Features

- **Modern UI**: Built with React 19 and styled with CSS modules
- **Modular Theming**: Comprehensive theming system with semantic variables
- **Responsive Design**: Optimized viewing experience across all devices
- **Animations**: Smooth transitions and animations using Framer Motion
- **Dynamic Content**: Blog and portfolio with filtering capabilities
- **Type Safety**: Developed with TypeScript for robust code quality
- **Fast Performance**: Built with Vite for optimal development and production performance
- **Quarto Integration**: Removed from this branch — blog content moved to a legacy branch
- **SEO Friendly**: Properly structured content for better search engine visibility

## 📁 Project Structure

```
src/
├── assets/          # Static assets
│   ├── fonts/       # Custom fonts
│   ├── placeholders/ # Placeholder images
│   └── myself.jpg   # Personal image
├── components/      # Reusable UI components
│   ├── FeaturesList/ # Feature listing components
│   ├── QuartoComponents/ # Components for Quarto integration
│   ├── background/  # Background-related components
│   ├── buttons/     # Button components
│   ├── cards/       # Card UI components
│   ├── content/     # Content display components
│   ├── layout/      # Layout components (headers, footers, etc.)
│   ├── social/      # Social media components
│   └── ui/          # General UI components
├── content/         # Static content
│   └── quarto/      # (moved to legacy branch; removed from this branch)
├── contexts/        # React contexts
├── data/            # Data files
│   ├── education.ts # Education history data
│   ├── features.ts  # Features data
│   ├── projects.ts  # Projects data
│   ├── publications.ts # Publications data
│   ├── social-icons.ts # Social media icons
│   └── timeline.ts  # Timeline data
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── AboutMe.tsx  # About me page
│   ├── Home.tsx     # Homepage
│   ├── Projects.tsx # Projects page
│   ├── QuartoList.tsx # List of Quarto posts
│   └── QuartoPage.tsx # Individual Quarto post page
├── styles/          # CSS styling
│   ├── common/      # Shared styles across components
│   ├── components/  # Component-specific styles
│   ├── pages/       # Page-specific styles
│   ├── theme/       # Theming system
│   │   ├── colors.css     # Base color definitions
│   │   ├── semantic.css   # Semantic variables
│   │   ├── layout.css     # Layout and spacing
│   │   ├── typography.css # Typography settings
│   │   ├── palette-blue.css # Blue color palette
│   │   └── index.css      # Theme exports
│   ├── components.css # Component styles
│   ├── global.css    # Global styles
│   ├── responsive.css # Responsive design styles
│   ├── utilities.css # Utility classes
│   └── variables.css # CSS variables
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 📋 Pages

- **Home**: Full-width landing page with timeline and project showcase
- **Projects**: Showcase of projects with filtering options
- **Blog**: Removed from the main branch; blog content and Quarto files are available on a legacy branch
- **About Me**: Personal information and professional background

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
- **Quarto Cards**: Uses same theming and styling as project cards
- **BlogList**: Renders a list of blog posts with filtering
- **Navbar**: Site navigation with responsive menu
- **Footer**: Site footer with links and information
- **LeafAnimation**: Decorative animated leaves with multiple types and interactive physics
- **MondrianBackground**: Artistic background inspired by Piet Mondrian's work
- **TagCloud/TagFilter**: Interactive tag filtering
- **Timeline**: Interactive experience timeline with hover effects

### MondrianBackground

The Mondrian-inspired background component adds artistic flair to sections:
- Asymmetrical grid layout with varied column and row sizes
- Pastel purple color palette with different opacities
- Inspired by Jen Schiffer's generative Mondrian art approach
- Subtle animations and hover effects for enhanced visual interest
- Responsive design that adapts to different screen sizes

### Interactive Timeline

The timeline component features an advanced hover interaction system:

- Each timeline entry has its own line segment that connects to the next entry
- Hovering on any entry creates coordinated visual effects:
  - The entry background highlights
  - The dot marker enlarges and glows
  - The line segment brightens
  - All other entries dim simultaneously
- State-based approach ensures consistent behavior with expanded entries
- "Show More/Less" toggle for displaying additional timeline entries

### LeafAnimation

The background animation creates an immersive experience:

- Seven different leaf types (oval, heart-shaped, maple, fern, ginkgo, oak, and detailed maple)
- High-resolution rendering with device pixel ratio support for crisp visuals
- Interactive physics: leaves respond to mouse/touch movement
- Dynamic wind patterns that create natural, never-repeating motion
- Subtle color palette that complements the site's theme

## 🛠️ Development

### Prerequisites

- Node.js (v18+)
- pnpm (preferred) or npm
- Quarto CLI (optional, for rendering blog posts locally)

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

# Build for production (includes Quarto rendering)
pnpm build

# Render Quarto documents only (disabled)
# pnpm render-quarto (removed) — Quarto rendering disabled in this branch

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

### Development Workflow

1. **Local Development**: Run `pnpm dev` to start the development server
2. **Adding Content**: Place new Quarto documents in `src/content/quarto/`
3. **Rendering**: Quarto documents are automatically rendered during build, or manually with `pnpm render-quarto`
4. **Caching**: The system caches rendered documents to avoid unnecessary re-rendering

### Troubleshooting

**Quarto Documents Not Rendering:**
- Ensure Quarto CLI is installed if you want to render locally
- Check `.quarto-cache.json` for any error messages
- Delete `.quarto-cache.json` to force re-rendering of all documents

**Development Server Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check that all required dependencies are installed
- Ensure Node.js version is 18 or higher

**Build Failures:**
- Run `pnpm lint` to check for TypeScript errors
- Verify all asset paths are correct
- Check browser console for runtime errors

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

Blog posts are implemented as Quarto documents. Add new `.qmd` files to the `src/content/quarto/` directory following this format:

```yaml
---
title: "Blog Post Title"
date: "YYYY-MM-DD"
author: "Your Name"
description: "A brief description of the blog post."
categories: [category1, category2]
tags: [tag1, tag2, tag3]
format:
  html:
    theme: templates/website-dark-blue.scss
    minimal: true
---

# Main Heading

Your content goes here...
```

Blog posts are automatically rendered during the build process and cached for efficiency. The Quarto system provides rich formatting options including code blocks, mathematical equations, interactive elements, and more.

**Quarto Document Features:**
- Code syntax highlighting with multiple language support
- Mathematical equations using LaTeX syntax
- Interactive plots and visualizations
- Custom themes that match the website design
- Automatic table of contents generation
- Cross-references and citations

## 🎨 Theming System

The website implements a comprehensive theming system divided into logical modules:

### Theme Structure

- **Colors**: Base color definitions in `colors.css`
- **Semantic Variables**: Context-specific variables in `semantic.css`
- **Layout**: Spacing, breakpoints, and layout variables in `layout.css`
- **Typography**: Font sizes, weights, and text styling in `typography.css`

### Key Features

- **Semantic Variable Names**: Variables describe their purpose (e.g., `--button-primary-background` instead of just a color value)
- **Consistent Spacing Scale**: Based on 8px units (e.g., `--spacing-sm: 8px`, `--spacing-md: 16px`)
- **Responsive Breakpoints**: Standard breakpoints for consistent media queries
- **Component Base Styles**: Reusable styles for common UI elements
- **Utility Classes**: Helper classes for common styling patterns

### Usage

```css
/* Example of using theme variables */
.my-component {
  background-color: var(--card-background);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: var(--transition-standard);
}
```

### Customizing Themes

To customize the theming system:

1. **Color Changes**:
   - Edit `src/styles/theme/colors.css` to change base color values
   - Add new color variables for additional palette options
   - Update common card styles in `src/styles/components/horizontal/HorizontalCard.css` for consistent UI

2. **Component Styling**:
   - Modify `src/styles/theme/semantic.css` to change how components look
   - Update component mappings to use different base colors

3. **Layout and Spacing**:
   - Adjust `src/styles/theme/layout.css` to change spacing scale, container sizes, or breakpoints
   - Modify z-index values for layering components

4. **Typography**:
   - Update `src/styles/theme/typography.css` to change font families, sizes, or weights
   - Adjust line heights and letter spacing for better readability

5. **Utility Classes**:
   - Add custom utility classes to `src/styles/utilities.css` for common patterns
   - Use utility classes with components for quick styling

## 📄 Quarto Integration

The website supports [Quarto](https://quarto.org/) documents with efficient rendering and caching:

### Features

- **Automatic Rendering**: Quarto documents in `src/content/quarto/` are automatically rendered during build
- **Caching System**: Only re-renders documents that have changed since the last build
- **HTML Output**: Documents are rendered to standalone HTML for embedding
- **Fallback Mode**: Creates simple HTML when Quarto is not installed
- **Independent Theming**: Each Quarto document can specify its own theme

### How It Works

1. During build, the script checks each Quarto document against a cache
2. Only changed files (based on MD5 hash) are re-rendered
3. Previously rendered files are reused if unchanged
4. A `.quarto-cache.json` file tracks document hashes and render dates

### Adding Quarto Documents

1. Place `.qmd` files in the `src/content/quarto/` directory
2. Specify document-specific theme in the YAML frontmatter if desired
3. Run `pnpm render-quarto` or `pnpm build` to render them
4. Documents will be rendered to `/public/quarto-html/`
5. Categories and tags in Quarto front matter will appear as tags on cards
6. Access rendered documents from your React components via their URL path

### Example Quarto Document with Custom Theme

```yaml
---
title: "My Quarto Document"
format:
  html:
    theme: cosmo  # Use any Quarto theme
    css: custom.css  # Add custom CSS if needed
---
```

### Force Re-rendering

If you need to force re-rendering of all Quarto documents:

```bash
# Delete the cache file
rm .quarto-cache.json

# Re-render all documents
pnpm render-quarto
```

## 🚀 Deployment

The site is configured for deployment to GitHub Pages using GitHub Actions:

- **Automatic Deployment**: Pushes to the `main` branch trigger automatic deployment
- **Manual Deployment**: Can be triggered manually via GitHub Actions workflow dispatch
- **Build Process**: The deployment workflow handles Quarto rendering, TypeScript compilation, and Vite building
- **GitHub Pages**: The built site is deployed to `https://gnoblet.github.io/`
- **SPA Routing**: Uses a custom SPA routing solution for GitHub Pages

### Deployment Workflow

1. Code is pushed to the `main` branch
2. GitHub Actions runs the build process:
   - Renders Quarto documents (with fallback if Quarto is not available)
   - Compiles TypeScript
   - Builds the project with Vite
   - Copies necessary files to the `dist` directory
   - Includes 404.html for SPA routing on GitHub Pages
3. The built site is deployed to GitHub Pages

### GitHub Pages Deployment

The site uses a standard SPA routing solution for GitHub Pages (404.html redirect + script in index.html) to enable client-side routing with React Router. This allows direct navigation to any route like `/aboutMe` or `/blog/post-slug` and ensures Quarto HTML files are properly served.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📮 Contact

For questions or suggestions, please reach out through:

- Email: [gnoblet@zaclys.net](mailto:gnoblet@zaclys.net)
- GitHub: [gnoblet](https://github.com/gnoblet)
- LinkedIn: [gnoblet](https://www.linkedin.com/in/gnoblet/)
- Bluesky: [@gnoblet.bsky.social](https://bsky.app/profile/gnoblet.bsky.social)
