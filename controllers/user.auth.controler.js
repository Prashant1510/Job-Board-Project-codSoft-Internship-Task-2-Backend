import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateTokens.js"
import bcrypt from "bcrypt";


//-------------------------signup section------------------------------------------

export const usersignup = async (req,res) =>{

    try {
        const { fullName, userName, password, confirmPassword, gender , phoneNumber, profilePic, emailId} = req.body;   // inputs taken form body
    
        if (password != confirmPassword) {                                            
          return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ userName });                                // to find the user in the User database
    
        if (user) {
          return res.status(400).json({ error: "User already exists" });
        }
      
        // Hashing the password for authentication and adding the profile picture
        const salt = await bcrypt.genSalt(10); // for creating salt
        const hashedpassword = await bcrypt.hash(password, salt); // for creating hash password with salt
    
        const newUser = new User({                  // creating the newUser instance form User model schema
          fullName,
          userName,
          password: hashedpassword,
          gender,
          profilePic,
          phoneNumber,
          emailId
        });
      
        if (newUser) {
          generateTokenAndSetCookie(newUser._id,"user", res); // for generating authentication token and save in browser cookie
          await newUser.save();           // for saving the newUser into to the database
    
          return res.status(201).json({          // for sending the success status and json data to browser 
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
            gender: newUser.gender,
          });
        } else {
           return res.status(400).json({ error: "Invalid user data" });
        }
      } catch (error) {
        console.log("Error in signup,", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

//---------------------------------------------login section-------------------------------


export const userlogin = async (req,res) =>{
  try {
    const { userName, password } = req.body;                // taking input from body or browser
    const user = await User.findOne({ userName });           // find the user in the User database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    generateTokenAndSetCookie(user._id,"user", res);         //generating the jwt token with userID and store into cookie and send res to browser 
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    }); 
  } catch (error) {
    console.log("Error in login,", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


//------------------------------------logout----------------------------------------

export const userlogout = async (req,res) =>{
  try {
    res.cookie("jwt","",{maxAge: 0});       //reset the jwt cookie to null
    res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    console.log("Error in logout,", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}