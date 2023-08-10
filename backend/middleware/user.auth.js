import AppError from "../utils/apperror.js";
import Jwt  from "jsonwebtoken";
import User from '../model/user.schema.js';

const isLoggedIn = async (req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return next(new AppError('Unauthenticated User',400));
    }
    const userDetails = await Jwt.verify(token,process.env.JWT_SECRET);
   
    req.user = userDetails;

    next();
}

export default isLoggedIn;