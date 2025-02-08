import mongoose from "mongoose";
import { config } from "./config.js";

const connectToMongoDB = async () => {
  try {
    // event listeners for the mongoose connection
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to MongoDB!!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to MongoDB!!", err);
    });

    // connect to MongoDB
    await mongoose.connect(`${config.db.url}/${config.db.name}`);
  } catch (err) {
    console.error("Error connecting to MongoDB!!", err);
    process.exit(1); // exit the process if connection fails
  }
};

export { connectToMongoDB };
