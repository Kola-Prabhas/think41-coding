const mongoose = require('mongoose');
const schema = mongoose.Schema;

const inventoryItemSchema = new schema({
	id: {
		type: String,
		required: true,
	},
	product_id: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		required: true
	},
	sold_at: {
		type: Date,
	},
	cost: {
		type: Number,
		required: true
	},
	product_category: {
		type: String,
		required: true
	},
	product_name: {
		type: String,
	},
	product_brand: {
		type: String,
	},
	product_retail_price: {
		type: Number,
		required: true
	},
	product_department: {
		type: String,
		required: true
	},
	product_sku: {
		type: String,
		required: true
	},
	product_distribution_center_id: {
		type: String,
		required: true
	}
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
