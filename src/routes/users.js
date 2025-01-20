const express = require('express');
const pool = require('../../db');
const router = express.Router();
const { getCache, setCache } = require('../services/inMemoryCache');
const { clearCache } = require('../services/cachingService');

const DEBUG = process.env.DEBUG === "true"; // Enable logging only in debug mode

router.get('/', async (req, res) => {
    try {
        if (DEBUG) console.time("Total GET /users execution time");

        const cacheKey = 'userList';
        const cachedData = getCache(cacheKey);

        if (cachedData) {
            if (DEBUG) console.timeEnd("Total GET /users execution time");
            const users = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;

            // Remove password if it's included in the data
            const filteredUsers = users.map(({ password, ...user }) => user);
            return res.json(filteredUsers);
        }

        if (DEBUG) console.time("Database query time");
        const result = await pool.query('SELECT id, email, role FROM users');
        if (DEBUG) console.timeEnd("Database query time");

        if (DEBUG) console.time("Cache set time");
        setCache(cacheKey, JSON.stringify(result.rows), 120);
        if (DEBUG) console.timeEnd("Cache set time");

        if (DEBUG) console.timeEnd("Total GET /users execution time");

        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving users:', error); // Keep error logging
        res.status(500).json({ error: 'Could not retrieve users' });
    }
});

router.delete('/cache/users', async (req, res) => {
    try {
        await clearCache(); // Clear and update the cache
        res.status(200).json({ message: 'Cache cleared and updated' });
    } catch (error) {
        console.error('Error clearing cache:', error);
        res.status(500).json({ error: 'Could not clear cache' });
    }
});

module.exports = router;