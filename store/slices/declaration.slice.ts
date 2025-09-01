// slices/declarationSlice.ts
import { StateCreator } from 'zustand';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { GlobalDataState } from '../GlobalDataStore'; // Adjust path as needed
import { postApiData } from '@/lib/api'; // Assuming postApiData is in '@/lib/api'
import clientHttpClient from '@/lib/httpClientClient'; // Assuming this is your client-side Axios instance
import { DeclarationFormValues } from '@/schemas/declaration.schema'; // Import form values for creation

// Define the interface for the declaration creation-specific state and actions
export interface DeclarationCreateSlice {
    isCreatingDeclaration: boolean;
    createDeclarationError: string | null;
    createDeclaration: (data: DeclarationFormValues) => Promise<boolean>; // Action to create a new declaration
}

export const createDeclarationSlice: StateCreator<GlobalDataState, [], [], DeclarationCreateSlice> = (set, get, store) => ({
    isCreatingDeclaration: false,
    createDeclarationError: null,

    createDeclaration: async (data: DeclarationFormValues) => {
        set({ isCreatingDeclaration: true, createDeclarationError: null });
        try {
            // Convert DeclarationFormValues to FormData for file uploads
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'file' && value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        formData.append('file[]', value[i]); // <--- Changed 'key' to 'file[]'
                    }
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            // Make the API call to create the declaration
            // Assuming postApiData can handle FormData and returns the created Declaration object
            const response = await postApiData<DeclarationInputData>(clientHttpClient, API_ENDPOINTS.POST_DECLARATION, formData);

            // Log the response or handle it as needed, but do not update a 'declarations' array here
            console.log("Declaration created successfully via client slice:", response);

            set({ isCreatingDeclaration: false });
            return true; // Indicate success
        } catch (err: any) {
            console.error("Failed to create declaration (client-side slice):", err);
            set({ createDeclarationError: err.message, isCreatingDeclaration: false });
            return false; // Indicate failure
        }
    },
});