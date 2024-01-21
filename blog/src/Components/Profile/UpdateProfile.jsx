import React, { useState } from "react";
import Profile from "../../pages/Profile";
import {useDispatch, useSelector} from 'react-redux';
import UserTabs from "./UserTabs";
import { useNavigate } from "react-router-dom";
import { updateAccount } from "../../Redux/Slices/authSlice";
import { toast } from "react-toastify";

function UpdateProfile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(true);
  //gettinh the user data form the state
  const userData = useSelector((state)=>state?.auth?.userData);

  const [previewImage,setPreviewImage] = useState(userData?.profilePic?.secure_url);

  //object for the change in data
  const [updateData,setUpdateData] = useState(
    {
    name : userData?.name,
    description:userData?.description,
    whatsapp:userData?.socialLinks?.whatsapp,
    linkedin:userData?.socialLinks?.linkedin,
    instagram:userData?.socialLinks?.instagram,
    facebook:userData?.socialLinks?.facebook,
    profilePic:null
  }
  );

  // handle the input change

  const handleInputChange = (e) =>{
    const {name,value} = e.target;
    setUpdateData({
      ...updateData,
      [name]:value,
    });
  }

  //handle image input file

  const handleImageInput = (e)=>{
      const profilePic = e.target.files[0];
      setUpdateData({
        ...updateData,
        profilePic
      });
      setPreviewImage(
        URL.createObjectURL(profilePic)
      );
  }

  //handle the form submit
  const handleUpdateForm = async (e)=>{
      e.preventDefault();
      if(!updateData.name){
        toast.info("name is mandatory");
        return;
      }

      try {
        const response = await  dispatch(updateAccount(updateData));
        if(response.payload){
           setIsEditing(false);
        }
      } catch (error) {
        console.log(error);
      }
      
    }
 

  return (
    <div>
      {isEditing ? (
        <div className="w-full h-screen relative">
          <div className="w-[90%] h-1/5 bg-purple-600 rounded-lg mx-auto"></div>
          <form 
          onSubmit={handleUpdateForm}
          encType='multipart/form-data'
          className="w-[100%] h-4/5 flex flex-col md:flex-row items-center justify-center absolute top-[70px]">
            <div className="w-full md:w-1/5 h-[100%] bg-slate-200 rounded-lg flex flex-col ">
              <div className="w-full flex h-1/5 p-3 items-center justify-between">
                <img
                  src={previewImage}
                  alt="profile image"
                  className="w-[100px] h-[100px] rounded-full"
                  
                />
                <label 
                htmlFor="profilePic"
                className="text-sm border-2 border-purple-600 capitalize font-semibold rounded-md px-3 py-2 cursor-pointer">
                  upload photo
                </label>
                <input type="file" 
                accept=".jpg,.png,.svg"
                className="hidden"
                id="profilePic"
                name="profilePic"
                onChange={handleImageInput}
                />
              </div>
              <div className="w-[90%] h-3/5 border-2 border-slate-400 rounded-md p-2">
                <div className="w-full ">
                  <label className="text-sm text-slate-400 capitalize">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="enter name"
                    className=" rounded-md  w-full text-md text-black font-semibold capitalize border-none outline-none "
                    value={updateData?.name}
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full my-2">
                  <h3 className="text-sm text-slate-400 capitalize">
                    Connect to me
                  </h3>
                  <div className="w-full flex text-2xl  flex-col ">
                    <div className="w-full">
                      <label className="text-sm text-slate-400 capitalize"
                      htmlFor="facebook"
                      >
                        facebook
                      </label>
                      <input
                        id="facebook"
                        type="text"
                        placeholder="Link"
                        className=" rounded-md  w-full text-sm h-[30px] text-black font-semibold capitalize border-none outline-none "
                        value={updateData?.facebook}
                        name="facebook"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm text-slate-400 capitalize"
                      htmlFor="linkedin"
                      >
                       linkedin
                      </label>
                      <input
                        id="linkedin"
                        type="text"
                        placeholder="Link"
                        className=" rounded-md  w-full text-sm h-[30px] text-black font-semibold capitalize border-none outline-none "
                        value={updateData?.linkedin}
                        name="linkedin"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm text-slate-400 capitalize"
                      htmlFor="whatsapp"
                      >
                        whatsapp
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        placeholder="Number"
                        className=" rounded-md  w-full text-sm h-[30px] text-black font-semibold capitalize border-none outline-none "
                        value={updateData?.whatsapp}
                        name="whatsapp"
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="w-full">
                      <label className="text-sm text-slate-400 capitalize"
                      htmlFor="instagram"
                      >
                        instagram
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        placeholder="Link"
                        className=" rounded-md w-full text-sm h-[30px] text-black font-semibold capitalize border-none outline-none "
                        value={updateData?.instagram}
                        name="instagram"
                        onChange={handleInputChange}
                      />
                    </div>
                   
                  </div>
                </div>
              </div>
              <div className="w-[90%]  rounded-md flex ">
                <button
                  className="text-sm border-2 border-purple-600 capitalize font-semibold rounded-md px-3 py-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel " : "Edit"}
                </button>
                <button
                  className="text-sm border-2 border-purple-600 capitalize font-semibold rounded-md px-3 py-2"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5 h-[100%] bg-slate-200 rounded-lg ">
              <UserTabs/>
            </div>
          </form>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
}

export default UpdateProfile;
