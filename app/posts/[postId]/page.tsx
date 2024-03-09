import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Avatar, Spacer } from "@nextui-org/react";
import { formatDateString } from "@/lib/utils/formatDateString";
import CommentForm from "./_components/CommentForm";

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
      <div className="border rounded-2xl p-5">
        <div className="text-3xl font-bold">{data.post_title}</div>

        <Spacer y={3} />

        <div>{data.username}</div>
        {data.post_created_at && (
          <div className="text-default-500 font-light">
            {formatDateString(data.post_created_at)}
          </div>
        )}

        <Spacer y={3} />

        <div className="">{data.post_content}</div>
      </div>
      <Spacer y={4} />
      {/* Comment Form*/}
      <CommentForm postId={params.postId} />
      <Spacer y={4} />
      {/* Comment List */}
      <div className="border p-5 rounded-2xl flex flex-col gap-2">
        <div className="font-semibold text-xl">Recent Comments</div>
        {data.comments &&
          data.comments
            .sort(
              (a, b) =>
                new Date(b.comment_created_at).getTime() -
                new Date(a.comment_created_at).getTime()
            )
            .map((comment, idx) => {
              // "comment_id": "30745a3c-02c3-45bd-9b74-b50a50c55b1f",
              // "comment_content": "good article!",
              // "comment_created_at": "2024-03-06T14:35:12.699255+00:00",
              // "comment_created_by": null,
              // "comment_updated_at": "2024-03-06T14:35:12.699255+00:00"
              return (
                <div className="bg-default-100 p-5 rounded" key={idx}>
                  <div className="">
                    {comment.comment_username == null ? (
                      <Avatar />
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Avatar name={comment.comment_username} />
                        {comment.comment_username}
                      </div>
                    )}
                  </div>
                  <Spacer y={5} />
                  <div>{comment.comment_content}</div>
                  <Spacer y={5} />
                  <div className="text-small text-default-500">
                    {formatDateString(comment.comment_created_at)}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
