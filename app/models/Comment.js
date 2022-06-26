const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'posts',
	},
	ancestors : {
		type: [String],
		default: []
	},
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		default: null,
	},
	comment: { type: String, required: true },
});

module.exports = mongoose.model('comments', CommentSchema);
