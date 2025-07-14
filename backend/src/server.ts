// Imports
import dotenv from 'dotenv';
import express from 'express';
import { hashURL } from './middleware/hashUrlMiddleware';
import { redirectURL } from './middleware/redirectMiddleware';
import { listShortUrls } from './middleware/listGeneratedUrlsMiddleware';

import { testConnection } from './utils/db';
import cors from 'cors';


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
app.get('/:hash', redirectURL);

// Short URL Generate Endpoint (DONE)
app.post('/url/shorten', hashURL);

// List all generated URLs ENDPOINT (TODO)
app.get('/url/list', listShortUrls);

// Custom short URL Generate Endpoint (TODO)
// app.post('/', customUrlController);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}, website: http://localhost:${PORT}`);
});
