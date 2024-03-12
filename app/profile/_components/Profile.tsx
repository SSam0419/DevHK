"use client";
import { useUserStore } from "@/lib/states/User";
import React from "react";
import AuthForm from "./AuthForm";
import ProfileForm from "./ProfileForm";
import ProfileDisplay from "./ProfileDisplay";

import ProfileDisplaySkeleton from "./ProfileDisplaySkeleton";

const Profile = () => {
  const userProfile = useUserStore((state) => state.userProfile);
  const user = useUserStore((state) => state.user);

  return (
    <>
      {userProfile === undefined || user === undefined ? (
        <ProfileDisplaySkeleton />
      ) : (
        <div>
          {user ? (
            userProfile ? (
              <ProfileDisplay />
            ) : (
              <ProfileForm />
            )
          ) : (
            <AuthForm />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
