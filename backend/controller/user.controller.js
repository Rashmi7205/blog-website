import AppError from "../utils/apperror.js";
import User from '../model/user.schema.js';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import emailValidator from 'email-validator';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from "../utils/sendmail.js";


const cookieOption = {
    maxAge:7*24*60*60*1000, ///7 days
    httpOnly:true,
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
            description:"",
            profilePic:{
                public_id:"#",
                secure_url:"https://res.cloudinary.com/dkkaj165g/image/upload/v1691595963/blog/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664_zflele.jpg",
            },
            totalFollwer:0,
            totlalLikes:0,
            socialLinks:{
                whatsapp:"#",
                linkedin:"#",
                instagram:"#",
                facebook:"#",
            },
            blogs:[]
        });

        await user.save();

        user.password=undefined;

        const token = await user.genertateJWTToken();

        res.cookie('token',token,cookieOption);


        const subject = `Registration Successful! Welcome to Our Website`;
        const html = `<!DOCTYPE html>
        <html>
        <head>
            <title>Registration Successful! Welcome to Our Website</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        
            <div style="background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #e4e4e4;">
                    <h2 style="color: #333333;">Registration Successful! Welcome to Our Website</h2>
                    <p>Dear ${user.name},</p>
                    <p>We are thrilled to welcome you to our community! Your registration to [Website Name] was successful, and we are excited to have you onboard. Get ready to embark on a journey of discovery, learning, and connection.</p>
                    <p>Here at [Website Name], we are committed to providing you with an enriching and fulfilling experience. Whether you're here to learn, share, connect, or simply explore, our platform offers a myriad of opportunities tailored to your interests.</p>
                    <p>Now that you're a part of our community, here's what you can expect:</p>
                    <ol>
                        <li><strong>Access to Exclusive Content:</strong> Gain access to a wealth of resources, articles, videos, and more that are designed to inspire, educate, and entertain.</li>
                        <li><strong>Engaging Discussions:</strong> Join conversations on topics that matter to you. Share your insights, ask questions, and learn from fellow members who share your passions.</li>
                        <li><strong>Personalized Experience:</strong> Our platform is designed to cater to your preferences. As you engage with our content and community, our algorithms will tailor recommendations to suit your interests.</li>
                        <li><strong>Connect and Collaborate:</strong> Connect with like-minded individuals, experts, and enthusiasts from around the world. Collaborate on projects, exchange ideas, and build meaningful relationships.</li>
                        <li><strong>Stay Updated:</strong> Receive regular updates on new content, events, and opportunities. Never miss out on what's happening in your areas of interest.</li>
                    </ol>
                    <p>To get started, simply log in to your account using your registered email ([User's Email]) and the password you created during registration. If you have any questions, encounter any issues, or need assistance, our support team is here to help. Just drop us a message at [Support Email] and we'll be glad to assist you.</p>
                    <p>Thank you for choosing [Website Name] as your online destination. We are honored to have you as a part of our community and look forward to seeing the positive impact you will make.</p>
                    <p>Once again, welcome aboard!</p>
                    <br>
                    <p>Best regards,<br>[Rashmi Ranjan]<br><br>[Website Name]<br>[Website Contact Information]</p>
                </div>
            </div>
        
        </body>
        </html>
        `
        await sendEmail(user.email,subject,html);


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
    
        if(!user || !await user.comparePassword(password)){
            return next(new AppError("Invalid Credentials",400));
        }

        const token = await user.genertateJWTToken();

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
    try {
            // get the user id from the url param
        const {id} = req.params;
        
        // find the user in db
        const user = await User.findById(id);
        if(!user){
            return next(new AppError("User doesnot exist",400));
        }

        // return the user data
        res.status(200).json({
            success:true,
            message:"User data fetch succsessfully",
            admin:false,
            user,
        })

    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const getProfile = async (req,res,next)=>{
        try{
            if(!req.user){
                return next(new AppError("Authentication Failed",400));
            }
           
            const {id} = req.user;

            const user = await User.findById(id);

            if(!user){
                return next(new AppError("User Does not Exist",400));
            }

            user.password=undefined;
            res.status(200).json({
                success:true,
                message:"User Fetched Succsessfully",
                admin:true,
                user
            });

        }catch(error){
            return next(new AppError(error.message,400));
        }
} 

const updateUser = async(req,res,next)=>{
    try{
        const {id} = req.user;

        const user = await User.findById(id);


        const {name,description,whatsapp,linkedin,instagram,facebook} = req.body;

        /// Updating other user details
        user.name=name;
        user.description=description;
        user.socialLinks = {
            whatsapp,
            linkedin,
            instagram,
            facebook,
        }

        ///Updating the profile picture
        if(req.file){
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'blog',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.profilePic.public_id= result.public_id
                user.profilePic.secure_url=result.secure_url;

                  /// Removing the File From the server
                fs.rm( `uploads/${req.file.filename}`);
            }
          
        }
        
        await user.save();
        /// Making the password undefined
        user.password=undefined;

        res.status(200).json({
            success:true,
            message:"User Updated Succsessfully",
            user,
        })
    }catch(error){
        return next(new AppError(error.message,400));
    }
}

