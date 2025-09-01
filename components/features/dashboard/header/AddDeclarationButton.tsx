"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";

export function AddDeclarationButton() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {t} = useClientTranslation()
    const createEditDrawerLink = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("edit", "true");
        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    }, [searchParams, pathname]);

    return (
        <Link href={createEditDrawerLink()}>
            <Button className="bg-space-blue-light/15 text-space-blue-light hover:bg-space-blue-light/30 ">
                <Plus className="mr-2 h-4 w-4" />
                {t("declarations.addButton")}
            </Button>
        </Link>
    );
}