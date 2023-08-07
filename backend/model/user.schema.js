import {Schema,model}  from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        required:[true,'password is Required']
    },
    profilePic:{
        public_id:String,
        secure_url:String,
    },
    description:{
        type:String
    },
    SocialLinks:{
        whatsapp:String,
        linkedin:String,
        instagram:String,
        facebook:String,
    },
    totalFollwer:{
        type:Number
    },
    TotlalLikes:{
        type:Number
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods={
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