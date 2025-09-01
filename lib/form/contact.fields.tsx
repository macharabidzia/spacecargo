// src/lib/forms/contact.form.ts
import { FormFieldConfig } from "@/types";

export const getContactFormFields = (): FormFieldConfig[] => [
  {
    name: "contact-name",
    type: "text",
    placeholderKey: "contact.namePlaceholder",
    labelKey: "contact.nameLabel",
    colSpan: "md:col-span-2",
  },
  {
    name: "contact-email",
    type: "email",
    placeholderKey: "contact.emailPlaceholder",
    labelKey: "contact.emailLabel",
    colSpan: "md:col-span-2",
  },
  {
    name: "contact-subject",
    type: "text",
    placeholderKey: "contact.subjectPlaceholder",
    labelKey: "contact.subjectLabel",
    colSpan: "md:col-span-2",
  },
  {
    name: "contact-message",
    type: "textarea",
    placeholderKey: "contact.messagePlaceholder",
    labelKey: "contact.messageLabel",
    colSpan: "md:col-span-2",
    rows: 5,
  },
];
