var helpers = require('../config/helperFunctions.js');
var UserModel = require('../models/UserModel.js');


module.exports = function(server) {

// If the root URL is requested
// Lists out all the users
server.get("/", function(req, res, next) {
	// find will find all users
	// searching by no conditions means "find everyone"
	UserModel.find({}, function (err, users){
		helpers.success(res, next, users);
	});
});


// Get a specific user ID
server.get("/user/:id", function(req, res, next) {
	// the name of the parameter you are validating is subject assert
	// assert that the ID requeest variable is not empty and is an integer
	req.assert('id', 'id is required and must be numeric').notEmpty();
	// Check if there were errors
	var errors = req.validationErrors();
	// if there were errors, pass the response object and the error encountered
	// send a 400 response code if fields not correct
	if (errors) {
		helpers.failure(res, next, errors[0], 400);
	}
	// ID is equal to whatever is coming in in the request
	UserModel.findOne({ _id: req.params.id }, function (err, user){
		if (err) {
			helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
		}
		if (user === null) {
			helpers.failure(res, next, 'The specified user could not be found', 404);
		}
		helpers.success(res, next, user);
	});
});


	// Put endpoint to update a record
	server.put("/user/:id", function(req, res, next) {
	req.assert('id', 'id is required and must be numeric').notEmpty();
	// check to ensure there were no validation errors
	var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors[0], 400);
	}
			
	// find a user with a particular ID
		UserModel.findOne({ _id: req.params.id }, function (err, user){
		if (err) {
			helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
		}
		if (user === null) {
			helpers.failure(res, next, 'The specified user could not be found', 404);
		}
		var updates = req.params;
		// ID is passed in; don't overwrite it
		delete updates.id;
		// Loop through whatever came in via the updates variable - an array of params
		for (var field in updates) { 
			user[field] = updates[field];
		}
			user.save(function (err) {
			   helpers.failure(res, next, 'Error saving user to the database', 500);
			});
		helpers.success(res, next, user);
		});
		
	});

	// DELETE a user
	server.del("/user/:id", function(req, res, next) {
		req.assert('id', 'Id is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors[0], 400);
			return next();
		}
	UserModel.findOne({ _id: req.params.id }, function (err, user) {
		if (err) {
			helpers.failure(res, next, 'Something went wrong while fetching the user from the database', 500);
			return next();
		}
		if (user === null) {
			helpers.failure(res, next, 'The specified user could not be found', 404);
			return next();
		}
			user.remove(function (err) {
				if (err) {
			   		helpers.failure(res, next, 'Error removing user from the database', 500);
			   		return next ();
			}
				helpers.success(res, next, user);
				return next();
			});
		});
	});


	


	//if POST is made to the /user endpoint, this will work
	server.post("/user", function(req, res, next) {
		req.assert('first_name', 'First Name is required').notEmpty();
		req.assert('last_name', 'Last Name is required').notEmpty();
		req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
		req.assert('career', 'Career is required and must be student, teacher, or professor').isIn(['student', 'teacher', 'professor']);
		var errors = req.validationErrors();
			if (errors) {
				helpers.failure(res, next, errors, 400);
			}
		
		// create a new instance of our User model
		var user = new UserModel();
		// set the first_name property of the user object to what we get from the inbound request
		user.first_name = req.params.first_name;
		user.last_name = req.params.last_name;
		user.email_address = req.params.email_address;
		user.career = req.params.career;
		// user.save is a Mongoose function to save a user
		// takes an error function if we are unable to save the user in the database
		user.save(function (err) {
			if (err){
			helpers.failure(res, next, errors, 500);
		}
		})
		helpers.success(res, next, user);
	})

	}