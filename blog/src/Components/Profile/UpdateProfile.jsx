import React from 'react';
import {UserContext} from '../../App';
import { useContext } from 'react';
import { useState } from 'react';

function UpdateProfile() {

    const  {userDetails,setUserDetails}= useContext(UserContext);
   
    const [previewImage,setPreviewImage] = useState(userDetails?.profilePic?.   secure_url);
    const [currUserDetails,setCurrentUserDetails] = useState(userDetails);

    const  handleUpdate = async (e)=>{
        e.preventDefault();
    }

    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setCurrentUserDetails({
            ...currUserDetails,
            [name]:value
        })
    }

  return (
    <section className='w-full h-[100vh] flex'>
        <div className='w-full md:w-3/5 h-full'>
            <form className='w-full bg-slate-400 h-full flex flex-col'
            onSubmit={handleUpdate}
            >
                <div className='text-center text-purple-700 text-2xl font-bold capitalize'>  
                    <h1>Update Your Details</h1>
                </div>
                <div className='flex flex-col items-center justify-center relative'>
                  <img src={previewImage} alt="" 
                  className='w-24 h-24 rounded-full p-1 border-2 border-purple-600'
                  />
                    <label htmlFor="image"
                    className='w-[40px] h-[40px] rounded-full bg-purple-600  text-white absolute bottom-0  right-0 flex cursor-pointer'
                    >
                        <h1>+</h1>
                    </label>
                    <input type="file" 
                    id="image"
                    className='hidden'
                    accept='.jpg, .png,.jpeg'
                    name='image'
                    onChange={handleInputChange}
                    />
                </div>
                <div className='w-full flex'>
                <input type="text"
                name='name' 
                value={currUserDetails?.name}
                placeholder='Enter new Name'
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                onChange={handleInputChange}

                />
                </div>
                <div className='w-full flex'>
                <input type="text"
                name="description" 
                value={currUserDetails?.description}
                placeholder='Enter new Name'
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                onChange={handleInputChange}

                />
                </div>
                <div className='w-full flex'>
                <input type="text"
                name='facebook' 
                value={currUserDetails?.socialLinks.facebook}
                placeholder='Enter description'
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                onChange={handleInputChange}

                />
                </div>
                <div className='w-full flex'>
                <input type="text" 
                  value={currUserDetails?.socialLinks.whatsapp}
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                name='whatsapp'
                onChange={handleInputChange}
                />
                </div>
                <div className='w-full flex'>
                <input type="text" 
                 value={currUserDetails?.socialLinks.linkedin}
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                name='linkedin'
                onClick={handleInputChange}
                />
                </div>
                <div className='w-full flex'>
                <input type="text" 
                 value={currUserDetails?.socialLinks.instagram}
                className='w-3/5 rounded-md border-none outline-none bg-slate-300 text-md font-semibold'
                name='instagram'
                onChange={handleInputChange}
                />
                </div>
                <button type='submit'
                className='w-3/5 bg-purple-500 py-2 rounded-md  text-white font-semibold capitalize cursor-pointer45'
                >
                    update details
                </button>
            </form>
        </div>
    </section>
  )
}

export default UpdateProfile