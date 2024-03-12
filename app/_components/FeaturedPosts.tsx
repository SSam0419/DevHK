import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { formatDateString } from "@/lib/utils/formatDateString";
import { Spacer, user, Divider, Chip, Avatar } from "@nextui-org/react";
import PostButtonBar from "../posts/_components/PostButtonBar/PostButtonBar";
import PostPreviewCard from "@/components/PostPreviewCard";

const FeaturedPosts = async () => {
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const { data: postMetric } = await supabase
    .from("post_metric")
    .select("*")
    .order("view_count", { ascending: false });

  if (postMetric) {
    const { data } = await supabase
      .from("post_with_comments_and_user")
      .select("*")
      .in(
        "post_id",
        postMetric.map((metric) => metric.id)
      );
    return (
      <>
        <div className="text-2xl font-semibold my-4">Featured</div>
        <div className="flex flex-col gap-3">
          {data?.map((post: any) => {
            return (
              <div key={post.post_id}>
                <PostPreviewCard post={post} previewType="Featured" />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return <div></div>;
};

export default FeaturedPosts;
