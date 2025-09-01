"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CommonDictionary } from "@/types/dictionary";
import { siteConfig } from "@/config";

type NavLinkListProps = {
  currentLanguage: "en" | "ka";
  dictionary: CommonDictionary;
};

const NavLinkList: React.FC<NavLinkListProps> = ({
  currentLanguage,
  dictionary,
}) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 px-4 md:px-0", 
        "md:gap-4 lg:gap-6"
      )}
    >
      {siteConfig.mainNav
        .filter((nav) => nav.href !== "/settings" && nav.href !== '/terms')
        .map((item) => {
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
                "truncate overflow-hidden whitespace-nowrap min-w-0",
                "text-sm xl:text-base sm:text-sm",
                "py-2 md:py-0 w-full md:w-auto",
                "font-medium transition-colors duration-200",
                "hover:text-space-blue-light text-foreground/75",
                isActive
                  ? "text-space-blue-light "
                  : "active:text-white"
              )}
              title={dictionary[item.titleKey as keyof CommonDictionary]}
            >
              {dictionary[item.titleKey as keyof CommonDictionary]}
            </Link>
          );
        })}
    </div>
  );
};

export default NavLinkList;
