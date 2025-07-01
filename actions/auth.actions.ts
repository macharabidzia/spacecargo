"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function login(username: string, password: string) {
  "use server";

  return await new Promise(() => {
    return { username, password };
  });
}
