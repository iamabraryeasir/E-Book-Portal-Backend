import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { config } from "../config/config.js";

const registerUser = async (req, res, next) => {
  try {
    // getting the data
    const { name, email, password } = req.body;

    // validate
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return next(ApiResponse.error(400, "All fields are required."));
    }

    // checking if the user already exists
    const user = await User.findOne({ email });

    if (user) {
      return next(
        ApiResponse.error(400, "User already exists with this email.")
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // token generation
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    // response
    res.status(200).json(
      new ApiResponse(200, "Successfully registered user.", {
        accessToken: token,
      })
    );
  } catch (err) {
    return next(ApiResponse.error(500, err.message));
  }
};

export { registerUser };
