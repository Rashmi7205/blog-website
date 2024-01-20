import { useEffect, useState } from "react"

import Blogcard from "./Blogcard";
import Loader from '../utils/Loader';
import Button from '../Button';

import { useDispatch } from 'react-redux';
import { getAllBlog } from '../../Redux/Slices/blogSlice';
import {useNavigate} from 'react-router-dom';

function BlogCardList() {

    const navigate = useNavigate();

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
        <div className='w-full flex items-center justify-between'>
        <h1 className="text-black md:text-4xl  font-bold capitalize text-left m-4 ">Recent Posts</h1>
          <Button text={"View More"} onclick={()=>{
            navigate('/blog')
          }}/>
        </div>
       
        <div className='w-full flex flex-wrap gap-2 '>
        {
            blogList?.length
            ?blogList.map((blog)=><Blogcard data={blog}/>)
            :<Loader/>
        }
        </div>
        
    </>
  )
}

export default BlogCardList