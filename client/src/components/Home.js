import React from 'react';
import {
  ChevronDownIcon,
  PlusIcon,
  HashtagIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { MicrophoneIcon, PhoneIcon, CogIcon } from '@heroicons/react/solid';
import PrattleLogo from '../assets/PrattleLogo.png';
import Chat from '../components/Chat';
import Channel from '../components/Channel';
import Friend from '../components/Friend';

function Home() {
  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');
    console.log('This is where we are making a new channel: ' + channelName);
    if (channelName) {
      //add the channel to the database - do I need a form?
    }
  };

  function handleSettings() {
    //this will be a popup
    const settingsButton = prompt('This is just to show settings');
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="bg-[#2f3136] flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
            Chanel Names
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <h4 className="font-semibold ">Channels</h4>
              <PlusIcon
                className="h-6 ml-auto cursor-pointer hover:text-white"
                onClick={handleAddChannel}
              />
            </div>
            <ol># this is where the 2 public channels go</ol>
            {/* <div className="flex flex-col space-y-2 px-2 mb-4">
              {data.channels.map((channel) => (
                <Channel
                  key={channel.id}
                  id={channel.id}
                  channelName={channel.channel_name}
                />
              ))}
            </div> */}
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            {/* this is how to display a user info section at the bottom */}
            {/* <div className="flex items-center space-x-1">
              <img
                src={user image}
                alt=""
                className="h-10 rounded-full"
                onClick={signOut}
              />
              <h4 className="text-white text-xs font-medium">
                {userName}{" "}
                <span className="text-[#b9bbbe] block">
                  #{userId}
                </span>
              </h4>
            </div> */}
            <div className="text-gray-400 flex items-center">
              <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                <CogIcon className="h-5 icon" onClick={handleSettings} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#36393f] flex-grow">
          <Chat />
        </div>
        <div className="bg-[#2f3136] flex flex-col min-w-max">
          <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
            This Will be a list of friends
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <ol>THIS IS TEST FREIND 1</ol>
            <ol>TEST FREIND 2</ol>
            {/* <div className="flex flex-col space-y-2 px-2 mb-4">
              {data.friends.map((friend) => (
                <Friend
                  key={friend.id}
                  id={friend.id}
                  friendName={friend.name}
                />
              ))}
            </div> */}
          </div>
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="text-gray-400 flex items-center">
              <div className="flex bg-[#202225] text-xs p-1 rounded-md">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
                />
                <SearchIcon className="h-4 text-[#72767d] mr-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
