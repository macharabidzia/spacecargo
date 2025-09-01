"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface TariffData {
  country: string;
  importMethod: string;
  pricePerKg: string;
  oversizeWeight: boolean;
  countryIconSrc: string;
}

const CenteredHeader = (
  titleKey: string,
  column: Column<TariffData>,
  t: (key: string) => string
) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-semibold
      text-white dark:text-gray-200
      hover:bg-white/10 dark:hover:bg-white/20
      transition-colors rounded-md"
  >
    {t(titleKey)}
    {column.getIsSorted() === "asc" && (
      <ChevronUp className="h-4 w-4 text-white dark:text-gray-200" />
    )}
    {column.getIsSorted() === "desc" && (
      <ChevronDown className="h-4 w-4 text-white dark:text-gray-200" />
    )}
  </Button>
);

const CenteredCell = (content: React.ReactNode) => (
  <div className="flex items-center justify-center px-3 py-2">
    {content}
  </div>
);

export default function buildTariffColumns(
  t: (key: string) => string
): ColumnDef<TariffData>[] {
  return [
    {
      accessorKey: "country",
      header: ({ column }) =>
        CenteredHeader("tableHeader.country", column, t),
      cell: ({ row }) =>
        CenteredCell(
          <div className="flex items-center gap-3">
            <Image
              width={24}
              height={24}
              alt={`${row.original.country} flag`}
              className="h-6 w-6 rounded-full object-cover shadow-sm dark:shadow-none"
              src={row.original.countryIconSrc}
            />
            <span className="text-sm font-medium text-foreground dark:text-gray-200">
              {row.original.country}
            </span>
          </div>
        ),
    },
    {
      accessorKey: "importMethod",
      header: ({ column }) =>
        CenteredHeader("tableHeader.importMethod", column, t),
      cell: ({ row }) =>
        CenteredCell(
          <span className="text-sm font-normal text-muted-foreground dark:text-gray-300">
            {row.original.importMethod}
          </span>
        ),
    },
    {
      accessorKey: "pricePerKg",
      header: ({ column }) =>
        CenteredHeader("tableHeader.pricePerKg", column, t),
      cell: ({ row }) =>
        CenteredCell(
          <span className="text-sm font-semibold text-space-blue-light dark:text-gray-200">
            {row.original.pricePerKg}
          </span>
        ),
    },
    {
      accessorKey: "oversizeWeight",
      header: ({ column }) =>
        CenteredHeader("tableHeader.oversizeWeight", column, t),
      cell: ({ row }) =>
        CenteredCell(
          <span className="text-sm font-medium text-foreground dark:text-gray-200">
            {row.original.oversizeWeight ? t("yes") : t("no")}
          </span>
        ),
    },
  ];
}
