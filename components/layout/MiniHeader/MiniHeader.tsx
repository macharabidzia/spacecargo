// components/layout/MiniHeader.tsx
import React from "react";
import { ThemeToggle } from "../ThemeToggle"; // Assuming this path is correct
import LanguageSwitcher from "./LanguageSwitcher";

interface MiniHeaderProps {
  children?: React.ReactNode;
  currentLang: string;
}

const MiniHeader: React.FC<MiniHeaderProps> = ({ children, currentLang }) => {
  return (
    <div className="w-full bg-space-blue h-14">
      <div className="container text-white py-4 flex flex-row justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {children}
        </div>
        <div>
          <LanguageSwitcher currentLang={currentLang} />{" "}
          {/* Use the new component */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MiniHeader);
