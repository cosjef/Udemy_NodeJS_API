// Configuration of server

// Pass the server and resitify modules in here to make them availble
module.exports = function(server, restify) {

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());
 }