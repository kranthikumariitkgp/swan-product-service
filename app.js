'use strict';

const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const configs = require('./config/config');
const controller = require('./api/controllers/productController');

const app = express();

// enable files upload
app.use(fileUpload());

//add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app; // for testing

const port = configs.port;
const mongodbConfig =  configs.mongo;

const config = {
  appRoot: __dirname // required config
};

const options = {
  autoIndex: false, // Don't build indexes
  poolSize: mongodbConfig.poolSize, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user: mongodbConfig.username,
  pass: mongodbConfig.password,
  auth: { "authSource": mongodbConfig.authSource }
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
  app.listen(port);
  mongoose.connect(mongodbConfig.baseURL + mongodbConfig.dbName, options).then(() => {
    console.log('MongoDB connected...');
    const debug = mongodbConfig.debug == "true" ? true : false;
    mongoose.set('debug', debug);
    mongoose.set('runValidators', true);
    console.log('server is started');
  }).catch(err => { throw err; });
});

app.route('products').post(controller.createProduct);
app.route('products/review').post(controller.reviewProduct);
app.route('products/search').post(controller.searchProduct);