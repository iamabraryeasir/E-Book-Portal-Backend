import { config } from "./src/config/config.js";

// import the express app instance from app.js
import app from "./src/app.js";

// function to start the server
const startServer = () => {
  const PORT = config.port;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// execute the server start function
startServer();
