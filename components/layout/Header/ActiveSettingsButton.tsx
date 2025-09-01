"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

type ActiveSettingsButtonProps = {
    currentLanguage: "en" | "ka";
};

const ActiveSettingsButton: React.FC<ActiveSettingsButtonProps> = ({
    currentLanguage,
}) => {
    const pathname = usePathname();

    const settingsHref = `/${currentLanguage}/settings`;

    const normalizedPathname =
        pathname.endsWith("/") && pathname.length > 1
            ? pathname.slice(0, -1)
            : pathname;

    const isSettingsActive =
        normalizedPathname === settingsHref ||
        normalizedPathname.startsWith(`${settingsHref}/`);


    return (
        <Link href={settingsHref}>
            <Button
                variant="outline"
                className={cn(
                    `rounded-md  mx-auto flex`,
                    isSettingsActive
                        ? "bg-space-blue-light text-white border-space-blue-light"
                        : "border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-600"
                )}
            >
                <Settings className="h-4 w-4" />
          
            </Button>
        </Link>
    );
};

export default ActiveSettingsButton;