const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name : 
        {
            type : String,
            required : "Name is Required"
        },
        email : 
        {
            type : String,
            required : "email is Required"
        },
        password : 
        {
            type : String,
            required : "password is Required"
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User",userSchema)