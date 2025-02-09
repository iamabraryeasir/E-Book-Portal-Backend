import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res, next) => {
  // getting the data
  const { name, email, password } = req.body;

  // validate
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(ApiResponse.error(400, "All fields are required."));
  }

  // checking if the user already exists
  const user = await User.findOne({ email });

  if (user) {
    return next(ApiResponse.error(400, "User already exists with this email."));
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creating new user
  const newUser = await User.create({ name, email, password: hashedPassword });

  // token generation

  // response
  res.status(200).json({
    success: true,
    message: "Successfully Registered The User!!",
    data: {
      _id: newUser._id,
    },
  });
};

export { registerUser };
