// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // Use root-relative paths for GitHub Pages compatibility
  plugins: [
    react(),
    svgr(),
    {
      name: "copy-quarto-html",
      buildEnd() {
        // Copy the quarto-html directory to dist
        const rootDir = process.cwd();
        const quartoSrcDir = path.resolve(rootDir, "public/quarto-html");
        const quartoDestDir = path.resolve(rootDir, "dist/quarto-html");
        
        try {
          if (fs.existsSync(quartoSrcDir)) {
            if (!fs.existsSync(quartoDestDir)) {
              fs.mkdirSync(quartoDestDir, { recursive: true });
            }
            
            const files = fs.readdirSync(quartoSrcDir);
            files.forEach((file: string) => {
              fs.copyFileSync(
                path.resolve(quartoSrcDir, file), 
                path.resolve(quartoDestDir, file)
              );
            });
            
            console.log("Quarto HTML files copied successfully");
          }
        } catch (error) {
          console.error("Error copying Quarto files:", error);
        }
      }
    }
  ],
  assetsInclude: ["**/*.md", "**/*.qmd"], // Include Markdown and Quarto files as assets
  resolve: {
    alias: {
      "@": "/src", // Optional: add path alias for cleaner imports
    },
  },
});
