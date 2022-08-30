import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import makeToast from "../Toaster";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { IoEnterOutline } from "react-icons/io5";
const DashboardPage = () => {
  //functions
  const getRoom = () => {
    axios
      .get("http://localhost:800/chatroom/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setChatrooms(res.data);
      })
      .catch((err) => {
        setTimeout(getRoom, 10000);
      });
  };
  const createRoom = async () => {
    setLoaded(false);
    const chatroom = chatroomRef.current.value;
    await axios
      .post(
        "http://localhost:800/chatroom/",
        {
          name: chatroom,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoaded(true);
        makeToast("success", res.data.message);
        socket.emit("createRoom");
      })
      .catch((err) => {
        setLoaded(true);
        makeToast("error", err.response.data.message);
      });
  };
  
  //ref
  const chatroomRef = React.createRef();
  //use State
  const [loaded, setLoaded] = useState(true);
  let [chatrooms, setChatrooms] = useState([]);
  //useContext
  const socket = useContext(SocketContext);
  //useEffect
  useEffect(() => {
    socket.on("allRooms", () => {
      getRoom();
    });
    if (chatrooms.length === 0) {
      getRoom();
    }
  }, [socket]);
  if (loaded === true) {
    return (
      <div className="app">
        <div className="container">
          <input
            className="input"
            type="text"
            name="chatroomname"
            id="chatroomname"
            placeholder="room name"
            ref={chatroomRef}
          />
          <button className="submit-button" onClick={createRoom}>
            CREATE CHATROOM
          </button>
        </div>

        <div className="chatrooms">
          {chatrooms.map((chatroom, id) => (
            <div key={id} className="chatroom-row">
              <div>
                <b>{chatroom.name}</b>
              </div>
              <Link
                to={"/chatroom/" + chatroom._id}
                state={{ name: chatroom.name }}
              >
                <div className="icons">
                  <IoEnterOutline className="join-icon" />
                </div>{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
  }
};

export default DashboardPage;
