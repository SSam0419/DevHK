import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import PostPreviewCard from "@/components/PostPreviewCard";

const PostList = async ({ categoryId }: { categoryId: number }) => {
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const { data } = await supabase
    .from("post_with_comments_and_user")
    .select("*")
    .eq("post_category_id", categoryId)
    .order("post_created_at", { ascending: false });
  const user = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-5">
      {(data == null || data.length == 0) && (
        <div className=" p-10 rounded-3xl bg-default-100 hover:bg-default-200">
          No Post in this category yet. Write the first post!
        </div>
      )}
      {data?.map((post: any) => {
        return (
          <div key={post.post_id}>
            <PostPreviewCard
              post={post}
              previewType="PostList"
              userId={user.data.user ? user.data.user.id : null}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
