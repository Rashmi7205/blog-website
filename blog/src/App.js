import React,{ useState } from 'react';
import './App.css';
import Register from './Components/Register.js';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Blog from './Components/Blog';

export const LoginContext = React.createContext(false);

function App() {
  const [isLoggedin,setIsLoggedIn] = useState(false); 
  return (
    <>
    <Router>
   
    <LoginContext.Provider value={{isLoggedin,setIsLoggedIn}}>
    <div className="App">
    <NavBar/>
    <Routes>
      <Route exact path='/home' element={<Home/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/blog' element={<Blog/>} />
    </Routes>
    </div>
    </LoginContext.Provider>
    </Router>
    </>
  );
}

export default App;
