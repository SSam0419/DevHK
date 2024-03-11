import Banner from "./_components/Banner";
import FeaturedPosts from "./_components/FeaturedPosts";
import { Spacer } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Spacer y={20} />
      <FeaturedPosts />
    </div>
  );
}
