require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudUploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { resource_type: 'image', overwrite: true, folder: folder, transformation: { width: 450 } }).then((result) =>
      resolve({
        url: result.url,
        id: result.public_id
      })
    );
  });
};

const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1717;
const NODE_ENV = process.env.NODE_ENV || 'production';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  token: {
    secret: JWT_SECRET_KEY
  },
  cloudUploads
};
