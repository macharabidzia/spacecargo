"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/i18n/settings";
import { useGlobalDataStore } from "@/store/GlobalDataStore";

interface LanguageSwitcherProps {
  currentLang: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const singleNews = useGlobalDataStore((s) => s.singleNews);

const handleLanguageChange = (newLang: string) => {
  const segments = pathname.split("/").filter(Boolean);
  if (i18n.locales.includes(segments[0])) {
    segments[0] = newLang;
  } else {
    segments.unshift(newLang);
  }
  if (singleNews && pathname.includes("/news/")) {
    const titleIndex = segments.findIndex((s) => s === segments[segments.length - 1]);
    segments[titleIndex] = newLang === "en" ? singleNews[0].Title_EN : singleNews[0].Title_GE;
  }
  const newPath = "/" + segments.join("/");
  setIsDropdownOpen(false);
  router.push(newPath);
};

  const getLanguageName = (langCode: string) => {
    switch (langCode) {
      case "en":
        return "English";
      case "ge":
        return "Georgian";
      default:
        return langCode.toUpperCase();
    }
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center gap-2  rounded-md px-2
       dark:bg-gray-800 hover:bg-gray-200/15 dark:hover:bg-gray-700
      transition-colors duration-200 overflow-hidden"
          aria-label={`Current language: ${getLanguageName(
            currentLang
          )}. Click to change.`}
          role="button"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center shadow-sm">
            <Image
              width={18}
              height={18}
              src={`/icons/${currentLang}.png`}
              alt={`${currentLang.toUpperCase()} flag`}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <ChevronDown
            className={`transition-transform duration-200 text-gray-600 dark:text-gray-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-40 p-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700
          bg-gradient-to-br from-white/90 via-gray-50/80 to-white/80 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/80
          backdrop-blur-sm"
        align="end"
      >
        {i18n.locales.map((lang: string) => {
          const isSelected = currentLang === lang;
          return (
            <DropdownMenuItem
              key={lang}
              onSelect={() => handleLanguageChange(lang)}
              className={`
                flex items-center gap-3 p-2 rounded-md 
                transition-colors duration-200
                ${isSelected
                  ? "bg-blue-500 text-white dark:bg-blue-400"
                  : "text-gray-800 dark:text-gray-200"
                }
                hover:bg-blue-100 dark:hover:bg-blue-600
              `}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-gray-300 dark:border-gray-600 shadow-sm">
                <Image
                  width={24}
                  height={24}
                  src={`/icons/${lang}.png`}
                  alt={`${lang.toUpperCase()} flag`}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <span className="font-medium">{getLanguageName(lang)}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(LanguageSwitcher);
