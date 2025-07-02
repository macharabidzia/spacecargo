// components/NavLinkList.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, Box, Truck, Calculator } from "lucide-react";

// Define the shape of a navigation item
interface NavItem {
  name: string;
  href: string; // This will now be the base href without the language prefix
  icon: React.ElementType; // For Lucide icons
}

// No specific props needed for NavLinkList if it gets language internally
interface NavLinkListProps {}

export function NavLinkList({}: NavLinkListProps) {
  const pathname = usePathname(); // Get the current path from Next.js

  // --- Extract current language from pathname ---
  // Assuming your paths are structured like /<lang>/dashboard/room
  const pathSegments = pathname.split("/").filter(Boolean); // Split and remove empty strings
  const currentLanguage = pathSegments[0] || "en"; // Get the first segment, default to 'en'

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
        console.log(
          `Current Path: ${pathname}, Item Href: ${fullHref}, Is Active: ${isActive}`
        );

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
                  h-full w-1 // Adjusted width for separator to be more visible
                  ${
                    isActive ? "bg-space-blue-light" : "bg-transparent"
                  } // Active separator color
                  mr-2 // Space between separator and icon
                `}
              />
              <item.icon className="size-5" />
              <span className="ml-2">{item.name}</span>{" "}
              {/* Added span for text spacing */}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
