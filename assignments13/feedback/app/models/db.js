const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
});

connection.connect(error =>{
    if(error){
        return console.error(error.message);
    }
    console.log('Successfully connected to MySQL Database');
});

module.exports = connection;