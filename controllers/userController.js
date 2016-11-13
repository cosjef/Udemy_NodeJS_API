var helpers = require('../config/helperFunctions.js');


// array of users
// fake database
var users = {};
var max_user_id = 0;


module.exports = function(server) {

// If the root URL is requested
server.get("/", function(req, res, next) {
	helpers.success(res, next, users);
})


// Get a specific user ID
server.get("/user/:id", function(req, res, next) {
	if (typeof(users[req.params.id]) === 'undefined') {
	   helpers.failure(res, next, 'The specified user could not be found in the database', 404);
	}
	helpers.success(res, next, users[parseInt(req.params.id)])
});


	// Put endpoint to update a record
	server.put("/user/:id", function(req, res, next) {
			if (typeof(users[req.params.id]) === 'undefined') {
			helper.failure(res, next, 'The specified user could not be found in the database', 404);
	}
		var user = users[parseInt(req.params.id)];
		// store the body of the put update in updates variable
		var updates = req.params;
		// Loop through whatever came in via the updates variable - an array of params
		for (var field in updates) { 
			user[field] = updates[field];
		}
		helpers.success(res, next, user);
	})

	// DELETE a user
	server.del("user/:id", function(req, res, next) {
		if (typeof(users[req.params.id]) === 'undefined') {
			helper.failure(res, next, 'The specified user could not be found in the database', 404);
	}
		delete users[parseInt(req.params.id)];
		helpers.success(res, next, []);
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

}