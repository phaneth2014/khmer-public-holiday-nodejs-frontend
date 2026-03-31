import db from '../config/database.js';

export default async (request, context) => {
  try {
    const { next_run } = await request.json();
    console.log("Cron started. Next run scheduled for:", next_run);

    // Your database logic
    const res = await db.query('UPDATE users SET updated_at = NOW()');
    console.log(`Updated ${res.rowCount} rows.`);

    // No need to return a response body for scheduled functions
  } catch (error) {
    console.error("Cron failed:", error);
  }
};

// Netlify Cron Config
export const config = {
  schedule: "0 0 * * *" // Runs every day at midnight UTC
};