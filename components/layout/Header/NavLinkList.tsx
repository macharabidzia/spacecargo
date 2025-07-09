// components/NavLinkList.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CommonDictionary } from "@/types/dictionary";
// Removed useEffect, useMemo, useState as they are no longer needed
import { siteConfig } from "@/config";

type NavLinkListProps = {
  mainNav: any[];
  currentLanguage: "en" | "ka";
  dictionary: CommonDictionary;
};

const NavLinkList: React.FC<NavLinkListProps> = ({
  mainNav,
  currentLanguage,
  dictionary,
}) => {
  const pathname = usePathname();

  // The logic for menuItems is now directly inside the render
  // No need for useMemo here as pathname is stable across renders
  // and the computation is trivial.
  const menuItems = pathname.includes("dashboard")
    ? siteConfig.dashboardNav
    : siteConfig.mainNav;

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 px-4",
        "md:flex-row md:space-x-6 md:space-y-0 md:px-0"
      )}
    >
      {menuItems.map((item) => {
        const linkHref =
          item.href === "/"
            ? `/${currentLanguage}`
            : `/${currentLanguage}${item.href}`;

        const normalizedPathname =
          pathname.endsWith("/") && pathname !== "/"
            ? pathname.slice(0, -1)
            : pathname;

        const isActive =
          normalizedPathname === linkHref ||
          (item.href === "/" && normalizedPathname === `/${currentLanguage}`) ||
          (item.href !== "/" && normalizedPathname.startsWith(`${linkHref}/`));

        return (
          <Link
            key={item.href}
            href={linkHref}
            className={cn(
              "hover:text-space-blue-light font-medium transition-colors duration-200 text-foreground/75",
              isActive
                ? "text-space-blue-light dark:text-white/90"
                : "active:text-white",
              "py-2 text-lg w-full",
              "md:py-0 md:text-base md:w-auto"
            )}
          >
            {dictionary[item.titleKey as keyof CommonDictionary]?.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinkList;
