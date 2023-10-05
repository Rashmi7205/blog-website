import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePostButton() {
    const navigate = useNavigate();
    return (
    <button className='w-[130px] h-[50px] fixed bottom-10 right-10
    bg-gradient-to-r from-violet-500 to-fuchsia-500  text-white font-semibold rounded-md shadow-xl cursor-pointer tracking-widest'
    onClick={()=>navigate('/blog/create')}
    >
       <i className="fa-solid fa-pen"></i> Write 
    </button>
    )
}

export default CreatePostButton;