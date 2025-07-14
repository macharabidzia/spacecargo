// src/components/DynamicTabs.tsx

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { triggerStyles } from "@/constants/styles";

interface TabItem {
  value: string;
  label: string;
}

interface DynamicTabsProps {
  tabsData: TabItem[];
  children: React.ReactNode;
  defaultTabValue?: string;
  headerContent?: React.ReactNode;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({
  tabsData,
  children,
  defaultTabValue,
  headerContent,
  tabsListClassName,
  tabsTriggerClassName,
}) => {
  const initialDefaultValue = defaultTabValue || tabsData[0]?.value;

  if (!tabsData || tabsData.length === 0) {
    console.warn("DynamicTabs: No tabsData provided.");
    return null;
  }

  return (
    <Tabs defaultValue={initialDefaultValue} className="w-full">
      <TabsList
        className={`flex flex-col h-fit md:flex-row justify-between w-full bg-transparent ${
          tabsListClassName || ""
        }`}
      >
        {tabsData.map((tab) => (
          <TabsTrigger
            className={`${triggerStyles} pb-0 mb-6 md:pb-0 md:mb-0 data-[state=active]:bg-transparent ${
              tabsTriggerClassName || ""
            }`}
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {headerContent && (
        <>
          <div className="py-4">{headerContent}</div>
          <Separator />
        </>
      )}
      {tabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DynamicTabs;
