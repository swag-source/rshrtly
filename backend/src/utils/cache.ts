import { createClient } from "redis";
// Setup section
const client = createClient().on("error", (err) => {
    console.log('❌ Redis client error:', err);
});

let isConnected : boolean = false;

async function ensureConnected() {
    if(!isConnected){
        await client.connect();
        isConnected = true;
        console.log("✅ Client connected succesfully");
    }
    return client;
}

export async function testCacheConnection() {
    try {
        await ensureConnected();
        await client.ping();
        console.log("✅ Redis connection test successful");
    } catch (error) {
        console.log("❌ Redis connection test failed:", error);
        process.exit(1);
    }
}

// Client functions
export async function writeToCache(key : string, value : string) : Promise<string | null> {
    return await client.set(key, value, {EX : 3600});
}

export async function getUrlFromCache(hash:string) {
    return await client.get(hash);
}

export async function checkCachePresent(hash:string) : Promise<boolean> {
    try {
        const res = await client.get(hash);
        return res !== null;
    } catch (error) {
        console.log("Error accessing cache:", error);
        return false;
    }
}

// Export the already-connected client
export { client };