"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timeout);
    }, [pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
            <div className="loader border-t-4 border-space-blue-muted w-12 h-12 rounded-full animate-spin"></div>
        </div>
    );
}
