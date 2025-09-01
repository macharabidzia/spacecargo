"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TarrifsTable from "./Tarrifs/TarrifsTable";
import { TariffData } from "@/lib/table/tarrifs.columns";
import { HomeDictionary } from "@/types/dictionary";

export default function TariffsClient({
  homeDictionary,
  internalTariffData,
}: {
  homeDictionary: HomeDictionary;
  internalTariffData: TariffData[];
}) {
  return (
    <Tabs defaultValue="physical">
      <TabsList className="w-full h-16 border p-0">
        <TabsTrigger
          className="text-gray-100 h-full data-[state=active]:bg-space-blue-light data-[state=active]:shadow-none"
          value="physical"
        >
          {homeDictionary["tariffs.tabs.physicalPerson"]}
        </TabsTrigger>
        <TabsTrigger
          className="text-gray-400 h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          value="legal"
        >
          {homeDictionary["tariffs.tabs.legalPerson"]}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="physical">
        <TarrifsTable data={internalTariffData} />
      </TabsContent>
      <TabsContent value="legal">
        <p className="text-center text-foreground/60 p-4">
          {homeDictionary["tariffs.tabs.legalPerson"]} data will go here.
        </p>
      </TabsContent>
    </Tabs>
  );
}