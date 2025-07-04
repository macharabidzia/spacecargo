// components/Header.tsx
// No "use client" here, so it's a Server Component by default

import Link from "next/link";
import { siteConfig } from "@/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { AppDictionary, CommonDictionary } from "@/types/dictionary";
import { headers } from "next/headers"; // Used to get server-side headers

// Import the new Client Component
import NavLinkList from "./NavLinkList";

type HeaderInterface = {
  children?: React.ReactNode;
  className?: string;
  currentLanguage: "en" | "ka";
};

const Header: React.FC<HeaderInterface> = async ({
  className,
  currentLanguage,
}) => {
  const logoWidth = 88;
  const logoHeight = 88;
  const fullDictionary: AppDictionary = await getDictionary(currentLanguage);
  const dictionary: CommonDictionary = fullDictionary.common;
  const headersList = await headers();
  const currentPathNameServer =
    headersList.get("x-pathname") || `/${currentLanguage}/`;
  return (
    <header className={cn("w-full py-4 bg-white dark:bg-background", className)}>
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex space-x-6 justify-center items-center">
          <Link
            href={`/${currentLanguage}/`}
            className={cn(
              "space-x-2 text-2xl font-bold text-foreground hover:text-primary",
              (currentPathNameServer === `/${currentLanguage}` ||
                currentPathNameServer === `/${currentLanguage}/`) &&
                "text-primary"
            )}
          >
            <div
              className="flex"
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
            >
              <Image
                className="w-full block dark:hidden"
                src="/icons/logo.svg"
                width={logoWidth}
                height={logoHeight}
                alt="spacecargo light mode icon"
                priority
              />
              <Image
                className="w-full hidden dark:block"
                src="/icons/logo-white.svg"
                width={logoWidth}
                height={logoHeight}
                alt="spacecargo dark mode icon"
                priority
              />
            </div>
          </Link>
          <NavLinkList
            mainNav={siteConfig.mainNav}
            currentLanguage={currentLanguage}
            dictionary={dictionary}
          />
        </nav>
        <nav className="flex items-center space-x-6">
          <Link href={`/${currentLanguage}/register`}>
            <Button
              variant="default"
              className="bg-space-blue-light rounded-md cursor-pointer"
              style={{ minWidth: "90px", minHeight: "40px" }}
            >
              {dictionary["header.register"]}
            </Button>
          </Link>
          <Link href={`/${currentLanguage}/login`}>
            <Button
              variant="default"
              className="bg-space-blue rounded-md cursor-pointer dark:bg-white/90"
              style={{ minWidth: "70px", minHeight: "40px" }}
            >
              {dictionary["header.login"]}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
