import React from 'react';
import {Route,Routes} from 'react-router-dom';

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import BlogDetails from '../Components/BlogDetails/BlogDetails';
import UpdateProfile from '../Components/Profile/UpdateProfile';
import CreateBlog from '../Components/CreateBlog/CreateBlog';
import ErrorPage from '../pages/ErrorPage';
import UpdateBlog from '../Components/CreateBlog/UpdateBlog';
import AboutPage from '../pages/AboutPage';
import ResetPasswordPage from '../Components/UpdatePassword/ResetPasswordPage';
import ChangePasswordPage from '../Components/UpdatePassword/ChangePasswordPage';
import Blog from '../pages/Blog';


function CustomRoutes() {
  return (
    <Routes>
    <Route  path='/' element={<Home />} />
    <Route  path='/signup' element={<Register />}/>
    <Route  path='/login' element={<Login/>}/>
    
    {/* Profile Routes */}
    <Route  path='/profile' element={<Profile />}/>
    <Route path='/update/profile' element={<UpdateProfile/>}/>

    {/* Blog Routes */}
    <Route  path='/blog' element={<Blog />}/>
    <Route  path='/readblog/:id' element={<BlogDetails/>}/>
    <Route  path='/blog/create' element={<CreateBlog/>}/>
    <Route path='/blog/updatepost/:blogid' element={<UpdateBlog/>}/>
    
    {/* Misc */}
    <Route  path='/about' element={<AboutPage/>}/>
    <Route path='/auth/resetpassword' element={<ResetPasswordPage/>}/>
    <Route path='/auth/changepassword/:resettoken' element={<ChangePasswordPage/>}/>

    <Route path='*' element={<ErrorPage/>} />
    
  </Routes>
  );
}

export default CustomRoutes