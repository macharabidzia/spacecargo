"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarDays, Eye, EyeOff, Trash2 } from "lucide-react";

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};

export interface Notification {
  id: number;
  title: string;
  text: string;
  date: string;
  isRead: boolean;
}

interface NotificationColumnOptions {
  t: (key: string) => string;
  onMarkRead?: (notification: Notification) => void;
  onDelete?: (notification: Notification) => void;
}

export function buildNotificationColumns({
  t,
  onMarkRead,
  onDelete,
}: NotificationColumnOptions): ColumnDef<Notification>[] {
  return [
    {
      accessorKey: "title",
      header: () => (
        <div className="text-left font-semibold text-gray-700 dark:text-gray-300 px-4 py-2">
          {t("tableHeader.title")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-4 py-3">
          {truncateText(row.original.title, 40)}
        </div>
      ),
    },
    {
      accessorKey: "text",
      header: () => (
        <div className="text-left font-semibold text-gray-700 dark:text-gray-300 px-4 py-2">
          {t("tableHeader.message")}
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="text-sm text-gray-800 dark:text-gray-200 px-4 py-3 break-words"
          dangerouslySetInnerHTML={{
            __html: truncateText(row.original.text, 80),
          }}
        />
      ),
    },
    {
      accessorKey: "date",
      header: () => (
        <div className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300 px-4 py-2">
          <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.date")}
        </div>
      ),
      cell: ({ row }) => {
        const formattedDate = new Date(row.original.date).toLocaleString();
        return (
          <div className="text-sm text-gray-900 dark:text-gray-100 px-4 py-3">
            {formattedDate}
          </div>
        );
      },
    },
    {
      accessorKey: "isRead",
      header: () => (
        <div className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300 px-4 py-2 justify-center">
          <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.status")}
        </div>
      ),
      cell: ({ row }) => {
        const isRead = row.original.isRead;
        return (
          <div className="flex items-center justify-center text-sm px-4 py-3">
            {isRead ? (
              <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-center font-semibold text-gray-700 dark:text-gray-300 px-4 py-2">
          {t("tableHeader.actions")}
        </div>
      ),
      enableSorting: false,
      cell: ({ row }) => {
        const notification = row.original;

        return (
          <div className="flex justify-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 transition rounded-md"
              onClick={() => onMarkRead?.(notification)}
              title={
                notification.isRead
                  ? t("actions.markUnread")
                  : t("actions.markRead")
              }
            >
              {notification.isRead ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition rounded-md"
              onClick={() => onDelete?.(notification)}
              title={t("actions.delete")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
