const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
	id: { type: Number, required: true, unique: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
	gender: { type: String, enum: ['M', 'F'], required: true },
	state: { type: String, required: true },
	street_address: { type: String, required: true },
	postal_code: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	coordinates: {
		type: [Number], // Array of numbers: [longitude, latitude]
		required: true
	},
	traffic_source: { type: String, required: true },
	created_at: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
