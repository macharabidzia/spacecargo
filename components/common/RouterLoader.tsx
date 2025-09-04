"use client"
import { useGlobalDataStore } from "@/store/GlobalDataStore";

export default function RouteLoader() {
    const isLoading = useGlobalDataStore((state) => state.isLoading);
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
            <div className="loader border-t-4 border-space-blue-muted w-12 h-12 rounded-full animate-spin"></div>
        </div>
    );
}
