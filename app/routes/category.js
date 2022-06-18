const router = require('express').Router();

const categoryController = require('../controllers/categoryController');
const isAdminAuthenticated = require('../middlewares/authAdmin');

router.get('/', categoryController.all);
router.post('/create', isAdminAuthenticated, categoryController.create);
router.put('/:id/edit', isAdminAuthenticated, categoryController.update);
router.delete(
	'/:id/delete',
	isAdminAuthenticated,
	categoryController.deleteCategory
);

module.exports = router;
