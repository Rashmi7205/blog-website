import React,{useState,useEffect, useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {UserContext} from '../../App';
import axios from 'axios';
import Loader from '../utils/Loader';

function MyBlogTab() {
  const userData = useContext(UserContext);
  const [blogList,setBlogList] = useState([]);

  const getBlogs = async ()=>{
     const blogs = userData?.userDetails?.blogs;
     console.log(userData.userDetails);
     try{
      const blogResult = blogs?.map(async (blog)=>await axios.get(`http://localhost:5030/api/v1/blog/getblogs/${blog}`));

     const blogData = await axios.all(blogResult);
      setBlogList(blogData);
     }catch(err){
        console.log("error");
     }
    
  }
  const handleDeleteBlog = async (id)=>{
        try {
            const {data} = await axios.delete(`http://localhost:5030/api/v1/blog/deleteblog/${id}`,{
              withCredentials:true,
            });
          
        } catch (error) {
          console.log(error.message);
        }
  }
  
  useEffect(()=>{
      getBlogs();
      console.log(blogList)
  },[]);
  
  return (
    <div className='w-full  h-4/5'>
      {/* Search and create Blog */}
      <div className='w-full flex'>
        <input type="text"  
        className='w-3/5 rounded-md outline-none '
        placeholder='Search your blog...'
        />
        <Link to='/blog/create'>
        <button className='bg-purple-600 text-white font-semibold px-5 py-2 rounded-md '> + Create</button>
        </Link>
      </div>
      {/* Blog List */}
      <div className='w-full flex flex-col my-4'>
        {
          blogList.length
          ?
          <ul className='w-4/5 felx flex-col'>
          {
            blogList.map((blog)=> <li  key={`${blog.data.blog._id}`} className='w-full h-12 bg-slate-300 text-center capitalize font-semibold flex my-3 rounded-lg'>
            <h2 className='w-3/5'>{blog?.data?.blog.title}</h2>
            <div className='w-2/5 flex '>
              <button className='bg-purple-600 px-4 py-1 capitalize text-white rounded-md '>
                edit
              </button>
              <button className='bg-red-500 px-4 py-1 capitalize text-white rounded-md'
              onClick={()=>handleDeleteBlog(blog?.data?.blog?._id)}
              >
                  delete
              </button>
            </div>
          </li>)
          }
        </ul>
        :<Loader/>
        }
      
      </div>
    </div>
  )
}

export default MyBlogTab