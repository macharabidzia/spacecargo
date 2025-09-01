// slices/courierOrderSlice.ts
import { StateCreator } from 'zustand';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { GlobalDataState } from '../GlobalDataStore'; // Path to your GlobalDataStore
import { postApiData } from '@/lib/api';
import clientHttpClient from '@/lib/httpClientClient';
import { CourierFormValues } from '@/types/courier';

interface CourierApiSuccessResponse {
    message: string;
    data: any;
}

export interface CourierOrderSlice {
    isCreatingCourierOrder: boolean; 
    createCourierOrderError: string | null; // Renamed property
    createCourierOrder: (data: CourierFormValues) => Promise<boolean>; // Renamed method and corrected data type
}

// Renamed slice creator
export const createCourierOrderSlice: StateCreator<GlobalDataState, [], [], CourierOrderSlice> = (set, get, store) => ({
    isCreatingCourierOrder: false, // Renamed property
    createCourierOrderError: null, // Renamed property

    createCourierOrder: async (data: CourierFormValues) => {
        set({ isCreatingCourierOrder: true, createCourierOrderError: null });
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });
            const response = await postApiData<CourierApiSuccessResponse>(clientHttpClient, API_ENDPOINTS.POST_ORDER, formData);
            set({ isCreatingCourierOrder: false }); // Renamed property in set call
            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "An unknown error occurred.";
            set({ createCourierOrderError: errorMessage, isCreatingCourierOrder: false });
            return err;
        }
    },
});