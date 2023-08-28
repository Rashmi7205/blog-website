import React,{useContext, useEffect,useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import{ API_URL} from './utils/scr.login.js';
import {UserContext,LoginContext} from '../App.js'
  
const  Login = () =>{

    const loginContext=useContext(LoginContext);
    const userContext=useContext(UserContext);
    const navigate = useNavigate();
    const [loginBtnText,setLoginBtnText] =useState('Login');

    const [userLoginData,setUserLoginData] = useState({
        email:null,
        password:null,
    })

    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoginBtnText('Loading.....');

        const {email,password} = userLoginData;

        if(!email||!password){
            toast.error("All Fields are required",{
                autoClose:3000,
                position:toast.POSITION.TOP_CENTER
            });
            setLoginBtnText('Login');
        }

        try {
            const response = await axios.post(`${API_URL}/login`,{
                email,
                password
            },{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            });

            const authData = await response.data;
            userContext.setUserDetails(authData?.user);
            loginContext.setIsLoggedIn(true);
            toast.success(authData.message,{
                autoClose:3000,
                position:toast.POSITION.TOP_CENTER
            });

            navigate('/');
             
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
     <img src="https://img.freepik.com/free-vector/digital-nomad-concept-illustration_114360-1082.jpg?size=626&ext=jpg&uid=R111820993&semt=ais" alt='image' />:
      </div>
      <form className='login-form' onSubmit={handleLogin}>
         <div className='input-fields'>
            <h1>Welcome</h1>
            <p>Login To your account</p>
          </div>
          <div className='input-fields'>
          <p>email</p>
          <input type='email'
           placeholder='Email'
           name='email'
           onChange={(e)=>{
            setUserLoginData({...userLoginData,[e.target.name]:e.target.value})
            }}
           />
          </div>
          <div className='input-fields'>
          <p>password</p>
          <input
           type='password' 
           placeholder='Password' 
           autoComplete="false"
            name='password'
            onChange={(e)=>{
                setUserLoginData({...userLoginData,[e.target.name]:e.target.value})
                }}
            />
          </div>
          <button id='login-btn'
           type='submit'
           >
            {loginBtnText}
           </button>
          <div className='input-fields'>
          <Link to='/' >Forgot Password?</Link>
          <Link to='/signup' >Sign Up</Link>
          </div>
      </form>
      <ToastContainer/>
    </div>
    </>
    )
  }
export default Login