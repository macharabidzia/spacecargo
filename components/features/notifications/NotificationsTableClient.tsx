"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import Pagination from "@/components/common/Pagination";
import { useGenericTable } from "@/hooks/use-table";
import { buildNotificationColumns, Notification } from "@/lib/table/notification.columns";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { useServerAction } from "@/hooks/useServerAction";
import { deleteMessage, readMessage, deleteAllMessages, readAllMessages } from "@/actions/user.actions";
import { ConfirmDialog } from "@/components/common/modals/ConfirmModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  data: Notification[];
  recordsNumber: number;
  pageSize: number;
  currentPage: number;
  tableId: string;
}

export default function NotificationsTableClient({
  data,
  recordsNumber,
  pageSize,
  currentPage,
  tableId,
}: Props) {
  const { t } = useClientTranslation("common");
  const router = useRouter();
  const { execute: executeReadMessage } = useServerAction(readMessage);
  const { execute: executeDeleteMessage } = useServerAction(deleteMessage);
  const { execute: executeReadAllMessages } = useServerAction(readAllMessages);
  const { execute: executeDeleteAllMessages } = useServerAction(deleteAllMessages);

  const [selectNotificationId, setSelectNotificationId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = useState(false);
  const [showConfirmReadAll, setShowConfirmReadAll] = useState(false);

  const handleMarkRead = (notification: Notification) => {
    executeReadMessage({ id: notification.id.toString() });
    router.refresh();
  };

  const handleDelete = (notification: Notification) => {
    setSelectNotificationId(notification.id.toString());
    setShowConfirm(true);
  };

  const handleDeleteAll = () => setShowConfirmDeleteAll(true);
  const handleMarkAllRead = () => setShowConfirmReadAll(true);

  const { table, isHydrated } = useGenericTable<Notification>({
    data,
    currentPage,
    pageSize,
    onEdit: undefined,
    onDelete: undefined,
    tableId,
    columnBuilder: () =>
      buildNotificationColumns({
        t,
        onMarkRead: handleMarkRead,
        onDelete: handleDelete,
      }),
  });

  const confirmDelete = async () => {
    if (selectNotificationId) {
      await executeDeleteMessage({ id: selectNotificationId });
      setSelectNotificationId(null);
      router.refresh();
    }
  };

  const confirmDeleteAll = async () => {
    await executeDeleteAllMessages();
    setShowConfirmDeleteAll(false);
    router.refresh();
  };

  const confirmReadAll = async () => {
    await executeReadAllMessages();
    setShowConfirmReadAll(false);
    router.refresh();
  };

  const totalPages = Math.ceil(recordsNumber / pageSize);

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
      <ConfirmDialog 
        open={showConfirmDeleteAll}
        setOpen={setShowConfirmDeleteAll}
        title={t("notifications.deleteAllConfirmTitle")}
        description={t("notifications.deleteAllConfirmDescription")}
        confirmLabel={t("notifications.deleteAllConfirmLabel")}
        cancelLabel={t("notifications.deleteCancelLabel")}
        onConfirm={confirmDeleteAll}
      />
      <ConfirmDialog
        open={showConfirmReadAll}
        setOpen={setShowConfirmReadAll}
        title={t("notifications.markAllReadConfirmTitle")}
        description={t("notifications.markAllReadConfirmDescription")}
        confirmLabel={t("notifications.markAllReadConfirmLabel")}
        cancelLabel={t("notifications.deleteCancelLabel")}
        onConfirm={confirmReadAll}
      />

      <div className="px-4 flex flex-row items-center justify-between bg-space-muted rounded-xl py-4">
        <div>
          <small className="text-muted-foreground">{t("tableHeader.notifications")}</small>
          <h1 className="font-semibold text-2xl mb-6">
            <span className="text-space-blue-muted">{recordsNumber}</span> {t("tableHeader.message")}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="default"
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-space-blue-light hover:bg-space-blue-light/90 text-white rounded-md"
          >
            {t("notifications.markAllReadButton")}
          </Button>
          <Button
            variant="default"
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-space-blue-muted text-white hover:bg-space-blue-muted/90 rounded-md "
          >
            {t("notifications.deleteAllButton")}
          </Button>
        </div>
      </div>

      <DataTable table={table} isHydrated={isHydrated} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
