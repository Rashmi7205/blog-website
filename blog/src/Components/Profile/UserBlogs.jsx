import React from 'react';
import {useSelector} from 'react-redux';

function UserBlogs() {

  const userData = useSelector((state)=>state.auth?.userData);

  return (
    <div className='w-full flex flex-col items-center justify-start gap-12'>
        <h1 className='font-bold text-3xl '>My Blogs</h1>
        <ul className='w-[90%] overflow-x-hidden overflow-y-auto'>
          <li className='h-[40px] bg-white flex items-center justify-between rounded-md shadow-md my-2'>
              <p>Title</p>
              <div className='flex gap-3'>
                <button className='bg-slate-500 px-2 py-1 rounded-md text-white font-semibold'>
                  edit
                </button>
                <button
                 className='bg-red-500 px-2 py-1 rounded-md text-white font-semibold'
                >
                  Delete
                </button>
              </div>
          </li>
          
        </ul>
    </div>
  )
}

export default UserBlogs