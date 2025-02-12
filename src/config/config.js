import "dotenv/config";

const _config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,

  cors: {
    origin: process.env.CORS_ORIGIN,
  },

  db: {
    url: process.env.MONGODB_URI,
    name: "e-book-portal",
  },

  jwtSecret: process.env.JWT_SECRET,

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    bookCoverFolderName: "book-covers",
    bookFileFolderName: "book-files",
  },
};

export const config = Object.freeze(_config);
