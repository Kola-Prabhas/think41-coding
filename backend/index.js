const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


 async function connectToDatabase() {
	const dbURI = process.env.MONGODB_URI;

	try {
		if (!dbURI) {
			throw new Error('MONGODB_URI is not defined in .env file');
		}

		await mongoose.connect(dbURI);;
		console.log('Database connected successfully');
	} catch (error) {
		console.error('Failed to connect to database', error.message);
	}
}

connectToDatabase();
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});





