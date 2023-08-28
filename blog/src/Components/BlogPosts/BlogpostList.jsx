import React,{useState,useEffect} from 'react';
import axios from 'axios';

import BlogPostCard from './BlogPostCard';

function BlogpostList() {
    const [blogPosts,setBlogPosts] = useState([]);

    const downLoadBlogs = async ()=>{
            const {data} = await axios.get('http://localhost:5030/api/v1/blog/getblogs');
            setBlogPosts(data.blogs); 
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