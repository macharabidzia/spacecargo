import { BaseRegisterValues } from "@/schemas/auth.schema";
export type FormFieldConfig<T> = {
  name: T;
  type: string;
  placeholderKey: string;
  colSpan?: string;
  prefix?: React.ReactNode | boolean;
};

export const getRegisterFormFields = (): FormFieldConfig<
  keyof BaseRegisterValues
>[] => [
  {
    name: "email",
    type: "email",
    placeholderKey: "auth.emailPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "phone",
    type: "tel",
    placeholderKey: "auth.phoneNumberPlaceholder",
    colSpan: "col-span-1",
    prefix: (
      <div className="flex items-center justify-center h-12 px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
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
    placeholderKey: "auth.passwordPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "password_confirmation",
    type: "password",
    placeholderKey: "auth.confirmPasswordPlaceholder",
    colSpan: "col-span-1",
  },
];

export type FormFieldConfigLaw = {
  name: string;
  type: string;
  placeholderKey: string;
  colSpan?: string;
  prefix?: boolean;
};

export const getLawRegisterFormFields = (): FormFieldConfigLaw[] => [
  {
    name: "first_name_en",
    type: "text",
    placeholderKey: "auth.firstNameEnPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "last_name_en",
    type: "text",
    placeholderKey: "auth.lastNameEnPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "first_name_ge",
    type: "text",
    placeholderKey: "auth.firstNameGePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "last_name_ge",
    type: "text",
    placeholderKey: "auth.lastNameGePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "personal_id",
    type: "text",
    placeholderKey: "auth.personalIdPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "gender",
    type: "select", // Assuming dropdown for M/F
    placeholderKey: "auth.genderPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "company_name_en",
    type: "text",
    placeholderKey: "auth.companyNameEnPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "company_name_ge",
    type: "text",
    placeholderKey: "auth.companyNameGePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "company_id",
    type: "text",
    placeholderKey: "auth.companyIdPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "department_id",
    type: "number",
    placeholderKey: "auth.departmentIdPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "promo_code",
    type: "text",
    placeholderKey: "auth.promoCodePlaceholder",
    colSpan: "col-span-1",
  },
];

export const getPhysicalProfileFields = (): FormFieldConfigLaw[] => {
  const allFields = getLawRegisterFormFields();
  const personalFields = allFields.filter(
    (field) =>
      !["company_name_en", "company_name_ge", "company_id"].includes(field.name)
  );

  return personalFields;
};
