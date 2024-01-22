import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    blogs :[],
}


export const getBlogById = createAsyncThunk('/blog/blogbyid',async (id)=>{
    try {
        const response =await axios.get(`/api/v1/blog/getblog/${id}`);
       
        return response.data;
} catch (error) {
    toast.info(error.message,{
        position:toast.POSITION.TOP_LEFT,
        autoClose:2000,
      });
}
})

export const getBlogsById = createAsyncThunk('/blog/getblogbyId',async (blogIdList)=>{
    try {
            const response = await axios.get(`/api/v1/blog/getmyblogs`);
            return await response.data;
    } catch (error) {
        toast.info(error.message,{
            position:toast.POSITION.TOP_LEFT,
            autoClose:2000,
          });
    }
});

export const getAllBlog = createAsyncThunk('/blog/getallblogs',async (pageCount)=>{
    try {
        const response =  axios.post('/api/v1/blog/getblogs',pageCount);
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
            const response =  axios.post('/api/v1/blog/createblog',blogData,
            {
                withCredentials:true,
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            }
            );

            toast.promise(response,{
                pending:"Wait creating post...",
                error:"Failed to crete post",
                success:"Successfully post created"
            });

            const {data} = await response;
            
           return data;
        } catch (error) {
            toast.error(error.message);
        }
});

export const updatePost = createAsyncThunk('/blog/create',async ({blogid,blogData})=>{
    try {
        console.log(blogid,blogData);
        const response =  axios.post(`/api/v1/blog/updateblog/${blogid}`,blogData,
        {
            withCredentials:true,
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        }
        );

        toast.promise(response,{
            pending:"Wait updating post...",
            error:"Failed to update post",
            success:"Successfully post updated"
        });

        const {data} = await response;
        
        return data?.updatedBlog;
    } catch (error) {
        toast.error(error.message);
    }
});

export const deletePost = createAsyncThunk('/blog/delete',async (blogId)=>{   
    try {
        const response = axios.delete(`/api/v1/blog/deleteblog/${blogId}`,{
            withCredentials:true,
        });

        toast.promise(response,{
            pending:"Wait deletion in process..",
            error:"Failed to delete Blog",
            success:"Successfully blog deleted"
        });
        
        const {data} = await response;

        return {...data,blogId};
    } catch (error) {
        toast.error(error.message);
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
        .addCase(deletePost.fulfilled,(state,action)=>{
           
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            if(action.payload){
               state.blogs = [...state.blogs,action.payload.blog];
            }
        })

    }
});

export default blogSlice.reducer;
