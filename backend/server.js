import app from "./app.js";
import { config } from "dotenv";
import express from "express";
import connectToDb from "./config/dbConnection.js";
import cloudinary,{v2} from "cloudinary";

config();

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


app.listen(process.env.PORT||5030,()=>{
    connectToDb();
    console.log(`Server is Running at ${process.env.PORT}`)
})
