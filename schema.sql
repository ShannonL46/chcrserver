DROP TABLE IF EXISTS textwrit;

CREATE TABLE textwrit (
	id SERIAL PRIMARY KEY,
	year INT,
	month INT,
	day INT,
	promp TEXT,
	text TEXT,
	is_deleted INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

