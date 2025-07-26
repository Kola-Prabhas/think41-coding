const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderItemSchema = new schema({
	id: {	
		type: String,
		required: true,
		unique: true
	},	
	order_id: {
		type: String,
		required: true
	},								
	user_id: {
		type: String,
		required: true
	},
	product_id: {
		type: String,
		required: true
	},
	inventory_item_id: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		required: true
	},
	shipped_at: {
		type: Date,
	},
	delivered_at: {
		type: Date,
	},
	returned_at: {
		type: Date,
	},
	sale_price: {
		type: Number,
		required: true
	}
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
