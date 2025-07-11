import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        database : process.env.DB_NAME,
        password : process.env.DB_PASSWORD,
});

export async function testConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Database connection failed:', error);       
    }
}