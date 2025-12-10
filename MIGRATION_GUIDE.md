# Migration Guide: React to SvelteKit

This guide documents the migration of this project from React to SvelteKit with Tailwind CSS and DaisyUI.

## Overview

The project has been completely restructured to use:
- **SvelteKit** instead of React
- **Tailwind CSS + DaisyUI** instead of CSS Modules
- **Svelte Stores** instead of React Context
- **File-based routing** instead of React Router

## Installation Steps

### 1. Install Dependencies

```bash
# Remove old dependencies and install new ones
rm -rf node_modules package-lock.json pnpm-lock.yaml bun.lockb

# Install dependencies
bun install
```

### 2. Initialize SvelteKit

The project is now configured with:
- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Updated for SvelteKit
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS for Tailwind
- `tsconfig.json` - Updated for SvelteKit

### 3. Run Development Server

```bash
bun dev
```

Visit `http://localhost:5173` to see your site.

## Key Differences

### Component Syntax

**React (Before):**
```tsx
import { useState } from 'react';

function MyComponent({ title }: { title: string }) {
  const [count, setCount] = useState(0);
  
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
```

**Svelte (After):**
```svelte
<script lang="ts">
  export let title: string;
  let count = 0;
</script>

<div class="container">
  <h1>{title}</h1>
  <button on:click={() => count++} class="btn btn-primary">
    Count: {count}
  </button>
</div>
```

### State Management

**React Context (Before):**
```tsx
// ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

**Svelte Store (After):**
```typescript
// stores/theme.ts
import { writable } from 'svelte/store';

export const theme = writable<Theme>('dark');

export function toggleTheme() {
  theme.update(t => t === 'light' ? 'dark' : 'light');
}
```

**Usage:**
```svelte
<script>
  import { theme } from '$lib/stores/theme';
</script>

<div class="theme-{$theme}">
  Current theme: {$theme}
</div>
```

### Routing

**React Router (Before):**
```tsx
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/aboutMe" element={<AboutMe />} />
  </Routes>
</BrowserRouter>
```

**SvelteKit Routing (After):**
```
src/routes/
├── +layout.svelte          # Root layout (wraps all pages)
├── +page.svelte            # Home page (/)
├── projects/
│   └── +page.svelte        # Projects page (/projects)
└── aboutMe/
    └── +page.svelte        # About Me page (/aboutMe)
```

### Styling

**CSS Modules (Before):**
```tsx
import styles from './MyComponent.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
</div>
```

**Tailwind + DaisyUI (After):**
```svelte
<div class="container mx-auto p-4">
  <h1 class="text-4xl font-bold text-primary">Hello</h1>
  <button class="btn btn-primary">Click me</button>
</div>
```

### Navigation

**React Router (Before):**
```tsx
import { Link, useNavigate } from 'react-router-dom';

<Link to="/projects">Projects</Link>

const navigate = useNavigate();
navigate('/projects');
```

**SvelteKit (After):**
```svelte
<script>
  import { goto } from '$app/navigation';
</script>

<a href="/projects">Projects</a>

<button on:click={() => goto('/projects')}>
  Go to Projects
</button>
```

### Effects and Lifecycle

**React (Before):**
```tsx
import { useEffect } from 'react';

useEffect(() => {
  console.log('Component mounted');
  
  return () => {
    console.log('Component unmounted');
  };
}, []);
```

**Svelte (After):**
```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    console.log('Component mounted');
  });
  
  onDestroy(() => {
    console.log('Component unmounted');
  });
</script>
```

## File Structure Changes

### Before (React)
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ...
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   └── AboutMe.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   └── LoadingContext.tsx
├── styles/
│   └── ... (CSS modules)
├── App.tsx
└── main.tsx
```

### After (SvelteKit)
```
src/
├── lib/
│   ├── components/
│   │   ├── Navbar.svelte
│   │   ├── Footer.svelte
│   │   └── SocialLinks.svelte
│   ├── stores/
│   │   ├── theme.ts
│   │   └── loading.ts
│   └── data/
│       └── social-icons.ts
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── projects/
│   │   └── +page.svelte
│   └── aboutMe/
│       └── +page.svelte
├── app.html
└── app.css
```

## DaisyUI Components

DaisyUI provides pre-built components that replace custom CSS:

### Buttons
```svelte
<!-- Basic buttons -->
<button class="btn">Button</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>

<!-- Sizes -->
<button class="btn btn-lg">Large</button>
<button class="btn btn-sm">Small</button>

<!-- Shapes -->
<button class="btn btn-circle">🌙</button>
<button class="btn btn-ghost">Ghost</button>
```

### Cards
```svelte
<div class="card bg-base-100 shadow-xl">
  <figure>
    <img src="/image.jpg" alt="Title" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card description</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

### Navbar
```svelte
<nav class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl">Brand</a>
  </div>
  <div class="navbar-center">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/">Home</a></li>
      <li><a href="/projects">Projects</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">🌙</button>
  </div>
