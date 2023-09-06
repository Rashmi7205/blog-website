import React, {useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import Loader from '../utils/Loader';

function UpdateProfile() {
    const [currUserData,setCurrUserData] = useState({});
    const userContext = useContext(UserContext);
    const [image,setImage] = useState(`https://res.cloudinary.com/dkkaj165g/image/upload/v1691595963/blog/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664_zflele.jpg
    `);

    useEffect(()=>{
        setCurrUserData(userContext.userDetails);
    });

  return (
    currUserData?
   (
    <div className='w-full md:w-1/2  h-[100vh] bg-slate-200'>
        <form className='w-full h-full flex flex-col'>
            <h1>Update Your Details</h1>
            <div className='w-[150px] h-[150px] flex relative'>
                <img src={image} alt=""  className='w-[150px] h-[150px] rounded-full'/>
                <div  className='w-full h-full  hover:bg-[#2b87d29c] flex overflow-hidden rounded-full absolute bottom-0 right-0 text-center '>
                    <input type="file" accept='image/*' className='w-full h-full opacity-0'
                        onChange={(e)=>setImage(e.target.files)}
                    />
                    
                </div> 
                
            </div>
            <h1>{image}</h1>
        
        </form>       
    </div>
   )
    :<Loader/>
  )
}

export default UpdateProfile