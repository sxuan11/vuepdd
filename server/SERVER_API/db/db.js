let mysql = require('mysql');
//import mysql from 'mysql';

const  connection = mysql.createConnection({
   host:'127.0.0.1',
   user:'root',
   password:'root',
   database:'pdd1'
});

connection.connect();

module.exports=connection;