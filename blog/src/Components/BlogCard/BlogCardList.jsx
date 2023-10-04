import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Blogcard from "./Blogcard";
import Loader from '../utils/Loader';

import { useDispatch } from 'react-redux';
import { getAllBlog } from '../../Redux/Slices/blogSlice';


function BlogCardList() {

    const [blogList,setBlogList] = useState([]);

    const downLoadBlogs = async ()=>{
      const data = await dispatch(getAllBlog());
      setBlogList(data?.payload);        
    } 

    const dispatch = useDispatch();

    useEffect(()=>{
        downLoadBlogs();
        
    },[]);

  return (
    <>
        <h1 className="text-black text-4xl font-bold capitalize text-left m-4 ">Recent Posts</h1>
        {
            blogList.length
            ?blogList.map((blog)=><Blogcard data={blog}/>)
            :<Loader/>
        }
    </>
  )
}

export default BlogCardList