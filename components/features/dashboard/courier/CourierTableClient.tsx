"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import Pagination from "@/components/common/Pagination";
import { useTableSearch } from "@/hooks/parcels/use-table-search";
import { buildCourierTable } from "@/lib/table/courier.columns";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useGenericTable } from "@/hooks/use-table";
import { CourierTableHeader } from "./CourierTableHeader";
import { Courier } from "@/types/courier";
interface Props {
  data: Courier[];
  recordsNumber: number;
  pageSize: number;
  currentPage: number;
  tableId: string;
  paramName: string;
}

export default function CourierTableClient({
  data,
  recordsNumber,
  pageSize,
  currentPage,
  tableId,
  paramName,
}: Props) {
  const { t } = useClientTranslation("common");
  const { table, isHydrated } = useGenericTable<Courier>({
    data: data,
    currentPage,
    pageSize,
    tableId,

    columnBuilder: ({ }, t) => buildCourierTable(t, { showSelectColumn: false }),
  });
  const { searchValue, setSearchValue } = useTableSearch({
    paramName: paramName,
  });
  const totalPages = Math.ceil(recordsNumber / pageSize);
  return (
    <div className="flex flex-col">
      <div className="justify-end flex w-full">
        <CourierTableHeader
          t={t}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isHydrated={isHydrated}
          table={table}
        />
      </div>
      <DataTable table={table} isHydrated={isHydrated} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}