import React, {useContext, useEffect, useState } from 'react'
import './css/login.css'
import imageurl from './images/1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoginContext,UserContext } from '../App';
import { Link,useNavigate } from 'react-router-dom';


function Register(){
  
  const [signUpData,setSignUpData] = useState({username:null,email:null,password:""}); 
  const navigate = useNavigate();

  const handleRegister = async(e)=>{
    e.preventDefault();
    try {
        const {username,email,password} = signUpData;

        if(!username||!email||!password){
          toast.info('All fields are mandatory',{
            autoClose:3000,
            position:toast.POSITION.TOP_CENTER
          });
        }

        const payload = {
          name:signUpData.username,
          email:signUpData.email,
          password:signUpData.password,
        }

        const {data} = await axios.post('http://localhost:5030/api/v1/user/register',
        payload,{
          headers:{'Content-Type':'application/json'},
          withCredentials:true
        });

    } catch (error) {
      toast.error(error.message,{
        autoClose:3000,
        position:toast.POSITION.TOP_CENTER
      });
    }
  }


  return (
    <>
    <div className='login-page'>
      <div className='login-page-image'>
       <img src={imageurl} alt='image' />:
        </div>
        <form className='login-form' onSubmit={handleRegister}>
           <div className='input-fields'>
              <h1>Create an account</h1>
              <p>with the travell teller</p>
            </div>
            <div className='input-fields'>
            <p>username</p>
            <input type='text' 
            placeholder='Username'
            onChange={(e)=>setSignUpData({...signUpData,username:e.target.value})
            }
            />
            </div>
            <div className='input-fields'>
            <p>email</p>
            <input type='email' 
            placeholder='Email'
            onChange={(e)=>{setSignUpData({...signUpData,email:e.target.value})}}

           />
            </div>
            <div className='input-fields'>
            <p>password</p>
            <input type='password' 
            placeholder='Password' 
            autoComplete="off" 
            onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}
            />
            </div>
            <button id='login-btn' 
            type='submit'
            >Sign Up</button>
            <div className='input-fields'>
            <span>Already have an account? <Link to='/login' >Sign in</Link></span>
            </div>
        </form>
        <ToastContainer/>
      </div>
      </>
  );
}

export default Register

