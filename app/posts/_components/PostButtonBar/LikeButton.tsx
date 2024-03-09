"use client";
import { supabase } from "@/lib/supabase/client";
import {
  Button,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";
import { BiSolidLike, BiLike, BiSolidDislike, BiDislike } from "react-icons/bi";

const LikeButton = ({
  isLikeBtn,
  isDisabled,
  like,
  dislike,
  setLike,
  setDislike,
  postId,
  userId,
  likeCount,
  dislikeCount,
  setLikeCount,
  setDislikeCount,
}: {
  isLikeBtn: boolean;
  isDisabled: boolean;
  like: boolean;
  dislike: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  setDislike: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
  userId: string | null;
  likeCount: number;
  dislikeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  setDislikeCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const likePost = async () => {
    if (userId) {
      const { data, error } = await supabase.from("post_likes").upsert({
        post_id: postId,
        is_like: isLikeBtn,
        user_profile_id: userId,
      });
    }
  };

  return isDisabled ? (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button onClick={() => {}}>
          {isLikeBtn &&
            (like ? (
              <>
                {likeCount}
                <BiSolidLike className="" />
              </>
            ) : (
              <>
                {likeCount}
                <BiLike className="" />
              </>
            ))}
          {!isLikeBtn &&
            (dislike ? (
              <>
                {dislikeCount}
                <BiSolidDislike className="" />
              </>
            ) : (
              <>
                {dislikeCount}
                <BiDislike className="" />
              </>
            ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Link href={"/profile"}>
          <div className="px-1 py-2 hover:cursor-pointer hover:underline">
            <div className="text-small">
              Create Profile to {isLikeBtn ? "like" : "dislike"} this post!
            </div>
          </div>
        </Link>
      </PopoverContent>
    </Popover>
  ) : (
    <Button
      onClick={async () => {
        if (isLikeBtn) {
          if (like) {
            setLikeCount((prev) => (prev -= 1));
            setLike(false);
          } else {
            setLikeCount((prev) => (prev += 1));
            setLike(true);

            if (dislike) setDislikeCount((prev) => (prev -= 1));
            setDislike(false);
          }
        } else {
          if (dislike) {
            setDislike(false);
            setDislikeCount((prev) => (prev -= 1));
          } else {
            setDislike(true);
            setDislikeCount((prev) => (prev += 1));

            if (like) setLikeCount((prev) => (prev -= 1));
            setLike(false);
          }
        }

        await likePost();
      }}
    >
      <div className="flex items-center gap-1">
        <div className="">
          {isLikeBtn &&
            (like ? <BiSolidLike className="" /> : <BiLike className="" />)}
          {!isLikeBtn &&
            (dislike ? (
              <BiSolidDislike className="" />
            ) : (
              <BiDislike className="" />
            ))}
        </div>
        <div className="">{isLikeBtn ? likeCount : dislikeCount}</div>
      </div>
    </Button>
  );
};

export default LikeButton;
