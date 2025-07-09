// src/schemas/declaration.schema.ts
import { z } from "zod";

export const DeclarationSchema = z.object({
  shippingCode: z.string().optional(),
  totalUsd: z.number().optional(),
  categories: z.string().optional(),
  quantity: z.number().optional(),
  websiteOfPurchase: z.string().url().optional(),
  oneTimePassword: z.string().optional(),
  commentEng: z.string().optional(),
  attachedFileName: z.string().optional(),
});

export type DeclarationValues = z.infer<typeof DeclarationSchema>;
