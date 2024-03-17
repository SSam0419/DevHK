"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidatePost() {
  await revalidatePath("/posts/[postId]");
}
