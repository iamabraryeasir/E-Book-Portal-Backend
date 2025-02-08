import { config } from "./src/config/config.js";

// import the express app instance from app.js
import app from "./src/app.js";
import { connectToMongoDB } from "./src/config/db.js";

// function to start the server
const startServer = async () => {
  await connectToMongoDB(); // connect to MongoDB

  const PORT = config.port;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer(); // execute the server start function
