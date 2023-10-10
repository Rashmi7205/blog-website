import React, { useState } from 'react';
import logo from '../images/logo-color.png';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Slices/authSlice';

function ResetPasswordPage() {
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        if(!email){
            toast.info("Email is mandatory",{
                position:toast.POSITION.TOP_CENTER
            });
            return;
        }
        await dispatch(resetPassword(email))


    }
    return (
    <div className='w-full h-screen'>
        <form 
        onSubmit={handleFormSubmit}
        className='mx-auto w-full md:w-2/5 bg-white flex flex-col items-center justify-around px-5 rounded-md shadow-xl'
        >
            <img src={logo} alt="logo" 
            className='w-[200px] my-2'
            />
            <p className='text-sm my-2'>
                Enter the email address associated with your account . We will send you a link to reset your password
            </p>
            <label htmlFor="email">Email</label>
            <input type="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='w-4/5 h-[30px] rounded-md'
            />
            <button type="submit"
            className='w-4/5 bg-purple-600 text-white my-3 py-2 font-semibold  rounded-md '
            >
                Continue
            </button>
        </form>
    </div>
  )
}

export default ResetPasswordPage