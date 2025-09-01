"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// Define the schema for your form data
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

// Define the return type for your action (for useFormState)
type FormState = {
  message?: string;
  errors?: {
    username?: string[];
    email?: string[];
  };
};

export async function processForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
  };

  // Server-side validation using Zod
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    // If validation fails, return errors
    const errors = parsed.error.flatten().fieldErrors;
    console.error("Validation errors:", errors);
    return {
      message: "Validation failed.",
      errors: errors,
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  revalidatePath("/"); // Revalidates the root path
  return { message: "Form submitted successfully!" };
}