</nav>
```

### Tabs
```svelte
<div class="tabs tabs-boxed">
  <button class="tab" class:tab-active={activeTab === 'tab1'}>Tab 1</button>
  <button class="tab" class:tab-active={activeTab === 'tab2'}>Tab 2</button>
</div>
```

## Theme Management

### Setting Theme
```typescript
// stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const theme = createThemeStore();

function createThemeStore() {
  const { subscribe, set } = writable<'light' | 'dark'>('dark');
  
  return {
    subscribe,
    setTheme: (newTheme: 'light' | 'dark') => {
      if (browser) {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      set(newTheme);
    },
    toggleTheme: () => {
      // Implementation in stores/theme.ts
    }
  };
}
```

### Using Theme
```svelte
<script>
  import { theme } from '$lib/stores/theme';
</script>

<button on:click={() => theme.toggleTheme()} class="btn btn-ghost btn-circle">
  {#if $theme === 'dark'}
    🌙
  {:else}
    ☀️
  {/if}
</button>
```

## Building and Deployment

### Development
```bash
bun dev
```

### Build
```bash
bun run build
```

### Preview Production Build
```bash
bun run preview
```

### Type Checking
```bash
bun run check
```

## Common Pitfalls

### 1. Browser API Access
Always check if you're in the browser:

```svelte
<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  // ❌ Wrong - runs on server too
  const data = localStorage.getItem('key');
  
  // ✅ Correct - only in browser
  let data = '';
  if (browser) {
    data = localStorage.getItem('key') || '';
  }
  
  // ✅ Also correct - onMount only runs in browser
  onMount(() => {
    data = localStorage.getItem('key') || '';
  });
</script>
```

### 2. Reactive Statements
Use `$:` for reactive declarations:

```svelte
<script>
  let count = 0;
  
  // ✅ Automatically updates when count changes
  $: doubled = count * 2;
  
  // ✅ Reactive block
  $: {
    console.log(`Count is ${count}`);
    if (count > 10) {
      console.log('Count is over 10!');
    }
  }
</script>
```

### 3. Event Handling
Svelte uses `on:` instead of `onClick`:

```svelte
<!-- ❌ Wrong (React style) -->
<button onClick={handleClick}>Click</button>

<!-- ✅ Correct (Svelte style) -->
<button on:click={handleClick}>Click</button>
```

### 4. Class Binding
Use `class:` directive for conditional classes:

```svelte
<script>
  let isActive = true;
</script>

<!-- ❌ Verbose -->
<div class={isActive ? 'active' : ''}>Content</div>

<!-- ✅ Better -->
<div class:active={isActive}>Content</div>

<!-- ✅ Shorthand (when variable name matches class name) -->
<div class:active>Content</div>
```

## Migration Checklist

- [x] Update `package.json` with SvelteKit dependencies
- [x] Create `svelte.config.js`
- [x] Update `vite.config.ts` for SvelteKit
- [x] Create `tailwind.config.js` with DaisyUI
- [x] Create `postcss.config.js`
- [x] Update `tsconfig.json` for SvelteKit
- [x] Create `src/app.html` template
- [x] Create `src/app.css` with Tailwind directives
- [x] Create `src/routes/+layout.svelte`
- [x] Convert pages to `+page.svelte` files
- [x] Convert React components to Svelte components
- [x] Convert React contexts to Svelte stores
- [x] Update navigation from React Router to SvelteKit routing
- [x] Replace CSS Modules with Tailwind/DaisyUI classes
- [x] Move assets to `static/` directory
- [x] Update build scripts
- [x] Test all functionality
- [x] Update README documentation

## Next Steps

1. **Install Bun**: Visit [bun.sh](https://bun.sh) to install if you haven't already
2. **Install dependencies**: Run `bun install`
3. **Start dev server**: Run `bun dev`
4. **Test all pages**: Visit each route and verify functionality
5. **Customize themes**: Edit `tailwind.config.js` for your color preferences
6. **Add content**: Update project data, skills, and experience
7. **Deploy**: Build and deploy to GitHub Pages

## Why Bun?

Bun is an incredibly fast all-in-one JavaScript runtime and toolkit that:
- ⚡ Installs packages 10-20x faster than npm/pnpm
- 🚀 Runs JavaScript/TypeScript code blazingly fast
- 📦 Built-in bundler, transpiler, and test runner
- 🔧 Drop-in replacement for Node.js
- 💾 Uses less memory

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Svelte REPL](https://svelte.dev/repl) - Online playground

## Support

If you encounter issues during migration:

1. Check the [SvelteKit FAQ](https://kit.svelte.dev/faq)
2. Review [Svelte documentation](https://svelte.dev/docs)
3. Search [DaisyUI discussions](https://github.com/saadeghi/daisyui/discussions)
4. Open an issue in the repository

---

**Happy coding with SvelteKit! 🚀**