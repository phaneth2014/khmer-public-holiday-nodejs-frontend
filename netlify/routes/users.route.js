import express from 'express';
import { createUser, getUsers, getCheck } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/check', getCheck);

export default router;
