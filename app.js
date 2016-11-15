// Require these packages in your app
var restify = require('restify');
var server = restify.createServer();
var morgan = require('morgan');
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator');
var config = require('./config/dbConnections.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.getMongoConnection());


setupController(server, restify, restifyValidator);
userController(server);

// use morgan to log requests to the console
server.use(morgan('dev'));



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});