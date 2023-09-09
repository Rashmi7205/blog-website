import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Home from '../Components/Home';
import Blog from '../Components/Blog';
import Register from '../Components/Register';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import BlogDetails from '../Components/BlogDetails/BlogDetails';
import GetUser from '../Components/Profile/GetUser';
import UpdateProfile from '../Components/Profile/UpdateProfile';
import CreateBlog from '../Components/CreateBlog/CreateBlog';


function CustomRoutes() {
  return (
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route  path='/signup' element={<Register />}/>
    <Route  path='/login' element={<Login/>}/>
    
    {/* Profile Routes */}
    <Route  path='/profile' element={<Profile />}/>
    <Route  path='/view/profile/:id' element={<GetUser/>}/>
    <Route path='/update/profile' element={<UpdateProfile/>}/>

    {/* Blog Routes */}
    <Route  path='/blog' element={<Blog />}/>
    <Route  path='/readblog/:id' element={<BlogDetails/>}/>
    <Route  path='blog/create' element={<CreateBlog/>}/>

  </Routes>
  );
}

export default CustomRoutes