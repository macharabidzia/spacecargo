// slices/categorySlice.ts
import { StateCreator } from "zustand";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { GlobalDataState } from "../GlobalDataStore";
import { fetchApiData } from "@/lib/api";
import clientHttpClient from "@/lib/httpClientClient";
import { Category } from "@/types";

// Define the interface for the category-specific state and actions
export interface CategorySlice {
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: string | null;
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
}

export const createCategorySlice: StateCreator<
  GlobalDataState,
  [],
  [],
  CategorySlice
> = (set, get, store) => ({
  categories: [],
  isLoadingCategories: false,
  categoriesError: null,

  setCategories: (categories) => set({ categories }),

  fetchCategories: async () => {
    set({ isLoadingCategories: true, categoriesError: null });
    try {
      const data = await fetchApiData<Category[]>(
        clientHttpClient,
        API_ENDPOINTS.GET_CATEGORIES
      );
      set({ categories: data, isLoadingCategories: false });
    } catch (err: any) {
      console.error("Failed to fetch categories (client-side):", err);
      set({ categoriesError: err.message, isLoadingCategories: false });
    }
  },
});
