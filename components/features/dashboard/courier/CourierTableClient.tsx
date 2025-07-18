// components/parcels/ParcelTableClient.tsx
"use client";

import { DataTable } from "@/components/common/DataTable/DataTable";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { triggerStyles } from "@/constants/styles";
import { buildParcelColumns } from "@/lib/table/parcels.columns";
import { SearchIcon } from "lucide-react";


const tabsData = [
  {
    value: "კურიერი",
  },
  {
    value: "საფოსტო მომსახურება",
  },
];
export default function CourierTableClient() {
  const handleEdit = () => {
    // toast({ title: `Edit ${parcel.id}` });
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
      <div className="flex items-center justify-end">
        <Tabs defaultValue={tabsData[0].value} className="w-full">
          <div className="flex flex-row justify-between pb-4">
            <div>
              <TabsList className="flex flex-row justify-evenly bg-transparent">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    className={`${triggerStyles} data-[state=active]:bg-transparent`}
                    key={tab.value}
                    value={tab.value}
                  >
                    {tab.value}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Separator className="mt-2 ml-1" />
            </div>
            <div className="relative flex flex-row items-center">
              <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search parcels..."
                className="w-64 pl-9"
              />
            </div>
          </div>
          {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <DataTable data={[]} columns={columns} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
