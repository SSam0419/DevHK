"use client";
import React from "react";
import ProfileForm from "./ProfileForm";
import { useUserStore } from "@/lib/states/User";

const ProfileDisplay = () => {
  const userProfile = useUserStore((state) => state.userProfile);

  if (!userProfile) {
    return <ProfileForm />;
  }

  return (
    <div className="text-content2 bg-default-700 rounded-large p-10 flex flex-col gap-6">
      <h1 className="text-4xl font-bold  ">Welcome! {userProfile.username}</h1>

      <p className="text-lg">{userProfile.biography}</p>
    </div>
  );
};

export default ProfileDisplay;
