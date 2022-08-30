import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { SocketContext } from "../context/socket";
import makeToast from "../Toaster";
import {
  ConversationHeader,
  Message,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useNavigate } from "react-router-dom";

import { IoSend } from "react-icons/io5";
const ChatroomPage = () => {
  //function
  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView();
  };
  const sendMessage = () => {
    if (socket && messageRef.current.value !=="") {
      socket.emit("chatroomMessage", {
        chatroomId: chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
      scrollBottom();
    } else {
      makeToast("error", "message is empty!!!");
    }
  };
  const dashboard = () => {
    navigate("/dashboard");
  };
  //useRef
  const bottomRef = useRef(null);
  const messageRef = useRef(null);
  //useNavigate
  const navigate = useNavigate();

  //useState
  const [messages, setMessages] = useState(null);
  //useContext
  const socket = useContext(SocketContext);
  //useParams()
  const chatroomId = useParams().id;
  //useLocation
  const location = useLocation();
  const chatroomName = location.state.name;

  //useEffect
  useEffect(() => {
    socket.emit("joinRoom", {
      chatroomId,
    });
    socket.on("allMessages", (messagesList) => {
      setMessages(messagesList.messages);
    });
    socket.on("newMessage", (message) => {
      socket.on("allMessages", (messagesList) => {
        setMessages(messagesList.messages);
      });
      setMessages((messages) => [...messages, message.message]);
      scrollBottom();
    });
  }, []);

  if (messages === null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Oval
          height={100}
          width={100}
          color="#6E85B7"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#B2C8DF"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  } else {
    return (
      <div style={{ margin: "20px 2px" }}>
        <div className="chatroomSection">
          <ConversationHeader>
            <ConversationHeader.Back onClick={dashboard} />
            <ConversationHeader.Content userName={chatroomName} />
          </ConversationHeader>
          <MessageList className="messageList">
            {messages === null
              ? console.log("hhe")
              : messages.map((message, i) => (
                  <span key={i}>
                    <Message
                      model={{
                        type: "custom",

                        message: message.message,
                        sentTime: "just now",
                        sender: "Joe",
                        direction:
                          localStorage.getItem("name") !== message.user ? 0 : 1,
                      }}
                    ></Message>
                    {localStorage.getItem("name") !== message.user ? (
                      <Message.Footer sender={message.user} />
                    ) : (
                      <Message.Footer sentTime="You" />
                    )}
                  </span>
                ))}
            <br></br>
            <br></br>
          </MessageList>

          <div className="chatroomActions">
            <input
              ref={messageRef}
              type={"text"}
              name="message"
              className="input-message"
              placeholder="type a message !"
            ></input>
            <button onClick={sendMessage} className="send-button">
              <IoSend className="join-icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatroomPage;
