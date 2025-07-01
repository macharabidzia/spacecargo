// lib/get-base64.ts (or wherever you placed it)
import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises"; // <-- Crucial: Node.js file system
import path from "path"; // <-- Crucial: Node.js path module

/**
 * Generates a base64 placeholder for a local image file in the public directory.
 * This function should only be called in a Server Component or server-side context.
 *
 * @param imagePath The path to the image relative to the `public` directory (e.g., "images/home-heading.webp").
 * @returns A base64 data URL string or a transparent GIF fallback if an error occurs.
 */
export default async function getBase64(imagePath: string) {
  try {
    // Construct the absolute path to the image within the project's 'public' directory
    // process.cwd() gives the current working directory (project root)
    const absoluteImagePath = path.join(process.cwd(), "public", imagePath);

    // Read the image file directly into a Buffer
    const buffer = await fs.readFile(absoluteImagePath);

    // Use plaiceholder to generate the base64 string from the buffer
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (e) {
    console.error(`Error generating base64 for ${imagePath}:`, e);
    // Return a transparent 1x1 GIF as a fallback for production to prevent rendering errors
    return "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
  }
}
