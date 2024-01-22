import React,{useState,useEffect} from 'react';
import axios from 'axios';

import BlogPostCard from './BlogPostCard';
import { useDispatch } from 'react-redux';
import { getAllBlog } from '../../Redux/Slices/blogSlice';
import Pagination from '../Pagination';

function BlogpostList() {
    const [blogPosts,setBlogPosts] = useState([]);
    const [pageCount,setPageCount] = useState({
      limit:5,
      skip:0,
    })
    const dispatch = useDispatch();
    const downLoadBlogs = async ()=>{
      const data = await dispatch(getAllBlog(pageCount));
      setBlogPosts(data?.payload); 
      }

      //Handle page change
  const handleNextPageChange = ()=>{
      const skip = pageCount.skip + pageCount.limit;    
      setPageCount({
            ...pageCount,
            skip
          });
        console.log(pageCount);
    }
    const handlePrevPageChange = ()=>{
      if(pageCount.skip === 0){
        return;
      }
      const skip = pageCount.skip - pageCount.limit;    
      setPageCount({
            ...pageCount,
            skip
          });
        console.log(pageCount);
    }


    useEffect(()=>{
        downLoadBlogs();
    },[pageCount]);
  return (
    <>
    <h1 className='text-center w-full my-8 font-bold text-3xl'>Trending Posts</h1>
    <div className='w-full flex flex-wrap items-start justify-center'>
        {
          blogPosts?.length?blogPosts.map((blog)=><BlogPostCard key={blog._id} blog={blog} />)
          :"Loading Blogs ..."
        }
        
    </div>
    {blogPosts?.length && <div>
        <div className='w-full flex gap-4'>
        <button 
        className='px-4  py-2 bg-white text-black font-bold capitalize shadow-lg rounded-md  ' 
        onClick={handlePrevPageChange}>prev</button>
        <button 
        className='px-4  py-2 bg-white text-black font-bold capitalize shadow-lg rounded-md '
        onClick={handleNextPageChange}>next</button>
      </div>
    </div>}
    </>
  )
}

export default BlogpostList