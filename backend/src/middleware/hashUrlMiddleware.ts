import { pool } from "../utils/db";
import { isValidUrl } from "../helper/validateUrl";
import { DB_Row } from "../types/shortenResponse";
import { encode } from "../helper/generateHash";

export async function hashURL(req : any, res : any){
    try {
        // Extract long URL from request body.
        const { longUrl } = req.body;

        // Begin testing url validity.
        if(longUrl === undefined || longUrl === '') {
            return res.status(400).json({
                "Error": 'Please provide a long URL to shorten.'
            });
        }
        
        // Case 2: Verify if URL is valid.
        if(!isValidUrl(longUrl)){
            return res.status(400).json({
                "Error": 'Invalid URL'
            })
        }
        // End testing URL validity
        const result = await pool.query(
            'SELECT long_url, url_hash, created_at, times_clicked FROM urls WHERE long_url = ?', [longUrl]
        ) as any;

        const rows = result[0] as DB_Row[];

        let hash : string;
        let createdAt : string;
        let clicks : number;

        // Verify if the URL exists in the database
        if(rows.length > 0) { 
            // Return the hash of the existing url
            hash = rows[0].url_hash;
            createdAt = rows[0].created_at;
            clicks = rows[0].times_clicked;
        } else {
            // URL wasn't found, encode section.
            hash = encode(longUrl);

             // Store the information in the database.
            await pool.query(`INSERT INTO urls (long_url, url_hash, created_at, times_clicked) VALUES (?, ?, NOW(), 0)`, [longUrl, hash] ) as any;

            // Fetch the inserted row
            const [insertResult] = await pool.query(`SELECT long_url, url_hash, created_at, times_clicked FROM urls WHERE url_hash = ?`, [hash]) as any;
            
            const rows = insertResult as DB_Row[];

            // Define the response values
            createdAt = rows[0].created_at;
            clicks = rows[0].times_clicked;

        }

        // Return response body JSON with: {longUrl, shortUrl, timeOfCreation, clicks}
        return res.status(201).json(
            {
                "shortUrl" : `${process.env.WEB_DOMAIN || 'http://localhost:3030'}/${hash}`,
                "creationTime" : `${createdAt}`,
                "timesClicked" : `${clicks}`
            }
        )

    } catch (error) {
        console.error('Error type: ', error);
        return res.status(500).json('❌ Error encoding your url:');
    }
}

