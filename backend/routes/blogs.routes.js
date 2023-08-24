import { Router  } from "express";
import isLoggedIn from "../middleware/user.auth.js";
import {getBlogs,createBlogs,updateBlogs,deleteBlogs,getBlogById} from '../controller/blogs.controller.js';
import multer from "multer";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.get('/getblogs',getBlogs)
        .get('/getBlogs/:id',getBlogById);
router.post('/createblog',isLoggedIn,upload.single('image'),createBlogs);
router.put('/updateblog/:id',isLoggedIn,updateBlogs);
router.delete('/deleteblog/:id',isLoggedIn,deleteBlogs);


export default router;
