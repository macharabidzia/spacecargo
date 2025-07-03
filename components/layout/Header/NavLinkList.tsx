// components/NavLinkList.tsx
"use client"; // This makes it a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CommonDictionary } from "@/types/dictionary";

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

  return (
    <>
      {mainNav.map((item) => {
        const linkHref = `/${currentLanguage}${
          item.href === "/" ? "" : item.href
        }`;
        console.log(item.href,linkHref)
        const isActive =
          (item.href === "/" &&
            (pathname === `/${currentLanguage}` ||
              pathname === `/${currentLanguage}/`)) ||
          (item.href !== "/" && pathname.startsWith(linkHref));

          console.log(linkHref)
          
        return (
          <Link
            key={item.href}
            href={linkHref}
            className={cn(
              "hover:text-space-blue-light font-medium transition-colors duration-200 text-foreground",
              isActive
                ? "text-space-blue-light dark:text-white/90"
                : "active:text-white"
            )}
          >
            {dictionary[item.titleKey as keyof CommonDictionary]?.toUpperCase()}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinkList;
