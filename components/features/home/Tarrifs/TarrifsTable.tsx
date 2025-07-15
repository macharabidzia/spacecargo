"use client";
import { CommonDictionary } from "@/types/dictionary";

import { DataTable } from "@/components/common/DataTable/DataTable";
import { useClientTranslation } from "@/i18n/i18n-provider";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import React from "react";

interface TarrifsTableProps {
  data: TariffData[];
}

const TarrifsTable: React.FC<TarrifsTableProps> = ({ data }) => {
  const { t, i18n, lang } = useClientTranslation();
  const dictionary = i18n.getDataByLanguage(lang);

  if (!dictionary) {
    return null;
  }

  const tariffColumns = buildTariffColumns(
    dictionary.home as unknown as CommonDictionary
  );
  return (
    <DataTable
      columns={tariffColumns}
      data={data}
      pageSize={10}
      notFoundText={t("tariffs.noDataMessage")}
      headerClassName="bg-space-blue-light dark:bg-space-blue"
      cellClassName="dark:border-2"
      bodyClassName="bg-white dark:bg-background border-2"
    />
  );
};

export default TarrifsTable;
