require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./src/models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

// Initialize database
createUserTable().then(() => console.log('Database ready')); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});