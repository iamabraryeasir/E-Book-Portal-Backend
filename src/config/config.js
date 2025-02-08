import "dotenv/config";

const _config = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.MONGODB_URI,
    name: "e-book-portal",
  },
};

export const config = Object.freeze(_config);
