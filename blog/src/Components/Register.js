import React, { Children, useContext, useEffect, useState } from 'react'
import './css/login.css'
import imageurl from './images/1.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoginContext } from '../App';


function Register(){


  const {isLoggedIn,setIsLoggedIn} = useContext(LoginContext);

  const [isRegistered,setRegister] = useState(true); 
  const handleSetRegister=()=>{setRegister(!isRegistered)}


  
const  Login = () =>{

    const initialValue = {email:"",password:""};
    const [loginData,setLoginData] = useState(initialValue);

    const handleSubmit = async(e)=>{
      e.preventDefault();
     
      try {
        if(loginData.email==="" || loginData.password===""){
          toast.info("Invalid Detais",{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Toast will close automatically after 3 seconds
          })
          return;
      }
      const result = await axios.post("http://localhost:5030/api/v1/user/login",loginData);
      
      const userData = await result.data;
      
      toast.success(userData.message,{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      })
      } catch (error) {
          toast.error(error.message,{
            position:toast.POSITION.TOP_RIGHT,
            autoClose:3000
          });
      }
      setIsLoggedIn(true);
      window.location.href = "http://localhost:3000/home";
    }

   return (
    <div className='login-page'>
    <div className='login-page-image'>
     <img src="https://img.freepik.com/free-vector/digital-nomad-concept-illustration_114360-1082.jpg?size=626&ext=jpg&uid=R111820993&semt=ais" alt='image' />:
      </div>
      <form className='login-form' onSubmit={handleSubmit}>
         <div className='input-fields'>
            <h1>Welcome</h1>
            <p>Login To your account</p>
          </div>
          <div className='input-fields'>
          <p>email</p>
          <input type='email'
           placeholder='Email'
           name='email'
           onChange={(e)=>{setLoginData({...loginData,email:e.target.value})}}
           />
          </div>
          <div className='input-fields'>
          <p>password</p>
          <input
           type='password' 
           placeholder='Password' 
           autoComplete="false"
            name='password'
            onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}}
            />
          </div>
          <button id='login-btn'
           type='submit'
           >Login</button>
          <div className='input-fields'>
          <a href='#'>Forgot password ?</a>
          <span onClick={handleSetRegister}>Sign in</span>
          </div>
      </form>
      <ToastContainer/>
    </div>
    )
  }


  const SignUp = ()=>{

    const [signUpData,setSignUpData] = useState({name:"",email:"",password:""});


    const handleRegister = async (e)=>{
      e.preventDefault();

     
      try {
        if(signUpData.email==="" || signUpData.password===""||!signUpData.name===""){
          toast.info("Invalid Details",{
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Toast will close automatically after 3 seconds
          });
        }
  
        const result  = await fetch("http://localhost:5030/api/v1/user/register",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(signUpData)
        });
  
  
        const user =await result.json();

        console.log(typeof user)

        toast.success(user.message ,{
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Toast will close automatically after 3 seconds
        });

        setIsLoggedIn(true);

      } catch (error) {
        toast.error('Registration failed. Please try again later.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
     
    }

    return (
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
              onChange={(e)=>setSignUpData({...signUpData,name:e.target.value})}
              />
              </div>
              <div className='input-fields'>
              <p>email</p>
              <input type='email' 
              placeholder='Email'
              onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})}

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
              >Login</button>
              <div className='input-fields'>
              <span onClick={handleSetRegister}>Already have an account?   Login</span>
              </div>
          </form>
          <ToastContainer/>
        </div>
    )
  }
  
  
  
  return isRegistered?<Login/>:<SignUp/>   
}

export default Register

