const mongoose=require("mongoose")
const User=mongoose.model("User")
const sha256=require("js-sha256")
const jwt=require("jsonwebtoken")
exports.register = async(req,res)=>
{
    const {name, email , password} = req.body ; 
    const emailRegex= /[@gmail.com|@yahoo.com|@hotmail.com]$/;
    if(!emailRegex.test(email)) throw "Email is not supported from your domain"
    if(password<6) throw "Password must be at least 6 charcters"
    const userExist= await User.findOne({
        email,
    })
    if(userExist) throw "This email is already registred"
    const user = new User({name,email,password : sha256(password+process.env.SALT)})
    await user.save();
    res.json({
        message:"User registred successfully"
    })
}   
exports.login = async(req,res)=>
{
    const { email , password} = req.body;
    const user = await User.find({
        email,
        password : sha256(password+process.env.SALT)
    })
    console.log(user)
    if(user.length===0){ 
        throw "Email and Password did not match."
    }
    else
    {const token = await jwt.sign(
        {user},
        process.env.SECRET,
       
      );
    const userName=user[0].name

    res.json({
      message: "User logged in successfully!",
      userName:userName,

      token,
    });}
}