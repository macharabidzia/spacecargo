import { LucideIcon, User, Phone, Briefcase } from "lucide-react";

interface FieldConfig<TFieldName extends string> {
  name: TFieldName;
  labelKey: string;
  placeholderKey?: string;
  type: "text" | "email" | "password" | "number" | "tel" | "textarea" | "file";
  Icon?: LucideIcon;
  readOnly?: boolean;
  prefix?: string;
}

type PersonalInfoFieldName = "firstName" | "lastName" | "personalNumber" | "phoneNumber";

export const authorizedPersonFields: FieldConfig<PersonalInfoFieldName>[] = [
  {
    name: "firstName",
    labelKey: "authorizedPersons.firstNameLabel",
    placeholderKey: "authorizedPersons.firstNamePlaceholder",
    type: "text",
    Icon: User,
  },
  {
    name: "lastName",
    labelKey: "authorizedPersons.lastNameLabel",
    placeholderKey: "authorizedPersons.lastNamePlaceholder",
    type: "text",
    Icon: User,
  },
  {
    name: "personalNumber",
    labelKey: "authorizedPersons.personalNumberLabel",
    placeholderKey: "authorizedPersons.personalNumberPlaceholder",
    type: "text",
    Icon: Briefcase,
  },
  {
    name: "phoneNumber",
    labelKey: "authorizedPersons.phoneNumberLabel",
    placeholderKey: "authorizedPersons.phoneNumberPlaceholder",
    type: "tel",
    Icon: Phone,
  },
];