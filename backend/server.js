var express = require("express");
 var { Pool } = require("pg");
 var cors = require("cors");
 var fs = require("fs");
 
 var app = express();
 
 const corsOptions = {
     // origin: 'http://sandevistan.st.ie.u-ryukyu.ac.jp', // 許可するオリジン
     origin: 'http://localhost:3000',
     // もしダメそうなら、 origin: 'http://localhost:3000'に変更
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 許可するHTTPメソッド
     credentials: true, // クッキーなどの認証情報をやりとりするかどうか
     optionsSuccessStatus: 204, // プリフライトリクエスト（OPTIONSメソッド）の成功時のステータスコード
     allowedHeaders: 'Content-Type,Authorization', // 許可するヘッダー
 };
 
 app.use(cors(corsOptions));
 
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

 app.get('/api/csv', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');

        const result = await client.query('SELECT * FROM user_info');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
});
 
 app.get('/api/data', (req, res) => {
     const responseData = 'This is the data from the backend!';
     res.json(responseData);
 });
 
 ///app.get('/api/csv', (req, res) => {
     ///const csvPath = '/usr/app/csv/R5_lectures.csv';
     ///const csvContent = fs.readFileSync(csvPath, 'utf-8');
     ///res.send(csvContent);
 ///});

 app.get('/info', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');

        const result = await client.query('SELECT * FROM lectures');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting PostgreSQL', err);
    }
});
 
 const PORT = process.env.PORT || 8000;
 
 var server = app.listen(PORT, function() {
     console.log("Node.js is listening to PORT: " + server.address().port);
 });
