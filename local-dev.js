import express from "express";

import { verifyToken } from "./netlify/middleware/auth.middleware.js";
import {
    getData,
    getHolidays,
    getExchangeRate,
    getUsers,
    getUsersList,
    requestHandler
} from "./netlify/controllers/data.controller.js";

import { fetchExchangeRates, fetchNBCRates } from "./netlify/controllers/RestApi.controller.js";

import { register,login,checkToken } from "./netlify/controllers/auth.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/holidays", getHolidays);
app.get("/api/exchange-rate", getExchangeRate);

app.post("/api/post-exchange-rate", fetchExchangeRates);
app.get("/api/fetch-nbc-rates", fetchNBCRates);

app.post('/api/register', register);
app.post('/api/login', login);

app.get('/api/neoconnection', requestHandler);
app.get('/api/users-neon', getUsersList);
app.get('/api/users', getUsers);
app.get('/api/data', verifyToken, getData);
app.post("/api/holiday-data",verifyToken, getHolidays);
app.post('/api/check-token',verifyToken, checkToken);

app.listen(3000, () => {
    console.log("Local test server running on http://localhost:3000");
});