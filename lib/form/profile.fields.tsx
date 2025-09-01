
export type FormFieldConfig = {
  name:
    | "firstNameGe"
    | "firstNameEn"
    | "lastNameGe"
    | "lastNameEn"
    | "email"
    | "phone"
    | "personalNumber"
    | "gender"
    | "departmentId"
    | "declarationAgreement";
  type: string;
  placeholderKey: string;
  colSpan?: string;
  prefix?: React.ReactNode;
  toggle?: "password" | "confirmPassword";
  disabled?: boolean;
};

export const getDepartmentFormFields = (): FormFieldConfig[] => [
  {
    name: "firstNameGe",
    type: "text",
    placeholderKey: "department.firstNamePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "firstNameEn",
    type: "text",
    placeholderKey: "department.firstNameEnPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "lastNameGe",
    type: "text",
    placeholderKey: "department.lastNamePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "lastNameEn",
    type: "text",
    placeholderKey: "department.lastNameEnPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "email",
    type: "email",
    placeholderKey: "department.emailPlaceholder",
    colSpan: "col-span-1",
    disabled: true,
  },
  {
    name: "phone",
    type: "tel",
    placeholderKey: "department.mobilePlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "personalNumber",
    type: "text",
    placeholderKey: "department.personalNumberPlaceholder",
    colSpan: "col-span-1",
    disabled: true,
  },
  {
    name: "gender",
    type: "select",
    placeholderKey: "department.genderPlaceholder",
    colSpan: "col-span-1",
  },
  {
    name: "departmentId",
    type: "select",
    placeholderKey: "department.departmentPlaceholder",
  },
  {
    name: "declarationAgreement",
    type: "checkbox",
    placeholderKey: "department.departmentPlaceholder",
  },
];
