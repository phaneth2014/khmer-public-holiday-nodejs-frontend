import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import {verifyToken} from '../middleware/auth.middleware.js';
// import routes from '../routes/index.route.js';
import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler,
    checkEnv
} from "../controllers/data.controller.js";

import { register,login,checkToken,loginUser } from "../controllers/auth.controller.js";

dotenv.config()

const app = express();

app.use(cors({
  origin: ["https://khmer-calendar.netlify.app", "https://khmer-public-holiday.onrender.com"], // allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/holidays", getHolidays);
app.get("/api/exchange-rate", getExchangeRate);

app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/login-user', loginUser);

app.get('/api/check-env', checkEnv);
app.get('/api/dbconnection', requestHandler);
app.get('/api/users-neon', getUsersList);
app.get('/api/users', getUsers);
app.get('/api/data', verifyToken, getData);
app.post("/api/holiday-data",verifyToken, getHolidays);
app.post('/api/check-token',verifyToken, checkToken);
// app.use("/api", routes);

export const handler = serverless(app);