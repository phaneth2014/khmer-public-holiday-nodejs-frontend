import express from 'express';

import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler
} from "../controllers/data.controller.js";

const router = express.Router();

router.get('/', getData);
router.get('/holidays', getHolidays);
router.get('/exchange-rate', getExchangeRate);
router.get('/users', getUsers);
router.get('/neon-users', getUsersList);
router.get('/dbconnectoin', requestHandler);

export default router;