import User from "../models/Auth.model.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generatingRefreshToken()

        //Saving refreshToken in data base
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        //And return the refresh and access token
        return { accessToken, refreshToken }
    }
    catch (error) {
        console.log(error);
        return res.send(500)
            .json({
                message: "Something went wrong while generating access and refresh token",
                status: false,
            })
    }
}
export const Signup = async (req, res) => {
    try {
        const { email, password, phone, address } = req.body;
        //Check if user exist or not 
        const existinfUser = await User.findOne({ email });
        if (existinfUser) {
            return res.status(400)
                .json({
                    message: "User Already Exist!",
                    success: false,
                });
        }
        //Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        // if user not exist create a new user
        const newUser = await User.create({
            email,
            password: hashPassword,
            phone,
            address,
        })
        //Send the Success response
        return res.status(200)
            .json({
                message: "User Register Successfully",
                success: true,
                user: newUser,
            });
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false,
            })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;                   //req body
        const existingUser = await User.findOne({ email });    //checking email exist or not
        console.log("user:- ", existingUser);
        if (!existingUser) {
            return res.status(404)
                .json({
                    message: "User is not Found",
                    status: false,
                })
        }
        //And if user Exist Compare the password
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        if (!comparePassword) {
            return res.status(401)
                .json({
                    message: "Password is not Correct",
                    success: false,
                })
        }
        //Calling the Method here
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id)

        //Send the Token in secure cookies
        const options = {
            httpOnly: true,
            secure: true,
        }
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Login Successfully",
                success: true,
                user: {
                    _id: existingUser._id,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    address: existingUser.address
                },
                tokens: {
                    accessToken,
                    refreshToken
                }
            });

    }
    catch (error) {
        console.log(error);
        res.status(500)
            .json({
                message: "Internal Server Error",
                success: false,
            })
    }
}

export const Logout = async (req, res) => {
    //Clear the cookies
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            message: "User Logged Out Successfully",
            success: true,
        })
}