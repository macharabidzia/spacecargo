import ParcelsTableClient from "@/components/features/dashboard/parcels/ParcelsTableClient";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Parcels = () => {
  const data = [
    {
      id: "p1",
      mobileNumber: "849020991",
      declaredAmount: "415",
      description: "ტვირთის ზომა. 30კგ",
      courier: "33",
    },
    {
      id: "p2",
      mobileNumber: "849020992",
      declaredAmount: "416",
      description: "ტვირთის ზომა. 20კგ",
      courier: "34",
    },
    {
      id: "p3",
      mobileNumber: "849020993",
      declaredAmount: "417",
      description: "ტვირთის ზომა. 40კგ",
      courier: "35",
    },
    {
      id: "p4",
      mobileNumber: "849020994",
      declaredAmount: "418",
      description: "ტვირთის ზომა. 10კგ",
      courier: "36",
    },
    {
      id: "p5",
      mobileNumber: "849020995",
      declaredAmount: "419",
      description: "ტვირთის ზომა. 50კგ",
      courier: "37",
    },
    {
      id: "p6",
      mobileNumber: "849020996",
      declaredAmount: "420",
      description: "ტვირთის ზომა. 25კგ",
      courier: "38",
    },
    {
      id: "p7",
      mobileNumber: "849020997",
      declaredAmount: "421",
      description: "ტვირთის ზომა. 35კგ",
      courier: "39",
    },
    {
      id: "p8",
      mobileNumber: "849020998",
      declaredAmount: "422",
      description: "ტვირთის ზომა. 15კგ",
      courier: "40",
    },
    {
      id: "p9",
      mobileNumber: "849020999",
      declaredAmount: "423",
      description: "ტვირთის ზომა. 45კგ",
      courier: "41",
    },
    {
      id: "p10",
      mobileNumber: "849021000",
      declaredAmount: "424",
      description: "ტვირთის ზომა. 5კგ",
      courier: "42",
    },
    {
      id: "p11",
      mobileNumber: "849021001",
      declaredAmount: "425",
      description: "ტვირთის ზომა. 55კგ",
      courier: "43",
    },
    {
      id: "p12",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p13",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p14",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
    {
      id: "p15",
      mobileNumber: "849021002",
      declaredAmount: "426",
      description: "ტვირთის ზომა. 60კგ",
      courier: "44",
    },
  ];
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
  return (
    <div className="container">
      <Card className="p-0 m-0 py-2">
        <CardContent className="p-0">
          <Tabs defaultValue={tabsData[0].value} className="w-full">
            <TabsList className="flex flex-row justify-between w-full bg-transparent p-0 py-0.5 ">
              {tabsData.map((tab) => (
                <TabsTrigger
                  className={`${triggerStyles} data-[state=active]:bg-transparent`}
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.value}
                  <Badge className="h-5 w-5 text-xs rounded-lg" variant="destructive">2</Badge>
                </TabsTrigger>
              ))}
            </TabsList>
            <Separator />

            {tabsData.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <ParcelsTableClient parcels={data} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Parcels;
