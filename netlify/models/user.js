import sql from '../config/db.js';

export const User = {
    async create({ name, email, password }) {
        const [user] = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${password})
            RETURNING id, name, email
        `;
        return user;
    },

    async findByEmail(email) {
        const [user] = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        return user;
    },

    async findAll() {
        const [user] = await sql`
            SELECT id, name, email, created_at, updated_at, uuid FROM users 
        `;
        return user;
    }
};