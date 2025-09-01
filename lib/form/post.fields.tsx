import { FormFieldConfig } from "@/types";
import { UploadCloud } from "lucide-react";

export const getPostalServiceFormFields = (): FormFieldConfig[] => [
    {
        name: "sender_name",
        type: "text",
        placeholderKey: "courier.senderNamePlaceholder",
        labelKey: "courier.senderNameLabel",
        colSpan: "col-span-1",
    },
    {
        name: "send_from_city_id",
        type: "select",
        placeholderKey: "courier.sendFromCityLabel",
        labelKey: "courier.sendFromCityLabel",
        colSpan: "col-span-1",
    },
    {
        name: "send_from_address",
        type: "text",
        placeholderKey: "courier.senderAddressPlaceholder",
        labelKey: "courier.senderAddressLabel",
        colSpan: "col-span-1",
    },
    {
        name: "receiver_name",
        type: "text",
        placeholderKey: "courier.receiverNamePlaceholder",
        labelKey: "courier.receiverNameLabel",
        colSpan: "col-span-1",
    },
    {
        name: "receive_to_city_id",
        type: "select",
        placeholderKey: "courier.receiveToCityLabel",
        labelKey: "courier.receiveToCityLabel",
        colSpan: "col-span-1",
    },
    {
        name: "receive_to_address",
        type: "text",
        placeholderKey: "courier.receiverAddressPlaceholder",
        labelKey: "courier.receiverAddressLabel",
        colSpan: "col-span-1",
    },
    {
        name: "receiver_phone",
        type: "tel",
        placeholderKey: "courier.receiverPhonePlaceholder",
        labelKey: "courier.receiverPhoneLabel",
        colSpan: "col-span-1",
        prefix: (
            <div className="flex items-center justify-center h-full px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                <span role="img" aria-label="Georgia Flag">🇬🇪</span>
                <span className="ml-2 text-sm text-gray-700">+995</span>
            </div>
        ),
    },
    {
        name: "post_type",
        type: "select",
        placeholderKey: "courier.postTypeLabel",
        labelKey: "courier.postTypeLabel",
        colSpan: "col-span-1",
    },
    {
        name: "post_package",
        type: "select",
        placeholderKey: "courier.postPackageLabel",
        labelKey: "courier.postPackageLabel",
        colSpan: "col-span-2",
    },
    {
        name: "comment",
        type: "textarea",
        placeholderKey: "courier.commentPlaceholder",
        labelKey: "courier.commentLabel",
        colSpan: "col-span-1",
    },
    {
        name: "file",
        type: "file",
        placeholderKey: "courier.fileUploadLabel",
        labelKey: "courier.fileUploadLabel",
        colSpan: "col-span-2",
        Icon: UploadCloud,
    },
];
