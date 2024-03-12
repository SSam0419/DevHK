"use client";
import React, { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import PostButtonBar from "@/app/posts/_components/PostButtonBar/PostButtonBar";
import { formatDateString } from "@/lib/utils/formatDateString";
import { Chip, Spacer, Divider, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import PostPreviewCard from "@/components/PostPreviewCard";

const ProfileDisplay = () => {
  const userProfile = useUserStore((state) => state.userProfile);
  const [myPost, setMyPost] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserPost = async () => {
      setIsLoading(true);
      if (userProfile) {
        const { data } = await supabase
          .from("post_with_comments_and_user")
          .select("*")
          .eq("post_created_by", userProfile.id)
          .order("post_created_by", { ascending: false });

        if (data) setMyPost(data);
      }
      setIsLoading(false);
    };
    fetchUserPost();
  }, [userProfile]);

  if (!userProfile) {
    return <ProfileForm />;
  }

  return (
    <>
      <div className="text-content2 bg-default-700 rounded-large p-10 flex flex-col gap-6">
        <h1 className="text-4xl font-bold  ">
          Welcome! {userProfile.username}
        </h1>

        <p className="text-lg">{userProfile.biography}</p>
      </div>
      <Spacer y={16} />
      {isLoading ? (
        <Skeleton className=" p-10 rounded-3xl bg-default-100 hover:bg-default-200"></Skeleton>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-semibold my-3">My Posts</div>
          {myPost.length === 0 && (
            <Link href={"/posts/write"}>Write your first post!</Link>
          )}
          {myPost.map((post: any) => {
            return (
              <div key={post.post_id}>
                <PostPreviewCard
                  post={post}
                  previewType="Profile"
                  userId={userProfile ? userProfile.id : null}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProfileDisplay;
