// slices/loaderSlice.ts
import { StateCreator } from "zustand";
import { GlobalDataState } from "../GlobalDataStore"; // Adjust the path to your root store

export interface LoaderSlice {
    loadingCount: number;   // number of ongoing requests
    isLoading: boolean;     // true if any request is pending
    startLoading: () => void;
    stopLoading: () => void;
    resetLoading: () => void;
}

export const createLoaderSlice: StateCreator<
    GlobalDataState, // root store
    [],
    [],
    LoaderSlice
> = (set, get) => ({
    loadingCount: 0,
    isLoading: false,

    startLoading: () => {
        const newCount = get().loadingCount + 1;
        set({ loadingCount: newCount, isLoading: newCount > 0 });
    },

    stopLoading: () => {
        const newCount = Math.max(0, get().loadingCount - 1);
        set({ loadingCount: newCount, isLoading: newCount > 0 });
    },

    resetLoading: () => set({ loadingCount: 0, isLoading: false }),
});
