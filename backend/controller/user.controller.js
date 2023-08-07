import AppError from "../utils/apperror.js";
import User from '../model/user.schema.js';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import emailValidator from 'email-validator';


const cookieOption = {
    maxAge:24*60*60*7, ///7 days
    httpOnly:true
}

const ping = (req,res,next)=>{
    res.status(200).json({
        succsess:true,
        message:"Pong"
    })
}

const register = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return next(new AppError("All Fields are required",400));
        }
        

        if(!emailValidator.validate(email)){
            return next(new AppError("Invalid Email id",400));
        }

        const userExist = await User.findOne({email});
        if(userExist){
            return next(new AppError("Already user Registered ",500));
        }

        const user = await User.create({
            name,
            email,
            password,
            profilePic:{
                public_id:"#",
                secure_url:"#",
            }
        });

        await user.save();

        user.password=undefined;

        const token = user.genertateJWTToken();

        res.cookie('token',token,cookieOption);

        res.status(200).json({
            success:true,
            message:"Registration succsessfull",
            user
        }
        );

    } catch (error) {
        return next(new AppError(error.message,400));
    }    

}

const login = async (req,res,next)=>{

    try {
        const {email,password} = req.body;

        if(!email||!password){
            return next(new AppError("All fields are mandatoty",400));
        }

        if(!emailValidator.validate(email)){
            return next(new AppError("Invalid Email id",400));
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !user.comparePassword(password)){
            return next(new AppError("Invalid Credentials",400));
        }

        const token = user.genertateJWTToken();

        res.cookie("token",token,cookieOption);
        
        user.password=undefined;
        res.status(200).json({
            success:true,
            message:"Logged in Successfully",
            user
        })

    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const getUser = async (req,res,next)=>{

} 

export {
    ping,
    register,
    login,
    getUser
}