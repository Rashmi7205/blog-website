import React,{Link} from 'react-router-dom';
import BlogDetails from '../BlogDetails/BlogDetails';


function BlogPostCard({blogData}) {
  return (
    <div className=' bg-[#e6ebeb] m-3 p-3 overflow-hidden rounded-2xl shadow-md  md:w-1/2  md:h-[550px] md:m-4 w-4/5 h-[400px]'>
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
            <button className='h-10 w-[120px] p-1 font-bold capitalize bg-[#279EFF] text-white rounded-lg'>
              +Follow
            </button>
        </div>
        <div className="title w-full text-justify h-1/5 md:p-3 md:text-lg  text-sm font-bold p-2 ">
           {
            blogData.title
           }
        </div>
        <div className="title w-full text-justify h-3/5 md:text-lg overflow-hidden text-sm">
          {
              blogData.content.slice(0,400)+"...."
          }
        </div>
        <div className="title w-full text-justify flex ">
            <button className='text-lg tracking-wider'><i className="fa-regular fa-thumbs-up"></i>
            {blogData.likedBy.length-1}
            </button>
            <button className='tracking-wider'><i className="fa-regular fa-message"></i>
            {blogData.comments.length}
            </button>
            <Link to={`/readblog/${blogData._id}`}>
            <button className='h-10 w-[120px] p-1 font-bold capitalize text-black rounded-lg border-2 border-slate-600 shadow-lg'>ReadMore..</button>
            </Link>
           
        </div>
    </div>
  )
}

export default BlogPostCard