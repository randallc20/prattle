import React, { useState, useEffect } from 'react';
import { HashtagIcon, SearchIcon } from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid';
import Message from './Message';

function Chat({ channel }) {
  const [allMessages, setAllMessages] = useState('');
  console.log(channel);

  // useEffect(() => {
  //   fetch(`http://localhost:9292/channels/${channel}/messages`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllMessages(data);
  //     })
  //     .catch((error) => window.alert(error));
  // }, []);

  // console.log(allMessages);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('sending a message');

    //send the message to the database

    // e.preventDefault();
    // fetch("http://localhost:9292", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(message),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setResponse(data);
    //   })
    //   .catch((error) => window.alert(error));
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channel}</h4>
        </div>
        <div className="flex space-x-3">
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
            />
            <SearchIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      {/* <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {allMessages.messages.map((message) => {
          return (
            <Message
              key={message.user.id}
              username={message.username}
              user_id={message.user_id}
              recipient={message.channel_id}
              message={message.body}
            />
          );
        })}
      </main> */}
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <form className="flex-grow">
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
