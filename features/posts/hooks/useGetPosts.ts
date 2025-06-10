// features/products/hooks/useGetPosts.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { postsService } from '../service';

// Define a type for your Post structure, if not already in types.ts
// Assuming a simple structure for now based on your getPosts return
interface Post {
    id: number;
    title: string;
}

// Define query keys for better management
export const postQueryKeys = {
    all: ['posts'] as const,
    list: () => [...postQueryKeys.all, 'list'] as const,
    // Add other specific keys if needed, e.g., detail: (id: string) => [...postQueryKeys.all, id]
};

export const useGetPosts = (): UseQueryResult<Post[], AxiosError<any>> => {


    return useQuery<Post[], AxiosError<any>>({
        queryKey: postQueryKeys.list(), // Use the defined query key
        queryFn: () => postsService.getPosts(), // Call the getPosts method from productService
        placeholderData: []
        // Optional: Add other React Query options here, e.g.:
        // staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
        // gcTime: 1000 * 60 * 60, // Cache data for 1 hour
        // refetchOnWindowFocus: false,
    });
};
