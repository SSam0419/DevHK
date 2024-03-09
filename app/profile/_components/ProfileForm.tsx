"use client";

import useHint from "@/lib/hooks/useHint";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";

const ProfileForm = () => {
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  const [isLoading, setIsLoading] = React.useState(false);

  const { updateHint, hintHtml } = useHint();

  const [username, setUsername] = React.useState("");
  const [biography, setBiography] = React.useState("");

  const createProfile = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;

    if (!userId) {
      updateHint({ error: Error(), text: "Profile Created!" });
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("user_profile")
      .insert({ biography, username, created_by: userId })
      .select("*")
      .maybeSingle();

    if (data) {
      setUserProfile(data);
    }

    updateHint({ error: error, text: "Profile Created!" });

    if (!error) {
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          createProfile();
        }}
      >
        <Input
          isDisabled={isLoading}
          type="text"
          label="Username"
          placeholder="John Doe"
          isRequired
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Textarea
          isDisabled={isLoading}
          isRequired
          type="text"
          label="Biography"
          placeholder="I am a software engineer"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        ></Textarea>
        {hintHtml()}
        <Button type="submit" color="primary" isLoading={isLoading}>
          Create Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
