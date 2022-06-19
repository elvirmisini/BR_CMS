module.exports = (req, res, next) => {
	if (req.user.role !== 'admin') {
		return res.status(401).json({
			status: false,
			data: {
				msg: 'Only Admin is authorised to take this action!',
			},
		});
	}
	next();
};
