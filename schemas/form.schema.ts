// /schemas/form.schema.ts
import { z } from "zod";

export const addressFormSchema = z.object({
  lastName: z.string().min(1, { message: "Last Name is required." }),
  state: z.string().min(1, { message: "State is required." }),
  address1: z.string().min(1, { message: "Address No1 is required." }),
  zipCode: z.string().min(1, { message: "Zip Code is required." }),
  address2: z.string().optional(), // Address No2 seems optional in the image
  country: z.string().min(1, { message: "Country is required." }),
  city: z.string().min(1, { message: "City is required." }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required." }),
});
