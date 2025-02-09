import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { userRouter } from "./user/user.router.js";

const app = express();

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all app routes
app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.use("/api/users", userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
