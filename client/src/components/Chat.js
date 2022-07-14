import React, { useState, useEffect, useRef } from "react";
import { HashtagIcon, SearchIcon } from "@heroicons/react/outline";
import {
  BellIcon,
  ChatIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import Message from "./Message";

function Chat({ recipient, user, readyToMount, setReadyToMount }) {
  const [newMessage, setNewMessage] = useState("");
  const [allChannelMessages, setAllChannelMessages] = useState("");
  const [allDirectMessages, setAllDirectMessages] = useState("");
  const [searchChat, setSearchChat] = useState("");
  const [sendSearchChat, setSendSearchChat] = useState("");
  const [renderTime, setRenderTime] = useState(0);

  const bottomRef = useRef(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setRenderTime(renderTime + 1);
    }, 1000);

    if (!recipient) {
      console.log("do nothing");
    } else {
      if (recipient.typeOf === "channel") {
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
              setAllChannelMessages(newData);
              setReadyToMount(true);
            } else {
              setAllChannelMessages(data);
              setReadyToMount(true);
            }
          })
          .catch((error) => window.alert(error));
      } else if (recipient.typeOf === "user") {
        fetch(
          `http://localhost:9292/users/${user.id}/messages/${recipient.name}`
        )
          .then((response) => response.json())
          .then((data) => {
            let newData;
            if (data === []) {
              setAllDirectMessages(null);
              setReadyToMount(true);
            } else if (sendSearchChat) {
              newData = { ...data };
              const filteredMessages = data.messages.filter((message) => {
                return message.username
                  .toLowerCase()
                  .includes(sendSearchChat.toLowerCase());
              });
              newData.messages = filteredMessages;
              setAllDirectMessages(newData);
              setReadyToMount(true);
            } else {
              setAllDirectMessages(data);
              setReadyToMount(true);
            }
          })
          .catch((error) => window.alert(error));
      } else {
        console.log("something is up");
      }
    }

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [sendSearchChat, recipient, renderTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, [recipient]);

  function handleChange(e) {
    e.preventDefault();
    setNewMessage(e.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("sending a message");

    if (recipient.typeOf === "user") {
      fetch("http://localhost:9292/users/friends/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          user_id: user.id,
          recipient: recipient.name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAllDirectMessages([...allDirectMessages, data]);
          setNewMessage("");
        })
        .catch((error) => window.alert(error));
    } else if (recipient.typeOf === "channel") {
      fetch("http://localhost:9292/users/channels/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          user_id: user.id,
          recipient: recipient.name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const newData = { ...allChannelMessages };
          const updatedMessages = [...newData.messages, data];
          newData.messages = updatedMessages;
          setAllChannelMessages(newData);
          setNewMessage("");
        })
        .catch((error) => window.alert(error));
    }
  };

  console.log(allChannelMessages);

  function handleSearchChange(e) {
    e.preventDefault();
    setSearchChat(e.target.value);
  }

  function handleSearchClick() {
    setSendSearchChat(searchChat);
  }

  function handleClearSearch(e) {
    e.preventDefault();
    setSearchChat("");
    setSendSearchChat("");
  }

  function channelOrDm() {
    if (recipient.typeOf === "channel") {
      return allChannelMessages.messages.map((message) => {
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
      });
    } else if (recipient.typeOf === "user") {
      return allDirectMessages.map((message) => {
        console.log(message);
        return (
          <Message
            key={message.id}
            username={recipient.name}
            user_id={message.user_id}
            message={message.body}
            searchChat={sendSearchChat}
            loggedInUserId={user.id}
          />
        );
      });
    }
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
        {readyToMount ? channelOrDm() : "lodaing"}
        <div ref={bottomRef} />
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
