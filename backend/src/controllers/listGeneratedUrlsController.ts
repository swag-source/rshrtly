import { pool } from "../utils/db";

// TODO (verify endpoint return type)
export async function listShortUrlsController(req : any, res : any) {
    try {
        const [ result ] = await pool.query('SELECT url_hash FROM urls LIMIT 10') as any;

        const hashes = result.map((row : any) => row.url_hash);

        return res.status(200).json({generated_hashes : hashes});

    } catch (error) {
        console.error('Type:', error);
        return res.status(500).json({
            error : "❌ Error retrieving URL's"
        });
    }    
}

