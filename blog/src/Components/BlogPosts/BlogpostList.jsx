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
      count:0,
    })
    const dispatch = useDispatch();
    const downLoadBlogs = async ()=>{
      const data = await dispatch(getAllBlog(pageCount));
      setBlogPosts(data?.payload); 
      }

      //Handle page change
  const handleNextPageChange = ()=>{
      const count = pageCount.count + pageCount.limit;    
      setPageCount({
            ...pageCount,
            count
          });
        console.log(pageCount);
    }
    const handlePrevPageChange = ()=>{
      if(pageCount.count === 0){
        return;
      }
      const count = pageCount.count - pageCount.limit;    
      setPageCount({
            ...pageCount,
            count
          });
        console.log(pageCount);
    }


    useEffect(()=>{
        downLoadBlogs();
    },[pageCount]);
  return (
    <div className='w-full flex col items-start justify-around'>
        {
          blogPosts.length?blogPosts.map((blog)=><BlogPostCard key={blog._id} blog={blog} />)
          :"Loading Blogs ..."
        }
        {blogPosts.length && <div>
        <div className='w-full flex gap-4'>
        <button 
        className='px-4  py-2 bg-white text-black font-bold capitalize shadow-lg rounded-md  ' 
        onClick={handlePrevPageChange}>prev</button>
        <button 
        className='px-4  py-2 bg-white text-black font-bold capitalize shadow-lg rounded-md '
        onClick={handleNextPageChange}>next</button>
      </div>
        </div>}
    </div>
  )
}

export default BlogpostList