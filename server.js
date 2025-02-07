// for using environment variables
import "dotenv/config";

// import the express app instance from app.js
import app from "./src/app.js";

// function to start the server
const startServer = () => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// execute the server start function
startServer();
