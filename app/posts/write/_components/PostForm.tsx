"use client";

import useHint from "@/lib/hooks/useHint";
import { supabase } from "@/lib/supabase/client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const PostForm = ({
  categories,
}: {
  categories: {
    category: string | null;
    id: number;
  }[];
}) => {
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
        isDisabled={isLoading}
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
        isDisabled={isLoading}
        isRequired
        placeholder="post title ... "
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        isDisabled={isLoading}
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
      >
        Create Post
      </Button>
    </form>
  );
};

export default PostForm;
