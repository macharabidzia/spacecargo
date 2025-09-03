"use client";

import { useReactTable, getCoreRowModel, getSortedRowModel, SortingState } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildFlightColumns, { FlightData } from "@/lib/table/flights.columns";
import { useState } from "react";

interface FlightsTableProps {
  data: FlightData[];
}

const FlightsTable: React.FC<FlightsTableProps> = ({ data }) => {
  const { t } = useClientTranslation();
  const columns = buildFlightColumns(t);

  // Explicitly type sorting state
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<FlightData>({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting, // local sorting state
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTable
      table={table}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light dark:bg-space-blue-light/50"
      bodyClassName="bg-white dark:bg-gray-800 dark:text-white"
      isHydrated={true}
    />
  );
};

export default FlightsTable;
