import { accessUrl } from "../types/accessResponse";
import { pool } from "../utils/db";

export async function redirectURL(req : any, res : any) {
    try {
        // Extract hash from header.
        const hash = req.params.hash;

        // Validate if hash was generated 
        const [ result ] = await pool.query('SELECT long_url FROM urls WHERE url_hash = ?', [hash]) as any;

        let long_url : string;

        if(result.length == 0){
            return res.json({
                'Error' : 'Invalid URL. Please try another one.'
            })
        } else {
            // Retrieve long URL from hash
            const row = result[0] as accessUrl;
            
            long_url = row.long_url

            // Increment counter for URL
            pool.query('UPDATE urls SET times_clicked = times_clicked + 1 WHERE url_hash = ?', [hash]);

            // Redirect user to link.
            return res.status(300).redirect(long_url);

            
        }
    } catch (error) {
        console.error('Error type: ', error);
        return res.status(400).send('❌ Error retrieving your url:');
    }    
}