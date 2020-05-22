const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require('fs');
var https = require('https');
var http = require('http');

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

//ports to https and http
const httpsPort = 80;
const port = 4008;

//certs to https
var privateKey  = fs.readFileSync('certs/server.key', 'utf8');
var certificate = fs.readFileSync('certs/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Require Color routes
const colorRoutes = require('./src/routes/color.routes');

// using as middleware
app.use('/colores', colorRoutes)

//create https and http server
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
user: dbConfig.user, pass: dbConfig.pass,
useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

// listen for requests
httpServer.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
httpsServer.listen(httpsPort, () => {
  console.log(`Node server is listening https on port ${httpsPort}`);
});
