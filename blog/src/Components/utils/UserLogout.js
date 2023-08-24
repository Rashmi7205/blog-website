import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom';

async function UserLogout() {

   const navigate =  useNavigate ();
   try {
        const {data} = await axios ("http://localhost:5030/api/v1/user/logout",{
            withCredentials:true,
        });
        navigate('/');
   } catch (error) {
    
   }
   
}

export default UserLogout