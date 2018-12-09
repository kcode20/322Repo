const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();


app.listen(8080, function(){
  console.log("Server running on 8080");
});
