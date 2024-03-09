import React from "react";
import { Skeleton } from "@nextui-org/react";

const ProfileDisplaySkeleton = () => {
  return (
    <Skeleton className="text-content2 bg-default-700 rounded-large p-10 flex flex-col gap-6 h-[100px]"></Skeleton>
  );
};

export default ProfileDisplaySkeleton;
