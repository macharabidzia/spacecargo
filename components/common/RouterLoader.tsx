"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoader() {
    const [loading, setLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState(0);
    const pathname = usePathname();

    const startRequest = () => setPendingRequests((prev) => prev + 1);
    const finishRequest = () =>
        setPendingRequests((prev) => Math.max(prev - 1, 0));

    useEffect(() => {
        setLoading(true);

        const fakeFetch = async () => {
            startRequest();
            try {
                // Simulate request delay
                await new Promise((r) => setTimeout(r, 500));
            } finally {
                finishRequest();
            }
        };

        fakeFetch();

        return () => setPendingRequests(0);
    }, [pathname]);

    // Show loader if any requests pending
    useEffect(() => {
        setLoading(pendingRequests > 0);
    }, [pendingRequests]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
            <div className="loader border-t-4 border-space-blue-muted w-12 h-12 rounded-full animate-spin"></div>
        </div>
    );
}
