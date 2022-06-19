const router = require('express').Router();

const categoryController = require('../controllers/categoryController');
const isAuthenticated = require('./../middlewares/auth');
const ifAdmin = require('../middlewares/authAdmin');

router.get('/', categoryController.all);
router.post(
	'/create',
	isAuthenticated,
	ifAdmin.isAdmin,
	categoryController.create
);
router.put(
	'/:id/edit',
	isAuthenticated,
	ifAdmin.isAdmin,
	categoryController.update
);
router.delete(
	'/:id/delete',
	isAuthenticated,
	ifAdmin.isAdmin,
	categoryController.deleteCategory
);

module.exports = router;
