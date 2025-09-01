import { z } from "zod";

type Translator = (key: string) => string;

// --- Step 1: Login ---
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
  });
export const ResetPasswordFormSchema = (t: Translator) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: t("validation.passwordRequired") })
        .min(6, { message: t("validation.passwordMinLength") }),
      confirm_password: z
        .string()
        .min(1, { message: t("validation.passwordRequired") })
        .min(6, { message: t("validation.passwordMinLength") }),
    })
    .refine((data) => data.password === data.confirm_password, {
      path: ["confirm_password"],
      message: t("validation.passwordsDoNotMatch"),
    });

// --- Step 2: Base Registration ---
export const BaseRegisterSchema = (t: Translator) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("validation.emailRequired") })
      .email(t("validation.invalidEmail")),
    phone: z
      .string()
      .min(1, { message: t("validation.phoneNumberRequired") })
      .regex(/^\+?[0-9\s-]+$/, {
        message: t("validation.invalidPhoneNumberFormat"),
      }),
    password: z
      .string()
      .min(1, { message: t("validation.passwordRequired") })
      .min(6, { message: t("validation.passwordMinLength") }),
    password_confirmation: z
      .string()
      .min(1, { message: t("validation.confirmPasswordRequired") }),
    terms_accepted: z.boolean().refine((val) => val === true, {
      message: t("validation.termsAcceptedRequired"),
    }),
    user_type: z.enum(["physical", "legal"]), // discriminator here only
    country_code: z.string().optional()
  });

// --- Step 3: Physical Profile ---
export const PhysicalProfileSchema = (t: Translator) =>
  z.object({
    is_resident: z.boolean().optional(),
    first_name_en: z.string().min(1, { message: t("validation.firstNameRequired") }),
    last_name_en: z.string().min(1, { message: t("validation.lastNameRequired") }),
    first_name_ge: z.string().min(1, { message: t("validation.firstNameRequired") }),
    last_name_ge: z.string().min(1, { message: t("validation.lastNameRequired") }),
    personal_id: z.string().min(1, { message: t("validation.personalIdRequired") }),
    gender: z.enum(["M", "F", "O"]).optional(),
    department_id: z.string().optional(),
    promo_code: z.string().optional(),
  });

// --- Step 4: Legal Profile ---
export const LegalProfileSchema = (t: Translator) =>
  z.object({
    is_resident: z.boolean().optional(),
    first_name_en: z.string().min(1, { message: t("validation.firstNameRequired") }),
    last_name_en: z.string().min(1, { message: t("validation.lastNameRequired") }),
    first_name_ge: z.string().min(1, { message: t("validation.firstNameRequired") }),
    last_name_ge: z.string().min(1, { message: t("validation.lastNameRequired") }),
    personal_id: z.string().min(1, { message: t("validation.personalIdRequired") }),
    gender: z.enum(["M", "F", "O"]).optional(),
    department_id: z.string().optional(),
    promo_code: z.string().optional(),
    company_name_en: z.string().min(1, { message: t("validation.companyNameRequired") }),
    company_name_ge: z.string().min(1, { message: t("validation.companyNameRequired") }),
    company_id: z.string().min(1, { message: t("validation.companyIdRequired") }),
  });

// --- Step 5: Combine with discriminated union ---
export const CompleteRegistrationSchema = (t: Translator) =>
  BaseRegisterSchema(t)
    .and(
      z.discriminatedUnion("user_type", [
        z.object({ user_type: z.literal("physical") }).merge(PhysicalProfileSchema(t)),
        z.object({ user_type: z.literal("legal") }).merge(LegalProfileSchema(t)),
      ])
    )
    .refine((data) => data.password === data.password_confirmation, {
      message: t("validation.passwordsDoNotMatch"),
      path: ["password_confirmation"],
    });

// --- Types ---
export type LoginFormValues = z.infer<ReturnType<typeof LoginFormSchema>>;
export type ResetPasswordFormValues = z.infer<ReturnType<typeof ResetPasswordFormSchema>>;

export type RegisterFormValues = z.infer<ReturnType<typeof CompleteRegistrationSchema>>;
export type BaseRegisterValues = z.infer<ReturnType<typeof BaseRegisterSchema>>;
export type LegalProfileValues = z.infer<ReturnType<typeof LegalProfileSchema>>;
export type PhysicalProfileValues = z.infer<ReturnType<typeof PhysicalProfileSchema>>