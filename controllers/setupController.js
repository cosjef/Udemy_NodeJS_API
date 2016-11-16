// Configuration of server

// Pass the server and resitify modules in here to make them availble
module.exports = function(server, restify, restifyValidator) {

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);

// Use Restify to parse the incoming Authorization header
server.use(restify.authorizationParser());


	// Test for and store API keys
 	server.use(function(req, res, next) {
		var apiKeys = {
			'user1': 'maje92mal10qteu82m20sm201wq'
		};
		// Wrap this whole thing in an IF statement to test
		// if Authorization header was passed in
		if (typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
		// Define a response when we do NOT get a valie API key	
			var response = {
				'status': 'failure',
				'data': 'You must specify a valid API key'
			};
			// Send our response to client
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
			return next();
		}
		return next();
	});

}