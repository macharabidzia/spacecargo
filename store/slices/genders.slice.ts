// slices/categorySlice.ts
import { StateCreator } from "zustand";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { GlobalDataState } from "../GlobalDataStore"; // Assuming this path is correct for your root store
import { fetchApiData } from "@/lib/api"; // Assuming this utility exists and is correctly typed
import clientHttpClient from "@/lib/httpClientClient"; // Your client-side HTTP client

// --- 1. Define a clear interface for a single Category/Gender item ---
// This prevents 'any' and makes data structure explicit.
export interface Gender {
  value: string; // Or number, depending on your API
  name: string;
  disabled: boolean; // e.g., "Male", "Female"
  // Add any other properties a gender object might have
}

// --- 2. Define the interface for the slice's state and actions ---
export interface GenderSlice {
  genders: Gender[] | null;
  isLoadingGenders: boolean; // Consistent casing
  gendersError: string | null;
  setGenders: (genders: Gender[] | null) => void; // Type the input array
  fetchGenders: () => Promise<void>;
}

// --- 3. Create the Zustand slice ---
export const createGendersSlice: StateCreator<
  GlobalDataState, // The root state of your global store
  [],
  [],
  GenderSlice // The specific slice being created
> = (set, get) => ({
  genders: [],
  isLoadingGenders: false,
  gendersError: null,

  setGenders: (genders) => set({ genders }), // Consistent typing

  fetchGenders: async () => {
    set({ isLoadingGenders: true, gendersError: null }); // Consistent casing
    try {
      // Use the correct type for the expected data (Gender[])
      const data = await fetchApiData<Gender[]>( // Ensure fetchApiData is generic enough
        clientHttpClient,
        API_ENDPOINTS.GET_GENDERS // Assuming this constant exists and is correct
      );
      set({ genders: data, isLoadingGenders: false });
    } catch (err: unknown) {
      // Catch 'unknown' for better type safety
      console.error("Failed to fetch genders:", err); // Removed "(client-side)" as it's redundant here

      // --- Improved Error Handling ---
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      set({ gendersError: errorMessage, isLoadingGenders: false });
    }
  },
});
