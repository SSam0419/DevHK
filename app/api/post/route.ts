import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // console.log({ request });
  const cookieStore = cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase
    .from("post_with_comments_and_user")
    .select("*");
  console.log({ data, error });
  return NextResponse.json({
    data,
    error,
  });
}
