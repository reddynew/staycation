// require('dotenv').config(); // Load environment variables
const { Pool } = require('pg');

// Create a new database pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel",
    password: "postgres",
    port: 5432,
});

// Test the connection
pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error:', err.stack));

module.exports = pool;
