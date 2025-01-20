// In-memory cache to temporarily store data in the server's memory - Redis can be used for larger projects

const cache = new Map();
const DEBUG = process.env.DEBUG === "true"; // Enable logging only in debug mode

// Buffer to collect logs
let logBuffer = [];

const logMessage = (message) => {
    if (!DEBUG) return; // Log only if DEBUG=true

    logBuffer.push(message);
    if (logBuffer.length >= 5) { // Print batch of logs
        console.log(logBuffer.join("\n"));
        logBuffer = [];
    }
};

// Add data to the cache
const setCache = (key, value, ttl) => {
    const expires = Date.now() + ttl * 1000; // TTL in milliseconds
    cache.set(key, { value, expires });

    logMessage(`Data cached with key: ${key}, TTL: ${ttl} seconds`);

    // Automatically remove expired data
    setTimeout(() => {
        cache.delete(key);
        logMessage(`Cache expired for key: ${key}`);
    }, ttl * 1000);
};

// Retrieve data from the cache
const getCache = (key) => {
    const cachedItem = cache.get(key);

    if (!cachedItem) {
        logMessage(`Cache miss for key: ${key}`);
        return null;
    }

    if (Date.now() > cachedItem.expires) {
        cache.delete(key); // Remove expired data
        logMessage(`Cache expired for key: ${key}`);
        return null;
    }

    logMessage(`Cache hit for key: ${key}`);
    return cachedItem.value;
};

module.exports = { setCache, getCache };
