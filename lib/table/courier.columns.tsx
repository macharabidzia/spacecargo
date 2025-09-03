"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Courier } from "@/types/courier";
import { ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  Tag,
  MapPin,
  Package,
  FileText,
  Scale,
  DollarSign,
  CalendarDays,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

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
    
    {t('tableHeader.'+titleKey)}
    {column.getIsSorted() === "asc" && <ChevronUp className="h-4 w-4" />}
    {column.getIsSorted() === "desc" && <ChevronDown className="h-4 w-4" />}
  </Button>
);

/** Centered Cell like Parcel table */
const CenteredCell = (content: React.ReactNode, className?: string) => (
  <div className={`flex items-center flex-1 w-full justify-center px-4 py-2 text-sm text-gray-800 dark:text-gray-200 border-r border-gray-200 ${className}`}>
    {content}
  </div>
);

export function buildCourierTable(
  t: (key: string) => string,
  options: { showSelectColumn?: boolean } = { showSelectColumn: true }
): ColumnDef<Courier>[] {
  const columns: ColumnDef<Courier>[] = [];

  if (options.showSelectColumn) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      ),
      cell: ({ row }) => {
        const courier = row.original;
        const isSelectable = courier.statusDesc !== "Delivered";

        return (
          <div className="flex items-center justify-center">
            {isSelectable ? (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            ) : (
              <span className="text-muted-foreground dark:text-gray-500 text-xs select-none">
                —
              </span>
            )}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    });
  }

  columns.push(
    {
      accessorKey: "tdsCode",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(row.original.tdsCode || t("tableCell.na")),
    },
    {
      accessorKey: "cityDesc",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(row.original.cityDesc || t("tableCell.na")),
    },
    {
      accessorKey: "districtDesc",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(row.original.districtDesc || t("tableCell.na")),
    },
    {
      accessorKey: "package",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          t(`courier.package.${row.original.package?.toLowerCase()}`) ||
          row.original.package ||
          t("tableCell.na")
        ),
    },
    {
      accessorKey: "address",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(row.original.address || t("tableCell.na")),
    },
    {
      accessorKey: "invoiceUrl",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          row.original.invoiceUrl ? (
            <a
              href={row.original.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
            >
              {t("tableCell.viewInvoice")}
            </a>
          ) : (
            t("tableCell.na")
          )
        ),
    },
    {
      accessorKey: "totalWeight",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <Scale className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          typeof row.original.totalWeight === "number"
            ? `${row.original.totalWeight} ${t("unit.kg")}`
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "totalCost",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          typeof row.original.totalCost === "number"
            ? `${row.original.totalCost} ${t("unit.usd")}`
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "inpDate",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />),
      cell: ({ row }) =>
        CenteredCell(
          row.original.inpDate
            ? new Date(row.original.inpDate).toLocaleDateString()
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "comment",
      header: ({ column }) =>
        CenteredHeader(column.id, column, t, <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />,),
      cell: ({ row }) =>
        CenteredCell(row.original.comment || t("tableCell.na"),'border-none'),
    }
  );

  return columns;
}
