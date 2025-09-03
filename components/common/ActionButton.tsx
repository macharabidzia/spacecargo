"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps<T = any> {
    icon: LucideIcon;
    label?: string;
    onClick: (item: T) => void;
    item: T;
    variant?: "ghost" | "default";
    size?: "icon" | "default";
    colorClass?: string;
    disabled?: boolean;
}

export function ActionButton<T>({
    icon: Icon,
    label,
    onClick,
    item,
    variant = "ghost",
    size = "icon",
    colorClass = "text-gray-600 dark:text-gray-400",
    disabled = false,
}: ActionButtonProps<T>) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={`h-8 w-8 rounded-full ${colorClass} hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer`}
                    onClick={() => onClick(item)}
                    disabled={disabled}
                    title={label}
                >
                    <Icon className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            {label && <TooltipContent side="top" className="bg-gray-800 text-white text-xs p-2 py-3 rounded shadow-md">
                {label}
            </TooltipContent>}
        </Tooltip>
    );
}
