// components/wrappers/ParcelsTabs.tsx
"use client";

import { CustomTabsComponent } from "@/components/common/CustomTabsComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type TabData = {
    value: string;
    href: string;
};

type ParcelsTabsProps = {
    tabsData: TabData[];
    containerClassName?: string;
    children?: React.ReactNode;
};

const getActiveTabValue = (currentPath: string, tabsData: TabData[]) => {
    const pathSegments = currentPath.split("/").filter(Boolean);
    const currentLanguage = pathSegments[0] || "en";

    const sortedTabs = [...tabsData].sort((a, b) => b.href.length - a.href.length);

    const exactMatch = sortedTabs.find(
        (tab) => currentPath === `/${currentLanguage}${tab.href}`
    );
    if (exactMatch) {
        return exactMatch.value;
    }

    const prefixMatch = sortedTabs.find((tab) => {
        const fullTabHref = `/${currentLanguage}${tab.href}`;
        return (
            currentPath.startsWith(fullTabHref) &&
            (currentPath.length === fullTabHref.length ||
                currentPath.charAt(fullTabHref.length) === "/" ||
                currentPath.charAt(fullTabHref.length) === "?")
        );
    });
    if (prefixMatch) {
        return prefixMatch.value;
    }

    const baseParcelsPathLocalized = `/${currentLanguage}/dashboard/parcels`;
    if (currentPath === baseParcelsPathLocalized) {
        return "receivable";
    }

    return tabsData[0].value;
};

const ParcelsTabs = ({ tabsData, containerClassName, children }: ParcelsTabsProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [activeTabValue, setActiveTabValue] = useState(() => getActiveTabValue(pathname, tabsData));

    useEffect(() => {
        const newActiveValue = getActiveTabValue(pathname, tabsData);
        if (newActiveValue !== activeTabValue) {
            setActiveTabValue(newActiveValue);
        }
    }, [pathname, activeTabValue, tabsData]);

    const handleTabChange = (value: string) => {
        const selectedTab = tabsData.find((tab) => tab.value === value);
        if (selectedTab) {
            const pathSegments = pathname.split("/").filter(Boolean);
            const currentLanguage = pathSegments[0] || "en";

            const currentParams = new URLSearchParams(searchParams.toString());
            const fullPathWithLang = `/${currentLanguage}${selectedTab.href}`;

            const queryString = currentParams.toString();
            const newUrlToPush = queryString ? `${fullPathWithLang}?${queryString}` : fullPathWithLang;

            const currentFullUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

            if (currentFullUrl !== newUrlToPush) {
                router.push(newUrlToPush);
            }
            setActiveTabValue(value);
        }
    };

    return (
        <CustomTabsComponent
            tabsData={tabsData}
            containerClassName={containerClassName}
            activeTabValue={activeTabValue}
            onValueChange={handleTabChange}
        >
            {children}
        </CustomTabsComponent>
    );
};

export default ParcelsTabs;