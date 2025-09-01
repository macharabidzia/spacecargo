// components/ui/TabsComponent.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { triggerStyles } from "@/constants/styles";
import React from "react";
import { useClientTranslation } from "@/i18n/i18n-provider";

type TabData = {
    value: string;
    href?: string;
};

type TabsComponentProps = {
    tabsData: TabData[];
    containerClassName?: string;
    activeTabValue: string;
    onValueChange: (value: string) => void;
    children?: React.ReactNode;
};

export const CustomTabsComponent = ({
    tabsData,
    containerClassName,
    activeTabValue,
    onValueChange,
    children,
}: TabsComponentProps) => {
    const { t } = useClientTranslation();

    return (
        <div>
            <Tabs value={activeTabValue} onValueChange={onValueChange} className="w-full py-1.5">
                <TabsList
                    className={`flex h-fit gap-10 flex-col justify-between w-full bg-transparent p-0 py-0.5 lg:flex-row ${containerClassName}`}
                >
                    {tabsData.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className={`${triggerStyles} data-[state=active]:bg-transparent dark:data-[state=active]:text-white opacity-100 data-[state=active]:font-semibold dark:data-[state=active]:border-none dark:data-[state=active]:bg-transparent `}
                        >
                            {t(`tabsData.${tab.value}`)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <Separator className="dark:bg-white" />
                {children}
            </Tabs>
        </div>
    );
};