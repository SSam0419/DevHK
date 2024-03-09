import React, { Suspense } from "react";

import CategoriesTabs from "./_components/CategoriesTabs";
import PostCardSkeleton from "./_components/PostCardSkeleton";
import PostList from "./_components/PostList";
import { Spacer } from "@nextui-org/react";

const page = ({
  searchParams,
}: {
  searchParams?: {
    category_id?: string;
  };
}) => {
  const categoryId = searchParams ? Number(searchParams?.category_id) : 1;

  return (
    <div>
      <CategoriesTabs />
      <Spacer y={10} />
      <Suspense fallback={<PostCardSkeleton />}>
        <PostList categoryId={categoryId} />
      </Suspense>
    </div>
  );
};

export default page;
