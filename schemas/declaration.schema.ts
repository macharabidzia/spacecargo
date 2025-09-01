import * as z from "zod";

type Translator = (
  key: string,
  options?: { [key: string]: string | number }
) => string;

export const DeclarationSchema = (t: Translator) =>
  z.object({
    tdsCode: z.coerce.string(),
    categoryId: z.coerce.number(),
    price: z.coerce
      .number({ invalid_type_error: t("validation.mustBeNumber") })
      .min(0.01, { message: t("validation.priceMin", { min: 0.01 }) }),

    itemsCount: z.coerce
      .number({ invalid_type_error: t("validation.mustBeNumber") })
      .int({ message: t("validation.mustBeInteger") })
      .min(1, { message: t("validation.itemsCountMin", { min: 1 }) }),

    websiteUrl: z.string(),

    comment: z.string().optional(),
    websiteOtp: z.string().optional(),
    file: z
      .any()
      .transform((val) => (val instanceof FileList ? Array.from(val) : val ?? []))
      .optional()
  });

export type DeclarationFormValues = z.infer<
  ReturnType<typeof DeclarationSchema>
>;
