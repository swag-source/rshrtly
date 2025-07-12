// Imports
import dotenv from 'dotenv';
import express from 'express';
<<<<<<< HEAD
import { testConnection } from './utils/db';
import { hashController } from './controllers/hashController';
import { redirectController } from './controllers/redirectController';
// import { customUrlController } from './controllers/customUrlController';
import { listShortUrlsController } from './controllers/listGeneratedUrlsController';
=======
import { pool, testConnection } from './utils/db';
import { encode } from './helper/generateHash';
import { isValidUrl } from './helper/validateUrl';
import { DB_Row } from './types/shortenResponse';
import { accessUrl } from './types/accessResponse';
import cors from 'cors'

>>>>>>> 5e2bbc5c9a0f1c551f1ccfb04299853a79b0d9a6

// Basic setup.
dotenv.config();
const app = express();
app.use(cors())

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
app.get('/:hash', redirectController);

// Short URL Generate Endpoint (DONE)
app.post('/url/shorten', hashController);

// List all generated URLs ENDPOINT (TODO)
app.get('/url/list', listShortUrlsController);

// Custom short URL Generate Endpoint (TODO)
// app.post('/', customUrlController);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}, website: http://localhost:${PORT}`);
});
