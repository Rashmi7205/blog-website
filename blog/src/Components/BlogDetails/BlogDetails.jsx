import { useState,useEffect } from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import BlogCardList from '../BlogCard/BlogCardList';
function BlogDetails() {

  const {id} = useParams();
  const [blogid,setId] = useState(id);
  const [blogDetails,setBlogDetails] = useState({});

  const downloadBlogDetails = async ()=>{
      const {data} = await axios.get(`http://localhost:5030/api/v1/blog/getblogs/${blogid}`,{
        withCredentials:true,
      });
      setBlogDetails(data.blog);
      console.log(blogDetails);
  }



  useEffect(()=>{
    downloadBlogDetails();
  },[blogid]);
  return (
    <div className="w-full md:w-1/2 m-auto flex flex-col items-start justify-around">
        {/* Blog image Section */}
        <div className='w-full h-74'>
            <img src={blogDetails.image.secure_url} alt="image" 
            className='w-full h-full rounded-xl'
            />
        </div>
      {/* Blog image Section ends Here */}
      
      {/* Author Details Section */}
        <div className='w-full h-2 m-5 flex items-start justify-start'>
            <img src={blogDetails.author.profilePic.secure_url} alt=""
            className='w-[50px] h-[50px] rounded-full'
            />
            <h3 className='text-black font-bold text-lg capitalize'>
                {blogDetails.author.name}
                <span className='m-4 text-sm text-[grey]'>
                {blogDetails.author.totalFollwer}
                </span>
            </h3>
            <button className='h-10 w-[120px] p-1 font-bold capitalize bg-[#279EFF] text-white rounded-lg'>
              +Follow
            </button>
        </div>
        {/* Author Details Section Ends Here */}

        {/* Main content Section */}
        <div className='w-full  m-2'>
          {/* Title of Blog */}
          <h1 className='w-full text-2xl font-bold my-3 '>
            {blogDetails.title}
          </h1>
          {/* Description of the blog */}
          <p className='w-full text-xl text-[#5063f6] my-2'>{blogDetails.description}</p>
          {/* Content Section */}
          <p className='w-full text-lg font-medium tracking-wide my-5 '>
             {blogDetails.content}
          </p>
        </div>
        {/* Main Content Section Ens Here */}
        {/* You may Also Like section */}
        <h1 className='w-full text-center text-3xl text-purple-600 font-bold underline my-3'>You May also Like</h1>
        <div className='w-full flex flex-wrap'>
            <BlogCardList/>
        </div>
        {/* you may Also Like Section End Here */}
    </div>
  )
}

export default BlogDetails