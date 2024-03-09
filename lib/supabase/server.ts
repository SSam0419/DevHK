import { createServerClient } from "@supabase/ssr";

import { Database } from "./Database";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const createSupabaseServerClient = async (
  _cookieStore: ReadonlyRequestCookies
) => {
  return await createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return _cookieStore.get(name)?.value;
        },
      },
    }
  );
};
