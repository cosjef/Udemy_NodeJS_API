var restify = require('restify');
var server = restify.createServer();
var morgan = require('morgan');

// array of users
var users = {};
var max_user_id = 0;

// use morgan to log requests to the console
server.use(morgan('dev'));

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());


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


// Get a specific user ID
server.get("/user/:id", function(req, res, next) {
	res.setHeader('content-type', 'application/json');
	res.writeHead(200);
	res.end(JSON.stringify(users[parseInt(req.params.id)]));
	return next();
});


// Put endpoint to update a record
server.put("/user/:id", function(req, res, next) {
	var user = users[parseInt(req.params.id)];
	// store the body of the put update in updates variable
	var updates = req.params;
	// Loop through whatever came in via the updates variable - an array of params
	for (var field in updates) { 
		user[field] = updates[field];
	}
	res.setHeader('content-type', 'application/json');
	res.writeHead(200);
	res.end(JSON.stringify(user));
	return next();
})

// DELETE a user
server.del("user/:id", function(req, res, next) {
	delete users[parseInt(req.params.id)];
	res.setHeader('content-type', 'application/json');
	res.writeHead(200);
	res.end(JSON.stringify(true));
	return next();
})


//if POST is made to the /user endpoint, this will work
server.post("/user", function(req, res, next) {
	// the parameters that come in via the HTTP request will define our user
	// this will be an array
	var user = req.params;
	// increment max user id counter
	max_user_id++;
	// set id of new user is whatever the current max user id is
	user.id = max_user_id;
	// users array consists of all users
	// add this user to our array of all users
	// key for this user is his unique user id, and the data is from the request
	users[user.id] = user;
	res.setHeader('content-type', 'application/json');
	res.writeHead(200);
	// respond with JSON string information about the user we just created
	res.end(JSON.stringify(users));
	return next();
})



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});