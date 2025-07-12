import { DB_Row } from "../types/shortenResponse";
import { pool } from "../utils/db";

// TODO
export async function listShortUrlsController(req : any, res : any) {
    try {
        const [ result ] = await pool.query('SELECT * FROM urls LIMIT 10') as any;

        const rows = result[0] as DB_Row[];

        const list = rows.map((item) => ({ 'url_hash' : item.url_hash}));

        console.log(res);

        return res.status(200).send(list);
    } catch (error) {
        console.error('Type:', error);
        return res.status(500).json({
            error : "❌ Error retrieving URL's"
        });
    }    
}

