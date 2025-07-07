// components/layout/LanguageSwitcher.tsx
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
import { useRouter, usePathname } from "next/navigation";
import { i18n } from "@/i18n/settings"; // Assuming i18n settings are universally accessible

interface LanguageSwitcherProps {
  currentLang: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLanguageChange = (newLang: string) => {

    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
    setIsDropdownOpen(false); // Explicitly close the dropdown after navigation
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
        {i18n.locales.map((lang: string) => (
          <DropdownMenuItem
            key={lang}
            onSelect={() => handleLanguageChange(lang)}
            className={`
              flex items-center justify-between gap-2
              ${currentLang === lang ? "bg-accent text-accent-foreground" : ""}
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
  );
};

export default React.memo(LanguageSwitcher);
