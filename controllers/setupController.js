// Configuration of server

// Pass the server and resitify modules in here to make them availble
module.exports = function(server, restify, restifyValidator) {

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);
 }