import mongoose from "mongoose";
const connectDB=async ()=>{
    try{
        const MONGO_URI=process.env.MONGO_CONNECTION;
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.log("Failed to connect Data base",error)
    }
}

export default connectDB;