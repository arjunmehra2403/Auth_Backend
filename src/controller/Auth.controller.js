import User from "../models/Auth.model.js";
import bcrypt from "bcrypt";
export const Signup=async (req,res)=>{
    try{
        const {email,password,phone,address}=req.body;
        //Check if user exist or not 
        const existinfUser=await User.findOne({email});
        if(existinfUser)
        {
            return res.status(400)
            .json({
                message:"User Already Exist!",
                success:false,
            });
        }
        //Hash the password
        const hashPassword=await bcrypt.hash(password,10);
        // if user not exist create a new user
        const newUser=await User.create({
            email,
            password:hashPassword,
            phone,
            address,
        })
        //Send the Success response
        return res.status(200)
        .json({
            message:"User Register Successfully",
            success:true,
            user:newUser,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500)
        .json({
            message:"Internal Server Error",
            success:false,
        })
    }
}

export const Login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(!existingUser)
        {
            return res.status(404)
            .json({
                message:"User is not Found",
                status:false,
            })
        }
        //And if user Exist Compare the password
        const comparePassword=await bcrypt.compare(password,existingUser.password);
        if(!comparePassword)
        {
            return res.status(401)
            .json({
                message:"Password is not Correct",
                success:false,
            })
        }
        return res.status(200)
        .json({
            message:"Login Successfully",
            success:true,
        })
    }
    catch(error)
    {
        console.log(error);
        res.Statusssss(500)
        .json({
            message:"Internal Server Error",
            success:false,
        })
    }
}