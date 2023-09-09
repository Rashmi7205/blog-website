import React, { useState ,useEffect} from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NavBar from './Components/NavBar';

import { API_URL } from './Components/utils/scr.login';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomRoutes from './Customroutes/Routes';
import Footer from './Components/Footer';





export const LoginContext = React.createContext(false);
export const UserContext = React.createContext(null);



function App() {

  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userDetails,setUserDetails] = useState(null);
  
  useEffect(()=>{

    const fetchData = async()=>{
      try {
        const response = await axios.get(`${API_URL}/profile`,{
          withCredentials:true,
        });
        const {user} = response.data;

        if(!user){
          toast.info("Login for More details",{
            position:toast.POSITION.TOP_CENTER,
            autoClose:3000,
          });
        }
        setUserDetails(user);
        setIsLoggedIn(true);
      } catch (error) {
        toast.info(error.message,{
          position:toast.POSITION.TOP_CENTER,
          autoClose:3000,
        });
      }
        
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
