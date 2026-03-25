import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(cors({
    origin: ["http://localhost:4000"], // allow your React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.get("/api/index", (req, res) => {
  res.json({ message: "backend from Express on Netlify is running..." });
});

app.listen(5000, () => {
    console.log("Local test server running on http://localhost:5000");
});