const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required",
    ref: "ChatRoom",
  },
  user: {
    type: String,
    required: "user name is required",
  },
  message: {
    type: String,
    required: "Message is required! ",
  },
});

module.exports = mongoose.model("Message", messageSchema);
