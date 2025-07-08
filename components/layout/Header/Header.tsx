import Link from "next/link";
import { siteConfig } from "@/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { AppDictionary, CommonDictionary } from "@/types/dictionary";
import { cookies, headers } from "next/headers"; // Used to get server-side headers

import NavLinkList from "./NavLinkList";
import { LogOutIcon, LucideLogOut } from "lucide-react";
import { logout } from "@/actions/auth.actions";
import LogoIcon from "@/public/icons/logo.svg";
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
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const isLoggedIn = !!authToken;

  return (
    <header
      className={cn("w-full py-4 bg-white dark:bg-background", className)}
    >
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
              <LogoIcon className="h-fit w-full dark:fill-red-400" />
            </div>
          </Link>
          <NavLinkList
            mainNav={siteConfig.mainNav}
            currentLanguage={currentLanguage}
            dictionary={dictionary}
          />
        </nav>
        {
          <nav className="flex items-center space-x-6">
            {!isLoggedIn && (
              <>
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
              </>
            )}
            {isLoggedIn && (
              <form action={logout}>
                <Button
                  type="submit" // Important: type="submit" for the button to trigger the form
                  variant="default"
                  className="bg-space-blue rounded-md cursor-pointer dark:bg-white/90"
                  style={{ minWidth: "70px", minHeight: "40px" }}
                >
                  <LucideLogOut className="mr-2 h-4 w-4" />{" "}
                  {/* Add some spacing */}
                  {dictionary["header.log_out"]}
                </Button>
              </form>
            )}
          </nav>
        }
      </div>
    </header>
  );
};

export default Header;
