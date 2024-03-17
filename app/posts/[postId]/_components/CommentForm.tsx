"use client";
import { revalidatePost } from "@/app/actions/revalidate";
import useHint from "@/lib/hooks/useHint";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import { Textarea, Button, Avatar } from "@nextui-org/react";
import { revalidatePath, revalidateTag } from "next/cache";
import React, { useEffect, useState } from "react";

const CommentForm = ({ postId }: { postId: string }) => {
  const user = useUserStore((state) => state.userProfile);
  const { hintHtml, updateHint } = useHint();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanSubmit(true);
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [canSubmit]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!canSubmit) {
      updateHint({
        error: Error(
          "Please wait for 5 seconds before submitting another comment."
        ),
        text: "",
      });
      return;
    }

    if (!user) {
      updateHint({ error: Error("You must login to comment!"), text: "" });
      setIsLoading(false);
      return;
    }

    if (comment.trim() === "") {
      updateHint({ error: Error("The comment is empty!"), text: "" });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("comment").insert({
      content: comment.trim(),
      post_id: postId,
    });

    updateHint({ error, text: "Comment Created" });

    if (!error) {
      revalidatePost();
    }

    setCanSubmit(false);
    setIsLoading(false);
  };

  return (
    <form
      className="p-5 border rounded-2xl flex flex-col gap-3"
      onSubmit={(e) => submitComment(e)}
    >
      <div className="flex gap-2 items-center">
        <Avatar name={user ? user.username : ""} /> {user && user.username}
      </div>
      <Textarea
        isRequired
        isDisabled={isLoading}
        placeholder="hmmmmm ..."
        label="Comment your thoughts"
        className="h-full"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {hintHtml()}
      <div className="w-full flex items-center justify-end">
        <Button
          className=""
          color="default"
          isLoading={isLoading}
          // onClick={() => submitComment()}
          type="submit"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
