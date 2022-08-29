import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { SocketContext } from "../context/socket";
import makeToast from "../Toaster";

const ChatroomPage = () => {
  //function
  const scrollBottom = () => {
    bottomRef.current?.scrollIntoView();
  };
  const sendMessage = () => {
    if (socket && messageRef.current.value != "") {
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
  //useRef
  const bottomRef = useRef(null);
  const messageRef = useRef(null);
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
      <div className="chatroomPage">
        <div className="chatroomSection">
          <div className="cardHeader">{chatroomName}</div>
          <div className="chatroomContent">
            {messages === null
              ? console.log("hhe")
              : messages.map((message, i) => (
                  <div key={i} className="message">
                    <span
                      className={
                        localStorage.getItem("name") === message.user
                          ? "ownMessage"
                          : "otherMessage"
                      }
                    >
                      {localStorage.getItem("name") === message.user
                        ? "You"
                        : message.user}
                      :
                    </span>{" "}
                    {message.message}
                  </div>
                ))}
            <br></br>
            <div id="bottom" ref={bottomRef}></div>
          </div>
          <div className="chatroomActions">
            <div>
              <input
                ref={messageRef}
                type={"text"}
                name="message"
                placeholder="type a message !"
              ></input>
            </div>
            <div>
              <button onClick={sendMessage} className="join">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatroomPage;
