// components/NavLinkList.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, Box, Truck, Calculator } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}


export function NavLinkList() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentLanguage = pathSegments[0] || "en";

  const navItems: NavItem[] = [
    {
      name: "Room",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "My Parcels",
      href: "/dashboard/parcels",
      icon: Box,
    },
    {
      name: "Courier",
      href: "/dashboard/courier",
      icon: Truck,
    },
    {
      name: "Calculator",
      href: "/dashboard/calculator",
      icon: Calculator,
    },
  ];

  return (
    <div
      className="flex flex-col items-start min-w-[200px] pr-6 shadow-none gap-1
                   border-b md:border-b-0 md:border-r md:border-solid md:border-gray-200"
    >
      {navItems.map((item) => {
        const fullHref = `/${currentLanguage}${item.href}`;
        const isActive = pathname === fullHref;

        return (
          <Link href={fullHref} key={item.name} className="w-full">
            <Button
              variant="ghost"
              className={`
                w-full justify-start cursor-pointer
                ${
                  isActive
                    ? "bg-space-blue-light/15 text-space-blue-light shadow-none"
                    : ""
                }
              `}
            >
              <Separator
                orientation="vertical"
                className={`
                  h-full w-1
                  ${
                    isActive ? "bg-space-blue-light" : "bg-transparent"
                  }
                  mr-2
                `}
              />
              <item.icon className="size-5" />
              <span className="ml-2">{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}