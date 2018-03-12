//general dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const adminConfig = require('./config/adminconfig.js');


//database configuration
const mysql = require('mysql');
const connection = mysql.createConnection({
    user: adminConfig.mysql.username,
    password: adminConfig.mysql.password,
    database: adminConfig.mysql.database,
    socketPath: adminConfig.mysql.socketPath,
});

connection.connect();


//route configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//internal app dependencies
const api = require('./api/api.js')(app, connection);
const routes = require('./routes/routes.js')(app, connection);
const auth = require('./authentication/auth.js')(app, connection);

//server initiation
const port = adminConfig.port;
app.listen(port, function() {
    console.log('schemeBeam up and running on port ' + port);
});


