var restify = require('restify');
var server = restify.createServer();

// array of users
var users = {};
var max_user_id = 0;

// If the root URL is requested
server.get("/", function(req, res, next) {
	// this is a callback function 
	// executed when GET request is initiated
	// set the header to tell client to expect a JSON response
	res.setHeader('content-type', 'application/json');
	// return the header to the client; argument is the response code
	res.writeHead(200);
	// send data back in response body
	// users is our de-factory database
	// stringify creates a JSON response string
	res.end(JSON.stringify(users));
	// go to the next part of the execution
	// no further execution takes place after this function
	return next();
})

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});