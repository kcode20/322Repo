const express = require('express');
const mysql = require('mysql');
const Parser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(Parser.urlencoded({extended: true}));
app.use(Parser.json());


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'yourDataBasePassword',
    password: "Noosa11",
    database: 'onedoc'
});

app.post("/signup", function(req, res){
  console.log(req);
  let userName = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  // let q = `INSERT INTO users(username, email, password) VALUES (${userName}, ${email}, ${password})`;
  let q = "INSERT INTO users(username, email, password) VALUES ('" + userName + "', '" + email + "', '" + password + "')";
  console.log(q);
  connection.query(q, function(err, results){
    if(err) throw err;
  });
  res.redirect("/document");
});

app.listen(8080, function(){
  console.log("Server running on 8080");
});