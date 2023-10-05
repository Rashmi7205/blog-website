import React,{useState,useEffect} from 'react';
import axios from 'axios';

import BlogPostCard from './BlogPostCard';
import { useDispatch } from 'react-redux';
import { getAllBlog } from '../../Redux/Slices/blogSlice';

function BlogpostList() {
    const [blogPosts,setBlogPosts] = useState([]);
    const dispatch = useDispatch();
    const downLoadBlogs = async ()=>{
      const data = await dispatch(getAllBlog());
      setBlogPosts(data?.payload); 
      }

    useEffect(()=>{
        downLoadBlogs();
    },[]);
  return (
    <div className='w-full flex col items-start justify-around'>
        {
          blogPosts.length?blogPosts.map((blog)=><BlogPostCard key={blog._id} blog={blog} />)
          :"Loading Blogs ..."
        }
    </div>
  )
}

export default BlogpostList