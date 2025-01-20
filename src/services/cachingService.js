const pool = require('../../db');
const { getCache, setCache } = require('./inMemoryCache');

const CACHE_KEY = 'userList';
const CACHE_TTL = 600; // 10 minutes
const DEBUG = process.env.DEBUG === "true"; // Enable logging only in debug mode

// Retrieve users with caching
const getCachedUsers = async () => {
    // Check if data is in cache
    const cachedUsers = getCache(CACHE_KEY);

    if (cachedUsers) {
        if (DEBUG) console.log('Returning cached data');
        return cachedUsers;
    }

    // If not, fetch data from the database
    const { rows } = await pool.query('SELECT id, email, role FROM users');
    const users = rows;

    // Store data in cache for 10 minutes
    setCache(CACHE_KEY, users, CACHE_TTL);

    if (DEBUG) console.log('Cache miss: Returning fresh data and caching it');
    return users;
};

// Update cache when data changes
const clearCache = async () => {
    try {
        if (DEBUG) console.log(`Clearing cache for key: ${CACHE_KEY}`);

        // Fetch the latest user data from the database
        const { rows } = await pool.query('SELECT id, email, role FROM users');

        // Update cache with the latest data
        setCache(CACHE_KEY, JSON.stringify(rows), CACHE_TTL);

        if (DEBUG) console.log(`Cache cleared and updated for key: ${CACHE_KEY}`);
    } catch (error) {
        console.error('Error clearing and updating cache:', error);
    }
};

module.exports = {
    getCachedUsers,
    clearCache
};
