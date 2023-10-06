import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import Dompurify from "dompurify";
import {useEffect, useState,useContext } from "react";
import {  toast } from "react-toastify";
import axios from "axios";
import React from "react";
import CommentList from "../Comments/CommentList";
import { UserContext } from "../../App";
import ShareButton from "../ShareButton";
import { useDispatch, useSelector } from "react-redux";
import { commentOnPost, likeOnPost } from "../../Redux/Slices/authSlice";

function BlogPostCard({ blog }) {
  const [isOpen, setIsOpen] = useState(false);
  const [blogData, setBlogData] = useState(blog);
  const [newComment, setNewComment] = useState("");
  const [isFollwing, setISFollwing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state)=>state?.auth?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const handleLike = async () => {
    const data = await dispatch(likeOnPost(blogData._id));
    if(data.payload){
      setBlogData(data.payload?.blog);
      setIsLiked(!isLiked);
    }
  };

  const handleComment = async () => {
    try {
       //IF the comment is empty
      if (!user) {
        navigate("/login");
      }
      if (!newComment) {
        toast.info("Write Something to comment", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
      ///Adding new Comment in the blog
     const commnetData={
      blogId:blogData._id,
      newComment
     }
      const data = await dispatch(commentOnPost(commnetData));
      if(data.payload){
        console.log(data.payload);
        setBlogData(data.payload?.blog);
      setIsOpen(true);
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  async function followUser() {
    try {
      if (!user) {
        navigate("/login");
      }
      const userId = blogData.author._id;
      const { data } = await axios.get(
        `http://localhost:5030/api/v1/user/follow/${userId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (  
      user&&
      blogData.likedBy.indexOf(user._id) != -1
    ) {
      setIsLiked(!isLiked);
    }
  }, [blogData]);

  return (
    <div className=" bg-[#e6ebeb] m-3 p-3 overflow-hidden rounded-2xl shadow-md  md:w-1/2   md:m-4 w-full ">
      <div className="header w-full h-12 flex items-center justify-start md:h-16">
        <img
          src={blogData.author.profilePic.secure_url}
          alt=""
          className="w-[50px] h-full rounded-full md:w-[65px]"
        />
        <div className="w-3/4 font-bold text-xl mx-3">
          <h3>
          {blogData.author.name}
          <span className="text-sm m-3 text-gray-600 ">
            {blogData.author.totalFollwer}
          </span>
          </h3>
          <h4 className="text-[14px] my-2  text-gray-800 ">
            { new Date(blogData.updatedAt).toLocaleDateString()} . Updated
          </h4>

        </div>
        {/* <button
          className="h-10 w-[120px] p-1 font-bold capitalize bg-[#279EFF] text-white rounded-lg"
          onClick={followUser}
        >
          {isFollwing ? "✅Follwing" : "+Follow"}
        </button> */}
      </div>
      <div className="title w-full text-justify h-1/5 md:p-3 md:text-lg  text-sm font-bold p-2">
        {blogData.title}
      </div>
      <div className="title w-full text-justify h-1/5 overflow-hidden text-[16px] my-3">
        {parse(Dompurify.sanitize(blogData.content.slice(0, 100)))}
        <Link to={`/readblog/${blogData._id}`}>
          <button className="font-semibold">
            ..see more
          </button>
        </Link>
      </div>
      <div className="w-full text-justify h-1/5 overflow-hidden text-sm my-3">
        <img src={blogData.image.secure_url} 
        alt="blog thumbail" 
        className="h-[200px] w-full rounded-md md:h-[270px]"
        />
      </div>
      <div className="title w-full text-justify flex ">
        <button onClick={handleLike} className="text-lg tracking-wider">
          <i
            className={
              isLiked
                ? "fa-solid fa-thumbs-up text-sky-400"
                : "fa-solid fa-thumbs-up"
            }
          ></i>
          {blogData.likedBy.length - 1}
        </button>
        <button className="tracking-wider">
          <i className="fa-regular fa-message"></i>
          {blogData.comments.length}
        </button>
         <ShareButton title={blogData.title} url={window.location.href}/>   
      </div>
      <div className="comments w-full h-13 my-2 flex flex-col">
        <h3 className="self-start">Comment on post</h3>
        <div className="w-full flex">
          <img src={user.profilePic.secure_url} 
          className="w-[30px] h-[30px] rounded-full"
         alt="" />
          <input
            type="text"
            placeholder="Add a comment"
            onChange={(e) => setNewComment(e.target.value)}
            id="comment"
            className="w-3/5 md:w-4/5 md:h-8 h-[30px] border-none outline-none my-2 rounded-lg"
          />
          <button
            onClick={handleComment}
            className="px-3 md:p-2 bg-purple-500 text-white font-bold  rounded-lg sm:text-sm"
          >
            <i className="fa-regular fa-paper-plane mx-1 md:2"></i>
          </button>
        </div>
      </div>
      <div className="w-full">
        <h4 className=" text-black px-4 py-2 rounded" onClick={toggleDiv}>
          Read others comments <i className="fa-solid fa-caret-down mx-3"></i>
        </h4>

        {isOpen && (
          <div className="mt-2  bg-gray-200">
            <CommentList
              currentBlogId={blogData._id}
              comments={blogData.comments}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPostCard;
