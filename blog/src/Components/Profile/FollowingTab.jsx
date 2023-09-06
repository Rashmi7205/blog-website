import React,{useEffect,useState,useContext}  from 'react';
import {UserContext} from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../utils/Loader';

function FollowingTab() {
  const userContext = useContext(UserContext);
  const [follwings,setFollwings] = useState([]);

  const getFollwingList = async ()=>{
    try{  
      const follwingUsersList = userContext.userDetails.followings;
      const follwingList =  follwingUsersList.map(async (follwingUser)=>await axios.get(`http://localhost:5030/api/v1/user/getuser/${follwingUser}`))
    
      const res = await axios.all(follwingList);
      
      setFollwings(res.map((user)=>user.data.user));

    }

    catch(error){
      console.log("Error is Follwing",error.message);
    }
  }
  useEffect(()=>{
    getFollwingList();
    },[]);

  return (
    <div className='w-full flex '>
        {
          follwings.length?
          <ul className='w-full flex flex-col '>
              {
                  follwings.map((userData)=><li key={userData._id}
                  className='w-4/5 p-2 flex my-2 bg-slate-300 text-black rounded-lg'
                  >
                     <img src={userData.profilePic.secure_url} 
                     alt="" 
                     className='w-[50px] h-[50px] rounded-full'
                     />
                     <div>
                      {userData.name} 
                     </div>
                     <Link to={`/view/profile/${userData._id}`}
                     className='w-1/5 bg-purple-600 text-center capitalize py-2 rounded-lg text-white no-underline text-lg font-bold'
                     >
                          View        
                      </Link>
                  </li>)
              }
          </ul>
          :<Loader/>
        }
    </div>
  )
}

export default FollowingTab