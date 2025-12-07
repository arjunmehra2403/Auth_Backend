import express from "express";
import {Logout, Signup} from "../controller/Auth.controller.js";
import {Login} from "../controller/Auth.controller.js";
import verifyJwt from "../middlewares/auth.middlewares.js";
const router=express.Router();


router.post("/signup",Signup)  //Signup= Controller
router.post("/login",Login)   //Login= Controller
router.post("/logout",verifyJwt,Logout) //verifyJwt is Middleware
export default router;