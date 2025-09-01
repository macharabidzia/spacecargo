import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { AppDictionary, CommonDictionary } from "@/types/dictionary";
import { cookies, headers } from "next/headers";
import NavLinkList from "./NavLinkList";
import LogoIcon from "@/public/icons/logo.svg";
import UserDropdown from "./UserDropdown";
import { fetchUserDashboard } from "@/actions/user.actions";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type HeaderInterface = {
  children?: React.ReactNode;
  className?: string;
  currentLanguage: "en" | "ka";
};

const Header: React.FC<HeaderInterface> = async ({
  className,
  currentLanguage,
}) => {
  const logoSizeClass = "w-[88px] h-[88px]";

  const fullDictionary: AppDictionary = await getDictionary(currentLanguage);
  const dictionary: CommonDictionary = fullDictionary.common;

  const headersList = await headers();
  const pathnameServer = headersList.get("x-pathname") || `/${currentLanguage}/`;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("spacecargo_session")?.value;
  const isLoggedIn = !!authToken;
  let dashboardInfo;
  if(isLoggedIn){
    dashboardInfo = await fetchUserDashboard();;
  }



  return (
    <header
      className={cn(
        "w-full py-4 shadow-md bg-white dark:bg-gray-900",
        className
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex space-x-6 justify-center items-center">
          <Link
            aria-label="Space Cargo"
            href={`/${currentLanguage}/`}
            className={cn(
              "space-x-2 text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
              (pathnameServer === `/${currentLanguage}` ||
                pathnameServer === `/${currentLanguage}/`) &&
              "text-blue-600 dark:text-blue-400"
            )}
          >
            <div className={cn("flex", logoSizeClass)}>
              <LogoIcon className="h-fit w-full fill-blue-600 dark:fill-white" />
            </div>
          </Link>
          <div className="hidden md:block">
            <NavLinkList currentLanguage={currentLanguage} dictionary={dictionary} />
          </div>
        </nav>

        <nav className="flex items-center space-x-3">
          {!isLoggedIn && (
            <>
              <Link href={`/${currentLanguage}/register`}>
                <Button
                  variant="default"
                  className="bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-100 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
                >
                  {currentLanguage === "en" ? "Sign Up" : "რეგისტრაცია"}
                </Button>
              </Link>
              <Link href={`/${currentLanguage}/login`}>
                <Button
                  variant="default"
                  className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {currentLanguage === "en" ? "Log In" : "შესვლა"}
                </Button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                className="relative inline-block rounded-full bg-gray-100 dark:bg-gray-800 p-2 transform hover:scale-105 duration-300"
                href={`/${currentLanguage}/notifications`}
              >
                <Bell className="text-gray-700 dark:text-gray-200" size={20} />
                {dashboardInfo && dashboardInfo.unreadMessagesCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs rounded-full"
                  >
                    {dashboardInfo?.unreadMessagesCount}
                  </Badge>
                )}
              </Link>

              <Link href={`/${currentLanguage}/vouchers`}>
                <Button
                  variant="default"
                  className="rounded-2xl min-w-[170px] flex flex-row items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 "
                >
                  <span className="font-semibold uppercase text-gray-700 dark:text-gray-300">
                    Space
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {dictionary["dashboardStats.spaceCoins"].split(" ")[1]}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {dashboardInfo?.bonusPoint}
                  </span>
                </Button>
              </Link>

              <UserDropdown dictionary={dictionary} currentLanguage={currentLanguage} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
