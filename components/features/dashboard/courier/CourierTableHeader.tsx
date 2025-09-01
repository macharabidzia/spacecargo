// app/components/features/dashboard/parcels/CourierTableHeader.tsx
"use client"; // This component will also be a client component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Table } from "@tanstack/react-table";
import ColumnToggleDropdown from "@/components/common/DataTable/ColumnToggleDropdown";
import { Courier } from "@/types/courier";

interface CourierTableHeaderProps {
    t: (key: string) => string; // The translation function
    searchValue: string;
    setSearchValue: (value: string) => void;
    isHydrated: boolean;
    table: Table<Courier>; 
}

export const CourierTableHeader = ({
    t,
    searchValue,
    setSearchValue,
    isHydrated,
    table,
}: CourierTableHeaderProps) => {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push(window.location.pathname + '/add');
            });
        } else {
            router.push(window.location.pathname + '/add');
        }
    };

    return (
        <div className="flex flex-row justify-between py-4 px-2">

            <div className="flex items-center flex-wrap gap-4">
                <Button onClick={handleClick} className="bg-space-blue-light text-white  hover:bg-space-blue-light/90" variant="outline" type="button">
                    <Plus className="mr-2 h-4 w-4" />
                           {t('form.add')}
                </Button>
                <div className="relative flex items-center">
                    <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder={t("ძებნა კოდით")}
                        className="w-64 pl-9"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                {isHydrated && <div className="mx-auto md:mx-0"><ColumnToggleDropdown table={table} /></div>}
            </div>
        </div >
    );
};