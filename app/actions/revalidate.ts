"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidatePost() {
  // revalidatePath("posts");
  revalidatePath("/posts/[postId]");
}
