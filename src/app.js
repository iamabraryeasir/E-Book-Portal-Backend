import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { userRouter } from "./user/user.router.js";
import { bookRouter } from "./book/book.router.js";

const app = express();

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all app routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
