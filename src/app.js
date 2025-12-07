//Pure express here in app.js
import express from "express";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/Auth.routes.js";
const app=express();

//Middlewares
//Body Parser for converting raw data to json form that server can understand
app.use(express.json());
app.use(cookieParser());

//Default Route
app.get("/",(req,res)=>{
    res.send("API is Working properly")
})

//Api Routers
app.use("/api",AuthRoute)

export default app;