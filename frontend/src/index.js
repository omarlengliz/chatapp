import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/common.css";
import "./styles/chatroom.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <App />
);