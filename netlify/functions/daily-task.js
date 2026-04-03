import db from '../config/database.js';
// import { fetchAndStoreNBCRates } from "../controllers/RestApi.controller.js";

export default async (request, context) => {
  try {

    const { next_run } = await request.json();
    console.log("Cron started. Next run scheduled for:", next_run);
    // const rates = await fetchAndStoreNBCRates();
    // Your database logic
    // const rate = await db.query('SELECT id, currency, rate, date::text as date, created_at, updated_at FROM exchange_rates ORDER BY id DESC LIMIT 1');
    // if (rate.rows[0].date === rates[0].date) {
    //   console.log("Latest exchange rate:", rate.rows[0].rate);
    // }else{
    //   const query = await db.query(`
    //                 INSERT INTO exchange_rates (currency, rate, date, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;
    //             `, [rates[0].currency, rates[0].rate, rates[0].date]);
                
    //   console.log(`Inserted ${query.rowCount} rows.`);
    // }

    // No need to return a response body for scheduled functions
  } catch (error) {
    console.error("Cron failed:", error);
  }
};

// Netlify Cron Config
export const config = {
  schedule: "0 * * * *" //Run every hour or hourly 0 * * * * # Runs every day at midnight UTC 0 0 * * *
};
