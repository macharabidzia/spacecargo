import { z } from "zod";

// Define the available post types and package types as constants.
// Using 'as const' creates a 'readonly' tuple, which is perfect for Zod enums.
const POST_TYPES = ["Parcel", "Letter", "Document"] as const;
const POST_PACKAGES = ["Econom", "Standard", "Express"] as const;

/**
 * Creates a Zod schema for postal service data, incorporating internationalization (i18n)
 * for error messages.
 *
 * @param t The translation function from your i18n library.
 * @returns A Zod object schema for postal service details.
 */
export const postSchema = (t: (key: string) => string) =>
  z.object({
    // --- Sender Information ---
    sender_name: z
      .string({ required_error: t("validation.senderNameRequired") })
      .min(2, t("validation.senderNameMinLength")),

    send_from_city_id: z.coerce
      .number({
        required_error: t("validation.sendFromCityRequired"),
        invalid_type_error: t("validation.sendFromCityInvalid"),
      })
      .int(t("validation.sendFromCityInvalid"))
      .positive(t("validation.sendFromCityRequired")), // Ensure a valid city ID is selected

    send_from_address: z
      .string({ required_error: t("validation.senderAddressRequired") })
      .min(5, t("validation.senderAddressMinLength")),

    // --- Receiver Information ---
    receiver_name: z
      .string({ required_error: t("validation.receiverNameRequired") })
      .min(2, t("validation.receiverNameMinLength")),

    receive_to_city_id: z.coerce
      .number({
        required_error: t("validation.receiveToCityRequired"),
        invalid_type_error: t("validation.receiveToCityInvalid"),
      })
      .int(t("validation.receiveToCityInvalid"))
      .positive(t("validation.receiveToCityRequired")), // Ensure a valid destination city ID is selected

    receive_to_address: z
      .string({ required_error: t("validation.receiverAddressRequired") })
      .min(5, t("validation.receiverAddressMinLength")),

    receiver_phone: z
      .string({ required_error: t("validation.receiverPhoneRequired") })
      .regex(/^5\d{8}$/, t("validation.receiverPhoneInvalid")), // Georgian mobile phone number format

    // --- Post Details ---
    post_type: z.enum(POST_TYPES, {
      errorMap: () => ({ message: t("validation.postTypeRequired") }),
    }),

    post_package: z.enum(POST_PACKAGES, {
      errorMap: () => ({ message: t("validation.postPackageRequired") }),
    }),

    // --- Optional Fields ---
    comment: z.string().optional(), // Comment is optional
    file: z.any() // File upload is optional
  });

// Infer the TypeScript type from the schema for type safety
export type PostSchema = z.infer<ReturnType<typeof postSchema>>;