"use client";

import { DataTable } from "@/components/common/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import React from "react";

interface TarrifsTableProps {
  data: TariffData[];
}

const TarrifsTable: React.FC<TarrifsTableProps> = ({ data }) => {
  const { t, i18n, lang } = useClientTranslation();
  const dictionary = i18n.getDataByLanguage(lang)?.home;
  const tariffColumns = buildTariffColumns(dictionary);
  return (
    <DataTable
      columns={tariffColumns}
      data={data}
      pageSize={10}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light"
      bodyClassName="bg-white"
    />
  );
};

export default TarrifsTable;
