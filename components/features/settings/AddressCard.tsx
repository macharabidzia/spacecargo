"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface UserAddress {
    id: string; 
    city: {
        city: string; 
    };
    address: string; 
}

interface AddressCardProps {
    address: UserAddress;
    onDelete: (addressId: string) => void; 
    isDeleting: boolean; 
}

const AddressCard: React.FC<AddressCardProps> = ({
    address,
    onDelete,
    isDeleting,
}) => {
    const { t } = useClientTranslation();

    const handleDeleteClick = () => {
        onDelete(address.id);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
            <div>
                <p className="text-md font-semibold text-gray-700">{address.address}</p>
                <p className="text-sm text-gray-500 mt-1">
                    {t("common.city")}: {address.city.city}
                </p>
            </div>
            <div className="mt-4 flex justify-end">
                <Button
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    className="px-4 py-2 text-sm"
                >
                    {isDeleting ? t("common.deleting") : t("common.delete")}
                </Button>
            </div>
        </div>
    );
};

export default AddressCard;