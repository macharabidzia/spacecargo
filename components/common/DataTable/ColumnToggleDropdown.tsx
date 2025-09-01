"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface ColumnToggleDropdownProps<TData> {
  table: Table<TData>;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function ColumnToggleDropdown<TData>({
  table,
}: ColumnToggleDropdownProps<TData>) {
  const { t } = useClientTranslation("common");
  const MAX_LABEL_LENGTH = 18; // Slightly longer for better label fit

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto bg-space-muted dark:bg-gray-800 hover:bg-space-blue-muted/20 dark:hover:bg-space-blue-muted/30 text-space-blue-muted dark:text-space-blue-light shadow-sm transition rounded-md flex items-center"
          aria-label={t("columnToggle.toggleColumns")}
          title={t("columnToggle.toggleColumns")}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-60 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700 shadow-md p-1"
      >
        <DropdownMenuLabel className="px-3 py-2 text-gray-700 dark:text-gray-300 font-semibold select-none">
          {t("columnToggle.toggleColumns")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
{table
  .getAllColumns()
  .filter(
    (column) =>
      typeof column.accessorFn !== "undefined" && column.getCanHide()
  )
  .map((column) => {
    let columnLabel = t(`tableHeader.${column.id}`);
    if (columnLabel === `tableHeader.${column.id}` || !columnLabel) {
      columnLabel = column.id
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    }
    const displayLabel = truncateText(columnLabel, MAX_LABEL_LENGTH);

    return (
      <DropdownMenuCheckboxItem
        key={column.id}
        checked={column.getIsVisible()}
        onCheckedChange={(value) => column.toggleVisibility(!!value)}
        title={columnLabel}
        className=""
      >
        <span className="truncate">{displayLabel}</span>
      </DropdownMenuCheckboxItem>
    );
  })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
