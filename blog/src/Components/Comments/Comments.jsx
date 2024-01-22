import React from 'react'

function Comments({comment,blogId}) {

  return (
    <div className='w-max p-2 overflow-hidden flex flex-col items-start justify-around text-black my-2 text-sm '>
        <div  className='flex'>
            <img src={comment.profilePic||'https://imgs.search.brave.com/Rf_1Sr38NGbThf243B8hDEhp0FqmK_2Iq6siw-2die8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc'} alt=""
            className='w-[30px] h-[30px] rounded-full self-start mx-2'
            />
            <div className='w-max flex flex-col bg-white shadow-lg p-2 rounded-r-2xl  rounded-b-2xl'>
                <h3 className='mx-2'>{comment.name || "user"}</h3>
                <p className='my-2'>{comment.comment}</p>
            </div>
            
        </div>
        
    </div>
  )
}

export default Comments