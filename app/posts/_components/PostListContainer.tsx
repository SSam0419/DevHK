import React, { Suspense } from "react";
import CategoriesTabs from "./CategoriesTabs";
import PostList from "./PostList";
import PostCardSkeleton from "./PostCardSkeleton";

const PostListContainer = async ({
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
      <Suspense fallback={<PostCardSkeleton />}>
        <PostList categoryId={categoryId} />
      </Suspense>
    </div>
  );
};

export default PostListContainer;
