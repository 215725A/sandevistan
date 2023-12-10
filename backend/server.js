var express = require("express");
var { Pool } = require("pg");
var cors = require("cors");
var fs = require("fs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

const corsOptions = {
    origin: 'https://sandevistan.st.ie.u-ryukyu.ac.jp', // 許可するオリジン
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

app.get('/users', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");

        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
});

app.get('/data', (req, res) => {
    const responseData = 'This is the data from the backend!';
    res.json(responseData);
});

app.get('/csv', async (req, res) => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');

        const result = await client.query('SELECT * FROM user_info');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
});

app.get('/getclass', async (req, res) => {
    try {
        // ここに外部サーバーのURLを入力します
        const lct_year = req.query.lct_year;
        const lct_cd = req.query.lct_cd;
        const je_cd = req.query.je_cd;

        const externalServerUrl = `https://tiglon.jim.u-ryukyu.ac.jp/portal/Public/Syllabus/SyllabusSearchStart.aspx?lct_year=${lct_year}&lct_cd=${lct_cd}&je_cd=${je_cd}`;
    
        // axiosを使用して外部サーバーからデータを取得
        const response = await axios.get(externalServerUrl);
        const responseData = response.data;


        const $ = cheerio.load(responseData);
        const desireData = $('#ctl00_container table').html();

        // JavaScriptコードとCSSコードを削除する正規表現パターン
        const jsPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const cssPattern = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
        const imgPattern = /<img\b[^<]*(?:(?!>)[^<]*)>/gi;
        const inputPattern = /<input\b[^<]*(?:(?!>)[^<]*)>/gi;

        // JavaScriptコードとCSSコードを削除
        // let cleanedData = desireData.replace(jsPattern, '').replace(cssPattern, '').replace(imgPattern, '').replace(inputPattern, '');
        let cleanedData = desireData.replace(jsPattern, '').replace(cssPattern, '').replace(imgPattern, '');

        // 改行やタブを削除
        // cleanedData = cleanedData.replace(/\s+/g, ' ');
        // cleanedData = $('<table>').html(cleanedData).text();

        // cleanedData = cleanedData.split(/\s+/);
        console.log(cleanedData);

        // 取得したデータをクライアントに返す
        res.send(cleanedData);
      } catch (error) {
        console.error('Error fetching data from external server:', error.message);
        res.status(500).send('Internal Server Error');
      }
});

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