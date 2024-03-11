import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { formatDateString } from "@/lib/utils/formatDateString";
import { Spacer, user, Divider, Chip } from "@nextui-org/react";
import PostButtonBar from "../posts/_components/PostButtonBar/PostButtonBar";

const FeaturedPosts = async () => {
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const user = await supabase.auth.getUser();
  const { data: postMetric } = await supabase
    .from("post_metric")
    .select("*")
    .order("view_count", { ascending: false });

  if (postMetric) {
    const { data } = await supabase
      .from("post_with_comments_and_user")
      .select("*")
      .in(
        "post_id",
        postMetric.map((metric) => metric.id)
      );
    return (
      <>
        <div className="text-2xl font-semibold my-4">Featured</div>
        <div className="flex flex-col gap-3">
          {data?.map((post: any) => {
            return (
              <div key={post.post_id}>
                <div
                  className=" p-10 rounded-3xl bg-default-100 hover:bg-default-200"
                  key={post.post_id}
                >
                  <Link href={"/posts/" + post.post_id}>
                    <div className="">
                      <div className="h-full flex gap-2">
                        <div className="text-2xl font-bold">
                          {post.post_title}
                        </div>
                        <div className="text-base font-normal h-4/6">
                          <Chip>{post.post_category}</Chip>
                        </div>
                      </div>

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
      </>
    );
  }

  return <div></div>;
};

export default FeaturedPosts;
