// components/Header.tsx
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Calculator,
  Coins,
  HomeIcon, // No longer needed directly here if NavLinkList uses it
  Percent,
  Plus,
  Truck, // No longer needed directly here
  UserIcon,
  Wallet,
} from "lucide-react";
import React from "react";
import { TopUpBalance } from "../TopUpBalance"; // Assuming TopUpBalance is a component
import Link from "next/link"; // No longer needed for main nav links here

import { NavLinkList } from "./NavLinkList"; // Import the new component

const Header = () => {
  const services = [
    {
      value: 0,
      name: "Transportation",
      icon: Percent,
      color: "space-blue-light",
    },
    {
      value: 0,
      name: "Balance",
      icon: Wallet,
      color: "space-red-default",
    },
    {
      value: 0,
      name: "Debt",
      icon: Wallet,
      color: "space-green",
    },
    {
      value: 0,
      name: "Space Coins",
      icon: Coins,
      color: "space-orange",
    },
  ];
  return (
    <div className="container py-4">
      <Card>
        <CardContent className="flex-col flex md:flex-row gap-4">
          {/* Render the separated NavLinkList component */}
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
                <Button className="bg-space-blue-light/15 text-space-blue-light hover:bg-space-blue-light/30 cursor-pointer">
                  <Plus />
                  Top Up Balance
                </Button>
                {/* Assuming TopUpBalance is a component that wraps a trigger */}
                <TopUpBalance>
                  <Button className="bg-space-blue-light cursor-pointer">
                    <Plus />
                    Before Button
                  </Button>
                </TopUpBalance>
              </div>
            </div>
            <Separator className="mt-4 ml-2" />
            <div className="flex lg:flex-row flex-wrap gap-4 justify-between">
              {services.map((item, i) => (
                <div key={i} className="flex items-center gap-4 flex-1">
                  <Avatar
                    className={`bg-gray-200 h-14 w-14 flex items-center justify-center bg-${item.color}/35 text-${item.color}`}
                  >
                    <item.icon />
                  </Avatar>
                  <div>
                    <small>{item.name}</small>
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