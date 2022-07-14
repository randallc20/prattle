import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  PlusIcon,
  HashtagIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { MicrophoneIcon, PhoneIcon, CogIcon } from "@heroicons/react/solid";
import PrattleLogo from "../assets/PrattleLogo.png";
import Chat from "../components/Chat";
import Channel from "../components/Channel";
import Friend from "../components/Friend";

function Home({ response }) {
  const [user, setUser] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [allUserChannels, setAllUserChannels] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const [channelSearch, setChannelSearch] = useState("");
  const [sendChannelSearch, setSendChannelSearch] = useState("");
  const [readyToMount, setReadyToMount] = useState(false);

  let navigate = useNavigate();

  if (user && !allUserChannels) {
    setAllUserChannels(user.channels);
  }

  if (user && !friendsList) {
    setFriendsList(user.friends);
  }

  useEffect(() => {
    if (!response) {
      navigate("/");
    } else {
      fetch(`http://localhost:9292/users/${response.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          let newData;
          if (sendChannelSearch) {
            newData = { ...data };
            const filteredChannels = data.channels.filter((channel) => {
              return channel.channel_name
                .toLowerCase()
                .includes(sendChannelSearch.toLowerCase());
            });
            newData.channels = filteredChannels;
            setAllUserChannels(filteredChannels);
            setUser(newData);
          } else {
            setAllUserChannels(data.channels);
            setUser(data);
          }
        })
        .catch((error) => window.alert(error));
    }
  }, [sendChannelSearch]);

  const handleJoinChannel = () => {
    const newChannelName = prompt("Enter a channel to join");
    console.log(
      "This is where we are joining a new channel: " + newChannelName
    );
    if (newChannelName) {
      fetch(`http://localhost:9292/channels/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelName: newChannelName,
          userId: response.user_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            window.alert(data.error);
          } else {
            setAllUserChannels((allUserChannels) => [...allUserChannels, data]);
          }
        })
        .catch((error) => window.alert(error));
    }
  };

  const handleCreateChannel = () => {
    const newChannelName = prompt("Enter a new channel name");
    console.log("This is where we are making a new channel: " + newChannelName);
    if (newChannelName) {
      fetch("http://localhost:9292/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelName: newChannelName,
          userId: response.user_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            window.alert(data.error);
          } else {
            setAllUserChannels((allUserChannels) => [...allUserChannels, data]);
          }
        })
        .catch((error) => window.alert(error));
    }
  };

  function handleAddFriend() {
    const newFriendName = prompt("Enter a new friend name");
    console.log("This is the name of a new friend: " + newFriendName);
    if (newFriendName) {
      fetch(`http://localhost:9292/user/add_friend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendName: newFriendName,
          userId: response.user_id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            window.alert(data.error);
          } else {
            setFriendsList((friendsList) => [...friendsList, data]);
          }
        })
        .catch((error) => window.alert(error));
    }
  }

  function handleSettings() {
    const settingsButton = prompt("This is just to show settings one day");
  }

  function logOut() {
    response = null;
    navigate("/");
  }

  function handleChannelSearchChange(e) {
    setChannelSearch(e.target.value);
  }

  function handleChannelSearchClick() {
    setSendChannelSearch(channelSearch);
  }

  function handleChannelClearSearch(e) {
    e.preventDefault();
    setChannelSearch("");
    setSendChannelSearch("");
  }

  return (
    <>
      {user ? (
        <>
          <div className="flex h-screen">
            <div className="bg-[#2f3136] flex flex-col min-w-max">
              <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
                Chanel Names
              </h2>
              <div className="flex bg-[#202225] text-xs p-1 rounded-md">
                <input
                  type="text"
                  placeholder="Search"
                  value={channelSearch}
                  className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
                  onChange={handleChannelSearchChange}
                />
                <SearchIcon
                  onClick={handleChannelSearchClick}
                  className="h-4 text-[#72767d] mr-1"
                />
              </div>
              <button
                className="text-white items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer"
                onClick={handleChannelClearSearch}
              >
                Clear
              </button>
              <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
                <div className="flex items-center p-2 mb-2">
                  <h4 className="font-semibold ">Join Channel</h4>
                  <PlusIcon
                    className="h-6 ml-auto cursor-pointer hover:text-white"
                    onClick={handleJoinChannel}
                  />
                </div>
                <div className="flex flex-col space-y-2 px-2 mb-4">
                  {allUserChannels
                    ? allUserChannels.map((channel) => (
                        <Channel
                          key={channel.id}
                          id={channel.id}
                          channelName={channel.channel_name}
                          setRecipient={setRecipient}
                          setReadyToMount={setReadyToMount}
                        />
                      ))
                    : null}
                </div>
                <div className="flex items-center p-2 mb-2">
                  <h4 className="font-semibold ">Create Channel</h4>
                  <PlusIcon
                    className="h-6 ml-auto cursor-pointer hover:text-white"
                    onClick={handleCreateChannel}
                  />
                </div>
              </div>
              <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
                {/* this is how to display a user info section at the bottom */}
                <div className="flex items-center space-x-1">
                  <h4 className="text-white text-xs font-medium">
                    <span className="text-[#b9bbbe] block">
                      #{user.username}
                    </span>
                  </h4>
                </div>
                <div className="text-gray-400 flex items-center">
                  <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={logOut}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                    <CogIcon className="h-5 icon" onClick={handleSettings} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#36393f] flex-grow">
              {recipient ? (
                <Chat
                  recipient={recipient}
                  user={user}
                  setReadyToMount={setReadyToMount}
                  readyToMount={readyToMount}
                />
              ) : (
                "Please select a channel or friend"
              )}
            </div>
            <div className="bg-[#2f3136] flex flex-col min-w-max">
              <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
                Amigos
              </h2>
              <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
                <div className="flex items-center p-2 mb-2">
                  <h4 className="font-semibold ">Add Friend</h4>
                  <PlusIcon
                    className="h-6 ml-auto cursor-pointer hover:text-white"
                    onClick={handleAddFriend}
                  />
                </div>
                <div className="flex flex-col space-y-2 px-2 mb-4">
                  {friendsList
                    ? friendsList.map((friend) => (
                        <Friend
                          key={friend.id}
                          id={friend.id}
                          friendName={friend.username}
                          setRecipient={setRecipient}
                          setReadyToMount={setReadyToMount}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Home;
