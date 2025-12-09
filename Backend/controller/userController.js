import User from "../models/user.js";
import bcrypt, { hash } from "bcryptjs"
import  createTokenAndSaveCookie from "../jwt/generateToken.js"
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    //Hashing the password
   const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password:hashPassword, // Later we can hash this
    });

    await newUser.save();
    if(newUser){
        createTokenAndSaveCookie(newUser._id, res);
        res.status(201).json({ message: "User created successfully", newUser });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//login
export const login = async(req, res)=>{
    const {email, password}= req.body;
    try{
       const user= await User.findOne({email})
       const isMatch= await bcrypt.compare(password,user.password);
       if(!user||!isMatch){
        return res.status(400).json({error:"Invvalid User Credential"});
       }
       createTokenAndSaveCookie(user._id,res );
       res.status(200).json({message:"User logged in sucessfully", user:{
           _id: user._id,
           fullname:user.fullname,
           email:user.email
       }})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
//logout
export const logout = async(req, res)=>{
    try{
       res.clearCookie("jwt")
       res.status(201).json({message:"User logged out  sucessfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});

    }
}
