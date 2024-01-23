import React from "react";
import "../css/Home.css";
import BlogCardList from "../Components/BlogCard/BlogCardList.jsx";
import mainimg from '../Components/images/img1.png';
import FeatureCardList from "../Components/FeaureCard/FeatureCardList.jsx";
import FaqList from "../Components/Faqs/FaqList.jsx";


function Home() {
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
      <div className="w-full h-[90vh] flex items-center justify-around md:flex-row flex-col overflow-hidden bg-home-back bg-no-repeat object-fill bg-center">
      <div className=" w-1/2 h-4/5 text-2xl md:text-5xl flex flex-col items-center justify-around">
            <h1 data-aos="fade-left" data-aos-duration="2000" className="w-full  text-center font-bold capitalize tracking-wider text-[#fff] p-3 "><q>Dive into a World of Knowledge and Inspiration!</q></h1>
            <h1 data-aos="fade-right" className="w-full h-2/5 text-left font-bold capitalize tracking-wider text-[#dd874e] pl-10 m-2">
            Explore.
            </h1>
            <h1 data-aos="fade-left" className="w-full  text-center font-bold capitalize tracking-wider text-[#fff] p-3">
             Learn. 
            </h1>
            <h1 data-aos="fade-right" className="w-full  text-right font-bold capitalize tracking-wider text-[#76f568] p-3 ">
             Engage.
            </h1>
            <h1 className="w-full  text-center font-bold capitalize tracking-wider text-[#fff] p-3 my-6">
             Welcome to JustWrite!
            </h1>
        </div>
        <img src={mainimg} alt="" 
        className="w-[200px] md:w-[600px] h-auto"
        />
      </div>
      {/* Headersection end Here */}

      {/* Hero section Starts Here */}
      <div className="w-[100%] md:p-10 flex col items-center justify-around">
          {/* Catagory Section Goes Here */}
          <div className="w-inherit hidden md:block my-10">
            <h1 
            className="text-black text-4xl font-bold capitalize text-center m-4"
            >Explore our Catagory</h1>
            <div className="slideshow gap-3">
                {
                  catagories.map((catagory,ind)=><h2 key={ind} 
                  className="whitespace-nowrap rounded-md bg-purple-700 px-5 py-2 text-sm text-red-100">
                    {catagory}
                  </h2>)
                }
            </div>
          </div>
          {/* Catagory section ends here */}

          {/* Blog Card Section start Here  */}
          <div className="w-[100%] flex row flex-wrap items-center justify-around md:my-10 m-5">
               <BlogCardList/>
          </div>
          {/* Blog Card section Ends Here */}
           {/* Features sections */}
           <FeatureCardList/>
           {/* feature section ends here */}
                <FaqList/>
            {/* faqs section starts here */}
            {/*faqs ends here  */}

      </div>
      {/* Hero section ends Here */}
    </>
  );
}

export default Home;
