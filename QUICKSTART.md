# Quick Start Guide

Get your SvelteKit portfolio up and running with Bun in just a few minutes!

## Prerequisites

### Install Bun

If you don't have Bun installed yet, install it with one command:

**macOS, Linux, and WSL:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

**Verify installation:**
```bash
bun --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gnoblet/gnoblet.github.io.git
cd gnoblet.github.io
```

### 2. Install Dependencies

```bash
bun install
```

This will install all required packages using Bun's ultra-fast package manager.

### 3. Start Development Server

```bash
bun dev
```

Your site will be available at `http://localhost:5173` 🚀

## Development Commands

```bash
# Start development server with hot reload
bun dev

# Build for production
bun run build

# Preview production build locally
bun run preview

# Type check your code
bun run check

# Type check with watch mode
bun run check:watch

# Lint your code
bun run lint
```

## Quick Customization

### Change Theme

Toggle between light/dark mode using the button in the navbar, or edit `tailwind.config.js` to customize themes:

```javascript
daisyui: {
  themes: [
    {
      light: {
        primary: '#3b82f6',     // Change this color
        secondary: '#8b5cf6',   // And this one
        // ... more colors
      },
    },
  ],
}
```

### Add Your Projects

Edit `src/routes/projects/+page.svelte`:

```typescript
let projects: Project[] = [
  {
    id: '1',
    title: "My Awesome Project",
    description: "What it does",
    tags: ["SvelteKit", "TypeScript"],
    link: "https://project-url.com",
    github: "https://github.com/username/repo",
    image: "/assets/projects/image.jpg"
  },
  // Add more projects...
];
```

### Update About Me

Edit `src/routes/aboutMe/+page.svelte`:

```typescript
// Update skills
let skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['Svelte', 'React', 'TypeScript']
  },
];

// Update experience
let experiences: Experience[] = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2023 - Present',
    description: 'What you do...'
  },
];
```

### Add Social Links

Edit `src/lib/data/social-icons.ts`:

```typescript
export const socialIcons: SocialIcon[] = [
  {
    href: "https://github.com/yourusername",
    ariaLabel: "GitHub",
    iconPath: "...",  // SVG path
    viewBox: "0 0 24 24"
  },
];
```

### Change Colors

Edit `tailwind.config.js` to customize your color palette:

```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors here
      'brand': '#your-color-code',
    },
  },
}
```

## File Structure

```
src/
├── lib/
│   ├── components/          # Reusable components
│   ├── stores/              # State management
│   └── data/                # Static data
├── routes/
│   ├── +layout.svelte       # Root layout
│   ├── +page.svelte         # Home page
│   ├── projects/+page.svelte
│   └── aboutMe/+page.svelte
├── app.html                 # HTML template
└── app.css                  # Global styles

static/                      # Static assets (images, etc.)
```

## Building for Production

### Local Build

```bash
bun run build
```

Output will be in the `build/` directory.

### Preview Build

```bash
bun run preview
```

Visit `http://localhost:4173` to preview your production build.

## Deployment to GitHub Pages

### Option 1: GitHub Actions (Automatic)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. The workflow will automatically build and deploy

### Option 2: Manual Deployment

```bash
# Build the site
bun run build

# Deploy the build directory to GitHub Pages
# (Use gh-pages or your preferred method)
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
bun dev -- --port 3000
```

### Clear Cache

If you encounter weird errors:

```bash
# Remove all caches and dependencies
rm -rf node_modules .svelte-kit bun.lockb

# Reinstall
bun install
```

### Type Errors

Run the type checker:

```bash
bun run check
```

Fix any reported TypeScript errors.

## Next Steps

1. ✅ **Customize Content**: Update projects, skills, and about me sections
2. ✅ **Add Images**: Place images in `static/assets/`
3. ✅ **Choose Theme**: Select from 28+ DaisyUI themes
4. ✅ **Test Build**: Run `bun run build` to ensure everything works
5. ✅ **Deploy**: Push to GitHub and enable GitHub Pages

## Resources

- **Bun Docs**: https://bun.sh/docs
- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **DaisyUI Components**: https://daisyui.com/components/
- **Migration Guide**: See `MIGRATION_GUIDE.md` for detailed info

## Getting Help

- Check the [SvelteKit FAQ](https://kit.svelte.dev/faq)
- Browse [DaisyUI discussions](https://github.com/saadeghi/daisyui/discussions)
- Review the [Bun documentation](https://bun.sh/docs)
- Open an issue in the repository

---

**Happy coding! 🚀**

Made with ❤️ using Bun, SvelteKit, Tailwind CSS, and DaisyUI