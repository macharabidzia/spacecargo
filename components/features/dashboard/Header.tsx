import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Calculator,
  Coins,
  HomeIcon,
  Percent,
  Plus,
  Truck,
  UserIcon,
  Wallet,
} from "lucide-react";
import React from "react";

const Header = () => {
  const services = [
    {
      value: 0,
      name: "Transportation",
      icon: Percent,
    },
    {
      value: 0,
      name: "Balance",
      icon: Wallet,
    },
    {
      value: 0,
      name: "Debt",
      icon: Wallet,
    },
    {
      value: 0,
      name: "Space Coins",
      icon: Coins,
    },
  ];
  return (
    <div className="container py-4">
      <Card>
        <CardContent className="flex-col flex md:flex-row gap-4">
          <div className="flex flex-col items-start border-b-1 md:border-0 md:border-r-1 min-w-[200px] pr-6">
            <Button className="w-full justify-start" variant="ghost">
              <HomeIcon />
              My Home
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Box />
              My Parcels
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Truck />
              Courier
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calculator />
              Calculator
            </Button>
          </div>
          <div className="flex flex-col flex-1 px-4 gap-4">
            <div className="flex lg:flex-row flex-col justify-between gap-4">
              <div className="flex gap-4 items-center">
                <Avatar className="bg-gray-200 h-14 w-14 flex items-center justify-center">
                  <UserIcon />
                </Avatar>
                <div>
                  <h3>ioseb jughashvili</h3>
                  <small>SP304040</small>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap md:flex-row">
                <Button className="bg-space-blue">
                  <Plus />
                  Top Up Balance
                </Button>

                <Button className="bg-space-blue-light">
                  <Plus />
                  Before Button
                </Button>
              </div>
            </div>
            <Separator className="mt-4 ml-2" />
            <div className="flex lg:flex-row flex-wrap gap-4 justify-between">
              {services.map((item, i) => (
                <div key={i} className="flex items-center gap-4 flex-1">
                  <Avatar className="bg-gray-200 h-14 w-14 flex items-center justify-center">
                    <item.icon />
                  </Avatar>
                  <div>
                    <h3>{item.name}</h3>
                    <small>SP304040</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
