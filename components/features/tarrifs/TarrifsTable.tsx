"use client";

import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTable } from "@/components/common/DataTable/DataTable";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface TarrifsTableProps {
  data: TariffData[];
}

const TarrifsTable: React.FC<TarrifsTableProps> = ({ data }) => {
  const { t } = useClientTranslation();

  const columns = buildTariffColumns(t);

  const table = useReactTable<TariffData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable<TariffData>
      table={table}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light"
      bodyClassName="bg-white"
      isHydrated={true}
    />
  );
};

export default TarrifsTable;