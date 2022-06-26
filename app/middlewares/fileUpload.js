const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb)  => {
		cb(null, "app/uploads");
	},
	filename:(req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	}
	
	cb(null, false);
}

module.exports = {
	uploads : multer({storage, fileFilter})
}
