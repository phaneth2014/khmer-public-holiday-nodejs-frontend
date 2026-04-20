import sql from '../config/db.js';

export const Rate = {
   async create({ rate, date }) { // Changed 'rates' to 'rate'
        const [result] = await sql`
            INSERT INTO exchange_rates (rate, date)
            VALUES (${rate}, ${date})
            RETURNING id, rate, date
        `;
        return result;
    },

    async findByDate(date) {
        const [rate] = await sql`
            SELECT id, currency, rate, date::text as date FROM exchange_rates WHERE date = ${date}
        `;
        return rate;
    },

    async findAll() {
        const rates = await sql`
            SELECT * FROM exchange_rates 
        `;
        return rates;
    },

    async findLast7Day(){
        const rates = await sql`
            SELECT id, currency, rate, date::text as date
                    FROM (
                        SELECT id, currency, rate, date
                        FROM exchange_rates
                        ORDER BY date DESC
                        LIMIT 8
                    ) sub
                    ORDER BY date ASC
        `;

        return rates;
    }
};