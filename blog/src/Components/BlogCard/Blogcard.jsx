import React from 'react'
import { Link } from 'react-router-dom'

function Blogcard({data}) {
  return (

    <div className='w-[25rem] h-42 m-2 p-2 border-2 rounded-lg'>
            <img src={data.image.secure_url} alt="" 
            className='rounded-lg h-48 w-full'
            />
        <h2 
        className='font-bold capitalize p-3 text-xl'
        >{data.title}</h2>
        <p className='font-semibold capitalize p-3'>
           {data.description}
        </p>
        <Link to={`readblog/${data._id}`}>
        <button className='bg-sky-400 px-5 h-[40px] font-bold text-white rounded-lg'>
            Read
        </button>
        </Link>
     
    </div>
  )
}

export default Blogcard;