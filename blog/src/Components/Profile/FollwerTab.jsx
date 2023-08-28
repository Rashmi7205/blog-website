import React,{useContext,useEffect,useState} from 'react';
import { UserContext} from '../../App';
import axios from 'axios';
import {Link} from 'react-router-dom';

function FollwerTab() {
    const userContext = useContext(UserContext);
    const [follwers,setFollwers] = useState([]);

    const getFollwers = async ()=>{
            if(userContext.userDetails && userContext.userDetails.follwers.length){
               
                const follwerList = userContext.userDetails.follwers.map(async (follwer)=>{
                    return await axios.get(`http://localhost:5030/api/v1/user/getuser/${follwer}`);
                })

                const res = await axios.all(follwerList);
                
                const allFollwinguser = res.map((follwingUser)=>follwingUser.data.user);
                
                setFollwers(allFollwinguser);  
            }
           
    }

    useEffect(()=>{
        getFollwers();
    },[]);
    return (
    <div className='w-full'>
        {
            follwers.length?
            <ul className='w-full flex flex-col '>
                {
                    follwers.map((userData)=><li key={userData._id}
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
            :"Loading"
        }
    </div>
  )
}

export default FollwerTab