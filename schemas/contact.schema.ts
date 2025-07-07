// src/schemas/contact.schema.ts
import { z } from "zod";

type Translator = (key: string) => string; // Re-using the Translator type for consistency

export const ContactFormSchema = (t: Translator) =>
  z.object({
    firstName: z
      .string()
      .min(1, { message: t("validation.firstNameRequired") }), // Specific key
    lastName: z.string().min(1, { message: t("validation.lastNameRequired") }), // Specific key
    email: z
      .string()
      .min(1, { message: t("validation.emailRequired") }) // Ensure email is not empty before validating format
      .email(t("validation.invalidEmail")),
    phoneNumber: z
      .string()
      .min(1, { message: t("validation.phoneNumberRequired") }) // Specific key
      .regex(/^\+?[0-9\s-]+$/, {
        message: t("validation.invalidPhoneNumberFormat"), // Specific key for format
      }),
    subject: z
      .string()
      .min(1, { message: t("validation.subjectRequired") }) // Specific key
      .max(255, { message: t("validation.subjectTooLong") }), // Optional: Add a max length
    message: z
      .string()
      .min(10, { message: t("validation.messageTooShort") }) // Specific key
      .max(2000, { message: t("validation.messageTooLong") }), // Optional: Add a max length
  });

// Infer the type from the schema function's return type
export type ContactFormValues = z.infer<ReturnType<typeof ContactFormSchema>>;
