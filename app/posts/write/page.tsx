import React from "react";
import PostForm from "./_components/PostForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const { data } = await supabase.from("forum_category").select("*");

  if (!data) {
    return <div></div>;
  }

  return (
    <div>
      <PostForm categories={data} />
    </div>
  );
};

export default page;
