import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Avatar, Spacer } from "@nextui-org/react";
import { formatDateString } from "@/lib/utils/formatDateString";
import CommentForm from "./_components/CommentForm";

import PostButtonBar from "../_components/PostButtonBar/PostButtonBar";
import ContentSection from "./_components/ContentSection";
import CommentSection from "./_components/CommentSection";

export default async function Page({ params }: { params: { postId: string } }) {
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) {
    return <div>Sign in to view this post!</div>;
  }

  const [result1, result2] = await Promise.all([
    await supabase
      .from("post_with_comments_and_user")
      .select("*")
      .eq("post_id", params.postId)
      .maybeSingle(),
    await supabase
      .from("post_views")
      .upsert({ post_id: params.postId, user_id: userId }),
  ]);

  let { data, error } = result1;

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div>
      {/* Post Details */}
      <ContentSection post={data} />
      <Spacer y={4} />
      <CommentSection comments={data.comments} postId={data.post_id!} />
    </div>
  );
}
