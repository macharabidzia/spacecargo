// features/products/hooks/useGetProducts.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { productService } from "../service";
import { PaginatedProductsResponse, Product } from "../types";
import { AxiosError } from "axios";

export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (filters: Record<string, any> = {}) =>
    [...productQueryKeys.lists(), filters] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
};
interface UseGetProductsOptions {
  page?: number;
  limit?: number;
  category?: string;
  enabled?: boolean;
}
export const useGetProducts = (
  options: UseGetProductsOptions = {}
): UseQueryResult<PaginatedProductsResponse, AxiosError<any>> => {
  const { page = 1, limit = 10, category, enabled = true } = options;
  const queryParams = { page, limit, ...(category && { category }) };

  return useQuery<PaginatedProductsResponse, AxiosError<any>>({
    queryKey: productQueryKeys.list(queryParams),
    queryFn: () => productService.getProducts(queryParams),
    enabled,
  });
};
