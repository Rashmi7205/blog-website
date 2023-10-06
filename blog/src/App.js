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





export const LoginContext = React.createContext(false);
export const UserContext = React.createContext(null);



function App() {

  const navigate = useNavigate();

  const [isLoggedin, setIsLoggedIn] = useState(useSelector((state)=>state?.auth?.isLoggedin));
  const [userDetails,setUserDetails] = useState(null);
  
  const dispatch = useDispatch();
  useEffect(()=>{

    const fetchData = async()=>{
      const data = await dispatch(getUserData());
      setUserDetails(data.payload);
      setIsLoggedIn(true);
      navigate('/blog');
    }
    fetchData();
    
  },[])
  
  return (
    <>
        <UserContext.Provider value={{userDetails,setUserDetails}}>
        <LoginContext.Provider value={{isLoggedin, setIsLoggedIn }}>
          <div className="App relative w-min-full">
            <NavBar />
            <CustomRoutes/>
            {
              isLoggedin && <CreatePostButton/>
            }
            <Footer/>
          </div>
        </LoginContext.Provider>
        </UserContext.Provider>
    </>
  );
}

export default App;
