// src/utils/imageUtils.ts

/**
 * Resolves an image path, handling both remote URLs and local paths
 * 
 * @param imagePath The image path or URL to resolve
 * @param fallbackImage The fallback image to use if imagePath is empty
 * @param localDir The local directory where images are stored
 * @returns The resolved image path or URL
 */
export function resolveImagePath(
  imagePath: string | undefined,
  fallbackImage: string,
  localDir: string = 'projects'
): string {
  // If the path is empty, return the fallback
  if (!imagePath) {
    return fallbackImage;
  }

  // If it's a full URL (http/https), use it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // If it's an absolute path, use it directly
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Otherwise, assume it's a local file in the specified directory
  return `/src/assets/${localDir}/${imagePath}`;
}