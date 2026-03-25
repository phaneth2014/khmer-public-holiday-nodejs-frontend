import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';

dotenv.config()

import { getData, getHolidays, getExchangeRate, getUsers,  getUsersList,  requestHandler } from "../controller/controller.js";

const app = express();

app.use(cors({
    origin: ["https://khmer-calendar.netlify.app","https://khmer-public-holiday.onrender.com"], // allow your React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTANT: include full path
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Express server on Netlify is running..." });
});

app.get('/api/dbconnection', requestHandler);
app.get('/api/users-neon', getUsersList);
app.get('/api/users', getUsers);
app.get('/api/data', getData);
app.post("/api/holiday-data", getHolidays);
app.post("/api/holidays", getHolidays);
app.post("/api/exchange-rate", getExchangeRate);

export const handler = serverless(app);