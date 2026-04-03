import db from '../config/database.js';

export const fetchExchangeRates = async (req, res) => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
};

export const fetchNBCRates = async (req, res) => {
    try {
        const response = await fetchAndStoreNBCRates();
        if (response.length > 0) {
            const rate = await db.query('SELECT * FROM exchange_rates ORDER BY date DESC LIMIT 1');
            const latestRate = new Date(rate.rows[0].date).toISOString().split('T')[0];

            if (latestRate === response[0].date) {
                console.log("Latest exchange rate:", rate.rows[0]);
            } else {
                const query = await db.query(`
                    INSERT INTO exchange_rates (currency, rate, date, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *;
                `, [response[0].currency, response[0].rate, response[0].date]);

                console.log(`Inserted ${query.rowCount} rows.`);
                res.status(200).json(response, { message: "Exchange rate fetched and stored successfully" });
            }
            
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