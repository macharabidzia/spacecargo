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

export const declarationFields: FormFieldConfig[] = [
  {
    name: "tdsCode",
    placeholderKey: "tdsCode.placeholder",
    labelKey: "tdsCode.label",
    type: "text",
    Icon: Code,
  },
  {
    name: "categoryId",
    placeholderKey: "categoryId.placeholder",
    labelKey: "categoryId.label",
    type: "number",
    Icon: Tag,
  },
  {
    name: "price",
    placeholderKey: "price.placeholder",
    labelKey: "price.label",
    type: "number",
    Icon: DollarSign,
    prefix: "$",
  },
  {
    name: "itemsCount",
    placeholderKey: "itemsCount.placeholder",
    labelKey: "itemsCount.label",
    type: "number",
    Icon: Package,
  },
  {
    name: "websiteUrl",
    placeholderKey: "websiteUrl.placeholder",
    labelKey: "websiteUrl.label",
    type: "url",
    Icon: Link,
  },
  {
    name: "comment",
    placeholderKey: "comment.placeholder",
    labelKey: "comment.label",
    type: "textarea",
    Icon: MessageSquare,
  },
  {
    name: "websiteOtp",
    placeholderKey: "websiteOtp.placeholder",
    labelKey: "websiteOtp.label",
    type: "text",
    Icon: Key,
  },
  {
    name: "file",
    placeholderKey: "file.placeholder",
    labelKey: "file.label",
    type: "file",
    Icon: UploadCloud,
  },
];