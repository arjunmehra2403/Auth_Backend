//Server Start here
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/index.js";
dotenv.config()
//Data base connect here
connectDB()
const port =process.env.PORT || 4040;

app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`)
});