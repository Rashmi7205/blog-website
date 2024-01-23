import { useState,useEffect } from 'react';
import DOMpurify from 'dompurify';
import parse from 'html-react-parser'
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from '../../Redux/Slices/blogSlice';
import ShareButton from '../ShareButton'
import CommentList from '../Comments/CommentList';
import RelatedPostList from '../RelatedPost/RelatedPostList';
import { VscSend } from "react-icons/vsc";
import { commentOnPost } from '../../Redux/Slices/authSlice';

function BlogDetails() {

  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=>state?.auth?.userData);

  const [blogid,setId] = useState(id);
  const [blogDetails,setBlogDetails] = useState(null);

  const [newComment,setNewComment] = useState("");

  const handleComment  = ()=>{
      if (!user) {
        navigate("/login");
      }
      if(newComment === ""){
        toast.info("Empty Comment cannot be added",{
          position:toast.POSITION.TOP_RIGHT
        });
        return;
      }
      const commentObj = {
        blogId:blogid,
        newComment
      }
       const data =  dispatch(commentOnPost({blogid,newComment}))
  }

  const handleIdChange = (id)=>{
      setId(id);
  }

  const handleLike = ()=>{
    
  }

  // download all blog 
  const downloadBlogDetails = async ()=>{
      if(!blogid){
        toast.error("Error in loading the blogs")
        return;
      }
      const id = blogid;
      const response = await dispatch(getBlogById(id));
      if(response?.payload){
        setBlogDetails(response?.payload?.blog);
      }
    }

  useEffect(()=>{
    downloadBlogDetails();
  },[blogid]);
  return (
    <>
      {blogDetails?
      <div className='w-full flex items-start justify-around md:flex-row flex-col '>
         <div className="w-full md:w-3/5 flex flex-col items-start justify-around">
      {/* Blog image Section */}
      <div className='w-full h-74'>
          <img src={blogDetails?.image?.secure_url || 
          "#"} alt="image" 
          className='w-full h-[260px] rounded-xl object-cover'
          />
      </div>
    {/* Blog image Section ends Here */}
    
    {/* Author Details Section */}
      <div className='w-full my-5 flex items-center  justify-around'>
          <img src={blogDetails?.author?.profilePic} alt=""
          className='w-[50px] h-[50px] rounded-full'
          />
          <h3 className='text-black font-bold text-lg capitalize'>
              {blogDetails?.author?.name}
              <span className='m-4 text-sm text-[grey]'>
              {blogDetails?.author?.totalFollwer}
              </span>
          </h3>

        <div className='bg-white  w-[2/5] flex gap-5 px-3 py-2 rounded-md text-md md:text-2xl '>
          <button>
          <i className='fa-solid fa-heart'></i>
          </button>
         <ShareButton/>
        </div>
      </div>
      {/* Author Details Section Ends Here */}

      {/* Main content Section */}
      <div className='w-full  m-2 px-4'>
        {/* Title of Blog */}
        <h1 className='w-full text-2xl font-bold my-3 '>
          {blogDetails.title}
        </h1>
        {/* Description of the blog */}
        <p className='w-full text-xl text-[#5063f6] my-2'>{blogDetails.description}</p>
        {/* Content Section */}
        <p className='w-full text-lg font-medium tracking-wide my-5 '>
           {
              parse(DOMpurify.sanitize(blogDetails?.content))
           }
        </p>
      </div>
      <div className='w-full bg-purple-500 flex items-center justify-center py-8 my-4 rounded-lg gap-2'>
          <input type="text"
          className='outline-none w-2/5 px-2 py-2 rounded-xl'
          placeholder='Comment on post '
          onChange={(e)=>setNewComment(e.target.value)}
          />
          <button className='btn'
          onClick={handleComment}
          ><VscSend/></button>
      </div>
      <div>
           <CommentList currentBlogId={blogDetails._id} comments={blogDetails?.comments}/>
      </div>
      {/* Main Content Section Ends Here */}
      
          
      {/* you may Also Like Section End Here */}
      </div>
      <div className='md:w-1/5 w-full'>
        <RelatedPostList id={blogid} setid={handleIdChange}/>
      </div>
      </div>
     
    : "Loading Blog Details"}
    </>
  );
}

export default BlogDetails