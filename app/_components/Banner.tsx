import { Button } from "@nextui-org/react";
import React from "react";

const Banner = () => {
  return (
    <div className="text-content2 bg-default-700 rounded-large p-10 flex flex-col gap-6">
      <h1 className="text-4xl font-bold  ">Welcome to DevHK!</h1>
      <p>{"<intro>"}</p>
      <p className="text-lg pl-5">
        Join the community to connect with fellow developers, share knowledge,
        and explore the latest trends in software development.
      </p>
      <p>{"</intro>"}</p>
      <Button color="primary">Sign Up</Button>
    </div>
  );
};

export default Banner;
