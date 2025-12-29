# Guillaume Noblet — Personal Website

A fast, static personal website built with SvelteKit, TypeScript, Tailwind CSS and DaisyUI.

Live: https://gnoblet.github.io

Tech

- SvelteKit + TypeScript
- Tailwind CSS + DaisyUI for theming and components.
- Built with Bun (recommended)
- Adapter: `@sveltejs/adapter-static` (static output)

Quick start (local)

```/dev/null/commands.sh#L1-6
git clone https://github.com/gnoblet/gnoblet.github.io.git
cd gnoblet.github.io
bun install
bun run dev --open # Open http://localhost:5173
```

Project layout (key files)

- `src/lib/components/` — reusable Svelte components (Navbar, Footer, SocialLinks)
- `src/lib/stores/` — Svelte stores (`theme.ts`, `loading.ts`)
- `src/lib/data/social-icons.ts` — social links / SVG data
- `src/routes/` — pages: `+layout.svelte`, `+page.svelte`, `projects/+page.svelte`
- `static/assets/` — images and media
- `tailwind.config.js` & `app.css` — styling and DaisyUI config

Add or update projects' content

- Projects: edit the projects array in `src/routes/projects/+page.svelte`

```/dev/null/example.ts#L1-12
let projects = [
  {
    id: '1',
    title: 'Project Name',
    description: 'Short description',
    tags: ['SvelteKit','TypeScript'],
    link: 'https://example.com',
    github: 'https://github.com/username/repo',
    image: '/assets/projects/img.jpg'
  }
];
```

Theming

- Uses DaisyUI themes.
- To add or customize themes, edit `tailwind.config.js`.

License & contact

- MIT — see `LICENSE`
- Email: freelance@guillaume-noblet.com
- GitHub: https://github.com/gnoblet
- LinkedIn: https://www.linkedin.com/in/gnoblet/
