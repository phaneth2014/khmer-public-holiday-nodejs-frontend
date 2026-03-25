import pool from '../config/database.js';
import sql from '../config/neondb.js'

import { khmerNewYear, KhmerLunar, holidays } from './data.js';

// console.log(holidays());
export const requestHandler = async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(version);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const getData = async (req, res) => {

    const lunar = KhmerLunar(new Date());
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.status(200).json({ data: lunar, message: 'success' });
}

export const getHolidays = async (req, res) => {
    try {
        const year = req.body.year
        const now = new Date();
        const date = new Date(now.setYear(year));
        const holiday = holidays(date);
        console.log("body:", req.body);
        console.log("date:", date);
        res.status(200).json({ holidays: holiday, message: "success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExchangeRate = async (req, res) => {
    try {
        const { data } = req.body;

        if (data) {
            res.status(201).json({ data, message: "response successfully" });
        } else {
            res.status(500).json({ message: "data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(201).json(result.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsersList = async (req, res) => {
    try {
        const id = 1;
        const result = await sql.query('SELECT * FROM table WHERE id = $1', [id]);
        res.status(201).json(result.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};