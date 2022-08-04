// external modules
const multer = require("multer");
const path = require("path");

const multerForImg = (filename) => {
	// File upload folder
	const UPLOADS_FOLDER = path.resolve("../client/public/uploads/profile-img");

	// define the storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, UPLOADS_FOLDER);
		},
		filename: (req, file, cb) => {
			const fileExt = path.extname(file.originalname);
			const fileName =
				file.originalname
					.replace(fileExt, "")
					.toLowerCase()
					.split(" ")
					.join("-") +
				"-" +
				Date.now();

			cb(null, fileName + fileExt);
		}
	});

	// prepare the final multer upload object
	var upload = multer({
		storage: storage,
		limits: {
			fileSize: 5000000 // 5MB
		},
		fileFilter: (req, file, cb) => {
			if (file.fieldname === filename) {
				if (
					file.mimetype === "image/png" ||
					file.mimetype === "image/jpg" ||
					file.mimetype === "image/jpeg"
				) {
					cb(null, true);
				} else {
					cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
				}
			} else {
				cb(new Error("There was an unknown error!"));
			}
		}
	});

	return upload;
};

const multerForAttachment = (fileName) => {
	// File upload folder
	const UPLOADS_FOLDER = path.resolve("../client/public/uploads/attachments");

	// define the storage
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, UPLOADS_FOLDER);
		},

		filename: (req, file, cb) => {
			const fileExt = path.extname(file.originalname);
			const fileName =
				file.originalname
					.replace(fileExt, "")
					.toLowerCase()
					.split(" ")
					.join("-") +
				"-" +
				Date.now();

			cb(null, fileName + fileExt);
		}
	});

	// prepare the final multer upload object
	var upload = multer({
		storage: storage,
		limits: {
			fileSize: 10000000 // 10MB
		},
		fileFilter: (req, file, cb) => {
			if (file.fieldname === fileName) {
				if (
					file.mimetype === "image/png" ||
					file.mimetype === "image/jpg" ||
					file.mimetype === "image/jpeg" ||
					file.mimetype === "image/gif" ||
					file.mimetype === "text/plain" ||
					file.mimetype === "text/html" ||
					file.mimetype === "video/mp4" ||
					file.mimetype === "audio/mpeg" ||
					file.mimetype === "image/svg+xml" ||
					file.mimetype === "application/msword" ||
					file.mimetype === "application/vnd.ms-powerpoint" ||
					file.mimetype === "application/vnd.ms-excel"
				) {
					cb(null, true);
				} else {
					cb(new Error("Invalid file-type!"));
				}
			} else {
				cb(new Error("There was an unknown error!"));
			}
		}
	});

	return upload;
};

module.exports = { multerForImg, multerForAttachment };
