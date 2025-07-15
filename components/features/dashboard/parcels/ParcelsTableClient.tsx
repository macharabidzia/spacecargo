// components/parcels/ParcelTableClient.tsx
"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import { Input } from "@/components/ui/input";
import { Parcel, buildParcelColumns } from "@/lib/table/parcels.columns";
import { SearchIcon } from "lucide-react";

interface Props {
  parcels: Parcel[];
}

export default function ParcelsTableClient({ parcels }: Props) {
  const handleEdit = () => {
    // toast({ title: `Edit ${parcel.id}` });
    console.log("hand");
  };

  const handleDelete = () => {
    // toast({ title: `Delete ${parcel.id}` });
  };

  const columns = buildParcelColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <div className="py-4 flex flex-row items-center justify-between px-6">
        <div>
          <h1 className="text-gray-600 text-sm">მისაღებია</h1>
          <p className="text-2xl font-semibold">4 ამანათი</p>
        </div>
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search parcels..."
            className="w-64 pl-9"
          />
        </div>
      </div>
      <DataTable data={parcels} columns={columns} />
    </>
  );
}
