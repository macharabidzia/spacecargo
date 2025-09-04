"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import Pagination from "@/components/common/Pagination";
import { useTableSearch } from "@/hooks/parcels/use-table-search";
import { useGenericTable } from "@/hooks/use-table";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { buildCourierTable } from "@/lib/table/courier.columns";
import { CourierTableHeader } from "./CourierTableHeader";
import { Courier } from "@/types/courier";
import InvoiceModal from "../parcels/InvoiceModal";

interface Props {
  data: Courier[];
  recordsNumber: number;
  pageSize: number;
  currentPage: number;
  tableId: string;
  paramName: string;
  canEdit?: boolean;
  canDelete?: boolean;
  showInvoice?: boolean;
}

export default function CourierTableClient({
  data,
  recordsNumber,
  pageSize,
  currentPage,
  tableId,
  paramName,
  canDelete = false,
}: Props) {
  const { t } = useClientTranslation("common");
  const [openInvoiceId, setOpenInvoiceId] = useState<string | number | null>(null);



  const handleDelete = (courier: Courier) => {
    console.log("Delete courier", courier.id);
  };

  const { table, isHydrated } = useGenericTable<Courier>({
    data,
    currentPage,
    pageSize,
    tableId,

    columnBuilder: () =>
      buildCourierTable(
        t,
        {
          onDelete: canDelete ? handleDelete : undefined,
          onInvoiceClick: setOpenInvoiceId
        },
      ),
  });

  const { searchValue, setSearchValue } = useTableSearch({ paramName });
  const totalPages = Math.ceil(recordsNumber / pageSize);

  return (
    <div className="flex flex-col">
      <div className="flex w-full mb-4 justify-end">
        <CourierTableHeader
          t={t}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isHydrated={isHydrated}
          table={table}
        />
      </div>
      <InvoiceModal id={openInvoiceId} setOpenInvoiceId={setOpenInvoiceId} />
      <DataTable table={table} isHydrated={isHydrated} />

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
