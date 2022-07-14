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

function Chat({ recipient, user }) {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState('');
  const [searchChat, setSearchChat] = useState('');
  const [sendSearchChat, setSendSearchChat] = useState('');

  useEffect(() => {
    if (!recipient) {
      console.log('do nothing');
    } else {
      if (recipient.typeOf === 'channel') {
        fetch(`http://localhost:9292/channels/${recipient.name}/messages`)
          .then((response) => response.json())
          .then((data) => {
            let newData;
            if (sendSearchChat) {
              newData = { ...data };
              const filteredMessages = data.messages.filter((message) => {
                return message.username
                  .toLowerCase()
                  .includes(sendSearchChat.toLowerCase());
              });
              newData.messages = filteredMessages;
              setAllMessages(newData);
            } else {
              setAllMessages(data);
            }
          })
          .catch((error) => window.alert(error));
      } else if (recipient.typeOf === 'user') {
        fetch(`http://localhost:9292/channels/${recipient.name}/messages`)
          .then((response) => response.json())
          .then((data) => {
            let newData;
            if (sendSearchChat) {
              newData = { ...data };
              const filteredMessages = data.messages.filter((message) => {
                return message.username
                  .toLowerCase()
                  .includes(sendSearchChat.toLowerCase());
              });
              newData.messages = filteredMessages;
              setAllMessages(newData);
            } else {
              setAllMessages(data);
            }
          })
          .catch((error) => window.alert(error));
      } else {
        console.log('something is up');
      }
    }
  }, [sendSearchChat, recipient]);

  function handleChange(e) {
    e.preventDefault();
    setNewMessage(e.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('sending a message');

    //   fetch("http://localhost:9292", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newMessage),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setResponse(data);
    //     })
    //     .catch((error) => window.alert(error));
  };

  function handleSearchChange(e) {
    e.preventDefault();
    setSearchChat(e.target.value);
  }

  function handleSearchClick() {
    setSendSearchChat(searchChat);
  }

  function handleClearSearch(e) {
    e.preventDefault();
    setSearchChat('');
    setSendSearchChat('');
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{recipient.name}</h4>
        </div>
        <div className="flex space-x-3">
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
              value={searchChat}
              onChange={handleSearchChange}
            />
            <SearchIcon
              onClick={handleSearchClick}
              className="h-4 text-[#72767d] mr-1"
            />
          </div>
          <button
            className="text-white cursor-pointer"
            onClick={handleClearSearch}
          >
            Clear
          </button>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {allMessages
          ? allMessages.messages.map((message) => {
              return (
                <Message
                  key={message.message_id}
                  username={message.username}
                  user_id={message.user_id}
                  recipient={recipient}
                  message={message.body}
                  searchChat={sendSearchChat}
                  loggedInUserId={user.id}
                />
              );
            })
          : 'lodaing'}
      </main>
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <form className="flex-grow">
          <input
            type="text"
            placeholder="..."
            className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            onChange={(e) => handleChange(e)}
            value={newMessage}
          />
          <button type="submit" onClick={sendMessage}></button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
