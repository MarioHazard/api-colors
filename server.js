const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

//ports
const PORT = process.env.PORT || 5000;


// Require Color routes
const colorRoutes = require('./src/routes/color.routes');

// using as middleware
app.use('/colores', colorRoutes)

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
app.listen(PORT, () => {
  console.log(`Node server is listening on port ${PORT}`);
});

