const router = require("express").Router()
const chatRoomController = require("../controllers/chatRoomController")
const auth=require("../middlewares/auth")
router.post("/",auth,chatRoomController.createChatRoom)
router.get("/",auth,chatRoomController.getAllChatrooms)

module.exports=router