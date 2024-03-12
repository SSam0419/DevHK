"use client";

import React, { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import { ButtonGroup, Tooltip } from "@nextui-org/react";
import ViewIcon from "./ViewIcon";
import { supabase } from "@/lib/supabase/client";

const PostButtonBar = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string | null;
}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  useEffect(() => {
    const findIsLike = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("post_likes")
          .select("*")
          .eq("post_id", postId)
          .eq("user_profile_id", userId)
          .maybeSingle();

        if (data) {
          if (data.is_like !== null) {
            setLike(data.is_like);
            setDislike(!data.is_like);
          }
        }
      }
    };

    const findLikeCount = async () => {
      const { data, error } = await supabase
        .from("post_likes")
        .select("*")
        .eq("is_like", true)
        .eq("post_id", postId);
      setLikeCount(data ? data.length : 0);
    };

    const findDislikeCount = async () => {
      const { data, error } = await supabase
        .from("post_likes")
        .select("*")
        .eq("is_like", false)
        .eq("post_id", postId);
      setDislikeCount(data ? data.length : 0);
    };

    findIsLike();
    findLikeCount();
    findDislikeCount();
  }, [postId, userId]);

  return (
    <ButtonGroup
      className=""
      color="default"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <ViewIcon postId={postId} userId={userId} />
      <LikeButton
        isLikeBtn={true}
        dislikeCount={dislikeCount}
        like={like}
        setLike={setLike}
        setDislike={setDislike}
        isDisabled={userId == null}
        postId={postId}
        userId={userId}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setDislikeCount={setDislikeCount}
        dislike={dislike}
      />
      <LikeButton
        isLikeBtn={false}
        dislikeCount={dislikeCount}
        like={like}
        setLike={setLike}
        setDislike={setDislike}
        isDisabled={userId == null}
        postId={postId}
        userId={userId}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setDislikeCount={setDislikeCount}
        dislike={dislike}
      />

      <ShareButton postId={postId} />
    </ButtonGroup>
  );
};

export default PostButtonBar;
