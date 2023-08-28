import {Router} from 'express';
import { login,register,updateUser,
    changePassword,
    resetPassword,
    deleteUser, 
    getUser,
    getProfile,
    logout,
    followUser
} from '../controller/user.controller.js';
import isLoggedIn from '../middleware/user.auth.js';
import upload from '../middleware/multer.middleware.js';
import multer from 'multer';


const router =Router();
// Register user
router.post('/register',register);
// login user
router.post('/login',login);
//get own profile
router.get('/profile',isLoggedIn,getProfile);

router.get('/getuser/:id',getUser);

router.post('/update',isLoggedIn,upload.single('profilePic'),updateUser);
router.post('/reset/password',resetPassword);
router.post('/reset/password/:resetToken',changePassword);
router.delete('/delete',isLoggedIn,deleteUser);
router.get('/logout',isLoggedIn,logout);
router.get('/follow/:id',isLoggedIn,followUser);



export default router