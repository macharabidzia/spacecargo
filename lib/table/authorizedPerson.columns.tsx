"use client";

import React from "react";
import { ColumnDef, Row, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AuthorizedPerson } from "@/types/user";
import { Trash2 } from "lucide-react";

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};

export function buildAuthorizedPersonTable(
  t: (key: string) => string,
  onDelete: (id: number) => void // 🔹 pass delete handler from parent
): ColumnDef<AuthorizedPerson>[] {
  const MAX_HEADER_LENGTH = 15;

  const makeHeader = (column: Column<AuthorizedPerson>, key: string) => {
    const headerText = t(key);
    const displayHeaderText = truncateText(headerText, MAX_HEADER_LENGTH);
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent dark:text-gray-300 dark:hover:text-white transition-all duration-300 ease-in-out"
        title={headerText}
      >
        {displayHeaderText}
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    );
  };

  const makeCell = (row: Row<AuthorizedPerson>, content: React.ReactNode) => (
    <div className="text-sm text-gray-800 dark:text-gray-300">{content}</div>
  );

  return [
    {
      accessorKey: "id",
      header: ({ column }) => makeHeader(column, "tableHeader.id"),
      cell: ({ row }) => makeCell(row, row.original.id),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => makeHeader(column, "tableHeader.firstName"),
      cell: ({ row }) => makeCell(row, row.original.firstName),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => makeHeader(column, "tableHeader.lastName"),
      cell: ({ row }) => makeCell(row, row.original.lastName),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => makeHeader(column, "tableHeader.phone"),
      cell: ({ row }) => makeCell(row, row.original.phone),
    },
    {
      accessorKey: "pin",
      header: ({ column }) => makeHeader(column, "tableHeader.pin"),
      cell: ({ row }) => makeCell(row, row.original.pin),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full  text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition"
          onClick={() => onDelete(row.original.id)}
          aria-label={t("actions.delete")}
          title={t("actions.delete")}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];
}
