// components/NavLinkList.tsx
"use client";

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
    <div
      className={cn(
        "flex flex-col space-y-4 px-4",
        "md:flex-row md:space-x-6 md:space-y-0 md:px-0"
      )}
    >
      {mainNav.map((item) => {
        // Construct the full link path including language prefix.
        // For the root href "/", generate "/en" or "/ka".
        // For other hrefs, prefix with the language.
        const linkHref =
          item.href === "/" ? `/${currentLanguage}` : `/${currentLanguage}${item.href}`;

        // Normalize the current pathname by removing a trailing slash if it's not the actual root "/"
        // This helps in consistent comparison, e.g., "/ka/" becomes "/ka"
        const normalizedPathname = pathname.endsWith('/') && pathname !== '/'
          ? pathname.slice(0, -1)
          : pathname;

        // Determine if the link is active
        const isActive =
          // Case 1: Exact match for the normalized pathname and the constructed linkHref.
          // This covers routes like "/en", "/ka", "/en/news", "/ka/about".
          normalizedPathname === linkHref ||
          // Case 2: Special handling for the root route (item.href === "/")
          // If the link is the root link (e.g., "/ka") and the normalized pathname is also the root for that language.
          // This is a direct check for the language root, essential for correct activation.
          (item.href === "/" && normalizedPathname === `/${currentLanguage}`) ||
          // Case 3: For non-root links, check if the normalized pathname starts with the link's href,
          // followed by a slash to ensure a full segment match.
          // This activates parent links for nested routes (e.g., "/ka/news" for "/ka/news/article-1").
          (item.href !== "/" && normalizedPathname.startsWith(`${linkHref}/`));

        return (
          <Link
            key={item.href}
            href={linkHref}
            className={cn(
              "hover:text-space-blue-light font-medium transition-colors duration-200 text-foreground/75",
              isActive
                ? "text-space-blue-light dark:text-white/90"
                : "active:text-white", // Consider removing this 'active:text-white' if it's meant for a click state only, or define it for active.
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