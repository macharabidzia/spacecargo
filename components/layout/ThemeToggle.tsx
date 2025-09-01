"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-13 h-5 rounded-full bg-gray-200 animate-pulse flex items-center justify-between px-1">
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      </div>
    );
  }

  if (theme === "dark") {
  } else {
  }

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleToggle}
      iconOn={<Moon className="w-3 h-3 text-primary-foreground" />}
      iconOff={<Sun className="w-3 h-3 text-yellow-300" />}
      className="data-[state=unchecked]:bg-space-blue-light w-13 h-5"
      id="airplane-mode"
      aria-label="Toggle Theme"
    />
  );
};
