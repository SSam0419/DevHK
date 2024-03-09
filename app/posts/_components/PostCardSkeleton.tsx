import { Skeleton } from "@nextui-org/react";
import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Skeleton className="w-full h-[120px] rounded-3xl bg-default-100"></Skeleton>
      <Skeleton className="w-full h-[120px] rounded-3xl bg-default-100"></Skeleton>
    </div>
  );
};

export default PostCardSkeleton;
