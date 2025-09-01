"use client";

import React, { useState } from "react";
import { CustomTabsComponent } from "../CustomTabsComponent";

type TabData = {
    value: string;
    href?: string;
};

type DefaultTabsWrapperProps = {
    tabsData: TabData[];
    containerClassName?: string;
    initialValue?: string;
    children: React.ReactNode;
};

export const DefaultTabsWrapper = ({
    tabsData,
    containerClassName,
    initialValue,
    children
}: DefaultTabsWrapperProps) => {
    const [activeTabValue, setActiveTabValue] = useState(initialValue || tabsData[0].value);

    const handleTabChange = (value: string) => {
        setActiveTabValue(value);
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