import {
  uploadOnCloudinary,
  deleteImageFromCloudinary,
} from "../utils/cloudinary.js";
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
  let bookCoverUploadResult = "";
  let bookFileUploadResult = "";

  try {
    bookCoverUploadResult = await uploadOnCloudinary(
      req.files.bookCoverImage[0].path,
      config.cloudinary.bookCoverFolderName
    );

    bookFileUploadResult = await uploadOnCloudinary(
      req.files.bookFile[0].path,
      config.cloudinary.bookFileFolderName,
      "raw"
    );
  } catch (err) {
    return next(
      ApiResponse.error(
        400,
        `An error occur while uploading images to cloudinary \n ${err.message}`
      )
    );
  }

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

const updateBook = async (req, res, next) => {
  const { title, category } = req.body;
  const bookId = req.params.bookId;

  const book = await Book.findOne({ _id: bookId });

  if (!book) {
    return next(ApiResponse.error(404, "No book found with this ID."));
  }

  if (book.author.toString() !== req.userId) {
    return next(ApiResponse.error(403, "User not allowed to edit book data."));
  }

  // if cover image is updated
  let bookCoverUploadResult = "";
  if (req?.files?.bookCoverImage) {
    try {
      bookCoverUploadResult = await uploadOnCloudinary(
        req.files.bookCoverImage[0].path,
        config.cloudinary.bookCoverFolderName
      );

      await deleteImageFromCloudinary(book.bookCoverImage, false);
    } catch (err) {
      return next(
        ApiResponse.error(
          400,
          `An error occur while uploading cover image to cloudinary \n ${err.message}`
        )
      );
    }
  }

  // if book file is updated
  let bookFileUploadResult = "";
  if (req?.files?.bookFile) {
    try {
      bookFileUploadResult = await uploadOnCloudinary(
        req.files.bookFile[0].path,
        config.cloudinary.bookFileFolderName,
        "raw"
      );

      await deleteImageFromCloudinary(book.bookFile, true);
    } catch (err) {
      return next(
        ApiResponse.error(
          400,
          `An error occur while uploading book file to cloudinary \n ${err.message}`
        )
      );
    }
  }

  // finally updating the book
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    {
      title: title ? title : book.title,
      category: category ? category : book.category,
      bookCoverImage: bookCoverUploadResult
        ? bookCoverUploadResult.url
        : book.bookCoverImage,
      bookFile: bookFileUploadResult ? bookFileUploadResult.url : book.bookFile,
    },
    { new: true }
  );

  // sending response
  return res
    .status(201)
    .json(new ApiResponse(201, "Book updated successfully", updatedBook));
};

export { addNewBook, updateBook };
