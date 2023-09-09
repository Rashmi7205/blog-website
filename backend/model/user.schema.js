import {Schema,model}  from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        maxLength:[40,'Name must less than 40 char'],
        minLength:[4,'Name must More than 4 char']
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:[true,'Email Must unique']
    },
    password:{
        type:String,
        required:[true,'password is Required'],
        select:false,
    },
    profilePic:{
        public_id:String,
        secure_url:String,
    },
    description:{
        type:String
    },
    socialLinks:{
        whatsapp:String,
        linkedin:String,
        instagram:String,
        facebook:String,
    },
    totalFollwer:{
        type:Number
    },
    totlalLikes:{
        type:Number
    },
    follwers:Array,
    followings:Array,
    blogs:Array,
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExipyDate:{
        type:Date
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods={
    generatePasswordResetToken:async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            
        this.forgotPasswordExpiaryDate = Date.now()+60*60*60*1000; /// 60 min from now


        return resetToken;

    },
    genertateJWTToken : async function(){
        return await jwt.sign({
            id:this._id,
            email:this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRY
        })
    },
    comparePassword:async function(userPassword){
        return await bcrypt.compare(userPassword,this.password);
    }
}

export default model("User",userSchema);