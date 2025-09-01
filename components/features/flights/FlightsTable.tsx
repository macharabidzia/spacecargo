"use client";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildFlightColumns, { FlightData } from "@/lib/table/flights.columns";

interface FlightsTableProps {
  data: FlightData[];
}

const FlightsTable: React.FC<FlightsTableProps> = ({ data }) => {
  const { t } = useClientTranslation();

  const columns = buildFlightColumns(t);

  const table = useReactTable<FlightData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable
      table={table}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light dark:bg-space-blue-light/50"
      bodyClassName="bg-white dark:bg-gray-900 dark:text-white"
      isHydrated={true}
    />
  );
};

export default FlightsTable;