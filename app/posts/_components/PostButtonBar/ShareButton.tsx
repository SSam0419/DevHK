import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Snippet,
} from "@nextui-org/react";
import React from "react";
import { IoMdShare } from "react-icons/io";
const ShareButton = ({ postId }: { postId: string }) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button isIconOnly>
          <IoMdShare />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <Snippet symbol="">{postId}</Snippet>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
