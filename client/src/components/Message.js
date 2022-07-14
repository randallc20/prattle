import React from "react";
import { TrashIcon } from "@heroicons/react/solid";

function Message({ user_id, message, username, loggedInUserId }) {
  console.log(user_id, message, username, loggedInUserId);
  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353B] group">
      {loggedInUserId === user_id ? (
        <div className="flex flex-col">
          <h4 className="flex items-center space-x-2 font-medium">
            <span className="hover:underline text-white text-sm cursor-pointer">
              Me
            </span>
            <span className="text-[#72767d] text-xs"></span>
          </h4>
          <p className="text-sm text-[#84cc16]">{message}</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <h4 className="flex items-center space-x-2 font-medium">
            <span className="hover:underline text-white text-sm cursor-pointer">
              {username}
            </span>
            <span className="text-[#72767d] text-xs"></span>
          </h4>
          <p className="text-sm text-[#dcddde]">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
