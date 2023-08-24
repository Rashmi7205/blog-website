import Blogs from "../model/blog.schema.js";
import AppError from "../utils/apperror.js";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';
import User from '../model/user.schema.js';


const getBlogs = async (req,res,next)=>{
    try {
        const blogs = await Blogs.find({});
        res.status(200).json({
            succsess:true,
            message:"All Blogs fetched succsessfully",
            blogCount:blogs.length,
            blogs
        });
    } catch (error) {
        return next(new AppError(error.message,400));
    }
}   

const getBlogById = async (req,res,next)=>{
    
    try {
        const {id} = req.params;
        if(!id){
            return next(new AppError('Blog Id is required',400));
        } 
        const blog = await Blogs.findById(id);
        if(!blog) {
            return next(new AppError("Blog Post Doesnot exist",400));
        }
        res.status(200).json({
            succsess:true,
            message:"Blog Fetched Successfully",
            blog,
        });
    } catch (error) {
        return next(new AppError(error.message,400));
    }
   
    
}

const createBlogs = async (req,res,next)=>{
    try {
        const {title,description,content,catagory} = req.body;
        const {id} = req.user;
        const user = await User.findById(id);
        user.password=undefined;

        if(!title||!content){
            return next(new AppError("Title and Content Must required",400));
        }



        const blog = await Blogs.create({
            title,
            description,
            publicUrl:'#',
            author:user,
            content,
            catagory,
            image:{
                public_id:'#',
                secure_url:'https://res.cloudinary.com/dkkaj165g/image/upload/v1691595963/blog/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664_zflele.jpg',
            },
            comments:[],
            likedBy:0,
            relatedPosts:[],
        });

        // / Uploading the image file of the blog
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'blog',
            });
            // Updating the urls fro thr image
            if(result){
                blog.image.public_id=result.public_id 
                blog.image.secure_url =result.secure_url;
            }
        }

        // / adding the related posts

        const relatedPosts = await Blogs.find({catagory:catagory})
        blog.relatedPosts = relatedPosts;
        await blog.save();

        res.status(200).json({
            succsess:true,
            message:"Blog created Succsessfully",
            blog
        })


    } catch (error) {
        return next(new AppError(error.message,400));
    }
}
const updateBlogs = async (req,res,next)=>{
            const {id} = req.params;
}
const deleteBlogs = async (req,res,next)=>{
    try {
        const {id} = req.params;
        if(!id){
            return next(new AppError("blog Id is required",400));
        }
        const blog = await Blogs.findByIdAndDelete(id);
        if(!blog){
            return next(new AppError("Blog Does not exist",400));
        }
        res.status(200).json({
            succsess:true,
            message:"Blog Deleted Sucessfully",
        })
        
    } catch (error) {
          return next(new AppError(error.message,400));
    }
}

export {
    getBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogById,

}