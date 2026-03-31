import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import {verifyToken} from '../middleware/auth.middleware.js';
// import routes from "../routes/api.routes.js";
import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler,
    checkEnv,
   pgconnection
} from "../controllers/data.controller.js";

import { register,login,checkToken,loginUser } from "../controllers/auth.controller.js";

dotenv.config()

const app = express();

const publicCors = cors({
  origin: "*",
  methods: ["GET"],
  credentials: false
});

const privateCors = cors({
  origin: ["https://khmer-calendar.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use public configuration
app.get("/api/holidays", publicCors, getHolidays);
app.get("/api/exchange-rate", publicCors, getExchangeRate);

// Use private configuration
app.post('/api/register', privateCors, register);
app.post('/api/login', privateCors, login);
app.post('/api/login-user', privateCors, loginUser);

app.get('/api/check-env',privateCors, checkEnv);
app.get('/api/pgconnection', privateCors, pgconnection);
app.get('/api/neoconnection', privateCors, requestHandler);
app.get('/api/users-neon', privateCors,verifyToken, getUsersList);
app.get('/api/users', privateCors,verifyToken, getUsers);
app.get('/api/data',privateCors, verifyToken, getData);
app.post("/api/holiday-data",privateCors, verifyToken, getHolidays);
app.post('/api/check-token',privateCors, verifyToken, checkToken);
// app.use("/api", routes);

export const handler = serverless(app);