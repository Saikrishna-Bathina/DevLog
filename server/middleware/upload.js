const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'devlog_covers',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const parser = multer({ storage });

module.exports = parser;
