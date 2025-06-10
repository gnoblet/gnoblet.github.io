// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // Use relative paths for GitHub Pages compatibility
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.md", "**/*.qmd"], // Include Markdown and Quarto files as assets
  resolve: {
    alias: {
      "@": "/src", // Optional: add path alias for cleaner imports
    },
  },
});
