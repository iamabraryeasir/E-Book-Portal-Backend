import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { config } from "../config/config.js";
import { User } from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.header("Authorization")?.split(" ")?.at(1);

    if (!token) {
      return next(ApiResponse.error(401, "Authorization token is required."));
    }

    const decodeJWT = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decodeJWT.sub);

    if (!user) {
      return next(ApiResponse.error(400, "Invalid access token."));
    }

    req.userId = decodeJWT.sub;

    next();
  } catch (err) {
    return next(ApiResponse.error(400, err.message || "Invalid access token."));
  }
};

export { authenticate };
