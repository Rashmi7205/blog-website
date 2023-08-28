import React from 'react';
import { useNavigate,Link } from 'react-router-dom';

function ProfileDetails({userData,admin}) {
  // console.log(userData);
   return (
    userData
    ?
    <div className='w-1/5 h-4/5 flex md:flex-col bg-slate-400 p-2 rounded-xl text-white'>
        <img 
        src={userData.profilePic.secure_url} alt="" 
        className='w-[200px] h-[200px] rounded-full'
        />
        <div className='w-full flex md:flex-col flex-wrap font-bold'>
          <h1 className='text-2xl'>
            {userData.name}
          </h1>
          <div className='w-full flex text-center'>
            <div>
              <h2>Total Follwer</h2>
              <h3>{userData.totalFollwer}</h3>
            </div>
            <div>
            <h2>Liked Posts</h2>
              <h3>{userData.totlalLikes}</h3>
            </div>
          </div>
        </div>
       
        <div className='w-full flex md:flex-col flex-wrap font-bold '>
        <Link to={userData.socialLinks.facebook}
        className='w-4/5 h-[40px] bg-sky-400 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
        >
          Facebook
        </Link>
        <Link to={userData.socialLinks.whatsapp}
           className='w-4/5 h-[40px] bg-green-400 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
           >
          Whatsapp
        </Link>
        <Link to={userData.socialLinks.linkedin}
           className='w-4/5 h-[40px] bg-blue-500 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
        >
         Linkedin
        </Link>
        <Link to={userData.socialLinks.instagram}
           className='w-4/5 h-[40px] bg-red-500 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
        >
         instagram
        </Link>
        </div>
        {
          admin?<Link to='/update/profile'
          className='w-4/5 h-[40px] bg-slate-500 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
         >
         Update
         </Link>:<></>
        }
        
        <button
         className='w-4/5 h-[40px] bg-red-600 rounded-lg text-white no-underline text-center py-2 hover:shadow-lg my-2'
        >  
            Logout
        </button>

    </div>  :"Loading Details"
  )
}

export default ProfileDetails