import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  userData: null,
  isLoggedIn: false
}

// getting the user data if the user is logged in 
export const getUserData = createAsyncThunk('/auth/getuserdata', async () => {
  try {
    const response = await axios.get(`http://localhost:5030/api/v1/user/profile`, {
      withCredentials: true,
    });
    const { user } = response.data;

    if (!user) {
      toast.info("Login for More details", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    return user;
  } catch (error) {
    toast.info(error.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
});

//register user
export const register = createAsyncThunk('/auth/register', async (registerData) => {
  try {
    const response = axios.post('http://localhost:5030/api/v1/user/register', registerData, {
      headers: { 'Content-Type': 'multipart/formdata' },
      withCredentials: true,
    });

    toast.promise(response, {
      pending: "Wait Creating an account...",
      success: "Succesfully account registerd",
      error: "Failed to create account"
    }, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });

    const { data } = await response;

    return data;

  } catch (error) {
    toast.info(error.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
});

//loggin user
export const login = createAsyncThunk('/auth/login', async (loginData) => {
  try {
    const response = axios.post('http://localhost:5030/api/v1/user/register', loginData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    toast.promise(response, {
      pending: "Wait authentication in  process...",
      success: "Succesfully account logged in",
      error: "Failed to login account"
    }, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000
    });

    const { data } = await response;

    return data;

  } catch (error) {
    toast.info(error.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  }
});

//logout 
export const logout = createAsyncThunk('/auth/logout', async (loginData) => {
  try {
    const response = axios.get('http://localhost:5030/api/v1/user/logout', {
      withCredentials: true,
    });
    toast.promise(response, {
      pending: "Wait signing out..",
      error: "Failed to logout",
      success: "Successfully logged out"
    });
    return true;
  } catch (error) {
    toast.error(error.message);
  }
  return false;
});

//update profile
export const updateAccount = createAsyncThunk('/auth/update', async (userData) => {
  try {
    const response = axios.post('http://localhost:5030/api/v1/user/update', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    toast.promise(response, {
      pending: "Wait updating account..",
      error: "Failed to update",
      success: "Successfully updated"
    });
    const user = await response;
    return user.data.user
  } catch (error) {
    toast.error(error.message);
  }
});

//get account by id
export const getUserById = createAsyncThunk('/auth/userbyid', async (id) => {
  try {
    const response = axios.get('http://localhost:5030/api/v1/user/')
  } catch (error) {

  }
});

export const likeOnPost = createAsyncThunk('/user/likedpost', async (blogId) => {
  try {
    if (!blogId) {
      toast.error('invalid blogid', {
        position: toast.POSITION.TOP_CENTER
      })
    }
    const { data } = await axios.post(`http://localhost:5030/api/v1/blog/post/like/${blogId}`, {}, {
      withCredentials: true,
    });
    toast.success(data.message, {
      position: toast.POSITION.TOP_CENTER
    });
    return data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const followUser = createAsyncThunk('/user/followuser', async () => {

});

export const commentOnPost = createAsyncThunk('/user/commentonpost', async ({blogId,newComment}) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5030/api/v1/blog/post/comment/${blogId}`,
      {
        newComment,
      },
      {
        withCredentials: true,
      }

    );
    toast.success(data.message, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
    });

    return data;
  } catch (error) {

  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userData = null;
        state.isLoggedIn = false;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(login.fulfilled,(state,action)=>{

      })
  }
});

export default authSlice.reducer;



