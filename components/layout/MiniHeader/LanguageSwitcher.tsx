// components/layout/LanguageSwitcher.tsx
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuShortcut, // No longer used for flags, but keep if you use it for actual shortcuts
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/i18n/settings"; // Assuming i18n settings are universally accessible

interface LanguageSwitcherProps {
  currentLang: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLanguageChange = async (newLang: string) => {
    // Robust path generation logic
    const basePaths = pathname.split("/").filter(Boolean); // Remove empty strings
    let newPath = "";

    if (basePaths.length > 0 && i18n.locales.includes(basePaths[0])) {
      // Path has a language segment, replace it
      newPath = `/${newLang}/${basePaths.slice(1).join("/")}`;
    } else {
      // Path does not have a language segment (e.g., '/', '/about'), prepend it
      newPath = `/${newLang}${pathname === "/" ? "" : pathname}`;
    }
    await setIsDropdownOpen(false); // Explicitly close the dropdown after navigation

    router.push(newPath);
  };

  // Function to get the full language name (e.g., 'en' -> 'English')
  // Still useful for accessibility labels and dropdown menu items
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
        {/* ORIGINAL DROPDOWN TRIGGER - KEPT AS IS */}
        <div
          className="flex flex-row gap-2 items-center justify-center cursor-pointer"
          // Added accessibility label for better context when current language name isn't visible
          aria-label={`Current language: ${getLanguageName(
            currentLang
          )}. Click to change.`}
          role="button" // Indicate that this div acts like a button
        >
          <div className="w-[23px] h-[23px] rounded-md items-center flex justify-center overflow-hidden">
            <Image
              width={23}
              height={23}
              src={`/icons/${currentLang}.png`}
              alt={`${currentLang.toUpperCase()} flag`}
              priority
              className="w-auto h-auto" // Adjusted to 'object-contain' for flags if needed, or 'w-full h-full object-cover'
            />
          </div>
          <ChevronDown
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[120px] bg-white p-1 shadow-lg rounded-md border border-gray-200 dark:border-gray-700"
        align="end" // Align dropdown to the end of the trigger
      >
        {i18n.locales.map((lang: string) => (
          <DropdownMenuItem
            key={lang}
            onSelect={() => handleLanguageChange(lang)}
            className={`
              flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors duration-200
              text-sm text-gray-800 dark:text-gray-200
                
              ${currentLang === lang ? " dark:text-blue-200 font-semibold" : ""}
            `}
          >
            {/* Flag inside dropdown */}
            <div className="w-5 h-5 flex-shrink-0 rounded-sm overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-600">
              <Image
                width={20}
                height={20}
                src={`/icons/${lang}.png`}
                alt={`${lang.toUpperCase()} flag`}
                className="object-cover w-full h-full"
                unoptimized // Flags in dropdown can be unoptimized
              />
            </div>
            {/* Language Name */}
            <span>{getLanguageName(lang)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(LanguageSwitcher);
