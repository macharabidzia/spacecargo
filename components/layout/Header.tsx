import Link from "next/link";
import { siteConfig } from "@/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { AppDictionary, CommonDictionary } from "@/types/dictionary";

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
  // Fetch the dictionary. Assuming getDictionary returns the flat object structure you provided.
  const fullDictionary: AppDictionary = await getDictionary(currentLanguage);
  const dictionary: CommonDictionary = fullDictionary.common;

  return (
    <header className={cn("w-full py-4", className)}>
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex space-x-6 justify-center items-center">
          <Link
            href={`/${currentLanguage}/`}
            className="space-x-2 text-2xl font-bold text-foreground hover:text-primary"
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
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={`/${currentLanguage}${item.href}`}
              className="hover:text-space-blue-light transition-colors duration-200 text-foreground"
            >
              {dictionary[item.titleKey]}
              
            </Link>
          ))}
        </nav>
        <nav className="flex items-center space-x-6">
          <Button
            variant="default"
            className="bg-space-blue-light rounded-md cursor-pointer"
            style={{ minWidth: "90px", minHeight: "40px" }}
          >
            {/* Accessing directly from the flat dictionary object */}
            {dictionary["header.register"]}
          </Button>
          <Button
            variant="default"
            className="bg-space-blue rounded-md cursor-pointer dark:bg-white/90"
            style={{ minWidth: "70px", minHeight: "40px" }}
          >
            {/* Accessing directly from the flat dictionary object */}
            {dictionary["header.login"]}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
