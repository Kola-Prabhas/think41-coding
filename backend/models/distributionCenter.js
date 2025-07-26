const mongoose = require('mongoose');
const schema = mongoose.Schema;

const distributionCenterSchema = new schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	coordinates: {
		type: [Number], // Array of numbers: [longitude, latitude]
		required: true
	}
});

const DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);

module.exports = DistributionCenter;