const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
user: dbConfig.user,
pass: dbConfig.pass,
useUnifiedTopology: true,
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
// Require Color routes
const colorRoutes = require('./src/routes/color.routes')
// using as middleware
app.use('/colores', colorRoutes)

// listen for requests
app.listen(port, () => {
   console.log(`Node server is listening on port ${port}`);
});
