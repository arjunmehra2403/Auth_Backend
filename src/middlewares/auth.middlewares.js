import jwt from "jsonwebtoken";
import User from "../models/Auth.model.js";
const verifyJwt=async(req,res,next)=>{
   try {
     const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if(!token)
     {
         return res.status(401)
         .json({
             message:"Unauthorise request",
             success:false,
         })
     }
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user=await User.findById(decodedToken?._id)
 
     if(!user)
     {
         return res.status(401)
         .json({
             message:"Invalid Access Token",
             success:false,
         })
     }
 
     req.user=user;
     next()
   } catch (error) {
    console.log(error);
    return res.status(500)
    .json({
        message:"Internal Server error",
        success:false,
    })
   }
}
export default verifyJwt;