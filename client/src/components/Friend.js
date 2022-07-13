import React from "react";
import { HashtagIcon } from "@heroicons/react/outline";

function Friend({ id, friendName }) {
  return (
    <div
      className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
      // onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" /> {friendName}
    </div>
  );
}

export default Friend;
