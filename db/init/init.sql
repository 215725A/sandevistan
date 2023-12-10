-- init.sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_info (
    num VARCHAR(10),
    langage INT,
    lecture_num1 INT,
    lecture_num2 VARCHAR(50),
    lecuture_name VARCHAR(50),
    unit VARCHAR(10),
    week_time VARCHAR(10),
    must VARCHAR(10),
    from_ VARCHAR(5),
    teacher VARCHAR(50),
    class INT,
    member INT,
    scl_year VARCHAR(10),
    week_day VARCHAR(10),
    lecture_time VARCHAR(10),
    remote_ VARCHAR(10),
    classroom VARCHAR(20),
    lecture_limit VARCHAR(10),
    per_code VARCHAR(10),
    etc VARCHAR(500),
    site_url VARCHAR(500)
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
DO $$
BEGIN
     IF (SELECT COUNT(*) FROM user_info) = 0 THEN
         COPY user_info FROM '/csv/R5_lectures.csv' DELIMITER ',' CSV HEADER;
     END IF;
END $$;