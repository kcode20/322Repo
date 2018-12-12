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
	password: 'Noosa11',
	database: 'onedoc',
});

// Check if server is working properly
connection.connect(function(error) {
	if (!!error) {
		console.log('Error connecting to database');
	} else {
		console.log('Connected');
	}
});

let signedInUser = { userID: '0', userName: '', loggedIn: false };

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

app.get('/signin', function(req, res) {
	if (signedInUser.loggedIn) {
		// res.sendStatus(200);
		res.redirect('/document');
	} else {
		res.render('SignInForm'); //the homepage of the ejs
	}
});

app.post('/login', function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	let q =
		"SELECT id, username, password FROM users WHERE username = '" +
		username +
		"' AND password = '" +
		password +
		"'";
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results[0]) {
			signedInUser.userID = results[0].id;
			signedInUser.userName = results[0].username;
			signedInUser.loggedIn = true;
			res.sendStatus(200);
		} else {
			console.log('The username or password is incorrect. Try again.');
			res.redirect('/signin');
		}
	});
});

app.listen(8080, function() {
	console.log('Server running on 8080');
});

app.post('/document', function(req, res) {
	const { owner, title, content, locked } = req.body;
	const q = `INSERT INTO documents(owner, title, content, locked) VALUES ('${owner}', '${title}', '${content}', '${locked}')`;
	const r = `SELECT * FROM documents ORDER BY docID DESC LIMIT 1;`;
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results) {
			connection.query(r, function(err, results) {
				if (err) throw err;
				if (results) res.send(results);
			});
		}
	});
});

app.get('/documents', function(req, res) {
	const q = `SELECT * FROM documents`;
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results) {
			res.send(results);
		}
	});
});

app.get('/taboowords', function(req, res){
	const q = `SELECT tabooWord FROM taboo`;
	console.log(q);
	connection.query(q, function(err, results){
		if(err) throw err;
		console.log(results);
		if(results){
			console.log(results);
			res.send(results);
		}
	});
});

app.get('/document/:id', function(req, res) {
	const { id } = req.params;
	const q = `SELECT * FROM documents WHERE docId='${id}'`;
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results) {
			res.send(results);
		}
	});
});

app.post('/complain', function(req, res){
	const {type, username, note, docID, docName} = req.body;
	console.log("username: ", username);
	let t = '';
	if(type === 1){
		t = 'ComplainAboutOwner';
	}
	else{
		t = 'ComplainAboutOU';
	}
	console.log("type: ", t);
	// const q = `INSERT INTO complaints(type, issue, docID, author) VALUES ( '${t}' , '${note}', '${docID}' )`;
	// const q = "INSERT INTO complaints(type, issue, docID, author) VALUES ( '"+ t +"' , '"+ note +"', '"+ docID + "', SELECT id FROM users WHERE username = '"+ username + "' )";
	const q = `SELECT id FROM users WHERE username = '${username}'`;
	let id;
	connection.query(q, function(err, results){
		if(err) throw err;
		id = results[0].id;
		r = `INSERT INTO complaints(type, issue, docID, author) VALUES ( '${t}' , '${note}', '${docID}', ${id})`;
		connection.query(r, function(err, results){
			if(err) throw err; 
		});
	});
	console.log(q);
	connection.query(q, function(err, results){
		if(err) throw err;
	});
	// q = `SELECT owner FROM documents JOIN users ON users.id = documents.owner WHERE users.username = '${userName}'`;

	res.sendStatus(200);
});

app.post('/toggleLock', function(req, res) {
	const { docID, locked } = req.body;
	const q = `UPDATE documents SET locked='${locked}' WHERE docID='${docID}'`;
	const r = `SELECT locked FROM documents where docID='${docID}'`;
	console.log(q, r);
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results) {
			connection.query(r, function(err, results) {
				if (err) throw err;
				if (results) res.send(results);
			});
		}
	});
});

app.get('/users', function(req, res) {
	const q = `SELECT * FROM users`;
	connection.query(q, function(err, results) {
		if (err) throw err;
		if (results) {
			res.send(results);
		}
	});
});
