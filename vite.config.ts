// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"], // Include Markdown files as assets
  resolve: {
    alias: {
      "@": "/src", // Optional: add path alias for cleaner imports
    },
  },
});
