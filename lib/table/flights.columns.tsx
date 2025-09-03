"use client";

import { ColumnDef, Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Plane } from "lucide-react";

export interface FlightData {
  Flights_Number: string;
  Come_Date: string;
}

const CenteredHeader = (
  titleKey: string,
  column: Column<FlightData, unknown>,
  t: (key: string) => string,
  Icon?: React.ReactNode
) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-semibold
 text-white dark:text-gray-200
 hover:bg-white/10 dark:hover:bg-white/20
      transition-colors rounded-md"
  >
    {Icon}
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
  <div className="flex items-center justify-center">{content}</div>
);

export default function buildFlightColumns(
  t: (key: string) => string
): ColumnDef<FlightData>[] {
  return [
    {
      id: "planeIcon",
      header: "",
      cell: () =>
        CenteredCell(
          <div className="p-4 bg-space-blue-light/15 rounded-full">
            <Plane className="h-6 w-6 text-space-blue-muted" />
          </div>
        ),
    },
    {
      accessorKey: "Flights_Number",

      header: ({ column }) =>
        CenteredHeader("tableHeader.flightNumber", column, t, <Plane className="h-4 w-4 text-white" />),
      cell: ({ row }) =>
        CenteredCell(
          <span className="text-sm font-medium text-foreground dark:text-gray-200">
            {row.original.Flights_Number}
          </span>
        ),
    },
    {
      accessorKey: "Come_Date",
      header: ({ column }) =>
        CenteredHeader("tableHeader.comeDate", column, t, <Calendar className="h-4 w-4 text-white" />),
      cell: ({ row }) =>
        CenteredCell(
          <span className="text-sm font-semibold text-space-blue-light dark:text-gray-200">
            {row.original.Come_Date}
          </span>
        ),
    },
  ];
}