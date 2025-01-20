require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./src/models/user');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Initialize database
createUserTable().then(() => console.log('Database ready')); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});