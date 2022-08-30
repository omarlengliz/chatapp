require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR : " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

require("./models/User");
require("./models/ChatRoom");
require("./models/Message");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const app = require("./app");
const jwt = require("jsonwebtoken");

const server = app.listen(800, () => {
  console.log("server run 8000");
});

const io = require("socket.io")(server);
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;

    const payload = await jwt.verify(token, process.env.SECRET);
    console.log(payload["user"][0]._id);

    socket.userId = payload["user"][0]._id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("connect");
  socket.on("disconnected", () => {
    console.log("dis");
  });
  socket.on("createRoom", async () => {
    io.emit("allRooms");
  });

  socket.on("joinRoom", async ({ chatroomId }) => {
    socket.join(chatroomId);
    const messageList = await Message.find({ chatroom: chatroomId });

    io.to(chatroomId).emit("allMessages", {
      messages: messageList != null ? messageList : [],
    });
  });
  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
  });
  socket.on("chatroomMessage", async (a) => {
    if (a) {
      const user = await User.findById(socket.userId);
      console.log(user);
      const newMessage = new Message({
        chatroom: a.chatroomId,
        user: user.name,
        message: a.message,
      });
      io.to(a.chatroomId).emit("newMessage", {
        message: newMessage,
      });
      await newMessage.save();
    }
  });
});
