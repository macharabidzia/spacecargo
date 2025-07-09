import * as React from "react";
import {
  Package,
  DollarSign,
  Boxes,
  Hash,
  Globe,
  Key,
  MessageSquare,
  FileText,
  LucideIcon,
} from "lucide-react";

export type DeclarationFieldName =
  | "shippingCode"
  | "totalUsd"
  | "categories"
  | "quantity"
  | "websiteOfPurchase"
  | "oneTimePassword"
  | "commentEng"
  | "attachedFileName";

export type DeclarationField = {
  name: DeclarationFieldName; // Use the specific type for better safety
  type: string;
  value: string | number;
  labelKey: string; // Key for translation of the field label
  placeholderKey?: string; // Key for translation of the placeholder
  readOnly?: boolean;
  prefix?: React.ReactNode;
  comment?: string;
  Icon: LucideIcon;
};

export const declarationFields: DeclarationField[] = [
  {
    name: "shippingCode",
    type: "text",
    value: "849020991",
    labelKey: "declaration.shippingCode", // Changed to match translation structure
    placeholderKey: "declaration.shippingCodePlaceholder", // Added placeholder key
    Icon: Package,
  },
  {
    name: "totalUsd",
    type: "number",
    value: 1330,
    labelKey: "declaration.totalUsd",
    placeholderKey: "declaration.totalUsdPlaceholder",
    prefix: "$",
    Icon: DollarSign,
  },
  {
    name: "categories",
    type: "text",
    value: "All Categories",
    labelKey: "declaration.categories",
    placeholderKey: "declaration.categoriesPlaceholder",
    Icon: Boxes,
  },
  {
    name: "quantity",
    type: "number",
    value: 4,
    labelKey: "declaration.quantity",
    placeholderKey: "declaration.quantityPlaceholder",
    Icon: Hash,
  },
  {
    name: "websiteOfPurchase",
    type: "url",
    value: "amazon.com",
    labelKey: "declaration.websiteOfPurchase",
    placeholderKey: "declaration.websiteOfPurchasePlaceholder",
    Icon: Globe,
  },
  {
    name: "oneTimePassword",
    type: "text",
    value: "839211",
    labelKey: "declaration.oneTimePassword",
    placeholderKey: "declaration.oneTimePasswordPlaceholder",
    Icon: Key,
  },
  {
    name: "commentEng",
    type: "textarea",
    value:
      "If the product contains parts, please indicate the exact quantity. Otherwise, the product will be counted according to the declaration. If it is a whole product, the declaration must indicate the full quantity.",
    labelKey: "declaration.commentEng",
    placeholderKey: "declaration.commentEngPlaceholder",
    Icon: MessageSquare,
  },
  {
    name: "attachedFileName",
    type: "text",
    value: "declaration-04-09-2023.pdf",
    labelKey: "declaration.attachedFile",
    placeholderKey: "declaration.attachedFilePlaceholder",
    Icon: FileText,
  },
];
