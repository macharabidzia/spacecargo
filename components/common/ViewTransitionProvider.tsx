"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ViewTransitionProvider() {
    const router = useRouter();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const link = target?.closest("a[href]") as HTMLAnchorElement | null;
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href?.startsWith("/")) return;

            const doc = document as Document & {
                startViewTransition?: (callback: () => void) => void;
            };

            if (doc.startViewTransition) {
                e.preventDefault();
                doc.startViewTransition(() => {
                    router.push(href);
                });
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [router]);

    return null;
}
