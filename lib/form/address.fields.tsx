
import { FormFieldConfig } from "@/types";
export const getAddressFormFields = (): FormFieldConfig<
    "address" | "cityId"
>[] => [
        {
            name: "cityId",
            type: "select",
            placeholderKey: "courier.cityPlaceholder",
            labelKey: ""
        },
        {
            name: "address",
            type: "text",
            placeholderKey: "courier.addressPlaceholder",
            labelKey: ""
        },
    ];
