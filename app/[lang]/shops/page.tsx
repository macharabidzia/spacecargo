import DynamicTabs from "@/components/common/DynamicTabs";
import List from "@/components/features/shops/List";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Shops = async () => {
  const roomTabsData = [
    { value: "China", label: "China" },
    { value: "Usa", label: "USA" },
    { value: "Dubai", label: "Dubai" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Turkey", label: "Turkey" },
    { value: "Greek", label: "Greek" },
  ];
  return (
    <div className="container mt-10">
      <Card>
        <CardContent className="p-0 m-0">
          <DynamicTabs tabsData={roomTabsData}>
            <List />
          </DynamicTabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shops;
