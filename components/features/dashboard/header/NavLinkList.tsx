// components/NavLinkList.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, Box, Truck, Calculator } from "lucide-react";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export function NavLinkList() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentLanguage = pathSegments[0] || "en";
  const { t } = useClientTranslation("common");

  const navItems: NavItem[] = [
    {
      name: "navLinkList.room",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "navLinkList.myParcels",
      href: "/dashboard/parcels",
      icon: Box,
    },
    {
      name: "navLinkList.courier",
      href: "/dashboard/courier",
      icon: Truck,
    },
    {
      name: "navLinkList.calculator",
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

        let isCurrentItemActive = false;
        if (item.href === "/dashboard") {
          isCurrentItemActive = pathname === fullHref || pathname === `/${currentLanguage}/dashboard`;
        } else {
          isCurrentItemActive = pathname.startsWith(fullHref);
          const afterHref = pathname.substring(fullHref.length);
          if (isCurrentItemActive && afterHref.length > 0 && afterHref[0] !== '/' && afterHref[0] !== '?') {
            isCurrentItemActive = false;
          }
        }

        return (
          <Link href={fullHref} key={item.name} className="w-full">
            <Button
              variant="ghost"
              className={`
                w-full justify-start 
                ${isCurrentItemActive
                  ? "bg-space-blue-light/15 text-space-blue-light shadow-none"
                  : ""
                }
              `}
            >
              <Separator
                orientation="vertical"
                className={`
                  h-full w-1
                  ${isCurrentItemActive ? "bg-space-blue-light" : "bg-transparent"}
                  mr-2
                `}
              />
              <item.icon className="size-5" />
              <span className="ml-2">{t(item.name)}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}