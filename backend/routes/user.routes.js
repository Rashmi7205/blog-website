import {Router} from 'express';
import { login, ping, register } from '../controller/user.controller.js';

const router =Router();

router.get('/',ping);
router.post('/register',register);
router.post('/login',login);

export default router