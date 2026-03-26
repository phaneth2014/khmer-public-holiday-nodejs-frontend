import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';
// import routes from '../routes/index.route.js';
import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler
} from "../controllers/data.controller.js";


dotenv.config()

const app = express();

app.use(cors({
  origin: ["https://khmer-calendar.netlify.app", "https://khmer-public-holiday.onrender.com"], // allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/dbconnection', requestHandler);
app.get('/api/users-neon', getUsersList);
app.get('/api/users', getUsers);
app.get('/api/data', getData);
app.post("/api/holiday-data", getHolidays);
app.get("/api/holidays", getHolidays);
app.get("/api/exchange-rate", getExchangeRate);
// app.use("/api", routes);

export const handler = serverless(app);