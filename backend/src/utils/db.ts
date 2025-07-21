import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        database : process.env.DB_NAME,
        password : process.env.DB_PASSWORD,
});

export async function testDBConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Database connection failed:', error);       
    }
}

export async function incrementClickCount(identifier: string, isCustomUrl: boolean = false): Promise<void> {
    try {
        if (isCustomUrl) {
            // Increment by custom_url
            await pool.query(
                'UPDATE urls SET times_clicked = times_clicked + 1 WHERE custom_url = ?',
                [identifier]
            );
        } else {
            // Increment by url_hash
            await pool.query(
                'UPDATE urls SET times_clicked = times_clicked + 1 WHERE url_hash = ?',
                [identifier]
            );
        }
        console.log(`✅ Click count incremented for ${isCustomUrl ? 'custom URL' : 'hash'}: ${identifier}`);
    } catch (error) {
        console.error('Error incrementing click count:', error);
        throw error;
    }
}
