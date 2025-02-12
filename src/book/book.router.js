import { Router } from "express";
import { upload } from "../utils/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addNewBook, updateBook, getBookList } from "./book.controller.js";

const bookRouter = Router();

// add book
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "bookCoverImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 },
  ]),
  addNewBook
);

// update book
bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "bookCoverImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 },
  ]),
  updateBook
);

// get book list
bookRouter.get("/", getBookList);

export { bookRouter };
