// Configuration of server

// Pass the server and resitify modules in here to make them availble
module.exports = function(server, restify, restifyValidator) {

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);

// Use Restify to parse the incoming Authorization header
server.use(restify.authorizationParser());


// Block by IP address
server.use(function(req, res, next) {
	var whitelistedIps = ['111.222.333.444']
	//  Check to see if they are behind a proxy
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (whitelistedIps.indexOf(ip) === -1) {
		var response = {
				'status': 'failure',
				'data': 'Invalid IP address'
			};
			// Send our response to client
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
			return next();
		}
		return next();
	});


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


 	server.use(restify.throttle( {
 		// allow one API call per second
 		rate: 1,
 		// allow 2 API calls burst
 		burst: 2,
 		// look at the X-Forwarded-For header
 		xff: true
 	}));


}