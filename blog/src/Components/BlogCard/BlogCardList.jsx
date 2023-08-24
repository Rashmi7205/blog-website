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
        {
            blogList.length
            ?blogList.map((blog)=><Blogcard data={blog}/>)
            :"Loading Blogs "
        }
    </>
  )
}

export default BlogCardList