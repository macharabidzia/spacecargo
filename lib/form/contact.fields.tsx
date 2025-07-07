// src/constants/contactFormFields.ts

import * as React from "react"; // Required for React.ReactNode in prefix

export type FormFieldConfig = {
  name:
    | "email"
    | "phoneNumber"
    | "firstName"
    | "lastName"
    | "subject"
    | "message";
  type: string;
  placeholderKey: string;
  labelKey: string; // Made required for contact form fields, remove '?' if always present
  colSpan?: string;
  prefix?: React.ReactNode;
  toggle?: "password" | "confirmPassword";
  rows?: number;
};

// Now accepts 't' as an argument for translation of the prefix
export const getContactFormFields = (
  t: (key: string) => string
): FormFieldConfig[] => [
  {
    name: "firstName",
    type: "text",
    placeholderKey: "contact.firstNamePlaceholder",
    labelKey: "contact.firstNameLabel", // Added labelKey
    colSpan: "md:col-span-1",
  },
  {
    name: "lastName",
    type: "text",
    placeholderKey: "contact.lastNamePlaceholder",
    labelKey: "contact.lastNameLabel", // Added labelKey
    colSpan: "md:col-span-1",
  },
  {
    name: "email",
    type: "email",
    placeholderKey: "contact.emailPlaceholder",
    labelKey: "contact.emailLabel", // Added labelKey
    colSpan: "md:col-span-1",
  },
  {
    name: "phoneNumber",
    type: "tel",
    placeholderKey: "contact.phoneNumberPlaceholder",
    labelKey: "contact.phoneNumberLabel", // Added labelKey
    colSpan: "md:col-span-1",
    prefix: (
      <div className="flex items-center justify-center h-full px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
        {/* Using 't' for aria-label to translate 'Georgia Flag' */}
        <span role="img" aria-label={t("common.georgiaFlag")}>
          🇬🇪
        </span>
        <span className="ml-2 text-sm text-gray-700">+995</span>
      </div>
    ),
  },
  {
    name: "subject",
    type: "text",
    placeholderKey: "contact.subjectPlaceholder",
    labelKey: "contact.subjectLabel", // Added labelKey
    colSpan: "md:col-span-2",
  },
  {
    name: "message",
    type: "textarea",
    placeholderKey: "contact.messagePlaceholder",
    labelKey: "contact.messageLabel", // Added labelKey
    colSpan: "md:col-span-2",
    rows: 5,
  },
];
