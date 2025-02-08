import { config } from "../config/config.js";

const globalErrorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    statusCode,
    message: err.message,
    errorStack: config.env === "development" ? err.stack : "",
  });
};

export { globalErrorHandler };
