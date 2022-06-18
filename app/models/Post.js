const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true },
	description: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
	},
	liked: { type: Number, default: 0 },
});

module.exports = mongoose.model('posts', PostSchema);
