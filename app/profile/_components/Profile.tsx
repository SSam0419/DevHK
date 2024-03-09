"use client";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import ProfileForm from "./ProfileForm";
import ProfileDisplay from "./ProfileDisplay";

const Profile = () => {
  const userProfile = useUserStore((state) => state.userProfile);
  const user = useUserStore((state) => state.user);

  return (
    <div>
      {user ? userProfile ? <ProfileDisplay /> : <ProfileForm /> : <AuthForm />}
    </div>
  );
};

export default Profile;
