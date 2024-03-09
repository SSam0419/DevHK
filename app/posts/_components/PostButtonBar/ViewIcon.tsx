"use client";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";

const ViewIcon = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string | null;
}) => {
  const [view, setView] = useState(0);

  useEffect(() => {
    const fetchView = async () => {
      const { data, error } = await supabase
        .from("post_views")
        .select("*")
        .eq("post_id", postId);
      if (data) setView(data.length);
    };

    fetchView();
  }, [postId]);

  return (
    <Button className="">
      <div className="flex items-center gap-1">
        <div className="">
          <GrView />
        </div>
        <div className="">{view}</div>
      </div>
    </Button>
  );
};

export default ViewIcon;
