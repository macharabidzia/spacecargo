import { FormFieldConfig } from "@/types";
import { User, Phone, Key, SquareCheckBig, } from "lucide-react"; 

export const getAuthorizedPersonFormFields = (): FormFieldConfig[] => [
    {
        name: "firstName",
        labelKey: "authorizedPersons.firstNameLabel", 
        placeholderKey: "authorizedPersons.firstNamePlaceholder",
        type: "text",
        Icon: User,
        colSpan: "col-span-1", 
    },
    {
        name: "lastName",
        labelKey: "authorizedPersons.lastNameLabel", 
        placeholderKey: "authorizedPersons.lastNamePlaceholder",
        type: "text",
        Icon: User,
        colSpan: "col-span-1",
    },
    {
        name: "pin", 
        labelKey: "authorizedPersons.pinLabel", 
        placeholderKey: "authorizedPersons.pinPlaceholder",
        type: "text", 
        Icon: Key, 
        colSpan: "col-span-1",
    },
    {
        name: "phone",
        labelKey: "authorizedPersons.phoneLabel",
        placeholderKey: "authorizedPersons.phonePlaceholder",
        type: "tel",
        Icon: Phone,
        colSpan: "col-span-1",
    },
    {
        name: "residentFlag",
        labelKey: "authorizedPersons.residentFlagLabel",
        placeholderKey: "authorizedPersons.residentFlagDescription", 
        type: "checkbox",
        Icon: SquareCheckBig, 
        colSpan: "col-span-1",
    },
    {
        name: "agreeTerms",
        labelKey: "authorizedPersons.agreeTermsLabel",
        placeholderKey: "authorizedPersons.agreeTermsDescription", 
        type: "checkbox",
        Icon: SquareCheckBig, 
        colSpan: "col-span-1",
    },
];