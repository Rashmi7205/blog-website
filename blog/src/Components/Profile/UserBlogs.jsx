import React ,{useEffect,useState}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlogsById } from '../../Redux/Slices/blogSlice';

function UserBlogs() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state)=>state.auth?.userData);
  const [userBlogs,setUserBlog] = useState([]);

  const getBlogs = async ()=>{

      const response = await  dispatch(getBlogsById(userData?.blogs));
      if(response?.payload){
      setUserBlog(response?.payload);
      }
  }

  useEffect(()=>{
    getBlogs();
  },[]);
  

  return (
    <div className='w-full flex flex-col items-center justify-start gap-12'>
        <h1 className='font-bold text-3xl '>My Blogs</h1>
        <ul className='w-[90%] overflow-x-hidden overflow-y-auto'>
          {
            userBlogs.map((ele)=> <li className='h-[40px] bg-white flex items-center justify-between rounded-md shadow-md my-2 cursor-pointer'
            onClick={()=>navigate(`/readblog/${ele.data.blog._id}`)}
            >
            <p className='capitalize'>
              {ele.data.blog.title}
            </p>
            <div className='flex gap-3'>
              <button 
              onClick={()=>navigate(`/blog/updatepost/${ele.data.blog._id}`)}
              className='bg-slate-500 px-2 py-1 rounded-md text-white font-semibold'>
                edit
              </button>
              <button
               className='bg-red-500 px-2 py-1 rounded-md text-white font-semibold'
              >
                Delete
              </button>
            </div>
        </li>)
          }
        
          
        </ul>
    </div>
  )
}

export default UserBlogs