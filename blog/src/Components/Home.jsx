import React, { useContext, useState, useEffect } from "react";
import { UserContext, LoginContext } from "../App.js";
import axios from "axios";
import { API_URL } from "./utils/scr.login.js";
import "./css/Home.css";
import { Link} from "react-router-dom";
import Blogcard from "./BlogCard/Blogcard.jsx";
import BlogCardList from "./BlogCard/BlogCardList.jsx";

function Home() {
  const usercontext = useContext(UserContext);
  const loginContext = useContext(LoginContext);
  const catagories = [
    'Technology',
    'Travel',
    'Food',
    'Fashion',
    'Health',
    'Lifestyle',
    'Personal Development',
    'Entertainment',
    'Business',
    'Finance',
    'Education',
    'Science',
    'Art & Culture',
    'Sports',
    'Parenting',
    'Photography',
    'Gaming',
    'Books',
    'Music',

  ];

  return (
    <>
    {/* Header Section Starts here */}
      <div className="w-full h-[90vh] flex md:flex-row flex-col">
      <div className=" w-1/2 h-4/5 text-2xl md:text-5xl flex flex-col items-center justify-around">
            <h1 className="w-full  text-center font-bold capitalize tracking-wider text-[#793FDF] p-3"><q>Dive into a World of Knowledge and Inspiration!</q></h1>
            <h1 className="w-full h-2/5 text-left font-bold capitalize tracking-wider text-[#dd874e] pl-10 m-2">
            Explore.
            </h1>
            <h1 className="w-full  text-center font-bold capitalize tracking-wider text-[#793FDF] p-3">
             Learn. 
            </h1>
            <h1 className="w-full  text-right font-bold capitalize tracking-wider text-[#76f568] p-3 ">
             Engage.
            </h1>
            <h1 className="w-full  text-center font-bold capitalize tracking-wider text-[#793FDF] p-3 my-6">
             Welcome to JustWrite!
            </h1>
        </div>
        <div className="image w-1/2 h-4/5">
        </div>
      </div>
      {/* Headersection end Here */}

      {/* Hero section Starts Here */}
      <div className="w-[100%] p-10 flex col items-center justify-around">
          {/* Catagory Section Goes Here */}
          <div className="w-inherit hidden md:block">
            <h1 
            className="text-black text-4xl font-bold capitalize text-center m-4"
            >Explore our Catagory</h1>
            <div className="w-[100%] flex row justify-around items-center">
                {
                  catagories.map((catagory,ind)=><h2 key={ind} 
                  className="text-white w-36  bg-slate-600 p-3 block m-2 cursor-pointer text-center font-semibold  rounded-lg">
                    {catagory}
                  </h2>)
                }
            </div>
          </div>
          {/* Catagory section ends here */}

          {/* Blog Card Section start Here  */}
          <div className="w-[100%] flex row flex-wrap items-center justify-around m-5">
               <BlogCardList/>
          </div>
          {/* Blog Card section Ends Here */}
                
      </div>
      {/* Hero section ends Here */}
    </>
  );
}

export default Home;
