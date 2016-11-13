var restify = require('restify');
var server = restify.createServer();
var morgan = require('morgan');
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator');


setupController(server, restify, restifyValidator);
userController(server);

// use morgan to log requests to the console
server.use(morgan('dev'));



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});