import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config()

const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString: connectionString,
   ssl: { rejectUnauthorized: false } //if connecting to a cloud provider like Heroku or Azure
});

export default pool;
