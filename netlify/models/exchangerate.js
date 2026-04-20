import sql from '../config/db.js';

export const Rate = {
    async create({ rates, date }) {
        const [rate] = await sql`
            INSERT INTO exchange_rates (rate, date)
            VALUES (${rates}, ${date})
            RETURNING id, rate, date
        `;
        return user;
    },

    async findByDate(date) {
        const [rate] = await sql`
            SELECT id, currency, rate, date::text as date FROM exchange_rates WHERE date = ${date}
        `;
        return rate;
    },

    async findAll() {
        const [rates] = await sql`
            SELECT id, currency,rate,date::text as date FROM exchange_rates 
        `;
        return rates;
    },

    async findLast7Day(){
        const [rates] = await sql`
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