// Imports
import dotenv from 'dotenv';
import express from 'express';
import { hashController } from './controllers/hashController';
import { redirectController } from './controllers/redirectController';
import { listShortUrlsController } from './controllers/listGeneratedUrlsController';
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
