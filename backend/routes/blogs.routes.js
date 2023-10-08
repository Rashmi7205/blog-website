import { Router  } from "express";
import isLoggedIn from "../middleware/user.auth.js";
import {getBlogs,createBlogs,updateBlogs,deleteBlogs,getBlogById,
postComment,postLike,
} from '../controller/blogs.controller.js';
import multer from "multer";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.post('/getblogs',getBlogs)
        .get('/getblog/:id',getBlogById);
router.post('/createblog',isLoggedIn,upload.single('image'),createBlogs);
router.post('/updateblog/:id',isLoggedIn,upload.single('image'),updateBlogs);
router.delete('/deleteblog/:id',isLoggedIn,deleteBlogs);
router.post('/post/comment/:id',isLoggedIn,postComment)
        .post('/post/like/:id',isLoggedIn,postLike);

export default router;
