// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  assetsInclude: ["**/*.md"],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warnings
        if (warning.code === "EVAL" && warning.id?.includes("gray-matter")) {
          return;
        }
        warn(warning);
      },
    },
  },
});
