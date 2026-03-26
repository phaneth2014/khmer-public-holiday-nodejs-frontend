import pool from '../config/neondb.js';

export default class User {
  static async create({ name, email }) {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }
}
