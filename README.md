# Guillaume Noblet's Personal Website

This repository contains the source code for my personal website built with **SvelteKit**, **Tailwind CSS**, and **DaisyUI**. The website showcases my professional profile, projects, and contact information with a modern, responsive design.

## 🚀 Live Site

Visit the site at [gnoblet.github.io](https://gnoblet.github.io/)

## ✨ Features

- **Modern Tech Stack**: Built with SvelteKit, TypeScript, and Vite
- **Beautiful UI**: Styled with Tailwind CSS and DaisyUI components
- **Multiple Themes**: 28+ DaisyUI themes with automatic dark/light mode
- **Responsive Design**: Optimized viewing experience across all devices
- **Type Safety**: Developed with TypeScript for robust code quality
- **Fast Performance**: SvelteKit's optimized build and routing
- **SEO Friendly**: Server-side rendering for better search engine visibility
- **Static Generation**: Pre-rendered for GitHub Pages deployment

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable Svelte components
│   │   ├── Navbar.svelte
│   │   ├── Footer.svelte
│   │   └── SocialLinks.svelte
│   ├── stores/          # Svelte stores for state management
│   │   ├── theme.ts     # Theme management store
│   │   └── loading.ts   # Loading state store
│   └── data/            # Data files
│       └── social-icons.ts
├── routes/              # SvelteKit file-based routing
│   ├── +layout.svelte   # Root layout
│   ├── +page.svelte     # Home page
│   ├── projects/
│   │   └── +page.svelte # Projects page
│   ├── aboutMe/
│   │   └── +page.svelte # About Me page
│   └── 404.html         # Custom 404 page
├── app.html             # HTML template
└── app.css              # Global styles with Tailwind

static/                  # Static assets
├── assets/              # Images and media
├── favicon.svg          # Site favicon
└── .nojekyll            # GitHub Pages configuration
```

## 📋 Pages

- **Home** (`/`): Landing page with hero section, features, and project previews
- **Projects** (`/projects`): Showcase of projects with filtering by tags
- **About Me** (`/aboutMe`): Personal information with tabbed sections for About, Skills, and Experience

## 🎨 Theming System

The website uses DaisyUI's theming system with custom configurations:

### Available Themes

- **Light/Dark**: Custom light and dark themes
- **Pre-built Themes**: cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter

### Theme Features

- **Automatic Detection**: Detects system preference on first visit
- **Persistent Storage**: Saves user preference in localStorage
- **Smooth Transitions**: CSS transitions for theme changes
- **Semantic Colors**: DaisyUI's semantic color system (primary, secondary, accent, etc.)

### Customizing Themes

Edit `tailwind.config.js` to customize theme colors:

```javascript
daisyui: {
  themes: [
    {
      light: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        // ... more colors
      },
    },
  ],
}
```

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh) (v1.0+) - Fast all-in-one JavaScript runtime

### Installation

```bash
# Clone the repository
git clone https://github.com/gnoblet/gnoblet.github.io.git
cd gnoblet.github.io

# Install dependencies
bun install
```

### Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type check
bun run check

# Type check with watch mode
bun run check:watch

# Lint code
bun run lint
```

### Development Workflow

1. **Local Development**: Run `bun dev` to start the development server at `http://localhost:5173`
2. **Hot Module Replacement**: Changes are instantly reflected in the browser
3. **Type Checking**: Run `bun run check` to verify TypeScript types
4. **Building**: Run `bun run build` to create a production build in the `build/` directory

### Troubleshooting

**Development Server Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules bun.lockb && bun install`
- Delete `.svelte-kit` folder: `rm -rf .svelte-kit`
- Check that all required dependencies are installed

**Build Failures:**
- Run `bun run check` to verify TypeScript types
- Verify all asset paths are correct
- Check browser console for runtime errors

**Theme Not Working:**
- Check localStorage in browser DevTools
- Clear localStorage and refresh
- Verify theme store is initialized in +layout.svelte

## 🔧 Adding Content

### Adding Projects

Edit the projects data in `src/routes/projects/+page.svelte`:

```typescript
let projects: Project[] = [
  {
    id: '1',
    title: "Project Name",
    description: "Project description",
    tags: ["SvelteKit", "TypeScript"],
    link: "https://example.com",
    github: "https://github.com/username/repo",
    image: "/assets/projects/image.jpg"
  },
  // ... more projects
];
```

### Adding Skills

Edit the skills data in `src/routes/aboutMe/+page.svelte`:

```typescript
let skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['Svelte', 'React', 'TypeScript']
  },
  // ... more skill categories
];
```

### Adding Social Links

Edit `src/lib/data/social-icons.ts`:

```typescript
export const socialIcons: SocialIcon[] = [
  {
    href: "https://example.com",
    ariaLabel: "Platform Name",
    iconPath: "SVG path data",
    viewBox: "0 0 24 24"
  },
  // ... more social links
];
```

## 🧩 Components

### Core Components

- **Navbar**: Responsive navigation with mobile menu and theme toggle
- **Footer**: Site footer with social links and scroll-to-top button
- **SocialLinks**: Reusable social media icon links

### DaisyUI Components Used

- **btn**: Buttons with various styles
- **card**: Content cards
- **navbar**: Navigation bar
- **footer**: Footer layout
- **badge**: Tag badges
- **tabs**: Tab navigation
- **dropdown**: Dropdown menus
- **loading**: Loading spinners
- **alert**: Alert messages

## 🚀 Deployment

The site is configured for deployment to GitHub Pages using the static adapter:

### Build Configuration

- **Adapter**: `@sveltejs/adapter-static` for static site generation
- **Output**: `build/` directory
- **Fallback**: `404.html` for client-side routing

### Deployment Steps

1. Build the project: `bun run build`
2. The build script automatically:
   - Generates static files in `build/`
   - Copies `.nojekyll` file
   - Copies assets to `build/assets/`
3. Deploy `build/` directory to GitHub Pages

### GitHub Actions

The deployment workflow:
1. Installs dependencies
2. Builds the SvelteKit app
3. Deploys to GitHub Pages
4. Handles SPA routing with 404.html fallback

### Manual Deployment

```bash
# Build the site
bun run build

# Deploy the build directory
# (Use your preferred deployment method)
```

## 🎯 Migration from React

This project was recently migrated from React to SvelteKit. Key changes:

### Technology Changes
- **React** → **Svelte/SvelteKit**: Component framework
- **React Router** → **SvelteKit routing**: File-based routing
- **React Context** → **Svelte stores**: State management
- **CSS Modules** → **Tailwind CSS + DaisyUI**: Styling
- **Framer Motion** → **CSS transitions**: Animations

### Benefits of the Migration
- ✅ Simpler component syntax
- ✅ Built-in state management with stores
- ✅ File-based routing
- ✅ Better performance with compile-time optimizations
- ✅ Smaller bundle sizes
- ✅ Beautiful UI with DaisyUI components
- ✅ Faster development with less boilerplate
- ✅ Lightning-fast builds with Bun

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📮 Contact

For questions or suggestions, please reach out through:

- Email: [data@guillaume-noblet.com](mailto:data@guillaume-noblet.com)
- GitHub: [gnoblet](https://github.com/gnoblet)
- LinkedIn: [gnoblet](https://www.linkedin.com/in/gnoblet/)
- Bluesky: [@gnoblet.bsky.social](https://bsky.app/profile/gnoblet.bsky.social)

---

**Built with ❤️ using Bun, SvelteKit, Tailwind CSS, and DaisyUI**
