import React ,{useEffect,useState}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, getBlogsById } from '../../Redux/Slices/blogSlice';
import Popup from '../Popup'

function UserBlogs() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state)=>state.auth?.userData);
  const [userBlogs,setUserBlog] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isConfirm,setISConfirm] = useState(false);
  const [deleteBlogId,setDeleBlogId] = useState(null);


  const getBlogs = async ()=>{

      const response = await  dispatch(getBlogsById(userData?.blogs));
      if(response?.payload){
      setUserBlog(response?.payload);
       
      }
  }

  const handleDeleteConfirmation = (blogId) => {
    setPopupOpen(true);
    setDeleBlogId(blogId);
  };

  const deleteBlog = async()=>{
    console.log('delete Blog');
    const data = await  dispatch(deletePost(deleteBlogId));
    if(data.payload)
    {
        setUserBlog(userBlogs.filter((ele)=>ele.data.blog._id !== deleteBlogId))
    }
    setISConfirm(!isConfirm);
    setDeleBlogId(null);
  }

  useEffect(()=>{
    getBlogs();

    if(isConfirm && deleteBlogId){
      deleteBlog();    
    }

  },[deleteBlogId,isConfirm]);
  

  return (
    <div className='w-full flex flex-col items-center justify-start gap-12'>
        <h1 className='font-bold text-3xl '>My Blogs</h1>
        <ul className='w-[90%] overflow-x-hidden overflow-y-auto'>
          {
            userBlogs && userBlogs?.blogs?.map((ele)=> <li className='h-[40px] bg-white flex items-center justify-between rounded-md shadow-md my-2 cursor-pointer'
            >
            <p className='capitalize w-[80%] text-center block'
            onClick={()=>navigate(`/readblog/${ele._id}`)}
            >
              {ele.title}
            </p>
            <div className='flex w-[20%]'>
              <button 
              onClick={()=>navigate(`/blog/updatepost/${ele._id}`)}
              className='bg-slate-500 px-2 py-1 rounded-md text-white font-semibold'>
               <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
               className='bg-red-500 px-2 py-1 rounded-md text-white font-semibold'
               onClick={()=>handleDeleteConfirmation(ele._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            
        </li>)

          }
        </ul>
        {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[90%] md:w-[400px] ">
              <p className='text-sm md:text-md'>Are sure sure . To delete this post .
              <span className='text-red-500'>This action is irreversible</span></p>
              <div className='w-full flex py-3'>
              <button onClick={()=>{
                setPopupOpen(false);
                setISConfirm(true);
              }}
              className='px-3 bg-red-600 text-white font-semibold rounded-md shadow-md'
              >Delete</button>
              <button 
              className='px-3 border-2  border-black rounded-md'
              onClick={()=>setPopupOpen(!isPopupOpen)}>Close</button>
              </div>
         
          </div>
        </div>
      )}
    </div>
  )
}

export default UserBlogs