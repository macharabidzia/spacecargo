"use client";
import ColumnToggleDropdown from "@/components/common/DataTable/ColumnToggleDropdown";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useGenericTable } from "@/hooks/use-table";
import { GenericTableClientProps } from "@/types";
import CourierForm from "./CourierForm";
import { CourierMinimal } from "@/types/courier";
import { buildAddCourierTable } from "@/lib/table/add_courier.columns";
import { useState } from "react";

const AddCourierSection = ({
  data,
  pageSize,
  currentPage,
  tableId,
}: GenericTableClientProps<CourierMinimal>) => {
  const [, setRowSelection] = useState<Record<string, boolean>>({});

  const { table, isHydrated } = useGenericTable<CourierMinimal>({
    data,
    currentPage,
    pageSize,
    tableId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    columnBuilder: ({ }, t) => buildAddCourierTable(t),
  });

  const selectedParcelIds = isHydrated
    ? table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id.toString())
    : [];
  return (
    <div className="space-y-6">
      <div className="ml-auto flex justify-end px-4">
        <ColumnToggleDropdown table={table} />
      </div>
      <CourierForm parcelIds={selectedParcelIds} />
      <DataTable table={table} isHydrated={isHydrated} />
    </div>
  );
};

export default AddCourierSection;
