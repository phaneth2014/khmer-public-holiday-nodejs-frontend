import express from "express";
import cors from "cors";

import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler
} from "./netlify/controller/controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Local Express test works" });
});

app.get('/api/dbconnection', requestHandler);
app.get('/api/users-neon', getUsersList);
app.get('/api/users', getUsers);
app.get('/api/data', getData);
app.post("/api/holiday-data", getHolidays);
app.post("/api/holidays", getHolidays);
app.post("/api/exchange-rate", getExchangeRate);

app.listen(3000, () => {
    console.log("Local test server running on http://localhost:3000");
});