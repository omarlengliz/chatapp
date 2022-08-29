const mongoose=require("mongoose")


const chatroomM=mongoose.model("ChatRoom")
exports.createChatRoom=async (req,res)=>
{
    const {name}=req.body
    const nameRegex=/^[A-Za-z\s]+$/ 
    if(!nameRegex.test(name)) throw "Invalid Name"

    const chatroomExist= await chatroomM.findOne({
        name
    })
    if(chatroomExist) throw "Chatroom with that name alerady created"
    const chatroom=new chatroomM({
        name,
    })

    await chatroom.save();
    res.json({
        message : "chatroom created successfully"
    })

}
exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await chatroomM.find({});
  
    res.json(chatrooms);
  };