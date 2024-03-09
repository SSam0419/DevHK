import Image from "next/image";
import Banner from "./_components/Banner";
import FeaturedPosts from "./_components/FeaturedPosts";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <FeaturedPosts />
    </div>
  );
}
