import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import { userRouter } from "./routers/user.router.js";
import { bookRouter } from "./routers/book.router.js";
import { config } from "./config/config.js";

const app = express();

// enable cors
app.use(cors({ origin: config.cors.origin }));

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all app routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
