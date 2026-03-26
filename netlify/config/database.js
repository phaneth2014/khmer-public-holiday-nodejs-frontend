import { Pool } from  'pg';

const pool = new Pool({
  connectionString: process.env.RANDER_DB_URL,
   ssl: { rejectUnauthorized: false } //if connecting to a cloud provider like Heroku or Azure
});

export default pool;
