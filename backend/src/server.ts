// Imports
import dotenv from 'dotenv';
import express from 'express';
import { pool, testConnection } from './utils/db';
import { encode } from './helper/generateHash';
import { isValidUrl } from './helper/validateUrl';
import { UrlRow } from './types/shortenResponse';
import { accessUrl } from './types/accessResponse';


// Basic setup.
dotenv.config();
const app = express();

// Define JSON as communication standard for app.
app.use(express.json());

// Define variables.
const PORT  = process.env.PORT || 3030;

// Test connection to database
testConnection();

// Endpoints
app.get('/', (req, res) => {
    console.log('✅ Accessed main page.');
    // Send a response to the client.
    res.status(200).send('Successfully accessed main page.');
});

// Short URL Redirect Endpoint
app.get('/api/v1/long/:hash', async (req, res) => {
    try {
        // Extract hash from header.
        const hash = req.params.hash;

        // Validate if hash was generated 
        const [ result ] = await pool.query('SELECT long_url FROM urls WHERE url_hash = ?', [hash]) as any;

        let long_url : string;

        if(result.length == 0){
            res.json({
                'Error' : 'Invalid URL. Please try another one.'
            })
        } else {
            // Retrieve long URL from hash
            const row = result[0] as accessUrl;
            
            long_url = row.long_url

            // Increment counter for URL
            pool.query('UPDATE urls SET times_clicked = times_clicked + 1 WHERE url_hash = ?', [hash]);

            // Redirect user to link.
            res.status(300).redirect(long_url);

            
        }
    } catch (error) {
        console.error('Error type: ', error);
        res.status(400).send('❌ Error retrieving your url:');
    }
});

// Short URL Generate Endpoint (DONE)
app.post('/api/v1/short', async (req, res) => {
    try {
        // Extract long URL from request body.
        const { longUrl } = req.body;

        // Begin testing url validity.
        // Check if longUrl is provided.
        if(longUrl === undefined || longUrl === '') {
            return res.status(400).json({
                "Error": 'Please provide a long URL to shorten.'
            });
        }
        
        // Verify if URL is valid.
        if(!isValidUrl(longUrl)){
            return res.status(400).json({
                "Error": 'Invalid URL'
            })
        }
        // End testing url validity
    
        // Verify if my url wasn't previously encoded.
        const [result] = await pool.query(
            'SELECT long_url, url_hash, created_at, times_clicked FROM urls WHERE long_url = ?', [longUrl]
        ) as any;

        const rows = result as UrlRow[];

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
            
            const rows = insertResult as UrlRow[];

            // Define the response values
            createdAt = rows[0].created_at;
            clicks = rows[0].times_clicked;

        }

        // Return response body JSON with: {longUrl, shortUrl, timeOfCreation, clicks}
        return res.status(200).json(
            {
                "longUrl" : `${longUrl}`, 
                "shortUrl" : `${process.env.WEB_DOMAIN || 'http://localhost:3030'}/${hash}`,
                "creationTime" : `${createdAt}`,
                "timesClicked" : `${clicks}`
            }
        )

    } catch (error) {
        console.error('Error type: ', error);
        return res.status(500).json('❌ Error encoding your url:');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}, website: http://localhost:${PORT}`);
});
