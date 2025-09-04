"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef, Column } from "@tanstack/react-table";
import { Tag, MapPin, Package, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { Courier } from "@/types/courier";
import { ActionButton } from "@/components/common/ActionButton";

/** Centered Header like Parcel table */
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
    {t('tableHeader.' + titleKey)}
    {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
    {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
  </Button>
);

/** Centered Cell */
const CenteredCell = (content: React.ReactNode, className?: string) => (
  <div className={`flex items-center flex-1 w-full justify-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 border-r border-gray-200 ${className}`}>
    {content}
  </div>
);

/** Actions column factory for Courier */
function makeActionsColumn<T extends { id?: string; canEdit?: boolean; canDelete?: boolean; invoiceUrl?: string }>(
  handlers: {
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onInvoiceClick?: (id: string | null) => void;
  },
  t: (key: string) => string
): ColumnDef<T> {
  return {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("tableHeader.actions")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const original = row.original;
      const showEdit = handlers.onEdit && original.canEdit !== false;
      const showDelete = handlers.onDelete && original.canDelete !== false;
      const showInvoice = handlers.onInvoiceClick;

      return (
        <div className="flex items-center justify-center gap-2">
          {showEdit && (
            <ActionButton
              icon={Tag}
              label="Edit courier"
              item={original}
              onClick={() => handlers.onEdit?.(original)}
            />
          )}

          {showDelete && (
            <ActionButton
              icon={FileText}
              label="Delete courier"
              item={original}
              onClick={() => handlers.onDelete?.(original)}
              colorClass="text-red-600 dark:text-red-400"
            />
          )}

          {showInvoice && (
            <ActionButton
              icon={FileText}
              label="See Invoice"
              item={original}
              onClick={() => handlers.onInvoiceClick?.(original.id!)}
            />
          )}
        </div>
      );
    },
  };
}

export function buildCourierTable(
  t: (key: string) => string,
  handlers: {
    onEdit?: (courier: Courier) => void;
    onDelete?: (courier: Courier) => void;
    onInvoiceClick?: (id: string | null) => void;
  } = {},
): ColumnDef<Courier>[] {
  const columns: ColumnDef<Courier>[] = [];


  columns.push(
    {
      accessorKey: "tdsCode",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => CenteredCell(row.original.tdsCode || t("tableCell.na")),
    },
    {
      accessorKey: "cityDesc",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => CenteredCell(row.original.cityDesc || t("tableCell.na")),
    },
    {
      accessorKey: "districtDesc",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => CenteredCell(row.original.districtDesc || t("tableCell.na")),
    },
    {
      accessorKey: "package",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(row.original.package || t("tableCell.na")),
    },
    {
      accessorKey: "address",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => CenteredCell(row.original.address || t("tableCell.na")),
    }
  );

  // Actions column with invoice button
  columns.push(makeActionsColumn<Courier>(handlers, t));

  return columns;
}
