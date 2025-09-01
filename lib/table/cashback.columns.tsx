"use client";

import { Button } from "@/components/ui/button";
import { Bonus } from "@/types/bonus";
import { ColumnDef } from "@tanstack/react-table";
import { Tag, CalendarDays, DollarSign } from "lucide-react";

// Utility function to truncate text and add ellipsis
const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

export function buildBonusTable(
  t: (key: string) => string
): ColumnDef<Bonus>[] {
  const MAX_HEADER_LENGTH = 15;
  return [
    {
      accessorKey: "id",
      header: ({ column }) => {
        const headerText = t("tableHeader.id");
        const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent"
            title={headerText}
          >
            <Tag className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {displayHeaderText}
            {{
              asc: <span className="ml-2 text-xs">▲</span>,
              desc: <span className="ml-2 text-xs">▼</span>,
            }[column.getIsSorted() as string] ?? null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Tag className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.id}
        </div>
      ),
    },
    {
      accessorKey: "tdsCode",
      header: ({ column }) => {
        const headerText = t("tableHeader.tdsCode");
        const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent"
            title={headerText}
          >
            <Tag className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {displayHeaderText}
            {{
              asc: <span className="ml-2 text-xs">▲</span>,
              desc: <span className="ml-2 text-xs">▼</span>,
            }[column.getIsSorted() as string] ?? null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Tag className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.tdsCode || t("tableCell.na")}
        </div>
      ),
    },
    {
      accessorKey: "operationDate",
      header: ({ column }) => {
        const headerText = t("tableHeader.operationDate");
        const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent"
            title={headerText}
          >
            <CalendarDays className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {displayHeaderText}
            {{
              asc: <span className="ml-2 text-xs">▲</span>,
              desc: <span className="ml-2 text-xs">▼</span>,
            }[column.getIsSorted() as string] ?? null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <CalendarDays className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.operationDate
            ? new Date(row.original.operationDate).toLocaleDateString()
            : t("tableCell.na")}
        </div>
      ),
    },
    {
      accessorKey: "bonusPoint",
      header: ({ column }) => {
        const headerText = t("tableHeader.bonusPoint");
        const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent"
            title={headerText}
          >
            <Tag className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {displayHeaderText}
            {{
              asc: <span className="ml-2 text-xs">▲</span>,
              desc: <span className="ml-2 text-xs">▼</span>,
            }[column.getIsSorted() as string] ?? null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800 dark:text-gray-200">
          <Tag className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {row.original.bonusPoint || t("tableCell.na")}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        const headerText = t("tableHeader.totalPrice");
        const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:bg-transparent"
            title={headerText}
          >
            <DollarSign className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            {displayHeaderText}
            {{
              asc: <span className="ml-2 text-xs">▲</span>,
              desc: <span className="ml-2 text-xs">▼</span>,
            }[column.getIsSorted() as string] ?? null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400">
          <DollarSign className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
          {typeof row.original.totalPrice === "number"
            ? `$${row.original.totalPrice.toFixed(2)}`
            : t("tableCell.na")}
        </div>
      ),
    },
  ];
}
