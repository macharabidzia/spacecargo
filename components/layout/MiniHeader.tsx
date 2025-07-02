"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/i18n/settings";

interface MiniHeaderProps {
  children?: React.ReactNode;
  currentLang: string;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ children, currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToLanguage = (newLang: string) => {
    if (newLang === currentLang) return;
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="w-full bg-space-blue h-14">
      <div className="container text-white py-4 flex flex-row justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {children}
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row gap-2 items-center justify-center cursor-pointer">
                <div className="w-[23px] h-[23px] rounded-md items-center flex justify-center overflow-hidden">
                  <Image
                    width={23}
                    height={23}
                    src={`/icons/${currentLang}.png`}
                    alt={`${currentLang.toUpperCase()} flag`}
                    priority
                    className="w-auto h-auto"
                  />
                </div>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              {i18n.locales.map((lang: any) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => navigateToLanguage(lang)}
                  className={`
                    flex items-center justify-between gap-2
                    ${
                      currentLang === lang
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }
                  `}
                >
                  <span>{lang.toUpperCase()}</span>
                  <DropdownMenuShortcut>
                    <Image
                      width={23}
                      height={15}
                      src={`/icons/${lang}.png`}
                      alt={`${lang.toUpperCase()} flag`}
                      className="w-full h-full"
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
