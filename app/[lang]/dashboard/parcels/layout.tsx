
import ParcelsTabs from "@/components/features/dashboard/parcels/ParcelsTabs";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config";
import React from "react";
export const metadata = {
    robots: {
        index: false,
        follow: true,
    },
};
const ParcelsLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container">
            <Card className="p-0 m-0 py-2">
                <CardContent className="p-0">
                    <ParcelsTabs tabsData={siteConfig.parcelsTabsData} />
                    {children}
                </CardContent>
            </Card>
        </div>
    );
};

export default ParcelsLayout;