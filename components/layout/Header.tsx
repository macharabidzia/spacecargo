"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

type HeaderInterface = {
  children?: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderInterface> = ({ className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/icons/logo-white.svg" : "/icons/logo.svg";
  const logoWidth = 75;
  const logoHeight = 100;

  return (
    <header className={cn("w-full py-4", className)}>
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex space-x-6 justify-center items-center">
          <Link
            href="/"
            className="space-x-2 text-2xl font-bold text-foreground hover:text-primary"
          >
            <div
              className="flex"
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
            >
              <Image
                className="w-full"
                src={logoSrc}
                width={logoWidth}
                height={logoHeight}
                alt="spacecargo icon"
                priority
              />
            </div>
          </Link>
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary transition-colors duration-200 text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center space-x-6">
          <Button
            variant="default"
            className="bg-space-blue-light rounded-md cursor-pointer"
            style={{ minWidth: "90px", minHeight: "40px" }}
          >
            რეგისტრაცია
          </Button>
          <Button
            variant="default"
            className="bg-space-blue rounded-md cursor-pointer dark:bg-white/90"
            style={{ minWidth: "70px", minHeight: "40px" }}
          >
            შესვლა
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
