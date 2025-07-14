// components/Header.tsx
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coins, Percent, Plus, UserIcon, Wallet } from "lucide-react";
import React from "react";
import Link from "next/link"; // No longer needed for main nav links here

import { NavLinkList } from "./NavLinkList"; // Import the new component
import { getDictionary } from "@/i18n/dictionaries";
const Header = async ({ lang }: any) => {
  const dictionary = (await getDictionary(lang)).common;
  const services = [
    {
      value: 0,
      name: "dashboardStats.transportation",
      icon: Percent,
      color: "bg-space-blue-light/15",
      text: "text-space-blue-light",
    },
    {
      value: 0,
      name: "dashboardStats.balance",
      icon: Wallet,
      color: "bg-space-red/15",
      text: "text-space-red",
    },
    {
      value: 0,
      name: "dashboardStats.debt",
      icon: Wallet,
      color: "bg-space-green/15",
      text: "text-space-green",
    },
    {
      value: 0,
      name: "dashboardStats.spaceCoins",
      icon: Coins,
      color: "bg-space-orange/15",
      text: "text-space-orange",
    },
  ];

  return (
    <div className="container py-4">
      <Card>
        <CardContent className="flex-col flex md:flex-row gap-4">
          <NavLinkList />
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
                <Link href={"?topUp=true"}>
                  <Button className="bg-space-blue-light/15 text-space-blue-light hover:bg-space-blue-light/30 cursor-pointer">
                    <Plus />
                    წინასწარი დეკლარაცია
                  </Button>
                </Link>
                <Link href={"?edit=true"}>
                  <Button className="bg-space-blue-light cursor-pointer">
                    <Plus />
                    ბალანსის შევსება
                  </Button>
                </Link>
              </div>
            </div>
            <Separator className="mt-4 ml-2" />
            <div className="flex lg:flex-row flex-wrap gap-4 justify-between">
              {services.map((item, i) => (
                <div key={i} className="flex items-center gap-4 flex-1">
                  <Avatar
                    className={`h-14 w-14 flex items-center justify-center ${item.color}`}
                  >
                    <item.icon className={`${item.text} opacity-100`} />
                  </Avatar>
                  <div>
                    <small className={`text-${item.color}`}>
                      {dictionary[item.name]}
                    </small>
                    <h3>108.00₾</h3>
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
