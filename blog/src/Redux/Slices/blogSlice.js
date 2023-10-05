import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    blogs :[],
}

export const getAllBlog = createAsyncThunk('/blog/getallblogs',async ()=>{
    try {
        const response =  axios.get('http://localhost:5030/api/v1/blog/getblogs');
        const data = await response;
        return (data?.data?.blogs);
      } catch (error) {
          toast.info(error.message,{
            position:toast.POSITION.TOP_LEFT,
            autoClose:2000,
          })
      }
});

export const createPost = createAsyncThunk('/blog/create',async (blogData)=>{
        try {
            const response =  axios.post('http://localhost:5030/api/v1/blog/createblog',blogData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials:true,
            }
            );

            toast.promise(response,{
                pending:"Wait creating post...",
                error:"Failed to crete post",
                success:"Successfully post created"
            });

            const {data} = await response;
            
            console.log(data);
        } catch (error) {
            toast.error(error.message);
        }
});

export const updatePost = createAsyncThunk('/blog/create',async ()=>{

});

export const deletePost = createAsyncThunk('/blog/create',async ()=>{
    try {
    } catch (error) {
        
    }
});

export const readPost = createAsyncThunk('/blog/readPost',async ()=>{

});


const blogSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllBlog.fulfilled,(state,action)=>{
            state.blogs = action.payload;
        })
    }
});

export default blogSlice.reducer;
