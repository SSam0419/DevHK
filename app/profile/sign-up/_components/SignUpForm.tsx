"use client";

import useHint from "@/lib/hooks/useHint";
import { supabase } from "@/lib/supabase/client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SignUpForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { hintHtml, updateHint } = useHint();

  async function signUpNewUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    console.log({ data, error });
    updateHint({ error: error, text: "Sign Up Successful!" });
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
          variant="bordered"
          isLoading={isLoading}
          onClick={() => {
            signUpNewUser({ email, password });
          }}
        >
          Sign Up
        </Button>

        <Link
          href="/profile"
          className="text-secondary hover:cursor-pointer underline"
        >
          Already a member? Sign In Here !
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
