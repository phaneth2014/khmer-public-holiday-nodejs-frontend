import express from 'express';
import {verifyToken} from '../middleware/auth.middleware.js';
import { register,login, createUser, getUsers, getCheck } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/create', verifyToken, createUser);
router.get('/users',  getUsers);
router.get('/check', verifyToken, getCheck);

export default router;
