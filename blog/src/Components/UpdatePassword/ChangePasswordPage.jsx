import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword } from '../../Redux/Slices/authSlice';
import { toast } from 'react-toastify';

function ChangePasswordPage() {
  const [newPassword,setNewPassword] = useState("");
  const {resettoken} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    if(!newPassword){
      toast.info("password is mandatory",{
        position:toast.POSITION.TOP_CENTER
    });
    return;
    }
    const data = await dispatch(changePassword({newPassword,resettoken}))
    
    if(data?.payload?.success){
      navigate('/login');
    }
    return;
  }
  
  return (
    <div className='w-full h-screen'>
    <form 
    onSubmit={handleFormSubmit}
    className='mx-auto w-full md:w-2/5 bg-white flex flex-col items-center justify-around px-5 rounded-md shadow-xl'
    >
        <p className='text-sm my-2'>
            Enter the new password
        </p>
        <label htmlFor="password">Password</label>
        <input type="password" 
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        className='w-4/5 h-[30px] rounded-md'
        />
        <button type="submit"
        className='w-4/5 bg-purple-600 text-white my-3 py-2 font-semibold  rounded-md '
        >
           Change Password
        </button>
    </form>
</div>
  )
}

export default ChangePasswordPage