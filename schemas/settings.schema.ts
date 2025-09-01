import { z } from "zod";
import { TFunction } from "i18next"; 

export const profileFormSchema = (t: TFunction) =>
  z.object({
    firstNameGe: z.string().min(1, t("profile.validation.firstNameRequired")),
    firstNameEn: z.string().min(1, t("profile.validation.firstNameEnRequired")),
    lastNameGe: z.string().min(1, t("profile.validation.lastNameRequired")),
    lastNameEn: z.string().min(1, t("profile.validation.lastNameEnRequired")),
    email: z
      .string()
      .email(t("profile.validation.invalidEmail"))
      .min(1, t("profile.validation.emailRequired")),
    phone: z.string().min(1, t("profile.validation.mobileRequired")),
    personalNumber: z
      .string()
      .min(11, t("profile.validation.personalNumberMin"))
      .max(11, t("profile.validation.personalNumberMax")), 
    gender: z
      .enum(["F", "M"], {
        errorMap: () => ({ message: t("profile.validation.genderRequired") }),
      })
      .optional(),
    departmentId: z.string().min(1, t("profile.validation.departmentRequired")),
    declarationAgreement: z.boolean(),
  });
export const changePasswordFormSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, t("password.validation.currentPasswordRequired")),
      newPassword: z
        .string()
        .min(8, t("password.validation.newPasswordMinLength"))
        .regex(/[A-Z]/, t("password.validation.newPasswordUppercase")),
      confirmNewPassword: z
        .string()
        .min(1, t("password.validation.confirmNewPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("password.validation.passwordsMismatch"),
      path: ["confirmNewPassword"],
    });
export const AddressSchema = (t: TFunction) =>
  z.object({
    address: z.string(),
    cityId: z.string(),
    id: z.number().optional(),
  });
export const registrationAddressSchema = (t: TFunction) =>
  z.object({
    address: z.string(),
    city_id: z.string(),
  });


export const AuthorizedPersonSchema = (t: TFunction) =>
  z.object({
    agreeTerms: z.boolean().optional(),
    firstName: z.string().min(1, t("authorizedPerson.validation.firstNameRequired")).optional(),
    lastName: z.string().min(1, t("authorizedPerson.validation.lastNameRequired")).optional(),
    phone: z.string()
      .optional(),
    pin: z.string()
      .regex(/^\d{11}$/, t("authorizedPerson.validation.invalidPin")).optional(),
    residentFlag: z.boolean().optional(),
  });
export type AuthroizedPersonFormValues = z.infer<
  ReturnType<typeof AuthorizedPersonSchema>
>;

export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof changePasswordFormSchema>
>;
export type ChangeAddressFormValues = z.infer<ReturnType<typeof AddressSchema>>;
export type RegisterAddressFormValues = z.infer<ReturnType<typeof registrationAddressSchema>>;

export type ProfileFormValues = z.infer<ReturnType<typeof profileFormSchema>>;
