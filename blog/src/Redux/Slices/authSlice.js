import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    userData : null,
    isLoggedIn:false
}

// getting the user data if the user is logged in 
export const getUserData = createAsyncThunk('/auth/getuserdata',async ()=>{
    try {
        const response = await axios.get(`http://localhost:5030/api/v1/user/profile`,{
          withCredentials:true,
        });
        const {user} = response.data;

        if(!user){
          toast.info("Login for More details",{
            position:toast.POSITION.TOP_CENTER,
            autoClose:3000,
          });
        }
       return user;
      } catch (error) {
        toast.info(error.message,{
          position:toast.POSITION.TOP_CENTER,
          autoClose:3000,
        });
      }
});

//register user
export const register = createAsyncThunk('/auth/register',async (registerData)=>{

});

//loggin user
export const login = createAsyncThunk('/auth/login',async ()=>{

});

//logout 
export const logout = createAsyncThunk('/auth/logout',async (loginData)=>{
  try {
      const response = axios.get('http://localhost:5030/api/v1/user/logout',{
        withCredentials:true,
      });
      toast.promise(response,{
        pending:"Wait signing out..",
        error:"Failed to logout",
        success:"Successfully logged out"
      });
      return true;
  } catch (error) {
      toast.error(error.message);
  }
  return false;
});

//update profile
export const updateAccount = createAsyncThunk('/auth/update',async (userData)=>{
  try {
    const response = axios.post('http://localhost:5030/api/v1/user/update',userData,{
      headers:{
          'Content-Type': 'multipart/form-data',
      },
      withCredentials:true,
  });
    toast.promise(response,{
      pending:"Wait updating account..",
      error:"Failed to update",
      success:"Successfully updated"
    });
    const user = await response;
    return user.data.user
} catch (error) {
    toast.error(error.message);
  } 
});

//get account by id
export const getUserById = createAsyncThunk('/auth/userbyid',async ()=>{

});

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserData.fulfilled,(state,action)=>{
           state.userData= action.payload
           state.isLoggedIn = true;
        })
        .addCase(logout.fulfilled,(state,action)=>{
          state.userData =null;
          state.isLoggedIn = false;
        })
        .addCase(updateAccount.fulfilled,(state,action)=>{
          state.userData = action.payload;
        })
    }
});

export default authSlice.reducer;



