import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/database.js";
import "dotenv/config";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  const client = await pool.connect();

  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "002-create-holidays-table.sql"),
      "utf8"
    );

    await client.query(sql);
    console.log("✅ Holidays table migrated successfully");

  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    client.release();
  }
}

migrate();