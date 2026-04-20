import db from '../config/db.js';
import sql from '../config/db.js'
import dotenv from 'dotenv';
import { khmerNewYear, KhmerLunar, holidays } from './data-api.js';
import {Rate} from '../models/exchangerate.js';

dotenv.config();

// console.log(holidays());
export const requestHandler = async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const { version } = result[0];
        console.log(version);
        // res.writeHead(200, { "Content-Type": "text/plain" });
        // res.end(version);
        res.status(200).json({ data: version, message: "neon db connected successfully", APP_URL: process.env.APP_URL });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const pgconnection = async (event, context) => {
    try {
        // If 'db' was imported as a module object instead of the pool,
        // we extract the query function safely:
        const pool = db.query ? db : db.default;

        const { rows } = await pool.query('SELECT NOW()');

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export const checkEnv = async (req, res) => {
    try {
        const now = new Date();
        res.status(200).json({ data: now, message: "env successfully", APP_URL: process.env.APP_URL });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
export const getData = async (req, res) => {

    const lunar = KhmerLunar(new Date());
    console.log("params:", req.params);
    console.log("body:", req.body);

    res.status(200).json({ data: lunar, message: 'success' });
}

export const getHolidays = async (req, res) => {
    try {
        const now = new Date();
        const year = req.query.year || now.getFullYear();
        const date = new Date(now.setYear(year));
        const holiday = holidays(date);
        const countholiday = holiday.length;
        console.log("date:", date, countholiday);
        res.status(200).json({ year: parseInt(year), holidays: holiday, count: countholiday, message: "success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function formatDate(date) {
    return new Date(date).toLocaleString('en-CA', {
        timeZone: 'Asia/Phnom_Penh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).replace(',', '');
}

export const getExchangeRate = async (req, res) => {
    try {
        const date = req.query.date || new Date();
        const month = req.query.month;
        const year = req.query.year || new Date().getFullYear();

        let result = await Rate.findByDate(date);
        let data = result;

        if (month) {
           
            result = await Rate.findAll();
             data = result;
            
   
            res.status(201).json({ year, month: month || date.getMonth() + 1, date: date.toISOString ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0], data, source: 'Nation Bank of Cambodia', message: "response successfully" });
        } else {
            res.status(500).json({ message: "data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExchangeRateLast7days = async (req, res) => {
    try {
        const date = req.query.date || new Date();
        const month = req.query.month;
        const year = req.query.year || new Date().getFullYear();

        if (date) {     
            let result = await Rate.findLast7Day();
            let data = result;

            res.status(201).json({ year, month: month || date.getMonth() + 1, date: date.toISOString ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0], data, source: 'Nation Bank of Cambodia', message: "response successfully" });
        } else {
            res.status(500).json({ message: "data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const pool = db.query ? db : db.default;

        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: err.message });
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

export const storeDeviceTracking = async (req, res) => {
    const {
        ip_address,
        device_type,
        os_name,
        browser_name,
        browser_version,
        city,
        isp,
        user_agent
    } = req.body;    

    const queryText = `
    INSERT INTO device_trackings (
      ip_address, device_type, os_name, browser_name, 
      browser_version, city, isp, user_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;
  `;

    const values = [
        ip_address,
        device_type,
        os_name,
        browser_name,
        browser_version,
        city,
        isp,
        user_agent
    ];

    try {
        const result = await sql.query(queryText, values);
        res.status(201).json({
            success: true,
            tracking_id: result.rows[0].id
        });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: 'Failed to log device data' });
    }
};