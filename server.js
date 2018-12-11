const express = require('express');
const mysql = require('mysql');
const Parser = require('body-parser');
const app = express();
var cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.use(Parser.urlencoded({ extended: true }));
app.use(Parser.json());
app.use(cors());

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'yourDataBasePassword',
	database: 'onedoc',
});

app.post('/signup', function(req, res) {
	let userName = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let q = `INSERT INTO users(username, email, password) VALUES ('${userName}', '${email}', '${password}')`;
	connection.query(q, function(err, results) {
		if (err) throw err;
	});
	res.sendStatus(200);
});

app.listen(8080, function() {
	console.log('Server running on 8080');
});

app.post('/document', function(req, res) {
	const { owner, title, content, locked } = req.body;
	console.log(title, owner, content, locked);
	const q = `INSERT INTO documents(owner, title, content, locked) VALUES ('${owner}', '${title}', '${content}', ${locked})`;
	console.log(q);
	connection.query(q, function(err, results) {
		if (err) throw err;
	});
	res.sendStatus(200);
});
