// src/constants/registerFormFields.ts
import * as React from "react";
// Note: EyeIcon, EyeOffIcon, and Button imports are not needed here
// as the JSX for the toggle button is rendered in the consuming component.
// If toggleButtonClasses is used, it should be defined or imported where it's used (e.g., RegisterForm).

export type FormFieldConfig = {
  name:
    | "email"
    | "phoneNumber"
    | "password"
    | "confirmPassword"
    | "idNumber"
    | "passport"
    | "firstName"
    | "lastName";
  type: string;
  placeholderKey: string; // Changed to a key for translation
  colSpan?: string;
  prefix?: React.ReactNode;
  toggle?: "password" | "confirmPassword"; // Indicates if a toggle is needed
};

// This function now returns field configurations with placeholder keys
export const getRegisterFormFields = (): FormFieldConfig[] => [
  {
    name: "firstName",
    type: "text",
    placeholderKey: "auth.firstNamePlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
  {
    name: "lastName",
    type: "text",
    placeholderKey: "auth.lastNamePlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
  {
    name: "email",
    type: "email",
    placeholderKey: "auth.emailPlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
  {
    name: "phoneNumber",
    type: "tel",
    placeholderKey: "auth.phoneNumberPlaceholder", // Use translation key
    colSpan: "col-span-1",
    prefix: (
      <div className="flex items-center justify-center h-12 px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
        {/* aria-label now uses a key for translation */}
        <span role="img" aria-label="common.georgiaFlag">
          🇬🇪
        </span>
        <span className="ml-2 text-sm text-gray-700">+995</span>
      </div>
    ),
  },
  {
    name: "password",
    type: "password",
    placeholderKey: "auth.passwordPlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholderKey: "auth.confirmPasswordPlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
  {
    name: "idNumber",
    type: "text",
    placeholderKey: "auth.idNumberPlaceholder", // Use translation key
    colSpan: "col-span-1",
  },
];

// This function now returns field configurations with placeholder keys
export const getLawRegisterFormFields = (): FormFieldConfig[] => {
  return [
    ...getRegisterFormFields(), // Call without 't'
    {
      name: "passport",
      type: "text",
      placeholderKey: "auth.passportNumberPlaceholder", // Use translation key
      colSpan: "col-span-1",
    },
  ];
};
