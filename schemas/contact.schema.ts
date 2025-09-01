// src/schemas/contact.schema.ts
import { z } from "zod";

type Translator = (key: string) => string;

export const ContactFormSchema = (t: Translator) =>
  z.object({
    "contact-name": z
      .string()
      .min(1, { message: t("validation.firstNameRequired") }),
    "contact-email": z
      .string()
      .min(1, { message: t("validation.emailRequired") })
      .email({ message: t("validation.invalidEmail") }),

    "contact-subject": z
      .string()
      .min(1, { message: t("validation.subjectRequired") })
      .max(255, { message: t("validation.subjectTooLong") }),

    "contact-message": z
      .string()
      .min(10, { message: t("validation.messageTooShort") })
      .max(2000, { message: t("validation.messageTooLong") }),
  });

export type ContactFormValues = z.infer<ReturnType<typeof ContactFormSchema>>;
