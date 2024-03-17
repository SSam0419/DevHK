import { formatDateString } from "@/lib/utils/formatDateString";
import { Spacer, Avatar } from "@nextui-org/react";
import React from "react";
import CommentForm from "./CommentForm";
import { Json } from "@/lib/supabase/Database";

const CommentSection = ({
  comments,
  postId,
}: {
  comments: any[] | null | Json[];
  postId: string;
}) => {
  return (
    <div>
      {/* Comment Form*/}
      <CommentForm postId={postId} />
      <Spacer y={4} />
      {/* Comment List */}
      <div className="border p-5 rounded-2xl flex flex-col gap-2">
        <div className="font-semibold text-xl">Recent Comments</div>
        {comments == null ||
          (comments.length == 0 && (
            <div>Write the first comment of this post!</div>
          ))}
        {comments &&
          comments
            .sort((a, b) => {
              return (
                new Date(b.comment_created_at).getTime() -
                new Date(a.comment_created_at).getTime()
              );
            })
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
};

export default CommentSection;
