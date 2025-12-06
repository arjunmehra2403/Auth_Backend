import express from "express";
import {Signup} from "../controller/Auth.controller.js";
import {Login} from "../controller/Auth.controller.js";
const router=express.Router();


router.post("/signup",Signup)  //Signup= Controller
router.post("/login",Login)   //Login= Controller
export default router;