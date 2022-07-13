import React from 'react';
import { HashtagIcon } from '@heroicons/react/outline';

function Channel({ id, channelName, setChannel }) {
  function dislayChannel() {
    setChannel(channelName);
  }

  return (
    <div
      className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 rounded-md  hover:text-white"
      onClick={dislayChannel}
    >
      <HashtagIcon className="h-5 mr-2" /> {channelName}
    </div>
  );
}

export default Channel;
