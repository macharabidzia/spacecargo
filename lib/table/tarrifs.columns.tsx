// lib/table/tariffs.columns.tsx
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
  dictionary: any // Pass the dictionary for localized headers and labels
): ColumnDef<TariffData>[] {
  const countryIcons: { [key: string]: string } = {
    [dictionary["tariffs.labels.country.USA"]]: "/icons/usa.svg",
    USA: "/icons/usa.svg",
    [dictionary["tariffs.labels.country.China"]]: "/icons/china.svg",
    China: "/icons/china.svg",
    [dictionary["tariffs.labels.country.Dubai"]]: "/icons/uae.svg",
    Dubai: "/icons/uae.svg",
    [dictionary["tariffs.labels.country.UnitedKingdom"]]: "/icons/england.svg",
    "United Kingdom": "/icons/england.svg",
    [dictionary["tariffs.labels.country.Turkey"]]: "/icons/turkey.svg",
    Turkey: "/icons/turkey.svg",
    [dictionary["tariffs.labels.country.Greece"]]: "/icons/greece.svg",
    Greece: "/icons/greece.svg",
    [dictionary["tariffs.labels.country.HongKong"]]: "/icons/honk.svg",
    "Hong Kong": "/icons/honk.svg",
  };
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
          <span className="text-lg text-foreground">
            {row.original.country}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "importMethod",
      header: dictionary["tariffs.tableHeaders.importMethod"], // Localized header
      cell: ({ row }) => (
        <span className="text-lg text-foreground">
          {row.original.importMethod}
        </span>
      ),
    },
    {
      accessorKey: "pricePerKg",
      header: dictionary["tariffs.tableHeaders.pricePerKg"], // Localized header
      cell: ({ row }) => (
        <span className="text-space-blue-light text-lg">
          {row.original.pricePerKg}
        </span>
      ),
    },
    {
      accessorKey: "oversizeWeight",
      header: dictionary["tariffs.tableHeaders.oversizeWeight"], // Localized header
      cell: ({ row }) => (
        <span className="text-lg text-foreground">
          {row.original.oversizeWeight === dictionary["tariffs.yes"]
            ? dictionary["tariffs.yes"]
            : dictionary["tariffs.no"]}
        </span>
      ),
    },
  ];
}
