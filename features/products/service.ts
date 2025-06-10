// features/products/service.ts
import httpClient from '@/lib/httpClient';
import { Product, CreateProductDto, UpdateProductDto, PaginatedProductsResponse } from './types';

const PRODUCTS_ENDPOINT = '/products'; // Corresponds to app/api/products/route.ts

export const productService = {
    async getProducts(params?: { page?: number; limit?: number; category?: string }): Promise<PaginatedProductsResponse> {
        const response = await httpClient.get<PaginatedProductsResponse>(PRODUCTS_ENDPOINT, { params });
        return response.data;
    },

    async getProductById(id: string): Promise<Product> {
        const response = await httpClient.get<Product>(`${PRODUCTS_ENDPOINT}/${id}`);
        return response.data;
    },

    async createProduct(payload: CreateProductDto): Promise<Product> {
        const response = await httpClient.post<Product>(PRODUCTS_ENDPOINT, payload);
        return response.data;
    },

    async updateProduct(id: string, payload: UpdateProductDto): Promise<Product> {
        const response = await httpClient.put<Product>(`${PRODUCTS_ENDPOINT}/${id}`, payload);
        return response.data;
    },

    async deleteProduct(id: string): Promise<void> {
        await httpClient.delete(`${PRODUCTS_ENDPOINT}/${id}`);
    },

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
