    import { accessUrl } from "../types/accessResponse";
    import { pool, incrementClickCount } from "../utils/db";
    import { writeToCache, getUrlFromCache, checkCachePresent } from "../utils/cache";

    export async function redirectURL(req: any, res: any) {
        try {
            // Extract hash/custom URL from params
            const identifier: string = req.params.hash;

            // Verify if URL has been recently accessed (cache)
            const isPresent: boolean = await checkCachePresent(identifier);

            console.log(`Cache check for "${identifier}":`, isPresent);
            
            let long_url: string | null;
            let dbIdentifier: string; // Track which column matched for increment

            // Cache miss!!!
            if (!isPresent) {
                // Check DB for both url_hash and custom_url
                const [result] = await pool.query(`SELECT long_url, url_hash, custom_url FROM urls WHERE url_hash = ? OR custom_url = ?`, [identifier, identifier]) as any;

                if (result.length === 0) {
                    return res.status(404).json({
                        'Error': 'Invalid URL. Please try another one.'
                    });
                }

                const row = result[0] as accessUrl & { url_hash: string; custom_url: string | null };
                    
                console.log('URL not present in cache...');

                long_url = row.long_url;
                
                // Determine which identifier to use for incrementing clicks
                dbIdentifier = row.custom_url === identifier ? identifier : row.url_hash;

                console.log(`Found long_url: ${long_url} for identifier: ${identifier}`);
        
                // Increment click counter for URL
                await incrementClickCount(dbIdentifier, row.custom_url !== null);

                // Add to cache for future requests => <K : identifier, V : url> 
                await writeToCache(identifier, long_url);

                console.log('✅ Successfully added to cache');

                // Redirect user to URL (301 for permanent redirect)
                return res.status(301).redirect(long_url);
            }

            // Cache hit!!
            long_url = await getUrlFromCache(identifier);

            console.log('✅ Cache hit');

            // For cache hits, we need to determine if it's a custom URL or hash
            // We can do this by checking the format or querying the DB
            const [result] = await pool.query(`
                SELECT url_hash, custom_url 
                FROM urls 
                WHERE url_hash = ? OR custom_url = ?
            `, [identifier, identifier]) as any;

            if (result.length > 0) {
                const row = result[0];
                dbIdentifier = row.custom_url === identifier ? identifier : row.url_hash;
                await incrementClickCount(dbIdentifier, row.custom_url !== null);
            }

            return res.status(301).redirect(long_url);

        } catch (error) {
            console.error('Error in redirectURL:', error);
            return res.status(500).json({
                'Error': 'Internal server error while retrieving URL'
            });
        }
    }