"use client";
import PostButtonBar from "@/app/posts/_components/PostButtonBar/PostButtonBar";
import { useUserStore } from "@/lib/states/User";
import { formatDateString } from "@/lib/utils/formatDateString";
import { Avatar, Chip, Divider, Spacer } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const PostPreviewCard = ({
  post,
  previewType,
}: {
  post: any;
  previewType: "Featured" | "Profile" | "PostList";
}) => {
  return (
    <div className=" px-10 py-5 rounded-3xl bg-default-100 hover:bg-default-200">
      <Link href={"/posts/" + post.post_id}>
        <div className="">
          <div className="text-left text-xs">
            <div className="flex gap-2 items-center">
              <Avatar size="sm" name={post.username} />
              <p>{post.username}</p>
              <Divider orientation="vertical" />
              {post.post_created_at && (
                <p className="text-default-600 font-light">
                  {formatDateString(post.post_created_at)}
                </p>
              )}
            </div>
          </div>
          <Spacer y={3} />
          <div className="h-full flex gap-2 items-end">
            <div className="text-3xl font-bold">{post.post_title}</div>
            {previewType !== "PostList" && (
              <div className="text-base font-normal">
                <Chip size="sm">
                  <p className="text-xs">{post.post_category}</p>
                </Chip>
              </div>
            )}
          </div>
          <Spacer y={3} />
        </div>

        <div className="  ">{post.post_content}</div>
        <Spacer y={10} />
      </Link>

      <div className="w-full flex items-center justify-center">
        <PostButtonBar postId={post.post_id} />
      </div>
    </div>
  );
};

export default PostPreviewCard;
