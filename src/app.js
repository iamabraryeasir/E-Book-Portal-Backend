import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

// all app routes
app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// global error handler
app.use(globalErrorHandler);

export default app;
