"use client";

import React from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import LoadingSpinner from "@/components/common/Loading";

interface TarrifsTableProps {
  data: TariffData[];
}

const TarrifsTable: React.FC<TarrifsTableProps> = ({ data }) => {
  const { t } = useClientTranslation();

  const [isHydrated, setIsHydrated] = React.useState(false);
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const tariffColumns = React.useMemo(() => buildTariffColumns(t), [t]);

  const table = useReactTable({
    data,
    columns: tariffColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!isHydrated) {
    return <LoadingSpinner />
  }

  return (
    <DataTable
      table={table}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light dark:bg-space-blue-dark text-white"
      cellClassName="border-b border-gray-200 dark:border-gray-700"
      bodyClassName="bg-white dark:bg-background"
      isHydrated={isHydrated}
    />
  );
};

export default TarrifsTable;
