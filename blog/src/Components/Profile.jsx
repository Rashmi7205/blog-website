import React,{useContext, useEffect,useState} from 'react';
import axios from 'axios';
import { API_URL } from './utils/scr.login';
import { UserContext,LoginContext } from '../App';
import './css/profile.css'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileDetails from './Profile/ProfileDetails';
import ProfileTabs from './Profile/ProfileTabs';

function Profile() {

  const userContext = useContext(UserContext);
  const loginContext= useContext(LoginContext);
  const navigate = useNavigate();
  const [isAdmin,setIsAdmin] = useState(false);

  const fetchData = async()=>{

    try {
        const response = await axios.get(`${API_URL}/profile`,{
        withCredentials:true
      });

      const {user} = await response.data;
      setIsAdmin(await response.data.admin);

      userContext.setUserDetails(user);
      loginContext.setIsLoggedIn(true);

    } catch (error) {
       toast.error(error.message,{
        autoClose:3000,
        position:toast.POSITION.TOP_CENTER,
       })
    }
  }


  useEffect(()=>{
    if(!userContext.userDetails)
      fetchData();
    
  },[userContext]);

  return (
    <div className='w-full h-[100vh] flex flex-wrap items-center justify-center md:flex-row'>
      <ProfileDetails userData={userContext.userDetails} admin={isAdmin}/>
      
    </div>
  )
}

export default Profile