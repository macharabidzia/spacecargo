import Form from "@/components/features/dashboard/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const Room = () => {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Room Information</CardTitle>
          <CardDescription>
            Use the tabs below to navigate through the room's details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tabsData[0].value} className="w-full">
            <TabsList className="flex flex-row justify-between w-full">
              {tabsData.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.value}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="p-4 border rounded-md mt-2">{tab.value}

                  <Form/>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Room;
