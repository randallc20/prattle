import React from "react";
import { HashtagIcon } from "@heroicons/react/outline";

function Friend({ id, friendName, setRecipient, setReadyToMount }) {
  function displayFriend() {
    setReadyToMount(false);
    setRecipient({ name: friendName, typeOf: "user" });
  }
  return (
    <div
      className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
      onClick={displayFriend}
    >
      <HashtagIcon className="h-5 mr-2" /> {friendName}
    </div>
  );
}

export default Friend;
