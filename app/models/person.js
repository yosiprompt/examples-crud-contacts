var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	email: {
		type: String,
		required: true
	}
});

module.exports = personSchema;