import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Home from '../Components/Home';
import Blog from '../Components/Blog';
import Register from '../Components/Register';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import Updateuser from '../Components/Updateuser';
import BlogDetails from '../Components/BlogDetails/BlogDetails';

function CustomRoutes() {
  return (
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/blog' element={<Blog />}/>
    <Route exact path='/signup' element={<Register />}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/profile' element={<Profile />}/>
    <Route exact path='/update/profile' element={<Updateuser/>}/>
    <Route exact path='/readblog/:id' element={<BlogDetails/>}/>
  </Routes>
  );
}

export default CustomRoutes