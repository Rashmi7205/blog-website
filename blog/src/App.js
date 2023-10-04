import React, { useState ,useEffect} from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from './Components/NavBar';

import CustomRoutes from './Customroutes/Routes';
import Footer from './Components/Footer';
import Demo from './Components/Demo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './Redux/Slices/authSlice';
import { toast } from 'react-toastify';





export const LoginContext = React.createContext(false);
export const UserContext = React.createContext(null);



function App() {

  const [isLoggedin, setIsLoggedIn] = useState(useSelector((state)=>state?.auth?.isLoggedin));
  const [userDetails,setUserDetails] = useState(null);
  
  const dispatch = useDispatch();
  useEffect(()=>{

    const fetchData = async()=>{
      const data = await dispatch(getUserData());
      setUserDetails(data.payload);
      setIsLoggedIn(true);
    }
    fetchData();
    
  },[])
  
  return (
    <>
      <Router>
        <UserContext.Provider value={{userDetails,setUserDetails}}>
        <LoginContext.Provider value={{isLoggedin, setIsLoggedIn }}>
          <div className="App">
            <NavBar />
            <CustomRoutes/>
            <Footer/>
          </div>
        </LoginContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
