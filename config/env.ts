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

const mergedSchema = serverSchema.merge(clientSchema);

type Env = z.infer<typeof mergedSchema>;

let env: Env; // Declare `env` variable outside the try block

try {
    env = mergedSchema.parse(process.env);
} catch (error) {
    if (typeof window !== 'undefined') {
        console.warn(
            "Client-side environment variable validation failed at module load time. " +
            "This often happens due to timing issues when Next.js's client runtime " +
            "is populating process.env. Using fallback/runtime values for NEXT_PUBLIC_ variables."
        );
        env = {
            ...process.env, // Spread existing process.env
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/fallback" // Provide a safe fallback
        } as Env; // Cast to your Env type to satisfy TypeScript
    } else {
        console.error('❌ Invalid server-side environment variables detected!\n', error);
        process.exit(1); // Crash the server if critical env vars are missing
    }
}

// Export the validated (or fallback-provided) environment variables
export { env };