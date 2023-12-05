-- init.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO users VALUES (
    1,
    'hoge',
    'hoge@example.com'
),
(
    2,
    'fuga',
    'fuga@example.com'
);