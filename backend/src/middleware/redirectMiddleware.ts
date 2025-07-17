import { accessUrl } from "../types/accessResponse";
import { pool, incrementClickCount } from "../utils/db";
import { writeToCache, getUrlFromCache, checkCachePresent } from "../utils/cache";


export async function redirectURL(req : any, res : any) {
    try {
        // Extract hash from header.
        const hash : string = req.params.hash;

        // Verify if URL has been recently accessed (cache)
        const isPresent : boolean = await checkCachePresent(hash);

        console.log(isPresent)
        
        let long_url : string | null;

        // Cache miss!!!
        if(!isPresent) {
            // Check DB
            const [ result ] = await pool.query('SELECT long_url FROM urls WHERE url_hash = ?', [hash]) as any;

            if(result.length == 0) res.send(404).json({'Error' : 'Invalid URL. Please try another one.'});

            const row = result[0] as accessUrl;
                
            console.log('URL not present in cache...');

            long_url = row.long_url

            console.log(long_url)
    
            // Increment click counter for URL
            await incrementClickCount(hash);

            // Add to cache for future requests => <K : hash, V : url> 
            await writeToCache(hash, long_url);

            console.log('✅ Succesfully added to cache')

            // Redirect user to URL.
            return res.status(300).redirect(long_url);
        }

        // Cache hit!!
        long_url = await getUrlFromCache(hash);

        console.log('✅ Cache hit')

        await incrementClickCount(hash);

        return res.status(300).redirect(long_url);

    } catch (error) {
        console.error('Error type: ', error);

        return res.status(400).send('❌ Error retrieving your url:');
    }
} 

