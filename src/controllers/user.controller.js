import { User } from "../models/user.model.js";
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
    const accessToken = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // making the cookie secure
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    // response
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .status(201)
      .json(
        new ApiResponse(201, "Successfully registered user.", {
          accessToken,
        })
      );
  } catch (err) {
    return next(ApiResponse.error(500, err.message));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validating the empty inputs
    if (!email?.trim() || !password?.trim()) {
      return next(ApiResponse.error(400, "All fields are required."));
    }

    // finding the user in database
    const user = await User.findOne({ email });

    if (!user) {
      return next(ApiResponse.error(400, "Incorrect username or password."));
    }

    // verify password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return next(ApiResponse.error(400, "Incorrect username or password."));
    }

    // creating new access token
    const accessToken = jwt.sign({ sub: user._id }, config.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // making the cookie secure
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    // sending the response
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .status(200)
      .json(new ApiResponse(200, "Successfully login user.", { accessToken }));
  } catch (err) {
    return next(ApiResponse.error(500, err.message));
  }
};

export { registerUser, loginUser };
