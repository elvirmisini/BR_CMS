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
	comment: { type: String, required: true },
	comment1: { type: String },
	parentCommentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comments',
	},
});

module.exports = mongoose.model('comments', CommentSchema);
