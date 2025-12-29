import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    {
      name: "copy-quarto-html",
      closeBundle() {
        // Copy the quarto-html directory to build
        const rootDir = process.cwd();
        const quartoSrcDir = path.resolve(rootDir, "static/quarto-html");
        const quartoDestDir = path.resolve(rootDir, "build/quarto-html");

        try {
          if (fs.existsSync(quartoSrcDir)) {
            if (!fs.existsSync(quartoDestDir)) {
              fs.mkdirSync(quartoDestDir, { recursive: true });
            }

            const files = fs.readdirSync(quartoSrcDir);
            files.forEach((file: string) => {
              fs.copyFileSync(
                path.resolve(quartoSrcDir, file),
                path.resolve(quartoDestDir, file),
              );
            });

            console.log("Quarto HTML files copied successfully");
          }
        } catch (error) {
          console.error("Error copying Quarto files:", error);
        }
      },
    },
  ],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
