import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateBlog() {

    const [blog,setBlog] = useState({
        title:"",
        description:"",
        content:"",
        catagory:"",
        image:'#'
    });

    const navigate = useNavigate();

    const handleCreate  =async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:5030/api/v1/blog/createblog',blog,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true,
            })
            if(data?.succsess){
                navigate(`/readblog/${data.blog._id}`);
            }
        } catch (error) {
            
        }
    }
  return (
    <div className='w-full h-[100vh] flex'>
        <form   encType='multipart/form-data'
        className='w-full md:w-1/2 h-full bg-slate-100 rounded-md flex flex-col' 
        onSubmit={handleCreate}
        >
        <div >
            <h1 className='font-semibold text-4xl text-purple-600'>Crate A Story</h1>
        </div>
        <div className='w-4/5'>   
            <h2 className='text-sm font-semibold w-full'>Title</h2>
            <input type="text" placeholder='Create title' className='w-full outline-none border-none bg-sky-200 font-semibold rounded-lg'
            onChange={(e)=>setBlog({...blog,title:e.target.value})}
            />
        </div>
        <div className='w-4/5'>   
            <h2 className='text-sm font-semibold w-full'>Description</h2>
            <input type="text" placeholder='Description'  className='w-full outline-none border-none bg-sky-200 font-semibold rounded-lg' 
             onChange={(e)=>setBlog({...blog,description:e.target.value})}
            />
        </div>
        <div className='w-4/5'>   
            <h2 className='text-sm font-semibold w-full'>Catagory</h2>
            <input type="text" placeholder='Catagory'  className='w-full outline-none border-none bg-sky-200 font-semibold rounded-lg'
            onChange={(e)=>setBlog({...blog,catagory:e.target.value})}
            />
        </div>
        <div className='w-4/5'>   
            <h2 className='text-sm font-semibold w-full'>Content</h2>
          <textarea className='w-full bg-sky-200 outline-none border-none'
           onChange={(e)=>setBlog({...blog,content:e.target.value})}
          ></textarea>
        </div>
        <div>
            <h2>Upload image</h2>
            <input type="file" accept='.jpg, .png, .jpeg' 
             onChange={(e)=>setBlog({...blog,image:e.target.files[0]})}
            />
        </div>
        <button className='w-4/5 h-[40px] bg-purple-600 text-white font-semibold rounded-lg '
        type='submit'
        >
            Create
        </button>
        </form>
    </div>
  )
}

export default CreateBlog