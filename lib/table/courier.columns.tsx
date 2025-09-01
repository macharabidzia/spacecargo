"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Courier } from "@/types/courier";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import {
  Tag,
  MapPin,
  Package,
  FileText,
  Scale,
  DollarSign,
  CalendarDays,
} from "lucide-react";

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export function buildCourierTable(
  t: (key: string) => string,
  options: { showSelectColumn?: boolean } = { showSelectColumn: true }
): ColumnDef<Courier>[] {
  const MAX_HEADER_LENGTH = 15;
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
  const makeHeader = (
    column: Column<Courier>,
    icon: React.ReactElement<{ className?: string }>,
    key: string
  ) => {
    const headerText = t(key);
    const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:text-white transition-all duration-300 ease-in-out"
        title={headerText}
      >
        {React.cloneElement(icon, {
          className:
            "mr-1 h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-white",
        })}
        {displayHeaderText}
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    );
  };

  const makeCell = (
    row: Row<Courier>,
    icon: React.ReactElement<{ className?: string }>,
    content: React.ReactNode
  ) => (
    <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
      {React.cloneElement(icon, {
        className:
          "mr-1 h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 ease-in-out group-hover:scale-110",
      })}
      {content}
    </div>
  );

  columns.push(
    {
      accessorKey: "tdsCode",
      header: ({ column }) =>
        makeHeader(column, <Tag />, "tableHeader.tdsCode"),
      cell: ({ row }) =>
        makeCell(row, <Tag />, row.original.tdsCode || t("tableCell.na")),
    },
    {
      accessorKey: "cityDesc",
      header: ({ column }) =>
        makeHeader(column, <MapPin />, "tableHeader.city"),
      cell: ({ row }) =>
        makeCell(row, <MapPin />, row.original.cityDesc || t("tableCell.na")),
    },
    {
      accessorKey: "districtDesc",
      header: ({ column }) =>
        makeHeader(column, <MapPin />, "tableHeader.region"),
      cell: ({ row }) =>
        makeCell(
          row,
          <MapPin />,
          row.original.districtDesc || t("tableCell.na")
        ),
    },
    {
      accessorKey: "package",
      header: ({ column }) =>
        makeHeader(column, <Package />, "tableHeader.package"),
      cell: ({ row }) =>
        makeCell(
          row,
          <Package />,
          t(`courier.package.${row.original.package?.toLowerCase()}`) ||
            row.original.package ||
            t("tableCell.na")
        ),
    },
    {
      accessorKey: "address",
      header: ({ column }) =>
        makeHeader(column, <MapPin />, "tableHeader.address"),
      cell: ({ row }) =>
        makeCell(row, <MapPin />, row.original.address || t("tableCell.na")),
    },
    {
      accessorKey: "invoiceUrl",
      header: ({ column }) =>
        makeHeader(column, <FileText />, "tableHeader.invoice"),
      cell: ({ row }) =>
        makeCell(
          row,
          <FileText />,
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
        makeHeader(column, <Scale />, "tableHeader.weight"),
      cell: ({ row }) =>
        makeCell(
          row,
          <Scale />,
          typeof row.original.totalWeight === "number"
            ? `${row.original.totalWeight} ${t("unit.kg")}`
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "totalCost",
      header: ({ column }) =>
        makeHeader(column, <DollarSign />, "tableHeader.totalCost"),
      cell: ({ row }) =>
        makeCell(
          row,
          <DollarSign />,
          typeof row.original.totalCost === "number"
            ? `${row.original.totalCost} ${t("unit.usd")}`
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "inpDate",
      header: ({ column }) =>
        makeHeader(column, <CalendarDays />, "tableHeader.registrationDate"),
      cell: ({ row }) =>
        makeCell(
          row,
          <CalendarDays />,
          row.original.inpDate
            ? new Date(row.original.inpDate).toLocaleDateString()
            : t("tableCell.na")
        ),
    },
    {
      accessorKey: "comment",
      header: ({ column }) =>
        makeHeader(column, <FileText />, "tableHeader.comment"),
      cell: ({ row }) =>
        makeCell(row, <FileText />, row.original.comment || t("tableCell.na")),
    }
  );

  return columns;
}
