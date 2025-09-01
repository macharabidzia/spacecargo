// hooks/use-table-search.ts
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseTableSearchProps {
    paramName?: string; // e.g., "tds_code"
    debounceTime?: number; // e.g., 500
}

export const useTableSearch = ({
    paramName = "tds_code",
    debounceTime = 500,
}: UseTableSearchProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get(paramName) || "";
    const [searchValue, setSearchValue] = useState(initialSearch);

    useEffect(() => {
        const handler = setTimeout(() => {
            const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

            if (searchValue) {
                currentParams.set(paramName, searchValue);
            } else {
                currentParams.delete(paramName);
            }

            // Only reset page to 1 if the search value truly changed
            const currentParamValue = searchParams.get(paramName) || "";
            if (searchValue !== currentParamValue) {
                currentParams.set("page", "1");
            }

            const newQueryString = currentParams.toString();
            const newUrl = `${pathname}${newQueryString ? `?${newQueryString}` : ""}`;

            const currentUrlFromHooks = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
            if (currentUrlFromHooks !== newUrl) {
                router.push(newUrl);
            }
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue, router, pathname, searchParams, paramName, debounceTime]);

    return { searchValue, setSearchValue };
};