import { pool } from "../utils/db";
import { isValidUrl } from "../helper/validateUrl";
import { DB_Row } from "../types/shortenResponse";
import { encode } from "../helper/generateHash";

function isValidCustomUrl(custom_url: string | undefined): boolean {
  // If no custom URL provided, it's valid (optional field)
  if (!custom_url || custom_url.trim() === "") {
    return true;
  }

  const customUrlRegex: RegExp = /^[a-zA-Z0-9_-]{3,50}$/;
  const reservedWords = [
    "api",
    "admin",
    "www",
    "app",
    "dashboard",
    "analytics",
  ];

  return (
    customUrlRegex.test(custom_url) &&
    !reservedWords.includes(custom_url.toLowerCase())
  );
}

export async function hashURL(req: any, res: any) {
  try {
    const { longUrl, customUrl } = req.body;

    // Validity checks
    if (!longUrl || longUrl == "") {
      return res.status(400).json({
        Error: "Please provide a long URL",
      });
    }

    if (!isValidUrl(longUrl)) {
      return res.status(400).json({
        Error: "Invalid URL format",
      });
    }

    if (!isValidCustomUrl(customUrl)) {
      return res.status(400).json({
        Error:
          "Custom URL must be 3-50 characters, alphanumeric with hyphens/underscores only",
      });
    }

    let hash: string | undefined;
    let createdAt: string | undefined;
    let clicks: number | undefined;

    // Custom URL case
    if (customUrl) {
      const customCheck = (await pool.query(
        "SELECT custom_url FROM urls WHERE custom_url = ?",
        [customUrl]
      )) as any;

      const row = customCheck[0] as DB_Row[];

      if (row.length > 0) {
        return res.status(403).json({
          Error: "Custom URL already exists",
        });
      } else {
        // Custom URL is available - create new entry
        await pool.query(
          "INSERT INTO urls (long_url, url_hash, custom_url, created_at, times_clicked) VALUES (?, ?, ?, NOW(), 0)",
          [longUrl, encode(customUrl), customUrl]
        );

        // Fetch the created entry
        const [insertResult] = (await pool.query(
          "SELECT created_at, times_clicked FROM urls WHERE custom_url = ?",
          [customUrl]
        )) as any;

        const insertedRow = insertResult[0];

        hash = customUrl; // Use custom URL as the path
        createdAt = insertedRow.created_at;
        clicks = insertedRow.times_clicked;
      }
    } else {
      // Regular hash generation case
      const result = (await pool.query(
        "SELECT long_url, url_hash, created_at, times_clicked FROM urls WHERE long_url = ? AND custom_url IS NULL",
        [longUrl]
      )) as any;

      const rows = result[0] as DB_Row[];

      if (rows.length > 0) {
        // URL already exists - return existing hash
        hash = rows[0].url_hash;
        createdAt = rows[0].created_at;
        clicks = rows[0].times_clicked;
      } else {
        // Generate new hash for new URL
        hash = encode(longUrl);

        // Store in database
        await pool.query(
          "INSERT INTO urls (long_url, url_hash, created_at, times_clicked) VALUES (?, ?, NOW(), 0)",
          [longUrl, hash]
        );

        // Fetch the inserted row
        const [insertResult] = (await pool.query(
          "SELECT created_at, times_clicked FROM urls WHERE url_hash = ?",
          [hash]
        )) as any;

        const insertedRow = insertResult[0];
        createdAt = insertedRow.created_at;
        clicks = insertedRow.times_clicked;
      }
    }

    // Return success response
    return res.status(201).json({
      shortUrl: `${process.env.WEB_DOMAIN || "http://localhost:3030"}/${hash}`,
      creationTime: createdAt,
      timesClicked: clicks,
    });
  } catch (error) {
    console.error("Error in hashUrl:", error);
    return res.status(500).json({
      Error: "Internal server error while processing URL",
    });
  }
}
