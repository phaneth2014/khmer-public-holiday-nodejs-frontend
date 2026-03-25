import { Pool } from  'pg';

// Your connection string
const connectionString = 'postgresql://portgresql:gTyCwggH5J650xVHKswV4U0DDAHE4ecS@dpg-d6ul7vsr85hc738tfok0-a.singapore-postgres.render.com/khmer_public_holiday_db';

const pool = new Pool({
  connectionString: connectionString,
   ssl: { rejectUnauthorized: false } //if connecting to a cloud provider like Heroku or Azure
});

export default pool;
// module.exports = pool;
