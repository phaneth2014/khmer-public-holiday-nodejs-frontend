import { Pool } from  'pg';
import dotenv from 'dotenv';

dotenv.config()

const pool = new Pool({
  connectionString: process.env.RANDER_DB_URL,
   ssl: { rejectUnauthorized: false } //if connecting to a cloud provider like Heroku or Azure
});

export default pool;
