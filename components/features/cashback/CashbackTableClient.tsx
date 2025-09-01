"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import Pagination from "@/components/common/Pagination";
import { useGenericTable } from "@/hooks/use-table";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { buildBonusTable } from "@/lib/table/cashback.columns";
import { Bonus } from "@/types/bonus";

interface Props {
    data: Bonus[]; 
    recordsNumber: number;
    pageSize: number;
    currentPage: number;
    tableId: string;
    paramName: string;
}

export default function CashbackTableClient({
    data,
    recordsNumber,
    pageSize,
    currentPage,
    tableId,
}: Props) {
    const { t } = useClientTranslation("common");
    const { table, isHydrated } = useGenericTable<Bonus>({
        data,
        currentPage,
        pageSize,
        onEdit: undefined,
        onDelete: undefined,
        tableId,
        columnBuilder: () => buildBonusTable(t),
    });
    const totalPages = Math.ceil(recordsNumber / pageSize);
    return (
        <>
            <div className="px-4 flex flex-row items-center justify-between bg-space-muted rounded-xl py-4">
                <div>
                    <small className="text-muted-foreground">{t("userDropdown.bonuses")}</small>
                    <h1 className="font-semibold text-2xl mb-6">
                        <span className="text-space-blue-light">{recordsNumber}</span> {t("userDropdown.bonuses")}
                    </h1>
                </div>
            </div>
            <DataTable table={table} isHydrated={isHydrated} />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
    );
}
