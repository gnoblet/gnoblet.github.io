#!/usr/bin/env node

/**
 * Script to render Quarto files directly to HTML format
 * This script uses the Quarto CLI to render .qmd files to .html format
 * Includes caching to only re-render files that have changed since the last build
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project paths
const rootDir = path.resolve(__dirname, "..");
const quartoDir = path.join(rootDir, "src", "content", "quarto");
const outputDir = path.join(rootDir, "public", "quarto-html");
const cacheFilePath = path.join(rootDir, ".quarto-cache.json");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory: ${outputDir}`);
}

// Function to check if Quarto is installed
function checkQuartoInstallation() {
  try {
    execSync("quarto --version", { stdio: "pipe" });
    return true;
  } catch (error) {
    console.warn("Quarto CLI is not installed or not in the PATH.");
    console.warn("Will create fallback HTML files without rendering.");
    console.warn(
      "To enable proper rendering, install Quarto from https://quarto.org/docs/get-started/",
    );
    // Return true to allow the process to continue with fallbacks
    return true;
  }
}

// Function to calculate a hash for a file
function calculateFileHash(filePath) {
  const fileContent = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileContent).digest("hex");
}

// Function to calculate a hash for a file
function calculateCombinedHash(filePath) {
  // Get hash of the main file
  return calculateFileHash(filePath);
}

// Function to load the cache
function loadCache() {
  if (fs.existsSync(cacheFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(cacheFilePath, "utf8"));
    } catch (error) {
      console.warn(`Error reading cache file: ${error.message}`);
      return {};
    }
  }
  return {};
}

// Function to save the cache
function saveCache(cache) {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
}

// Function to render a single Quarto file
function renderQuartoFile(filePath, cache) {
  const relativePath = path.relative(quartoDir, filePath);
  const slugName = path.basename(relativePath, ".qmd");
  const outputPath = path.join(outputDir, `${slugName}.html`);

  // Create necessary directories for the output file
  const outputFileDir = path.dirname(outputPath);
  if (!fs.existsSync(outputFileDir)) {
    fs.mkdirSync(outputFileDir, { recursive: true });
  }

  // Check if the file has changed since last build
  const currentHash = calculateCombinedHash(filePath);
  const cachedInfo = cache[relativePath];

  if (
    cachedInfo &&
    cachedInfo.hash === currentHash &&
    fs.existsSync(outputPath)
  ) {
    console.log(`Skipping ${relativePath} (unchanged since last build)`);
    return outputPath;
  }

  try {
    console.log(`Rendering ${relativePath} to HTML...`);

    // Execute Quarto to render the file directly to HTML
    // We use a standalone HTML approach for easier embedding
    // First navigate to the directory containing the file to avoid path issues
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const tempOutputName = "output.html";

    // No need to copy theme files anymore - each Quarto document can specify its own theme

    // Create a command with direct theme options rather than using a format file
    execSync(
      `cd "${fileDir}" && quarto render "${fileName}" --to html --embed-resources --standalone -o "${tempOutputName}"`,
      {
        stdio: "inherit",
      },
    );

    // No need to clean up theme files anymore

    // Now move the file to our desired output location
    const tempOutputPath = path.join(fileDir, tempOutputName);
    
    // Read the rendered HTML
    let htmlContent = fs.readFileSync(tempOutputPath, 'utf8');
    
    // Add the "Back to Blog list" button that follows system theme
    const backButtonStyle = `
    <style>
      .back-to-blog-button {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        padding: 8px 16px;
        background-color: var(--back-button-bg, #5B6FE9);
        color: var(--back-button-text, white);
        border: none;
        border-radius: 4px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        transition: all 0.2s ease;
      }
      
      .back-to-blog-button:hover {
        background-color: var(--back-button-hover-bg, #4A5ED8);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        text-decoration: none;
        color: var(--back-button-text, white);
      }
      
      .back-to-blog-button:before {
        content: "←";
        margin-right: 6px;
        font-size: 16px;
        line-height: 1;
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --back-button-bg: #5B6FE9;
          --back-button-hover-bg: #4A5ED8;
          --back-button-text: white;
        }
      }
      
      @media (prefers-color-scheme: light) {
        :root {
          --back-button-bg: #5B6FE9;
          --back-button-hover-bg: #4A5ED8;
          --back-button-text: white;
        }
      }
      
      @media (max-width: 768px) {
        .back-to-blog-button {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    </style>
    `;
    
    const backButtonHtml = `
    <a href="javascript:history.back()" class="back-to-blog-button">Back to Blog list</a>
    `;
    
    // Insert the button and its styles before the closing body tag
    htmlContent = htmlContent.replace('</body>', `${backButtonStyle}${backButtonHtml}</body>`);
    
    // Write the modified HTML to the output path
    fs.writeFileSync(outputPath, htmlContent);
    fs.unlinkSync(tempOutputPath); // Clean up the temp file

    // Update cache with new hash
    cache[relativePath] = {
      hash: currentHash,
      lastRendered: new Date().toISOString(),
    };

    console.log(`Successfully rendered to ${outputPath}`);
    return outputPath;
  } catch (renderError) {
    console.error(`Error executing Quarto: ${renderError.message}`);
    console.log(`Creating fallback HTML for ${relativePath}`);

    // Create a fallback HTML file if Quarto fails
    const rawContent = fs.readFileSync(filePath, "utf8");

    // Extract frontmatter for title
    const frontmatterMatch = /^---\s*([\s\S]*?)\s*---/.exec(rawContent);
    let title = "Quarto Document";
    let content = rawContent;

    if (frontmatterMatch) {
      const frontmatterBlock = frontmatterMatch[1];
      content = rawContent.replace(/^---\s*([\s\S]*?)\s*---/, "").trim();

      // Try to extract title
      const titleMatch = /title:\s*["']?([^"'\n]+)["']?/i.exec(
        frontmatterBlock,
      );
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
    }

    // No theme sync script needed
    // Add Back to Blog list button
    const backButtonStyle = `
    <style>
      .back-to-blog-button {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        padding: 8px 16px;
        background-color: var(--back-button-bg, #5B6FE9);
        color: var(--back-button-text, white);
        border: none;
        border-radius: 4px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        transition: all 0.2s ease;
      }
      
      .back-to-blog-button:hover {
        background-color: var(--back-button-hover-bg, #4A5ED8);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        text-decoration: none;
        color: var(--back-button-text, white);
      }
      
      .back-to-blog-button:before {
        content: "←";
        margin-right: 6px;
        font-size: 16px;
        line-height: 1;
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --back-button-bg: #5B6FE9;
          --back-button-hover-bg: #4A5ED8;
          --back-button-text: white;
        }
      }
      
      @media (prefers-color-scheme: light) {
        :root {
          --back-button-bg: #5B6FE9;
          --back-button-hover-bg: #4A5ED8;
          --back-button-text: white;
        }
      }
      
      @media (max-width: 768px) {
        .back-to-blog-button {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    </style>
    `;
    
    const backButtonHtml = `<a href="javascript:history.back()" class="back-to-blog-button">Back to Blog list</a>`;

    // Enhanced fallback HTML with back button
    const fallbackHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
  body { 
    font-family: system-ui, -apple-system, sans-serif; 
    max-width: 800px; 
    margin: 0 auto; 
    padding: 20px;
    background-color: #ffffff;
    color: #212529;
  }
  pre { 
    background-color: #f5f5f5; 
    padding: 10px; 
    overflow-x: auto; 
    border-radius: 4px;
  }
  .note { 
    background-color: #ffffcc; 
    padding: 15px; 
    border-left: 5px solid #ffcc00;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  h1 {
    color: #212529;
  }
  code {
    font-family: monospace;
  }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="note">
    <p><strong>Note:</strong> This is a fallback HTML rendering. For full Quarto features, please install Quarto CLI and its dependencies.</p>
  </div>
  <div class="content">
    <pre>${content}</pre>
  </div>
  <script>
    // No theme sync script needed
  </script>
  ${backButtonStyle}
  ${backButtonHtml}
</body>
</html>
`;

    fs.writeFileSync(outputPath, fallbackHtml);
    console.log(`Created fallback HTML at ${outputPath}`);

    return outputPath;
  }
}

// Function to render all Quarto files in a directory
function renderQuartoFiles() {
  if (!checkQuartoInstallation()) {
    process.exit(1);
  }

  console.log("Starting Quarto HTML rendering process...");

  // Load cache from previous build
  const cache = loadCache();

  // Find all .qmd files recursively
  const findQuartoFiles = (dir) => {
    let results = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        results = results.concat(findQuartoFiles(fullPath));
      } else if (item.name.endsWith(".qmd")) {
        results.push(fullPath);
      }
    }

    return results;
  };

  const quartoFiles = findQuartoFiles(quartoDir);

  if (quartoFiles.length === 0) {
    console.log("No Quarto files found.");
    return;
  }

  console.log(`Found ${quartoFiles.length} Quarto files.`);

  // Render each file
  const renderedFiles = quartoFiles
    .map((file) => renderQuartoFile(file, cache))
    .filter(Boolean);

  // Save updated cache
  saveCache(cache);

  if (renderedFiles.length > 0) {
    console.log(
      `Successfully rendered ${renderedFiles.length} of ${quartoFiles.length} Quarto files.`,
    );

    // Create an index file that links to all rendered quarto files
    const indexPath = path.join(outputDir, "index.html");
    const indexContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Quarto Documents Index</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { margin-bottom: 30px; }
    .quarto-list { list-style-type: none; padding: 0; }
    .quarto-list li { margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee; }
    .quarto-list a { text-decoration: none; color: #0066cc; font-weight: bold; font-size: 18px; }
    .quarto-list a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Quarto Documents</h1>
  <ul class="quarto-list">
    ${renderedFiles
      .map((file) => {
        const fileName = path.basename(file);
        const displayName = path.basename(file, ".html").replace(/-/g, " ");
        return `<li><a href="./${fileName}">${displayName}</a></li>`;
      })
      .join("\n    ")}
  </ul>
</body>
</html>
`;

    fs.writeFileSync(indexPath, indexContent);
    console.log(`Created index file at ${indexPath}`);
  } else {
    console.error("No files were successfully rendered.");
  }
}

// Run the script and handle errors gracefully
try {
  renderQuartoFiles();
} catch (error) {
  console.error("Error running Quarto rendering:", error);
  console.warn("Continuing build process without Quarto rendering.");
  // Exit with success code so build can continue
  process.exit(0);
}
