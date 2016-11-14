var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var UserSchema = new Schema({
	// ObjectId is the unique ID of this stored object in Mongo
	// defines the fields that are required for a particular user
    id    : ObjectId,
    first_name     : String,
    last_name      : String,
    email_address  : String,
    career      : String
});

// lets something else access this
// users is the name of the collection in the database
// tie the collection to the schema defined above 
var UserModel = mongoose.model('users', UserSchema);

// make this model publicly available  
// any file requiring this file will have access to the UserModel object
module.exports = UserModel;