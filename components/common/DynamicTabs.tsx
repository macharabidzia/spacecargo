// src/components/DynamicTabs.tsx

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
}

interface DynamicTabsProps {
  tabsData: TabItem[];
  children: React.ReactNode;
  defaultTabValue?: string;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabsData,
  children,
  defaultTabValue,
}) => {
  if (!tabsData || tabsData.length === 0) return null;
  const initialDefaultValue = defaultTabValue || tabsData[0]?.value;

  return (
    <Tabs defaultValue={initialDefaultValue} className="w-full">
      {/* The container for the tabs now just has a bottom border */}
      <TabsList className="w-full justify-start rounded-none border-b border-border p-0 flex flex-col bg-black">
        {tabsData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 text-base font-semibold text-muted-foreground shadow-none transition-none",
              "data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {/* Content has a top margin for spacing */}
      <div className="mt-6">
        {children}
      </div>
    </Tabs>
  );
};

export { TabsContent };
export default DynamicTabs;