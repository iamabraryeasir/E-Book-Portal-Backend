import createHttpError from "http-errors";
import { User } from "./user.model.js";

const registerUser = async (req, res, next) => {
  // getting the data
  const { name, email, password } = req.body;

  // validate
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    const error = createHttpError(400, "All fields are required.");
    return next(error);
  }

  // checking if the user already exists
  const user = await User.findOne({ email });

  if (user) {
    const error = createHttpError(400, "User already exists with this email.");
    return next(error);
  }

  // process

  // response
  res.status(200).json({
    success: true,
    message: "Successfully Registered The User!!",
  });
};

export { registerUser };
