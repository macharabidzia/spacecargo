import { FormFieldConfig } from "@/types";
import {
    Package,
    DollarSign,
    Key,
    MessageSquare,
    Tag,
    Link,
    UploadCloud,
    Code,
} from "lucide-react";

export const parcelFields: FormFieldConfig[] = [
    {
        name: "tdsCode",
        labelKey: "tdsCode.label",
        placeholderKey: "tdsCode.placeholder",
        type: "text",
        Icon: Code,
    },
    {
        name: "categoryId",
        labelKey: "categoryId.label",
        placeholderKey: "categoryId.placeholder",
        type: "number",
        Icon: Tag,
    },
    {
        name: "declaredAmount",
        labelKey: "price.label",
        placeholderKey: "price.placeholder",
        type: "number",
        Icon: DollarSign,
    },
    {
        name: "itemsCount",
        labelKey: "itemsCount.label",
        placeholderKey: "itemsCount.placeholder",
        type: "number",
        Icon: Package,
    },
    {
        name: "websiteUrl",
        labelKey: "websiteUrl.label",
        placeholderKey: "websiteUrl.placeholder",
        type: "url",
        Icon: Link,
    },
    {
        name: "departmentId",
        labelKey: "department.departmentPlaceholder",
        placeholderKey: "departmentId.placeholder",
        type: "number",
        Icon: Tag,
    },
    {
        name: "comment",
        labelKey: "comment.label",
        placeholderKey: "comment.placeholder",
        type: "textarea",
        Icon: MessageSquare,
    },
    {
        name: "websiteOtp",
        labelKey: "websiteOtp.label",
        placeholderKey: "websiteOtp.placeholder",
        type: "text",
        Icon: Key,
    },
    {
        name: "declarationAgreement",
        labelKey: "declarationAgreement.label",
        placeholderKey: "",
        type: "checkbox",
        Icon: Code,
    },
    {
        name: "file",
        labelKey: "file.label",
        placeholderKey: "file.placeholder",
        type: "file",
        Icon: UploadCloud,
    },
];