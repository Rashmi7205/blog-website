import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Blogcard from "./Blogcard";


function BlogCardList() {

    const [blogList,setBlogList] = useState([]);

    const downLoadBlogs = async ()=>{
          try {
            const {data} = await axios.get('http://localhost:5030/api/v1/blog/getblogs');
            setBlogList(data.blogs);
          } catch (error) {
              toast.info(error.message,{
                position:toast.POSITION.TOP_LEFT,
                autoClose:3000,
              })
          }
            
    } 

    useEffect(()=>{
        downLoadBlogs();
    },[]);

  return (
    <>
        <h1 className="text-black text-4xl font-bold capitalize text-left m-4 ">Recent Posts</h1>
        {
            blogList.length
            ?blogList.map((blog)=><Blogcard data={blog}/>)
            :"Loading Blogs "
        }
    </>
  )
}

export default BlogCardList