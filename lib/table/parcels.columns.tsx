// lib/table/parcels.columns.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Edit, Phone, Trash2, Truck, User } from "lucide-react";

/** ──────────────────────────────────────────────────────────────────────────
 *  Domain model
 *  ────────────────────────────────────────────────────────────────────────── */
export interface Parcel {
  id: string;
  mobileNumber: string;
  declaredAmount: string;
  description: string;
  courier: string;
}

/** ──────────────────────────────────────────────────────────────────────────
 *  Column‑factory helper for the actions column
 *  ────────────────────────────────────────────────────────────────────────── */
function makeActionsColumn<T>(handlers: {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}): ColumnDef<T> {
  return {
    id: "actions",
    header: () => (
      <div className="flex items-center justify-center text-sm font-medium text-gray-700">
        ქმედებები
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const original = row.original as T;

      return (
        <div className="flex items-center justify-center gap-2">
          {handlers.onEdit && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100"
              onClick={() => handlers.onEdit!(original)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}

          {handlers.onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50"
              onClick={() => handlers.onDelete!(original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  };
}

/** ──────────────────────────────────────────────────────────────────────────
 *  Main factory – build the full column list
 *  ────────────────────────────────────────────────────────────────────────── */
export function buildParcelColumns(
  handlers: {
    onEdit?: (parcel: Parcel) => void;
    onDelete?: (parcel: Parcel) => void;
  } = {}
): ColumnDef<Parcel>[] {
  return [
    {
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent"
        >
          <Phone className="mr-1 h-4 w-4 text-gray-500" />
          მობილურის ნომერი
          {{
            asc: <span className="ml-2 text-xs">▲</span>,
            desc: <span className="ml-2 text-xs">▼</span>,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800">
          <Phone className="mr-1 h-4 w-4 text-gray-400" />
          {row.original.mobileNumber}
        </div>
      ),
    },
    {
      accessorKey: "declaredAmount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent"
        >
          <User className="mr-1 h-4 w-4 text-gray-500" />
          დეკლარირებული თანხა
          {{
            asc: <span className="ml-2 text-xs">▲</span>,
            desc: <span className="ml-2 text-xs">▼</span>,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800">
          <User className="mr-1 h-4 w-4 text-gray-400" />
          {row.original.declaredAmount}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent"
        >
          <Box className="mr-1 h-4 w-4 text-gray-500" />
          ტვირთის აღწერა
          {{
            asc: <span className="ml-2 text-xs">▲</span>,
            desc: <span className="ml-2 text-xs">▼</span>,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800">
          <Box className="mr-1 h-4 w-4 text-gray-400" />
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "courier",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center p-0 text-sm font-medium text-gray-700 hover:bg-transparent"
        >
          <Truck className="mr-1 h-4 w-4 text-gray-500" />
          კურიერი
          {{
            asc: <span className="ml-2 text-xs">▲</span>,
            desc: <span className="ml-2 text-xs">▼</span>,
          }[column.getIsSorted() as string] ?? null}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-800">
          <Truck className="mr-1 h-4 w-4 text-gray-400" />
          {row.original.courier}
        </div>
      ),
    },
    // ⭐️ actions column injected last
    makeActionsColumn<Parcel>(handlers),
  ];
}
