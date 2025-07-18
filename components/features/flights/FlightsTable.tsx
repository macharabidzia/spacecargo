"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import { CommonDictionary } from "@/types/dictionary";
import React from "react";

interface TarrifsTableProps {
  data: TariffData[];
}

const FlightsTable: React.FC<TarrifsTableProps> = ({ data }) => {
  const { t, i18n, lang } = useClientTranslation();
  const dictionary = i18n.getDataByLanguage(lang)?.home;
  const tariffColumns = buildTariffColumns(dictionary as CommonDictionary);
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

export default FlightsTable;
