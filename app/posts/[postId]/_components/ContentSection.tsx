import { formatDateString } from "@/lib/utils/formatDateString";
import { Spacer } from "@nextui-org/react";
import React from "react";
import PostButtonBar from "../../_components/PostButtonBar/PostButtonBar";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});
const ContentSection = ({
  post,
}: {
  post: {
    post_category_id: number | null;
    post_content: string | null;
    post_created_at: string | null;
    post_created_by: string | null;
    post_id: string | null;
    post_title: string | null;
    post_updated_at: string | null;
    user_avatar_link: string | null;
    user_biography: string | null;
    user_created_at: string | null;
    user_id: string | null;
    username: string | null;
  };
}) => {
  return (
    <div className={`border rounded-2xl p-5`}>
      <div className="text-3xl font-bold">{post.post_title}</div>

      <Spacer y={3} />

      <div>{post.username}</div>
      {post.post_created_at && (
        <div className="text-default-500 font-light">
          {formatDateString(post.post_created_at)}
        </div>
      )}

      <Spacer y={3} />

      <div className={merriweather.className}>{post.post_content}</div>

      <Spacer y={3} />

      <PostButtonBar postId={post.post_id!} />
    </div>
  );
};

export default ContentSection;
