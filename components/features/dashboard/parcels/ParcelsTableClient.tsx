"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import Pagination from "@/components/common/Pagination";
import ColumnToggleDropdown from "@/components/common/DataTable/ColumnToggleDropdown";
import { deleteParcels } from "@/actions/parcel.actions";
import { useServerAction } from "@/hooks/useServerAction";
import { useGenericTable } from "@/hooks/use-table";
import { useTableSearch } from "@/hooks/parcels/use-table-search";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { buildParcelColumns } from "@/lib/table/parcels.columns";
import { Parcel } from "@/types/parcel";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/modals/ConfirmModal";
import { useRouter } from "next/navigation";
import IconInput from "@/components/common/IconInput";

interface Props {
  parcels: Parcel[];
  recordsNumber: number;
  pageSize: number;
  currentPage: number;
  tableId: string;
  canEdit?: boolean,
  canDelete?: boolean
  showInvoice?: boolean
  enableRowSelection?: boolean
}

export default function ParcelsTableClient({
  parcels,
  recordsNumber,
  pageSize,
  currentPage,
  tableId,
  canEdit = false,
  canDelete = false,
  showInvoice = false,
  enableRowSelection = false,
}: Props) {
  const { t } = useClientTranslation("common");
  const { execute: execDeleteParcels } = useServerAction(deleteParcels);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const router = useRouter();
  const handleEdit = (parcel: Parcel) => {
    router.push(`?editParcel=true&id=${parcel.id}`);
  };

  const handleDelete = (parcel: Parcel) => {
    setSelectedParcelId(parcel.id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedParcelId) {
      execDeleteParcels({ parcelIds: [selectedParcelId] });
      setSelectedParcelId(null);
    }
  };
  const [, setRowSelection] = useState<Record<string, boolean>>({});
  const { table, isHydrated } = useGenericTable<Parcel>({
    data: parcels,
    currentPage,
    pageSize,
    tableId,
    onRowSelectionChange: setRowSelection,
    columnBuilder: () =>
      buildParcelColumns(
        {
          onEdit: canEdit ? handleEdit : undefined,
          onDelete: canDelete ? handleDelete : undefined,
        },
        t,
        { showInvoice, showSelectColumn: enableRowSelection }
      ),
  });

  const { searchValue, setSearchValue } = useTableSearch({
    paramName: "tds_code",
    debounceTime: 500,
  });

  const totalPages = Math.ceil(recordsNumber / pageSize);

  return (
    <>
      <ConfirmDialog
        open={showConfirm}
        setOpen={setShowConfirm}
        title="Delete this item?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
      />

      <div className="py-4 flex flex-row items-center justify-between px-6 my-4">
        <div className="flex flex-row items-center gap-2">
          <h1 className="dark:text-gray-300 text-gray-600 ">{t("tabsData.receivable")}:</h1>
          <p className="font-semibold">
            <span className="text-space-blue-light">{recordsNumber}</span> {t("parcel", { count: recordsNumber })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <IconInput
              className="py-0 dark:border-gray-600 
           dark:bg-gray-900 
  dark:text-gray-100 
dark:placeholder-gray-500 
focus:dark:ring-2 
focus:dark:ring-blue-500 
focus:dark:border-blue-500"
              Icon={SearchIcon}
              value={searchValue}
              onInput={(e) => setSearchValue(e.currentTarget.value)}
            />
          </div>
          {isHydrated && <ColumnToggleDropdown table={table} />}
        </div>
      </div>

      <DataTable table={table} isHydrated={isHydrated} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