const resetPassword = async(req,res,next)=>{
    try {
        const {email} = req.body;

        if(!email){
            return next(new AppError("Email is Required",400));
        }


        const user = await User.findOne({email});


        if(!user){
            return next(new AppError("User Does not Exist",400));
        }

    
        const forgotPasswordToken = await user.generatePasswordResetToken();

        await user.save();

        const subject = `Password Reset Request for ${email}`;
        const message = `<!DOCTYPE html>
        <html>
        <head>
            <title>Password Reset Request for [Hello World]</title>
        </head>
        <body>
            <h1>Password Reset Request for [Hello World]</h1>
            <p>Dear [${user.name}],</p>
            <p><a href="">[${forgotPasswordToken}]</a><br>
            <p>We have received a request to reset the password for your account on [Hello World]. If you did not initiate this request, please ignore this email.</p>
        
            <p>If you did request a password reset, please follow the instructions below to reset your password:</p>
        
            <ol>
                <li>Click on the following link to go to the password reset page: <a href="[Password Reset Link]">Password Reset Link</a></li>
                <li>Once on the reset page, enter your new password in the designated field.</li>
                <li>Re-enter the new password to confirm.</li>
                <li>Click on the "Reset Password" button to complete the process.</li>
            </ol>
        
            <p>Please note that for security reasons, the password reset link will expire in [expiration time, e.g., 15 minute]. If you do not reset your password within this time frame, you will need to initiate the reset process again.</p>
        
            <p>If you encounter any issues or need further assistance, please do not hesitate to contact our support team at <a href="mailto:[Support Email Address]">[Support Email Address]</a> or <a href="tel:[Support Phone Number]">[Support Phone Number]</a>.</p>
        
            <p>Thank you for using [Website Name].</p>
        
            <p>Best regards,<br>
            The [Website Name] Team</p>
        
          
            Contact: <a href="mailto:[Contact Email Address]">[Contact Email Address]</a> | Phone: <a href="tel:[Contact Phone Number]">[Contact Phone Number]</a></p>
        </body>
        </html>
        `

        await sendEmail(email,subject,message);

        res.status(200).json({
            success:true,
            message:`You Received an Email to reset password in ${email}`,
        });

    } catch (error) {
       
        return next(new AppError(error.message,400));
    }
}

const changePassword = async (req,res,next)=>{
    
    try {
        const {newPassword} = req.body;
        const {resetToken} = req.params;

        console.log(resetToken)

        if(!newPassword){
            return next(new AppError("Password is Required",400));
        }

        if(!resetToken){
            return next(new AppError("Unauthorized Request",400));
        }

        const user = await User.findOne({forgotPasswordToken:resetToken});

        if(!user){
            return next(new AppError("User Does Not exist",400));
        }

        user.password=newPassword;
        user.forgotPasswordToken =undefined;

        await user.save();


        res.status(200).json({
            success:true,
            message:"Password Updated Successfully"
        });

    } catch (error) {
        return next(new AppError(error.message,400));
    }


}

const deleteUser = async(req,res,next)=>{
    try {
            const {id} = req.user;

            const user = await User.findByIdAndDelete(id);

            if(!user){
                return next(new AppError("something went wrong",400));
            }
 
            res.status(200).json({
                success:true,
                message:"User Deleted Succsessfully",
            });

    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const logout = async(req,res,next)=>{
    try {
        res.cookie('token',null);
        res.status(200).json({
            success:true,
            message:"Logout Successfully",
        })
    } catch (error) {
        return next(new AppError("Invalid Request",500));
    }
}
const followUser = async (req,res,next)=>{
    try {
        //ID of the user to be follwed by the current user
        const {id} = req.params;
        
        // cuurent user id
        const userId = req.user.id;

        // getting the user from the Db
        const currentUser = await User.findById(userId);
        
        const reqestedUser = await User.findById(id);

        if(!currentUser || ! reqestedUser){
            return next(new AppError('User Doesnot exist',400));
        }

        if( currentUser.followings.includes(id)){
                return  res.status(200).json({
                    success:true,
                    message:"Already Follw succsessfull",
                    id,
                });
        }
        currentUser.followings.push(id);
        reqestedUser.follwers.push(userId);

        await currentUser.save();
        await reqestedUser.save();
        res.status(200).json({
            success:true,
            message:"Follwing succsessfull",
            id,
        });

    } catch (error) {
        return next(new AppError("Invalid Request",500));
    }
}

export {
    register,
    login,
    getUser,
    getProfile,
    updateUser,
    changePassword,
    resetPassword,
    deleteUser,
    logout,
    followUser  
}