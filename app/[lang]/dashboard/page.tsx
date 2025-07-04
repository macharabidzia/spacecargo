"use client";
import Form from "@/components/features/dashboard/Form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { triggerStyles } from "@/constants/styles";
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
