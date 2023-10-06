import React, { useState } from "react";
import UpdateProfile from "./Profile/UpdateProfile";
import {useNavigate} from 'react-router-dom'
import UserTabs from "./Profile/UserTabs";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";
import Popup from "./Popup";
import ShareButton from "./ShareButton";

function Profile() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state)=>state.auth?.userData);

  const handleLogout = async ()=>{
    const isLoggedOut = await dispatch(logout()) ;
    if(isLoggedOut){
      navigate('/');
    }
  }


  return (
    <div className="w-full ">
      {isEditing ? (
        <UpdateProfile />
      ) : (
        <div className="w-full h-screen relative">
          <div className="w-full md:w-[90%] h-1/5 bg-purple-600 rounded-lg mx-auto p-4">
            
            <button 
            className="bg-white px-4 py-1 font-semibold rounded-md shadow-lg"
            onClick={()=>navigate(-1)}
            >
              Back
            </button>
          </div>
          <div className="w-[100%] h-4/5 flex flex-col md:flex-row items-center justify-center absolute top-[70px]">
            <div className="w-full md:w-1/5 h-[100%] bg-slate-200 rounded-lg flex flex-col ">
              <div className="w-full flex h-1/5 p-3 items-center justify-between">
                <img
                  src={userData?.profilePic?.secure_url}
                  alt=""
                  className="w-[100px] h-[100px] rounded-full"
                />
              </div>
              <div className="w-[90%] h-2/5 border-2 border-slate-400 rounded-md p-2">
                <div className="w-full my-3">
                  <h3 className="text-sm text-slate-400 capitalize">
                    Your Name
                  </h3>
                  <h4 className="text-md text-black font-semibold capitalize">
                    {
                      userData?.name
                    }
                  </h4>
                </div>
                <div className="w-full my-3">
                  <h3 className="text-sm text-slate-400 capitalize">Email</h3>
                  <h4 className="text-md text-black font-semibold capitalize">
                    {
                      userData?.email
                    }
                  </h4>
                </div>
                <div className="w-full my-3">
                  <h3 className="text-sm text-slate-400 capitalize">
                    Connect to me
                  </h3>
                  <div className="w-full flex text-2xl my-3 ">
                    <a href={userData?.socialLinks?.facebook} className="text-blue-500 block">
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href={userData?.socialLinks?.linkedin} className="text-sky-500 block">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href={userData?.socialLinks?.whatsapp} className="text-green-500 block">
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a href={userData?.socialLinks?.instagram} className="text-red-500 block">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-[90%] h-1/5 border-2 border-slate-400 rounded-md flex ">
                <button
                  className="text-sm border-2 border-purple-600 capitalize font-semibold rounded-md px-3 py-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  edit
                </button>
                <button
                  className="text-sm text-white capitalize font-semibold rounded-md px-3 py-2 bg-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5 h-[100%] bg-slate-200 rounded-lg ">
              <UserTabs/>
            </div>
          </div>
        </div>
      )}  
    </div>
   
  );
}

export default Profile;
