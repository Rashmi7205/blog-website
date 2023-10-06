import Blogs from "../model/blog.schema.js";
import AppError from "../utils/apperror.js";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';
import User from '../model/user.schema.js';


const getBlogs = async (req,res,next)=>{
    try {
        const blogs = await Blogs.find({}).limit(5);
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

        /// adding it to the user blog
        user.blogs.push(blog.id);
        await user.save();

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
    try {
        const { id } = req.params;
        const { title, description, content, catagory } = req.body;
    
        const blog = await Blogs.findById(id);
    
        // IF blog does not exist
        if (!blog) {
            return next(new AppError("Blog does not exist", 400));
        }
    
        const updatedBlog = await Blogs.findByIdAndUpdate(id, {
            title,
            description,
            content,
            catagory
        }, { new: true }); // Adding { new: true } to get the updated document
    
        if (!updatedBlog) {
            return next(new AppError("Failed to update", 400));
        }
    
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            updatedBlog
        });
    
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
    
   



}
const deleteBlogs = async (req,res,next)=>{
    try {
        const {id} = req.params;
        if(!id){
            return next(new AppError("blog Id is required",400));
        }

        const user = await User.findById(req.user.id);
        if(!user){
            return next(new AppError("User doesnot exist",400));
        }
        if(user.blogs.includes(id)){
            const blog = await Blogs.findByIdAndDelete(id);
            if(!blog){
                 return next(new AppError("Blog Does not exist",400));
            }
            user.blogs.splice(user.blogs.indexOf(id),1);
            await user.save();

           return res.status(200).json({
                succsess:true,
                message:"Blog Deleted Sucessfully",
            })
            
        }
        else{
            return res.status(200).json({
                succsess:false,
                message:"unauthorized accsess",
            })
        }
       
    } catch (error) {
          return next(new AppError(error.message,400));
    }
}

const postComment = async (req,res,next)=>{
    try {
        const {email} = req.user;
        const {id} = req.params;
        const {newComment} = req.body;
        if(!email || !id){
            return next(new AppError('Unauthenticated User',503));
        }
        const user = await User.findOne({email});
        if(!user){
            return next(new AppError('User Not regitser',400));
        }
        const blog = await Blogs.findById(id);
    
        const commentObj = {
            id:user._id,
            name:user.name,
            profilePic:user.profilePic.secure_url,
            comment:newComment,
        }
        
        blog.comments.push(commentObj);

        await blog.save();

        res.status(200).json({
            succsess:true,
            message:"Commend Added Succsessfully",
            blog,
        });
    } catch (error) {
            return next(new AppError(error.message,400));
    }
}

const postLike = async (req,res,next)=>{
    try {
        const { email } = req.user;
        const { id } = req.params;
        if (!email || !id) {
            return next(new AppError('Unauthenticated User', 503));
        }
    
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError('User Not registered', 400));
        }
    
        const blog = await Blogs.findById(id);
    
        const likedIndex = blog.likedBy.indexOf(user.id);
    
        if (likedIndex !== -1) {
            // User's ID is found in the likedBy array, remove it
            blog.likedBy.splice(likedIndex, 1);
    
            await blog.save();
            return res.status(200).json({
                success: true,
                message: "Unliked Successfully",
                blog,
            });
        } else {
            // User's ID is not found in the likedBy array, add it
            blog.likedBy.push(user.id);
    
            await blog.save();
            return res.status(200).json({
                success: true,
                message: "Liked Successfully",
                blog
            });
        }
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
}



export {
    getBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogById,
    postComment,
    postLike,
    
}