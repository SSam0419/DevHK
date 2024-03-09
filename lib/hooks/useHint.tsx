import { AuthError, PostgrestError } from "@supabase/supabase-js";
import React, { ReactNode } from "react";

const useHint = () => {
  const [hint, setHint] = React.useState<{ text: string; isError: boolean }>({
    text: "",
    isError: false,
  });

  const updateHint = ({
    error,
    text,
  }: {
    error: PostgrestError | AuthError | Error | null;
    text: string;
  }) => {
    if (error) {
      setHint({ text: error.message.toString(), isError: true });
    } else {
      setHint({ text: text, isError: false });
    }
  };

  const hintHtml = (): React.ReactNode => {
    return (
      hint.text && (
        <p className={hint.isError ? "text-danger" : "text-success"}>
          {hint.text}
        </p>
      )
    );
  };

  return { hint, updateHint, hintHtml };
};

export default useHint;
