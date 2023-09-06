import React,{useState,useEffect} from 'react';
import axios from 'axios';

import BlogPostCard from './BlogPostCard';

function BlogpostList() {
    const [blogPosts,setBlogPosts] = useState([]);

    const downLoadBlogs = async ()=>{
        try {
          const {data} = await axios.get('https://blog-backend-1-23dz.onrender.com/api/v1/blog/getblogs');
          setBlogPosts(data.blogs); 
        } catch (error) {
          console.log(error.message);
        }  
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