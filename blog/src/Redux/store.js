import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./Slices/blogSlice";
import authSlice from "./Slices/authSlice";

const store = configureStore({
    reducer:{
        blogData:blogSlice,
        auth:authSlice,
    }
});

export default store;