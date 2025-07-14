// lib/table/tariffs.columns.tsx
import { CommonDictionary } from "@/types/dictionary";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image"; // For country flags
// 1. Define the data interface for your tariff rows
export interface TariffData {
  country: string;
  importMethod: string;
  pricePerKg: string;
  oversizeWeight: string;
  countryIconSrc: string; // Add this to store the icon path directly
}

// 2. Build the columns for the tariffs table
export default function buildTariffColumns(
  dictionary: CommonDictionary // Pass the dictionary for localized headers and labels
): ColumnDef<TariffData>[] {
  return [
    {
      accessorKey: "country",
      header: dictionary["tariffs.tableHeaders.country"], // Localized header
      cell: ({ row }) => (
        <div className="flex flex-row gap-4 items-center justify-self-start">
          <Image
            width={20}
            height={20}
            alt={`${row.original.country} flag`}
            className="w-5 h-5"
            src={row.original.countryIconSrc} // Use the src from the data
          />
          <span className="text-foreground">{row.original.country}</span>
        </div>
      ),
    },
    {
      accessorKey: "importMethod",
      header: dictionary["tariffs.tableHeaders.importMethod"], // Localized header
      cell: ({ row }) => (
        <span className="text-foreground">{row.original.importMethod}</span>
      ),
    },
    {
      accessorKey: "pricePerKg",
      header: dictionary["tariffs.tableHeaders.pricePerKg"], // Localized header
      cell: ({ row }) => (
        <span className="text-space-blue-light">{row.original.pricePerKg}</span>
      ),
    },
    {
      accessorKey: "oversizeWeight",
      header: dictionary["tariffs.tableHeaders.oversizeWeight"], // Localized header
      cell: ({ row }) => (
        <span className="text-foreground">
          {row.original.oversizeWeight === dictionary["tariffs.yes"]
            ? dictionary["tariffs.yes"]
            : dictionary["tariffs.no"]}
        </span>
      ),
    },
  ];
}
