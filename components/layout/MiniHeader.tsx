"use client";
import React, { useState } from "react";
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

const MiniHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="w-full bg-space-blue h-14">
      <div className="container text-white py-4 flex flex-row justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {children}
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-[23px] h-[23px] rounded-md items-center flex">
                  <Image
                    width={23}
                    height={15}
                    src="/icons/ge.svg"
                    alt="Header background"
                    className="w-[23px] h-[23px]"
                  />
                </div>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuItem>
                GE
                <DropdownMenuShortcut>
                  <Image
                    width={23}
                    height={15}
                    src="/icons/ge.svg"
                    alt="Header background"
                    className="w-[23px] h-[23px]"
                  />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
