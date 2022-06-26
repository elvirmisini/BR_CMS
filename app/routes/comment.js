const router = require('express').Router();

const commentController = require("../controllers/commentController");
const isAuthenticated = require('./../middlewares/auth'); 

router.get('/:id/replies', isAuthenticated, commentController.getReplies);
router.post('/:id/reply', isAuthenticated, commentController.replyComment);
router.put('/:id/edit', isAuthenticated, commentController.update);
router.delete(
	'/:id/delete',
	isAuthenticated,
	commentController.deleteComment
);

module.exports = router;
