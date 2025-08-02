// Imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { hashURL } from "./middleware/hashUrlMiddleware";
import { redirectURL } from "./middleware/redirectMiddleware";
import { listShortUrls } from "./middleware/listGeneratedUrlsMiddleware";
import { testDBConnection } from "./utils/db";
import { testCacheConnection } from "./utils/cache";

// Basic setup.
dotenv.config();
const app = express();
app.use(cors());

// Define JSON as communication standard for app.
app.use(express.json());

// Define variables.
const PORT = process.env.PORT || 3030;

async function startServer() {
  try {
    // Test connection to database
    await testDBConnection();

    // Test connection to redis
    await testCacheConnection();

    // Endpoints
    // Short URL Generate Endpoint
    app.post("/url/shorten", hashURL);

    // Short URL Redirect Endpoint
    app.get("/:hash", redirectURL);

    // List all generated URLs ENDPOINT
    app.get("/url/list", listShortUrls);

    app.listen(PORT, () => {
      console.log(
        `Server running on port: ${PORT}, website: http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
}

startServer();
