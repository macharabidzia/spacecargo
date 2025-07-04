import { z } from "zod";

type Translator = (key: string) => string;

export const LoginFormSchema = (t: Translator) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("validation.emailRequired") })
      .email(t("validation.invalidEmail")),
    password: z
      .string()
      .min(1, { message: t("validation.passwordRequired") })
      .min(6, { message: t("validation.passwordMinLength") }),
    rememberMe: z.boolean().optional(),
  });

export const RegisterFormSchema = (t: Translator) =>
  z
    .object({
      firstName: z
        .string()
        .min(1, { message: t("validation.firstNameRequired") }),
      lastName: z
        .string()
        .min(1, { message: t("validation.lastNameRequired") }),
      email: z
        .string()
        .min(1, { message: t("validation.emailRequired") })
        .email(t("validation.invalidEmail")),
      password: z
        .string()
        .min(1, { message: t("validation.passwordRequired") })
        .min(6, { message: t("validation.passwordMinLength") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("validation.confirmPasswordRequired") }),
      phoneNumber: z
        .string()
        .min(1, { message: t("validation.phoneNumberRequired") })
        .regex(/^\+?[0-9\s-]+$/, {
          message: t("validation.invalidPhoneNumberFormat"),
        }),
      idNumber: z.string().optional(),
      passport: z.string().optional(),
      termsAccepted: z.boolean().refine((val) => val === true, {
        message: t("validation.termsAcceptedRequired"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

// Infer types from the schema functions (you'll call the function to get the schema)
export type LoginFormValues = z.infer<ReturnType<typeof LoginFormSchema>>;
export type RegisterFormValues = z.infer<ReturnType<typeof RegisterFormSchema>>;
