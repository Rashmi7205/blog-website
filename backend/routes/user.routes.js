import {Router} from 'express';
import { login,register,updateUser,
    changePassword,
    resetPassword,
    deleteUser, 
    getUser} from '../controller/user.controller.js';
import isLoggedIn from '../middleware/user.auth.js';
import upload from '../middleware/multer.middleware.js';
import multer from 'multer';


const router =Router();

router.post('/register',register);
router.post('/login',login);
router.get('/profile',isLoggedIn,getUser);
router.post('/update',isLoggedIn,upload.single('profilePic'),updateUser);
router.post('/reset/password',resetPassword);
router.post('/reset/password/:resetToken',changePassword);
router.delete('/delete',isLoggedIn,deleteUser);

export default router