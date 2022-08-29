import React from "react";
import socketio from "socket.io-client";
export const socket = socketio.connect("http://localhost:800/",{
    query:{
        token:localStorage.getItem("token")
    }
});
export const SocketContext = React.createContext();