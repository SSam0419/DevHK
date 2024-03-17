"use client";

import useHint from "@/lib/hooks/useHint";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";

const PostForm = ({
  categories,
}: {
  categories: {
    category: string | null;
    id: number;
  }[];
}) => {
  const userProfile = useUserStore((state) => state.userProfile);

  const [isLoading, setIsLoading] = useState(false);
  const { hintHtml, updateHint } = useHint();
  const [category, setCategory] = useState(1);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const createPost = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("post")
      .insert({ category_id: category, content, title });
    updateHint({ error, text: "Post Created" });
    setIsLoading(false);
  };

  return (
    <form
      className="border border-default p-10 rounded flex flex-col gap-2 items-center justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await createPost();
      }}
    >
      <h1 className="text-2xl w-full text-left">Create New Post</h1>
      <Select
        color="default"
        placeholder="select category for your post"
        label="Category"
        isRequired
        isDisabled={
          userProfile == null || userProfile == undefined || isLoading
        }
        onChange={(e) => {
          setCategory(Number(e.target.value));
        }}
      >
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.category}
          </SelectItem>
        ))}
      </Select>
      <Input
        isDisabled={
          userProfile == null || userProfile == undefined || isLoading
        }
        isRequired
        placeholder="post title ... "
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        isDisabled={
          userProfile == null || userProfile == undefined || isLoading
        }
        isRequired
        placeholder="post content ... "
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>
      <div className="w-full text-left">{hintHtml()}</div>
      <Button
        className="w-full"
        color="primary"
        type="submit"
        isLoading={isLoading}
        isDisabled={
          userProfile == null || userProfile == undefined || isLoading
        }
      >
        Create Post
      </Button>
      {(userProfile == null || userProfile == undefined) && (
        <>
          <Spacer y={4} />
          <p className="text-danger">
            {userProfile == undefined
              ? "Sign In To Create Post"
              : "Create User Profile to Create Post"}
          </p>
          <Spacer y={4} />
        </>
      )}
    </form>
  );
};

export default PostForm;
