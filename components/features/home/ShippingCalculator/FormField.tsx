"use client";

import { cn } from "@/lib/utils"; // Assuming you use shadcn's utility for classnames
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from "react";

interface FormFieldProps {
    label: string;
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    className?: string;
}

export function FormField({ label, Icon, children, className }: PropsWithChildren<FormFieldProps>) {
    return (
        <div className={cn("flex-1 p-4 border border-gray-300 rounded-lg bg-background flex flex-col justify-center min-w-0", className)}>
            <p className="text-xs text-gray-500 mb-2 dark:text-white">{label}</p>
            <div className="flex items-center space-x-3">
                <Icon className="text-md text-gray-600" />
                {children}
            </div>
        </div>
    );
}