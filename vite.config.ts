// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/", // Base URL for GitHub Pages
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.md", "**/*.qmd"], // Include Markdown and Quarto files as assets
  resolve: {
    alias: {
      "@": "/src", // Optional: add path alias for cleaner imports
    },
  },
});
