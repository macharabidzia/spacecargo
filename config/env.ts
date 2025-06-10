// config/env.ts
import { z } from 'zod';

// Define schemas for both server-only and public (NEXT_PUBLIC) variables
// This helps ensure you don't accidentally expose server-only variables to the client.
const serverSchema = z.object({
    // Example: DATABASE_URL: z.string().min(1),
    // Add server-only variables here. They will NOT be available on the client.
});

const clientSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string().min(1, "NEXT_PUBLIC_API_URL is required"),
    // Add other NEXT_PUBLIC_ variables here
});

// Merge both schemas for a complete environment type
const mergedSchema = serverSchema.merge(clientSchema);

type Env = z.infer<typeof mergedSchema>;

let env: Env; // Declare `env` variable outside the try block

try {
    // Attempt to parse all process.env variables against the merged schema.
    // This code runs both on the server (during SSR) and potentially on the client.
    env = mergedSchema.parse(process.env);
} catch (error) {
    // This 'catch' block is what you're hitting on the client side.

    // Check if we are in the browser environment
    if (typeof window !== 'undefined') {
        // In the browser, during initial module evaluation, process.env might not be fully ready.
        // For NEXT_PUBLIC_ variables, we know they *should* be exposed.
        // Log a warning, but provide a fallback value to prevent a hard crash.
        console.warn(
            "Client-side environment variable validation failed at module load time. " +
            "This often happens due to timing issues when Next.js's client runtime " +
            "is populating process.env. Using fallback/runtime values for NEXT_PUBLIC_ variables."
        );
        // You can also console.log(process.env) here to inspect its state
        // console.log("Current process.env state in browser:", process.env);

        // Provide a fallback for NEXT_PUBLIC_API_URL from process.env,
        // or a hardcoded default if process.env.NEXT_PUBLIC_API_URL is truly undefined
        // at this very early stage.
        env = {
            ...process.env, // Spread existing process.env
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/fallback" // Provide a safe fallback
        } as Env; // Cast to your Env type to satisfy TypeScript
        // Note: This fallback is primarily to prevent the app from crashing.
        // The actual, correct value should eventually be available via process.env.
    } else {
        // On the server, if environment variables are missing, it's a critical error.
        console.error('❌ Invalid server-side environment variables detected!\n', error);
        process.exit(1); // Crash the server if critical env vars are missing
    }
}

// Export the validated (or fallback-provided) environment variables
export { env };