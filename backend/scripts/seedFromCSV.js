const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config();

// Load models
const User = require('../models/user');
const Product = require('../models/product');
const OrderItem = require('../models/orderItem');
const Order = require('../models/order');
const InventoryItem = require('../models/inventoryItem');
const DistributionCenter = require('../models/distributionCenter');

// Map file names to their corresponding models
const fileModelMap = {
	'users.csv': User,
	'products.csv': Product,
	'order_items.csv': OrderItem,
	'orders.csv': Order,
	'inventory_items.csv': InventoryItem,
	// 'distribution_centers.csv': DistributionCenter
};

// Connect to DB
async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ Connected to MongoDB');
	} catch (error) {
		console.error('❌ Failed to connect to MongoDB:', error.message);
		process.exit(1);
	}
}


async function importCSV(filePath, Model, fileName) {
	return new Promise((resolve, reject) => {
		const records = [];

		fs.createReadStream(filePath)
			.pipe(csv())
			.on('data', (data) => {
				// Convert numeric fields
				for (const key in data) {
					const val = data[key].trim();
					if (!isNaN(val) && val !== '') {
						data[key] = Number(val);
					}
				}

				// 📍 Geolocation and _id logic
				if (fileName === 'distribution_centers.csv') {
					const lat = Number(data.latitude);
					const lng = Number(data.longitude);

					data.coordinates = (!isNaN(lat) && !isNaN(lng)) ? [lng, lat] : [];
					data._id = String(data.id); // override _id
					delete data.id;
					delete data.latitude;
					delete data.longitude;
				}

				if (fileName === 'users.csv') {
					const lat = Number(data.latitude);
					const lng = Number(data.longitude);

					data.coordinates = (!isNaN(lat) && !isNaN(lng)) ? [lng, lat] : [];

					data._id = Number(data.id); // or String(data.id) depending on your schema
					delete data.id;
					delete data.latitude;
					delete data.longitude;

					// Parse date
					if (data.created_at) {
						data.created_at = new Date(data.created_at);
					}

					// Normalize gender (optional)
					if (data.gender) {
						data.gender = data.gender.toUpperCase();
					}
				}

				records.push(data);
			})
			.on('end', async () => {
				try {
					// Optional: Clear collection before inserting
					// await Model.deleteMany({});

					await Model.insertMany(records);
					console.log(`✅ Imported ${records.length} records into ${Model.modelName}`);
					resolve();
				} catch (err) {
					console.error(`❌ Failed to import ${filePath}: ${err.message}`);
					reject(err);
				}
			})
			.on('error', (err) => {
				console.error(`❌ Failed to read ${filePath}: ${err.message}`);
				reject(err);
			});
	});
}



async function run() {
	await connectDB();

	const archiveDir = path.join(__dirname, '../archive');
	const files = fs.readdirSync(archiveDir).filter(f => f.endsWith('.csv'));

	for (const file of files) {
		const filePath = path.join(archiveDir, file);
		const Model = fileModelMap[file];

		if (!Model) {
			console.warn(`⚠️ No model found for file ${file}, skipping.`);
			continue;
		}

		await importCSV(filePath, Model);
	}

	await mongoose.disconnect();
	console.log('✅ Done seeding. Connection closed.');
}

run().catch((err) => {
	console.error(err);
	mongoose.disconnect();
});
