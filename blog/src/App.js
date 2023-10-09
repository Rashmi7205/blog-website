import React, { useState ,useEffect} from 'react';
import './App.css';

import {useNavigate } from "react-router-dom";

import NavBar from './Components/NavBar';

import CustomRoutes from './Customroutes/Routes';
import Footer from './Components/Footer';
import Demo from './Components/Demo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './Redux/Slices/authSlice';
import { toast } from 'react-toastify';
import CreatePostButton from './Components/CreatePostButton';


function App() {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state)=>state.auth?.isLoggedIn)
  const [userDetails,setUserDetails] = useState(null);
  
  const fetchData = async()=>{
    const data = await dispatch(getUserData());
    if(data?.payload){
      setUserDetails(data.payload);  
    }
   
  }

  const dispatch = useDispatch();
  useEffect(()=>{

    fetchData();
    
  },[])
  
  return (
    <>
          <div className="App relative w-min-full">
            <NavBar />
            <CustomRoutes/>
            {
              isLoggedIn && <CreatePostButton/>
            }
            <Footer/>
          </div>
    </>
  );
}

export default App;
