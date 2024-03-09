"use client";

import useHint from "@/lib/hooks/useHint";
import { useUserStore } from "@/lib/states/User";
import { supabase } from "@/lib/supabase/client";
import { wait } from "@/lib/utils/wait";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const { updateHint, hintHtml } = useHint();

  const fetchUserProfile = async () => {
    setIsLoading(true);
    const user = await supabase.auth.getUser();

    if (user.data.user?.id) {
      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("created_by", user.data.user.id)
        .maybeSingle();

      if (data) {
        setUserProfile(data);
      } else {
        setUserProfile(null);
      }

      setUser(user.data.user);
    }

    setIsLoading(false);
  };

  async function signInWithEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log({ data, error });

    await fetchUserProfile();
    updateHint({ error: error, text: "Sign In Successful!" });

    router.refresh();
    setIsLoading(false);
  }

  return (
    <div>
      <form className="flex flex-col gap-5">
        <Input
          isDisabled={isLoading}
          isRequired
          type="email"
          label="Email"
          placeholder="junior@nextui.org"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          isDisabled={isLoading}
          isRequired
          type="password"
          label="Password"
          placeholder="123123"
          className=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {hintHtml()}
        <Button
          className="w-full"
          color="primary"
          isLoading={isLoading}
          onClick={() => {
            signInWithEmail({ email, password });
          }}
        >
          Sign In
        </Button>
        <Link
          href="/profile/sign-up"
          className="text-secondary hover:cursor-pointer underline"
        >
          New User? Sign Up Here !
        </Link>
      </form>
    </div>
  );
};

export default AuthForm;
