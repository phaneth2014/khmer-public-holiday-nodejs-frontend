import db from '../config/database.js';

export const fetchExchangeRates = async (req, res) => {
    try {
    
        const { date, rate } = req.query;

        if (!date || !rate) {
            console.error("Missing date or rate parameter");
            return res.status(400).json({ error: "Missing date or rate parameter" });
        }
        if(date && rate) {
            console.log("Received date:", date, "and rate:", rate);
        }
        // Further processing with the provided date and rate
       const row = await db.query('SELECT id, currency, rate, date::text as date, created_at, updated_at FROM exchange_rates ORDER BY date DESC LIMIT 1');
            const latestRate = (row.rows[0].date);

            if (latestRate === date) {
                console.log("found:", row.rows[0]);
               res.status(200).json({  message: "Exchange rate found for today" });
            } else {
                console.log("not found", row.rows[0], date, latestRate);                
                const query = await db.query(`
                    INSERT INTO exchange_rates (currency, rate, date, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;
                `, ['USD', rate, date]);                
                console.log(`Inserted ${query.rowCount} rows.`);               
                res.status(200).json({  message: "Exchange rate fetched and stored successfully" }); 
            }
            
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
};

export const fetchNBCRates = async (req, res) => {
    try {
        const response = await fetchAndStoreNBCRates();
        const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        if (response.length > 0) {
            const rate = await db.query('SELECT id, currency, rate, date::text as date, created_at, updated_at FROM exchange_rates ORDER BY id DESC LIMIT 1');
            const latestRate = (rate.rows[0].date);

            if (latestRate === today) {
                console.log("found:", rate.rows[0]);
               
            } else {
                console.log("not found", rate.rows[0], today, latestRate);
                
                const query = await db.query(`
                    INSERT INTO exchange_rates (currency, rate, date, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;
                `, [response[0].currency, response[0].rate, today]);
                
                console.log(`Inserted ${query.rowCount} rows.`);
                
            }
            res.status(200).json({ ...response[0], message: "Exchange rate fetched and stored successfully" });
        } else {
            res.status(404).json({ error: "No exchange rates found" });
        }

    } catch (error) {
        console.error("Error fetching NBC rates:", error);
        res.status(500).json({ error: "Failed to fetch NBC rates" });
    }
};


export const fetchAndStoreNBCRates = async () => {
    const response = await fetch('https://www.nbc.gov.kh/english/economic_research/exchange_rate.php');
    const data = await response.text();
    const content = data.indexOf("Official Exchange Rate");

    if (content !== -1) {
        const ratecontent = data.substring(content + 47, content + 51).trim(); // Adjust the length as needed to capture the full rate information
        const rateDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const rate = parseInt(ratecontent.trim()); // Adjust the length as needed to capture the full rate information
        const arr = [{ date: rateDate, rate: rate, currency: "USD", source: "NBC" }];
        return arr;
    } else {
        throw new Error("Exchange rate not found in NBC response");
    }
};