import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import ProfileDetails from './ProfileDetails';
import Loader from '../utils/Loader';

function GetUser() {

    const {id} = useParams();
    const navigate = useNavigate(); 
    const [userProfile,setUserProfile] = useState(null);

    const  getUserData = async  ()=>{
        try {
            const {data} = await axios.get(`http://localhost:5030/api/v1/user/getuser/${id}`);
            setUserProfile(data);
        } catch (error) {
            console.log(error.message);
        }   
    }

    useEffect(()=>{
        getUserData();
    },[]);
    
  return (
        userProfile?<ProfileDetails userData={userProfile.user} admin={userProfile.admin}/>:<Loader/>
  )
}

export default GetUser