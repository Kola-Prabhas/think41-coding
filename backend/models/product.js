const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
	id: { type: Number, required: true, unique: true },
	cost: { type: Number, required: true },
	category: { type: String, required: true },
	name: { type: String, required: true },
	brand: { type: String },
	retail_price: { type: Number, required: true },
	department: { type: String, required: true },
	sku: { type: String, required: true, unique: true },
	distribution_center_id: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
