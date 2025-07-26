const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	id: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	avatart: {type: String, default: ''},
});

const User = mongoose.model('User', userSchema);

module.exports = User;