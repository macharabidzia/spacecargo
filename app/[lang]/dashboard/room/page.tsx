import Form from "@/components/features/dashboard/Form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const tabsData = [
  {
    value: "China",
  },
  {
    value: "Usa",
  },

  {
    value: "Dubai",
  },
  {
    value: "Hong Kong",
  },
  {
    value: "Turkey",
  },
  {
    value: "Greek",
  },
];
const triggerStyles = `
    cursor-pointer
    relative flex-1 bg-transparent text-muted-foreground transition-none
    hover:text-
    data-[state=active]:text-primary data-[state=active]:shadow-none
    after:content-[''] after:absolute after:h-[2px] after:w-full
    after:bg-space-blue-light after:-bottom-3
    after:left-0 after:scale-x-0 after:origin-center
    after:transition-transform after:duration-300 after:ease-in-out
    hover:after:scale-x-100
    data-[state=active]:after:scale-x-100
  `;
// <Tabs defaultValue="air" className="w-ful">
//   <TabsList className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 bg-transparent py-0.5 px-0">
//     <TabsTrigger value="air" className={triggerStyles}>
//       {dictionary.home["tariffs.importMethods.air"]}
//     </TabsTrigger>
//     <TabsTrigger value="land" className={triggerStyles}>
//       {dictionary.home["tariffs.importMethods.land"]}
//     </TabsTrigger>
//   </TabsList>
const Room = () => {
  return (
    <div className="container">
      <Card>
        <CardContent>
          <Tabs defaultValue={tabsData[0].value} className="w-full">
            <TabsList className="flex flex-row justify-between w-full bg-transparent ">
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
            <Separator />
            <div className="py-4">
              <h1 className="text-gray-600 text-sm">Tariff</h1>
              <p className="text-2xl">7.15$</p>
            </div>
            <Separator />
            {tabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <Form />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Room;
