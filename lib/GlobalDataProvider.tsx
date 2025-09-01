// lib/GlobalDataProvider.tsx
'use client';

import { useGlobalDataStore } from '@/store/GlobalDataStore';
import { useEffect, useRef, ReactNode } from 'react';

// Make sure your Category interface is correctly defined and imported,
// ideally from a central types file or its respective slice.
interface Category {
    id: number; // Assuming id can be number or string
    value: string;
    // Add other properties if your Category object has them
}

interface GlobalDataProviderProps {
    token?: string | null; // Accept the token prop from the server
    children: ReactNode;
    categories: Category[]; // Add categories prop here
}

export default function GlobalDataProvider({
    token,
    children,
    categories, // Destructure categories from props
}: GlobalDataProviderProps) {
    const initialized = useRef(false);
    
    // Get all the setter functions from your global store
    const setCategories = useGlobalDataStore((state) => state.setCategories);
    const setToken = useGlobalDataStore((state) => state.setToken);
    useEffect(() => {
        // Only hydrate once when the component mounts
        if (!initialized.current) {
            if (token) {
                setToken(token); // Hydrate the token
            }
            if (categories && categories.length > 0) { // Add condition to check if categories exist and are not empty
                setCategories(categories); // Hydrate categories
            }
            initialized.current = true;
        }
    }, [token, categories, setCategories, setToken]); // Add categories and setCategories to dependencies

    return <>{children}</>;
}