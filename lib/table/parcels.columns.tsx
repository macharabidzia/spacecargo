"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Column } from "@tanstack/react-table";
import {
  Box,
  Edit,
  Trash2,
  DollarSign,
  Package,
  Globe,
  Tag,
  FileText,
  Link as LinkIcon,
  MapPin,
  Scale,
  Truck,
  File,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Parcel } from "@/types/parcel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ActionButton } from "@/components/common/ActionButton";

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
    {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
    {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
  </Button>
);

const CenteredCell = (content: React.ReactNode) => (
  <div className="flex items-center flex-1 w-full justify-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 border-r border-gray-200">
    {content}
  </div>
);

/** Actions column factory */
function makeActionsColumn<T extends { id?: string; invoiceUrl?: string; canEdit?: boolean; canDelete?: boolean }>(
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
      const showInvoice = handlers.onInvoiceClick && original.invoiceUrl;

      return (
        <div className="flex items-center justify-center gap-2">
          {showEdit && (
            <ActionButton
              icon={Edit}
              label="Edit parcel"
              item={row.original}
              onClick={(parcel) => handlers.onEdit?.(parcel)}
            />
          )}

          {showDelete && (
            <ActionButton
              icon={Trash2}
              label="Delete parcel"
              item={row.original}
              onClick={(parcel) => handlers.onDelete?.(parcel)}
              colorClass="text-red-600 dark:text-red-400"
            />
          )}

          {showInvoice && (
            <ActionButton
              icon={Trash2}
              label="Delete parcel"
              item={row.original}
              onClick={() => handlers.onInvoiceClick?.(original.id!)}
              colorClass="text-red-600 dark:text-red-400"
            />
          )}
        </div>
      );
    },
  };
}

export function buildParcelColumns(
  handlers: {
    onEdit?: (parcel: Parcel) => void;
    onDelete?: (parcel: Parcel) => void;
    onInvoiceClick?: (id: string | null) => void;
  } = {},
  t: (key: string) => string,
  options: { showInvoice?: boolean; showSelectColumn?: boolean } = { showSelectColumn: false }
): ColumnDef<Parcel>[] {
  const columns: ColumnDef<Parcel>[] = [];
  if (options.showSelectColumn) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Main data columns
  columns.push(
    {
      accessorKey: "tdsCode",
      header: ({ column }) =>
        CenteredHeader("tableHeader.tdsCode", column, t, <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => CenteredCell(row.original.tdsCode ?? <Tag className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />),
    },
    {
      accessorKey: "category",
      header: ({ column }) =>
        CenteredHeader("tableHeader.category", column, t, <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <Package className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.category?.replace?.("parcel.category.", "") ?? ""}
          </>
        ),
    },
    {
      accessorKey: "declaredAmount",
      header: ({ column }) =>
        CenteredHeader("tableHeader.declaredAmount", column, t, <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <DollarSign className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.declaredAmount}
          </>
        ),
    },
    {
      accessorKey: "itemsCount",
      header: ({ column }) =>
        CenteredHeader("tableHeader.itemsCount", column, t, <Box className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <Box className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.itemsCount}
          </>
        ),
    },
    {
      accessorKey: "websiteUrl",
      header: ({ column }) =>
        CenteredHeader("tableHeader.websiteUrl", column, t, <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) => {
        const url = row.original.websiteUrl;
        return CenteredCell(
          url ? (
            <a
              href={url.startsWith("http") ? url : `https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {url}
            </a>
          ) : (
            t("tableCell.na")
          )
        );
      },
    },
    {
      accessorKey: "statusDesc",
      header: ({ column }) =>
        CenteredHeader("tableHeader.statusDesc", column, t, <Truck className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <Truck className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.statusDesc}
          </>
        ),
    },
    {
      accessorKey: "weight",
      header: ({ column }) =>
        CenteredHeader("tableHeader.weight", column, t, <Scale className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <Scale className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.weight}
          </>
        ),
    },
    {
      accessorKey: "department",
      enableSorting: false,
      header: ({ column }) =>
        CenteredHeader("tableHeader.department", column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          <>
            <MapPin className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {row.original.department}
          </>
        ),
    },
    {
      accessorKey: "file",
      enableSorting: false,
      header: () => (
        <div className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.file")}
        </div>
      ),
      cell: ({ row }) =>
        CenteredCell(
          row.original.file && row.original.file.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {row.original.file.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <LinkIcon className="h-4 w-4" />
                  {t("tableCell.file")} {index + 1}
                </a>
              ))}
            </div>
          ) : (
            t("tableCell.noFile")
          )
        ),
    }
  );

  // Actions column at the end
  columns.push(makeActionsColumn<Parcel>(handlers, t));

  return columns;
}
