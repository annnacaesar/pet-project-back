const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '..', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '_' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: multerConfig, fileFilter });
