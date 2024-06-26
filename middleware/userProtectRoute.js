import jwt from "jsonwebtoken";

const userProtectRoute =  async (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }
        const type = decoded.userType;
        if(type === "user"){
            next();
        }else{
            return res.status(401).json({error:"Unauthorize access, You are not allowed"})
        }



    } catch (error) {
        console.log("Error in userProtectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

export default userProtectRoute;