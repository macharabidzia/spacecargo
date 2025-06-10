export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}


export interface CreateProductDto {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    imageUrl?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> { }

// For API responses that might include pagination
export interface PaginatedProductsResponse {
    items: Product[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}