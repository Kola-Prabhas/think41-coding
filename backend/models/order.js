const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
	order_id: {
		type: String,
		required: true,
		unique: true
	},
	user_id: {
		type: String,		
		required: true
	},	
	status: {
		type: String,	
		required: true,
	},
	gender: {
		type: String,
		enum: ['M', 'F'],
		required: true
	},
	created_at: {
		type: Date,
		required: true,
	},
	returned_at: {
		type: Date,
		default: null
	},
	shipped_at: {
		type: Date,
		default: null
	},
	delivered_at: {
		type: Date,
		default: null
	},
	num_of_item: {
		type: Number,
		required: true
	}
})
