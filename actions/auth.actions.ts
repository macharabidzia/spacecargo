"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"; // Import cookies from Next.js
import { redirect } from "next/navigation";

export async function login(username: string, password: string) {
  "use server"; // This directive is already here

  // Simulate a delay to mimic network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real application, you'd validate username and password here
  // For now, we'll just assume success
  if (username === "test@gmail.com" && password === "password") {
    // Generate a dummy token
    const dummyToken = "your_dummy_auth_token_here_12345";
    (await cookies()).set("auth_token", dummyToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    revalidatePath("/dashboard"); // Example: Revalidate a dashboard page
    // revalidateTag('user-data'); // Example: Revalidate cached user data

    return { success: true, message: "Login successful!" };
  } else {
    return { success: false, message: "Invalid username or password." };
  }
}
export async function logout(_formData: FormData) {
  // Added _formData parameter
  "use server";

  await new Promise((resolve) => setTimeout(resolve, 200));

  (await cookies()).delete("auth_token");

  revalidatePath("/");
  revalidatePath("/dashboard");
  redirect("/");

  // No explicit return value needed for the form's action prop
  // If you *do* need to use the return value (e.g., with useFormState),
  // you'd typically handle it in a Client Component.
  // For the form action itself, void is expected.
}
