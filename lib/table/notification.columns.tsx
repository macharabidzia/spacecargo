"use client";

import { ActionButton } from "@/components/common/ActionButton";
import { Button } from "@/components/ui/button";
import { ColumnDef, Column } from "@tanstack/react-table";
import { CalendarDays, Eye, EyeOff, Trash2 } from "lucide-react";

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

/** Centered Header with sorting and icon support */
const CenteredHeader = <TData, TValue>(
  titleKey: string,
  column: Column<TData, TValue>,
  t: (key: string) => string,
  Icon: React.ReactNode,
  className?: string
) => (
  <Button
    variant="ghost"
    disableAnimation
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className={`flex items-center justify-center gap-2 p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 ${className} px-4 cursor-pointer`}
  >
    {Icon}
    {t(titleKey)}
    {column.getIsSorted() === "asc" && <span className="ml-1 text-xs">▲</span>}
    {column.getIsSorted() === "desc" && <span className="ml-1 text-xs">▼</span>}
  </Button>
);

const CenteredCell = (content: React.ReactNode) => (
  <div className="flex items-center flex-1 w-full justify-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 border-r border-gray-200">
    {content}
  </div>
);

const truncateText = (text: string, maxLength: number): string =>
  !text ? "" : text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

export function buildNotificationColumns({
  t,
  onMarkRead,
  onDelete,
}: NotificationColumnOptions): ColumnDef<Notification>[] {
  const columns: ColumnDef<Notification>[] = [];

  // Title
  columns.push({
    accessorKey: "title",
    header: ({ column }) => CenteredHeader("tableHeader.title", column, t, null),
    cell: ({ row }) => CenteredCell(truncateText(row.original.title, 40)),
  });

  // Message
  columns.push({
    accessorKey: "text",
    header: ({ column }) => CenteredHeader("tableHeader.message", column, t, null),
    cell: ({ row }) =>
      CenteredCell(
        <span
          dangerouslySetInnerHTML={{
            __html: truncateText(row.original.text, 80),
          }}
        />
      ),
  });

  // Date
  columns.push({
    accessorKey: "date",
    header: ({ column }) =>
      CenteredHeader(
        "tableHeader.date",
        column,
        t,
        <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      ),
    cell: ({ row }) => CenteredCell(new Date(row.original.date).toLocaleString()),
  });

  // Status
  columns.push({
    accessorKey: "isRead",
    header: ({ column }) =>
      CenteredHeader(
        "tableHeader.status",
        column,
        t,
        <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      ),
    cell: ({ row }) =>
      CenteredCell(
        row.original.isRead ? (
          <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
        ) : (
          <EyeOff className="h-5 w-5 text-red-600 dark:text-red-400" />
        )
      ),
  });

  // Actions
  columns.push({
    id: "actions",
    header: ({ column }) => CenteredHeader("tableHeader.actions", column, t, null),
    enableSorting: false,
    cell: ({ row }) => {
      const notification = row.original;
      return (
        <div className="flex justify-center gap-3 px-4 py-3">
          {onMarkRead && (
            <ActionButton
              icon={notification.isRead ? EyeOff : Eye}
              label={!notification.isRead ? t("actions.markRead") : ""}
              item={notification}
              onClick={(n) => onMarkRead?.(n)}
              colorClass="text-blue-600 dark:text-blue-400"
            />
          )}
          {onDelete && (
            <ActionButton
              icon={Trash2}
              label={t("actions.delete")}
              item={notification}
              onClick={(n) => onDelete?.(n)}
              colorClass="text-red-600 dark:text-red-400"
            />
          )}
        </div>
      );
    },
  });

  return columns;
}
