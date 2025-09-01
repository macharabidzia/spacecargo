"use client";
import ColumnToggleDropdown from "@/components/common/DataTable/ColumnToggleDropdown";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useGenericTable } from "@/hooks/use-table";
import { buildCourierTable } from "@/lib/table/courier.columns";
import { GenericTableClientProps } from "@/types";
import CourierForm from "./CourierForm";
import { Courier } from "@/types/courier";

const AddCourierSection = ({
  data,
  pageSize,
  currentPage,
  tableId,
}: GenericTableClientProps<Courier>) => {
  const { table, isHydrated } = useGenericTable<Courier>({
    data,
    currentPage,
    pageSize,
    tableId,
    columnBuilder: ({}, t) => buildCourierTable(t),
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
