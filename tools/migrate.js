#!/usr/env/node
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const readYaml = require('read-yaml').sync;

console.log('Starting migration...');

const sqlQueries = fs.readFileSync(path.join(__dirname, '../schemeBeamDB.sql'), 'utf-8');
const config = readYaml(path.join(__dirname, '../app.yaml')).env_variables;

const connection = mysql.createConnection({
  user: config.SQL_USER,
  password: config.SQL_PASSWORD,
  database: config.SQL_DATABASE,
  socketPath: `/cloudsql/${config.SQL_INSTANCE_CONNECTION_NAME}`,
});

connection.connect();

connection.query(sqlQueries, function (err, results) {
  if (err) throw err;

  console.log('Migration complete.');

  connection.end();
});
