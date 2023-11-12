var express = require("express");
var { Pool } = require("pg");
var cors = require("cors");

var app = express();
app.use(cors());

const pool = new Pool({
    user: 'author',
    host: 'db',
    database: 'blogs',
    password: 'password',
    port: 5432,
});

app.get("/", function(req, res, next) {
    res.send("Hello, world!");
});

app.get('/api/users', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');

        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
});

app.get('/api/data', (req, res) => {
    const responseData = 'This is the data from the backend!';
    res.json(responseData);
});

const PORT = process.env.PORT || 8000;

var server = app.listen(PORT, function() {
    console.log("Node.js is listening to PORT: " + server.address().port);
});