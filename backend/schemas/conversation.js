const mongoose = require('mongoose');
const schema = mongoose.Schema;

const conversationSchema = new schema({
		userId: { type: schema.Types.ObjectId, ref: 'User', required: true },
		query: { type: String, required: true },
		response: { type: String, required: true },
}, { timestamps: true });


const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;