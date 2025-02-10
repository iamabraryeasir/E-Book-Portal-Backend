import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { config } from "../config/config.js";
import { Book } from "./book.model.js";

const addNewBook = async (req, res, next) => {
  const { title, category } = req.body;

  // validating
  if (!title?.trim() || !category?.trim()) {
    return next(ApiResponse.error(400, "All fields are required."));
  }

  if (!req.files.bookCoverImage || !req.files.bookFile) {
    return next(
      ApiResponse.error(400, "Book cover image and Book PDF file is required.")
    );
  }

  // upload to cloudinary
  const bookCoverUploadResult = await uploadOnCloudinary(
    req.files.bookCoverImage[0].path,
    config.cloudinary.bookCoverFolderName
  );

  const bookFileUploadResult = await uploadOnCloudinary(
    req.files.bookFile[0].path,
    config.cloudinary.bookFileFolderName,
    "raw"
  );

  let book;
  try {
    // saving the data to database
    book = await Book.create({
      title,
      author: req.userId,
      category,
      bookCoverImage: bookCoverUploadResult.url,
      bookFile: bookFileUploadResult.url,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(
        ApiResponse.error(
          400,
          "The book name is already taken. Try another one."
        )
      );
    } else {
      return next(ApiResponse.error(400, err.message));
    }
  }

  // sending response
  return res
    .status(201)
    .json(new ApiResponse(201, "New book added successfully.", book));
};

export { addNewBook };
