// features/products/service.ts
import httpClient from '@/lib/httpClient';

const PRODUCTS_ENDPOINT = '/posts'; // Corresponds to app/api/products/route.ts

export const postsService = {

    // getPosts and getComments are now methods of productService
    async getPosts() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [
            { id: 1, title: "Posts 1" },
            { id: 2, title: "Posts 2" }
        ];
    },

    async getComments() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [
            { id: 1, text: "Great post 1" },
            { id: 2, text: "Thanks for sharing" }
        ];
    },
};
