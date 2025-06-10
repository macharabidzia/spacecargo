// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast'; // Or your preferred notification library

// Function to handle default query errors
function defaultQueryErrorHandler(error: unknown) {
    const title =
        error instanceof Error ? error.message : 'An unknown error occurred';
    // console.error('Query Error:', title, error);
    // toast.error(title, { duration: 5000 });
}

// This is a common pattern for Next.js App Router to ensure a single instance
// on the client-side and a new instance per request on the server-side.
let browserQueryClient: QueryClient | undefined = undefined;

// Function to create and configure a new QueryClient instance
export const makeQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                gcTime: 1000 * 60 * 60 * 24, // 24 hours
                refetchOnWindowFocus: process.env.NODE_ENV === 'production', // Only in prod
                retry: (failureCount, error: any) => {
                    // Do not retry on 404s or auth errors
                    if (error.response?.status === 404 || error.response?.status === 401 || error.response?.status === 403) {
                        return false;
                    }
                    return failureCount < 2; // Retry twice for other errors
                },
                throwOnError: (error: any) => {
                    // Globally handle specific errors or re-throw
                    if (error.response?.status === 401 || error.response?.status === 403) {
                        // Potentially trigger auth refresh or redirect
                        return false; // Don't throw to component, handle globally
                    }
                    defaultQueryErrorHandler(error); // Use default handler
                    return true; // Re-throw to be caught by useQuery's error property
                },
            },
            mutations: {
                onError: defaultQueryErrorHandler,
                // You could add a global onSuccess handler too if needed
            },
        },
    });
}

export const getQueryClient = () => {
    if (typeof window === 'undefined') {
        // Server: always create a new QueryClient
        return makeQueryClient();
    } else {
        // Browser: use a singleton pattern to ensure only one QueryClient
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}
