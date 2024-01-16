var express = require("express");
var { Pool } = require("pg");
var cors = require("cors");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

const corsOptions = {
    origin: '*', // 許可するオリジン
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 許可するHTTPメソッド
    credentials: true, // クッキーなどの認証情報をやりとりするかどうか
    optionsSuccessStatus: 204, // プリフライトリクエスト（OPTIONSメソッド）の成功時のステータスコード
    allowedHeaders: 'Content-Type,Authorization', // 許可するヘッダー
};

app.use(cors(corsOptions));
app.use(express.json());

const pool = new Pool({
    user: 'author',
    host: 'db',
    database: 'blogs',
    password: 'password',
    port: 5432,
});

const review_pool = new Pool({
    user: 'author',
    host: '10.0.5.203',
    database: 'reviews',
    password: 'password',
    port: 5432,
});

const lectures_pool = new Pool({
    user: 'author',
    host: '10.0.5.216',
    database: 'lectures',
    password: 'password',
    port: 5432,
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to database', err.stack);
    }
    console.log('Connected to database');
    done(); // クライアントを解放する
});

review_pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to database', err.stack);
    }
    console.log('Connected to database');
    done();
});

lectures_pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to database', err.stack);
    }
    console.log('Connected to database');
    done();
});

app.get("/", function(req, res, next) {
    res.send("Hello, world!");
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
         res.json(result.rows);
     } catch (err) {
         console.error('Error connecting to PostgreSQL', err);
     }
 });

 app.get('/csv', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM user_info');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
});

app.get('/data', (req, res) => {
    const responseData = 'This is the data from the backend!';
    res.json(responseData);
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
        const desireData = $('#tblPortal table').html();

        // JavaScriptコードとCSSコードを削除する正規表現パターン
        const jsPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const cssPattern = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
        const imgPattern = /<img\b[^<]*(?:(?!>)[^<]*)>/gi;
        const inputPattern = /<input\b[^<]*(?:(?!>)[^<]*)>/gi;

        // JavaScriptコードとCSSコードを削除
        // let cleanedData = desireData.replace(jsPattern, '').replace(cssPattern, '').replace(imgPattern, '').replace(inputPattern, '');
        let cleanedData = desireData.replace(jsPattern, '').replace(cssPattern, '').replace(imgPattern, '').replace(inputPattern, '');

        // 取得したデータをクライアントに返す
        res.send(cleanedData);
      } catch (error) {
        console.error('Error fetching data from external server:', error.message);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/info', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lectures');
        res.json(result.rows);
    } catch (err) {
        console.error('Error connecting PostgreSQL', err);
    }
});

app.get('/reviews', async (req, res) => {
    try {
        const class_name = req.query.class;

        const result = await review_pool.query(`SELECT * FROM ${class_name}`);
        res.json(result.rows);
    } catch(err) {
        console.log('Error connectiong PostgreSQL', err);
    }
});

app.post('/reviews', async (req, res) => {
    try {
        const class_name = req.query.class;
        const { rating, content } = req.body;

        const result = await review_pool.query(`INSERT INTO ${class_name} (star, review) VALUES ($1, $2) RETURNING *`, [rating, content]);
        res.json(result);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/getclassinfo", async (req, res) => {
    try {
        const class_name = req.query.class;

        const result = await lectures_pool.query(`SELECT lct_year, lct_cd, je_cd FROM lectures WHERE class_name = '${class_name}'`);
        res.json(result.rows);
    } catch(err) {
        console.log('Error connecting PostgreSQL', err);
    }
});

app.get("/qa", async (req, res) => {
    const class_name = req.query.class;
    try {
        const result = await lectures_pool.query(`
        SELECT q.id AS question_id, q.question_text, a.id AS answer_id, a.answer_text
        FROM questions q
        LEFT JOIN answer a ON q.id = a.question_id
        WHERE q.class_name = $1
        `, [class_name]);

        const qaData = [];
        const questionsMap = new Map();

        // Organize the result into a structured format for easy rendering
        result.rows.forEach((row) => {
            if (!questionsMap.has(row.question_id)) {
                questionsMap.set(row.question_id, {
                    question: {
                        id: row.question_id,
                        question_text: row.question_text,
                    },
                    answers: [],
                });
            }

            if (row.answer_id) {
                questionsMap.get(row.question_id).answers.push({
                    id: row.answer_id,
                    answer_text: row.answer_text,
                });
            }
        });

        questionsMap.forEach((value) => {
            qaData.push(value);
        });

        console.log(qaData);
        
        res.json(qaData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/question', async (req, res) => {
    const { class_name, question_text } = req.body;
    try {
      await lectures_pool.query('INSERT INTO questions (class_name, question_text) VALUES ($1, $2)', [class_name, question_text]);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/answers', async (req, res) => {
    const { questionID, answer_text } = req.body;
    try {
      await lectures_pool.query('INSERT INTO answer (question_id, answer_text) VALUES ($1, $2)', [questionID, answer_text]);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function() {
    console.log("Node.js is listening to PORT: " + server.address().port);
});