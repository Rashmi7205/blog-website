import {Link,useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import React from 'react';
import BlogDetails from '../BlogDetails/BlogDetails';
import CommentList from '../Comments/CommentList';
import { UserContext } from '../../App';


function BlogPostCard({blog}) {

    const [isOpen, setIsOpen] = useState(false);
    const [blogData,setBlogData] = useState(blog);
    const [newComment,setNewComment] = useState("");
    const [isFollwing,setISFollwing] = useState(false);
    const [isLiked,setIsLiked] = useState(false);
    const user = useContext(UserContext);
    const navigate  = useNavigate();


    const toggleDiv = () => {
      setIsOpen(!isOpen); 
    }

  const handleLike = async ()=>{
    try {
      if(!user.userDetails){
          navigate('/login')
      }
      setIsLiked(!isLiked);
      const {data} = await axios.post(`http://localhost:5030/api/v1/blog/post/like/${blogData._id}`,{},
      {
        withCredentials:true,
      }
      );
      setBlogData(data.blog);
      toast.success(data.message,{
        autoClose:3000,
        position:toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      toast.error(error.message,{
        autoClose:3000,
        position:toast.POSITION.TOP_CENTER
      });
    }
    
  }

  const handleComment = async ()=>{
    try {
    //  IF the comment is empty 
      if(!user.userDetails){
      navigate('/login')
      }
      if(!newComment){
        toast.info('Write Something to comment',{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        })
      }
      ///Adding new Comment in the blog
      const {data} = await axios.post(`http://localhost:5030/api/v1/blog/post/comment/${blogData._id}`,{
        newComment,
      },{
        withCredentials:true,
      });


      // Setting up the states
      setBlogData(data.blog);
      setIsOpen(true);
      // if(data.blog.likedBy.includes())

      
      toast.success(data.message,{
        autoClose:3000,
        position:toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
        toast.error(error.message,{
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000,
        });
    }
  }

async function followUser() {
    try {
        if(!user.userDetails){
            navigate('/login');
        }
        const userId = blogData.author._id;
        const {data} = await axios.get(`http://localhost:5030/api/v1/user/follow/${userId}`,{
            withCredentials:true,
        });
    } catch (error) {
        console.log(error.message);
    }
}

  useEffect(()=>{
    if(user.userDetails && blogData.likedBy.indexOf(user.userDetails._id)!=-1){
      setIsLiked(!isLiked);
    }
    // if(user.userDetails && user.userDetails.follwings.indexOf(blogData.author._id)!=-1){
    //   console.log("true");
    // }
    // if(user.userDetails.followings.includes(blogData.author._id)){
    //   setISFollwing(true);
    // }
  },[blogData]);


  return (
    <div className=' bg-[#e6ebeb] m-3 p-3 overflow-hidden rounded-2xl shadow-md  md:w-1/2   md:m-4 w-4/5 '>
        <div className='header w-full h-12 flex items-center justify-start md:h-16' >
            <img src={blogData.author.profilePic.secure_url} alt="" 
            className='w-[50px] h-full rounded-full md:w-[65px]'
            />
            <h3 className='w-3/4 font-bold text-xl mx-3'>
              {blogData.author.name}
              <span className='text-sm m-3 text-gray-600 '>
                {blogData.author.totalFollwer}
              </span>
            </h3>
            <button className='h-10 w-[120px] p-1 font-bold capitalize bg-[#279EFF] text-white rounded-lg'
            onClick={followUser}
            >
              {
                isFollwing?"✅Follwing":"+Follow"
              }
            </button>
        </div>
        <div className="title w-full text-justify h-1/5 md:p-3 md:text-lg  text-sm font-bold p-2">
           {
            blogData.title
           }
        </div>
        <div className="title w-full text-justify h-3/5 md:text-lg overflow-hidden text-sm my-3">
          {
              blogData.content.slice(0,400)+"...."
          }
        </div>
        <div className="title w-full text-justify flex ">
            <button
            onClick={handleLike}
            className='text-lg tracking-wider'>
            <i className={isLiked ? "fa-solid fa-thumbs-up text-sky-400":"fa-solid fa-thumbs-up"}></i>
            {blogData.likedBy.length-1}
            </button>
            <button className='tracking-wider'>
            <i className="fa-regular fa-message"></i>
            {blogData.comments.length}
            </button>
            <Link to={`/readblog/${blogData._id}`}>
            <button className='h-10 w-[120px] p-1 font-bold capitalize text-black rounded-lg border-2 border-slate-600 shadow-lg'>ReadMore..</button>
            </Link>
           
        </div>
        <div className="comments w-full h-13 my-2 flex flex-col">
            <h3 className='self-start'>Comment on post</h3>
              <div className='w-full flex'>
              <input type="text" 
              onChange={(e)=>setNewComment(e.target.value)}
              id='comment' 
              className='w-3/5 md:w-4/5 md:h-8 border-none outline-none my-2 rounded-lg' />
              <button
              onClick={handleComment} 
              className='md:p-2 bg-sky-500 text-white font-bold  rounded-lg sm:text-sm'>
              <i className="fa-regular fa-paper-plane mx-1 md:2"></i>
                </button>
            </div>
        </div>  
        <div className='w-full'>
        <h4
        className=" text-black px-4 py-2 rounded"
        onClick={toggleDiv}
      >
        Read other comments  <i className="fa-solid fa-caret-down mx-3"></i>
      </h4>

      {isOpen && (
        <div className="mt-2  bg-gray-200">
              <CommentList currentBlogId={blogData._id} comments={blogData.comments}/>
        </div>
      )}
        </div>
        <ToastContainer/>
    </div>
  );
}

export default BlogPostCard