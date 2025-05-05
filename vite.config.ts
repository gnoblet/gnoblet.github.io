// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ["**/*.md"], // Include Markdown files as assets
  resolve: {
    alias: {
      "@": "/src", // Optional: add path alias for cleaner imports
    },
  },
});
