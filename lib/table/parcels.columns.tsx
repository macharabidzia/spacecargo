// lib/table/parcels.columns.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Box, Edit, Phone, Trash2, Truck, User } from "lucide-react";

// Define the shape of your parcel data
export interface Parcel {
  id: string;
  mobileNumber: string; // Corresponds to col1
  declaredAmount: string; // Corresponds to col2
  description: string; // Corresponds to col3
  courier: string; // Corresponds to col4
  // If col5 was for some specific data, add it here.
  // Since it was just action buttons, it doesn't need an accessorKey directly.
}

const columns: ColumnDef<Parcel>[] = [ // Type the ColumnDef with Parcel interface
  {
    accessorKey: "mobileNumber", // Changed from "col1"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-sm font-medium text-gray-700 p-0 hover:bg-transparent"
      >
        <Phone className="mr-1 h-4 w-4 text-gray-500" /> მობილურის ნომერი
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-800">
        <Phone className="mr-1 h-4 w-4 text-gray-400" /> {row.original.mobileNumber} {/* Access via row.original */}
      </div>
    ),
  },
  {
    accessorKey: "declaredAmount", // Changed from "col2"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-sm font-medium text-gray-700 p-0 hover:bg-transparent"
      >
        <User className="mr-1 h-4 w-4 text-gray-500" /> დეკლარირებული თანხა
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-800">
        <User className="mr-1 h-4 w-4 text-gray-400" /> {row.original.declaredAmount} {/* Access via row.original */}
      </div>
    ),
  },
  {
    accessorKey: "description", // Changed from "col3"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-sm font-medium text-gray-700 p-0 hover:bg-transparent"
      >
        <Box className="mr-1 h-4 w-4 text-gray-500" /> ტვირთის აღწერა
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-800">
        <Box className="mr-1 h-4 w-4 text-gray-400" /> {row.original.description} {/* Access via row.original */}
      </div>
    ),
  },
  {
    accessorKey: "courier", // Changed from "col4"
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center text-sm font-medium text-gray-700 p-0 hover:bg-transparent"
      >
        <Truck className="mr-1 h-4 w-4 text-gray-500" /> კურიერი
        {{
          asc: <span className="ml-2 text-xs">▲</span>,
          desc: <span className="ml-2 text-xs">▼</span>,
        }[column.getIsSorted() as string] ?? null}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm text-gray-800">
        <Truck className="mr-1 h-4 w-4 text-gray-400" /> {row.original.courier} 
      </div>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="flex items-center text-sm font-medium text-gray-700 justify-center">
        ქმედებები
        <span className="ml-1 text-gray-400">▼</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-gray-600 hover:bg-gray-100"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default columns;