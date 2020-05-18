const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rToObj(row){
	return{
		year: row.reay,
		month: row.month,
		day: row.day,
		promp: row.promp,
		text: row.text,
	};
}


app.get('/writ/:month/:day', (request, response) => {
	const query = 'SELECT year, month, day, text, id FROM textwrit WHERE is_deleted = 0 AND month = ? AND day = ? ORDER BY year DESC, updated_at DESC';
	const params = [request.params.month, request.params.day];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
			text: rows.map(rToObj),
		});
	});
});

app.post('/writ', (request, response) => {
	const query = 'INSERT INTO textwrit(year, month, day, promp, text) VALUES (?, ?, ?, ?)';
	const params = [request.body.year, request.body.month, request.body.day, request.body.promp,  request.body.text];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result,insertId,
		});
	});
});

app.patch('/writ/:id', (request, response) => {
	const query = 'UPDATE textwrit SET year = ?, month = ?, day = ?, text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
	const params = [request.body.year, request.body.month, request.body.day, request.body.text, request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

app.delete('/writ/:id', (request, response) => {
	const query = 'UPDATE textwrit SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP id = ?';
	const params = [request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
		});
	});
});

const port = 3443;
app.listen(port, () => {
	console.log(`Live on ${port}`);
});
