"use client";
import { deleteAuthorizedPerson } from "@/actions/user.actions";
import ColumnToggleDropdown from "@/components/common/DataTable/ColumnToggleDropdown";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { ConfirmDialog } from "@/components/common/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useGenericTable } from "@/hooks/use-table";
import { useServerAction } from "@/hooks/useServerAction";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { buildAuthorizedPersonTable } from "@/lib/table/authorizedPerson.columns";
import { GenericTableClientProps } from "@/types";
import { AuthorizedPerson } from "@/types/user";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SettingsTableClient = ({
  data,
  pageSize,
  currentPage,
  tableId,
}: GenericTableClientProps<AuthorizedPerson>) => {
  const { t } = useClientTranslation("common");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const { execute: execDeleteAuthorizedPerson } = useServerAction(deleteAuthorizedPerson);
  const router = useRouter()
  const handleDelete = (person: AuthorizedPerson) => {
    setSelectedPersonId(person.id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedPersonId) {
      await execDeleteAuthorizedPerson({ authorizedPersonId: selectedPersonId })
      router.refresh()
      setSelectedPersonId(null);
    }
  };

  const { table, isHydrated } = useGenericTable<AuthorizedPerson>({
    data,
    currentPage,
    pageSize,
    tableId,
    onDelete: handleDelete,
    
    columnBuilder: ({ }, t) =>
      buildAuthorizedPersonTable(t, (id) => handleDelete({ id } as AuthorizedPerson)),
  });

  return (
    <>
      <ConfirmDialog
        open={showConfirm}
        setOpen={setShowConfirm}
        title={t("notifications.deleteConfirmTitle")}
        description={t("notifications.deleteConfirmDescription")}
        confirmLabel={t("notifications.deleteConfirmLabel")}
        cancelLabel={t("notifications.deleteCancelLabel")}
        onConfirm={confirmDelete}
      />

      {isHydrated && (
        <div className="pb-6 flex ml-0">
          <Link href="?create=true">
            <Button className="px-14  bg-space-blue-muted shadow-md dark:text-white/95">
              {t("form.add")} <Plus />
            </Button>
          </Link>
          <ColumnToggleDropdown table={table} />
        </div>
      )}

      <DataTable table={table} isHydrated={isHydrated} />
    </>
  );
};

export default SettingsTableClient;
