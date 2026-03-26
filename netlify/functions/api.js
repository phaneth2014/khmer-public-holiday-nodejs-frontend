import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';
import routes from '../routes/index.route.js';

dotenv.config()

const app = express();

app.use(cors({
  origin: ["https://khmer-calendar.netlify.app", "https://khmer-public-holiday.onrender.com"], // allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export const handler = serverless(app);