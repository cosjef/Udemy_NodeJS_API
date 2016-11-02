var restify = require('restify');
var server = restify.createServer();

// array of users
var users = {};
var max_user_id = 0;


server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());


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