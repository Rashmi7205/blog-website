import { useState,useEffect } from 'react';
import DOMpurify from 'dompurify';
import parse from 'html-react-parser'
import React from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

import BlogCardList from '../BlogCard/BlogCardList';
import { useDispatch } from 'react-redux';
import { getBlogById } from '../../Redux/Slices/blogSlice';
import ShareButton from '../ShareButton'

function BlogDetails() {

  const {id} = useParams();
  const dispatch = useDispatch();

  const [blogid,setId] = useState(id);
  const [blogDetails,setBlogDetails] = useState(null);

  const handleLike = ()=>{
    
  }

  // download all blog 
  const downloadBlogDetails = async ()=>{
      if(!id){
        toast.error("Error in loading the blogs")
        return;
      }
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
      <div className="w-full md:w-1/2 m-auto flex flex-col items-start justify-around">
      {/* Blog image Section */}
      <div className='w-full h-74'>
          <img src={blogDetails.image.secure_url} alt="image" 
          className='w-full h-full rounded-xl'
          />
      </div>
    {/* Blog image Section ends Here */}
    
    {/* Author Details Section */}
      <div className='w-full h-2 m-5 flex items-start justify-start'>
          <img src={blogDetails.author.profilePic.secure_url} alt=""
          className='w-[50px] h-[50px] rounded-full'
          />
          <h3 className='text-black font-bold text-lg capitalize'>
              {blogDetails.author.name}
              <span className='m-4 text-sm text-[grey]'>
              {blogDetails.author.totalFollwer}
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
      {/* Main Content Section Ens Here */}
     
     
      {/* You may Also Like section */}
      <h1 className='w-full text-center text-3xl text-purple-600 font-bold underline my-3'>You May also Like</h1>
      <div className='w-full flex flex-wrap'>
          <BlogCardList/>
      </div>
      {/* you may Also Like Section End Here */}
      </div>
    : "Loading Blog Details"}
    </>
  );
}

export default BlogDetails