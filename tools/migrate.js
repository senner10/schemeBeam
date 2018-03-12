#!/usr/env/node
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const adminConfig = require('../config/adminconfig.js');

console.log('Starting migration...');

const sqlQueries = fs.readFileSync(path.join(__dirname, '../schemeBeamDB.sql'), 'utf-8');

const connection = mysql.createConnection({
  user: adminConfig.mysql.username,
  password: adminConfig.mysql.password,
  database: adminConfig.mysql.database,
  socketPath: adminConfig.mysql.socketPath
});

connection.connect();

connection.query(sqlQueries, function (err, results) {
  if (err) throw err;

  console.log('Migration complete.');

  connection.end();
});
