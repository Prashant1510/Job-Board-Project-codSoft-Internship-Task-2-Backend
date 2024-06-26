import Company from "../models/company.model.js"
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import bcrypt from "bcrypt";

//------------------------------------singup----------------------------------------

export const companysignup = async(req,res) =>{
    try {
        const { companyName, companyUserName, password, confirmPassword, companyLogo, companyWebsite , companyTollfreeNumber, companyDescription, companyEmail} = req.body;   // inputs taken form body
    
        if (password != confirmPassword) {                                            
          return res.status(400).json({ error: "Passwords do not match" });
        }
        const company = await Company.findOne({ companyUserName });                                // to find the user in the User database
    
        if (company) {
          return res.status(400).json({ error: "Company already exists" });
        }
    
        // Hashing the password for authentication and adding the profile picture
        const salt = await bcrypt.genSalt(10); // for creating salt
        const hashedpassword = await bcrypt.hash(password, salt); // for creating hash password with salt
    
        const newCompany = new Company({                  // creating the newCompany instance form User model schema
          companyName,
          companyUserName,
          password: hashedpassword,
          companyLogo,
          companyWebsite,
          companyTollfreeNumber,
          companyDescription,
          companyEmail,
        });
  
        if (newCompany) {
          generateTokenAndSetCookie(newCompany._id,"company", res); // for generating authentication token and save in browser cookie
          await newCompany.save();           // for saving the newCompany into to the database
    
          return res.status(201).json({          // for sending the success status and json data to browser 
            _id: newCompany._id,
            companyName: newCompany.fullName,
            companyUserName: newCompany.companyUserName,
            companyLogo: newCompany.companyLogo
          });
        } else {
           return res.status(400).json({ error: "Invalid Compnay data" });
        }
      } catch (error) {
        console.log("Error in signup,", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}


//------------------------------------login----------------------------------------

export const companylogin = async(req,res) =>{
    try{
    const {companyUserName, password} = req.body;
    const company = await Company.findOne({companyUserName});
    const isPasswordCorrect = await bcrypt.compare(
        password, 
        company?.password || ""
    );
    if(!company || !isPasswordCorrect){
        return res.status(400).json({error : "Invalid Credentials"});
    }
    generateTokenAndSetCookie(company._id,"company",res);
    return res.status(200).json({
        _id: company._id,
        companyName: company.companyName,
        companyUserName: company.companyUserName,
        companyLogo: company.companyLogo
    });
    }catch(error){
        console.log("Error in login,",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}



//------------------------------------logout----------------------------------------

export const companylogout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge: 0});       //reset the jwt cookie to null
        res.status(200).json({message:"Logged out successfully"});
      } catch (error) {
        console.log("Error in logout,", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}