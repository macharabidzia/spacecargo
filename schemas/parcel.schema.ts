import * as z from "zod";

type Translator = (
  key: string,
  options?: { [key: string]: string | number }
) => string;

export const ParcelSchema = (t: Translator) =>
  z.object({

    tdsCode: z.string(),
    categoryId: z.coerce.number({
      invalid_type_error: t("validation.mustBeNumber"),
    }),

    declaredAmount: z.coerce
      .number({ invalid_type_error: t("validation.mustBeNumber") })
      .min(0.01, { message: t("validation.priceMin", { min: 0.01 }) }),

    itemsCount: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.coerce
        .number({ invalid_type_error: t("validation.mustBeNumber") })
        .int({ message: t("validation.mustBeInteger") })
        .min(1, { message: t("validation.itemsCountMin", { min: 1 }) })
    ),

    websiteUrl: z
      .string()
      .min(1, { message: t("validation.websiteUrlRequired") })
      .url({ message: t("validation.invalidUrl") }),

    departmentId: z.coerce.number({
      invalid_type_error: t("validation.mustBeNumber"),
    }),

    comment: z.string().optional(),

    websiteOtp: z.string().nullable().optional(),

    file: z
      .any()
      .transform((val) => (val instanceof FileList ? Array.from(val) : val ?? []))
      .optional(),

    declarationAgreement: z
      .string()
      .min(1, { message: t("validation.declarationAgreementRequired") }),
  });

export type ParcelFormValues = z.infer<ReturnType<typeof ParcelSchema>>;
