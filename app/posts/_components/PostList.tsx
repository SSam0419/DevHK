import React from "react";
import { Divider, Spacer } from "@nextui-org/react";
import PostButtonBar from "./PostButtonBar/PostButtonBar";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { formatDateString } from "@/lib/utils/formatDateString";

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
            <div
              className=" p-10 rounded-3xl bg-default-100 hover:bg-default-200"
              key={post.post_id}
            >
              <Link href={"/posts/" + post.post_id}>
                <div className="">
                  <div className="text-2xl font-bold">{post.post_title} </div>
                  <div className="text-default-600 text-small text-left">
                    <p>{post.username}</p>
                    {post.post_created_at && (
                      <p>{formatDateString(post.post_created_at)}</p>
                    )}
                  </div>
                </div>{" "}
                <Spacer />
              </Link>

              <PostButtonBar
                postId={post.post_id}
                userId={user.data.user ? user.data.user.id : null}
              />

              <Link href={"/posts/" + post.post_id}>
                <Divider className="my-3" />
                <div className="  ">{post.post_content}</div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
