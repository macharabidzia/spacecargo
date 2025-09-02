"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Parcel } from "@/types/parcel";
import { ColumnDef } from "@tanstack/react-table";
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
} from "lucide-react";

/** Actions column factory */
function makeActionsColumn<T extends { id?: string; invoiceUrl?: string; canEdit?: boolean; canDelete?: boolean }>(
  handlers: {
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onInvoiceClick?: (id: string) => void;
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
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition"
              onClick={() => handlers.onEdit!(original)}
              title={t("actions.edit")}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {showDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition"
              onClick={() => handlers.onDelete!(original)}
              title={t("actions.delete")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {showInvoice && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition"
              onClick={() => handlers.onInvoiceClick!(original.id!)}
              title={t("actions.invoice")}
            >
              <File className="h-4 w-4" />
            </Button>
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
    onInvoiceClick?: any;
  } = {},
  t: (key: string) => string,
  options: { showInvoice?: boolean; showSelectColumn?: boolean, onInvoiceClick?: any } = { showSelectColumn: false }
): ColumnDef<Parcel>[] {
  const sortIcon = (direction: string | false | undefined) => {
    if (direction === "asc") return <span className="ml-2 text-xs">▲</span>;
    if (direction === "desc") return <span className="ml-2 text-xs">▼</span>;
    return null;
  };

  const columns: ColumnDef<Parcel>[] = [];

  if (options?.showSelectColumn) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  columns.push(
    {
      accessorKey: "tdsCode",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Tag className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.tdsCode")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Tag className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.tdsCode}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Package className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.category")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Package className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.category?.replace?.("parcel.category.", "") ?? ""}
        </div>
      ),
    },
    {
      accessorKey: "declaredAmount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <DollarSign className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.declaredAmount")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <DollarSign className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.declaredAmount}
        </div>
      ),
    },
    {
      accessorKey: "itemsCount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Box className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.itemsCount")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Box className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.itemsCount}
        </div>
      ),
    },
    {
      accessorKey: "websiteUrl",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Globe className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.websiteUrl")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => {
        const websiteUrl = row.original.websiteUrl;
        return (
          <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
            <Globe className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
            {websiteUrl ? (
              <a
                href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {websiteUrl}
              </a>
            ) : (
              t("tableCell.na")
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "statusDesc",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Truck className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.statusDesc")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Truck className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.statusDesc}
        </div>
      ),
    },
  );



  // --- Other columns appended
  columns.push(
    {
      accessorKey: "weight",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <Scale className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.weight")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Scale className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.weight}
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300"
        >
          <MapPin className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.department")}
          {sortIcon(column.getIsSorted())}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <MapPin className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.department}
        </div>
      ),
    },
    {
      accessorKey: "file",
      header: () => (
        <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <FileText className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
          {t("tableHeader.file")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200 flex-wrap gap-2">
          {row.original.file && row.original.file.length > 0 ? (
            row.original.file.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <LinkIcon className="h-4 w-4" />
                {t("tableCell.file")} {index + 1}
              </a>
            ))
          ) : (
            t("tableCell.noFile")
          )}
        </div>
      ),
    }
  );

  // --- Actions column (always last)
  columns.push(makeActionsColumn<Parcel>(handlers, t));

  return columns;
}
