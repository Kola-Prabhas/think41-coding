const mongoose = require('mongoose');
const schema = mongoose.Schema;


const sessionSchema = new schema({
	userId: { type: schema.Types.ObjectId, ref: 'User', required: true },
	conversations: { type: [schema.Types.ObjectId], ref: 'Conversation', required: true },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;