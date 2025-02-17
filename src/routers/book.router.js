import { Router } from "express";
import { upload } from "../utils/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  addNewBook,
  updateBook,
  getBookList,
  getSingleBook,
  deleteBook,
} from "../controllers/book.controller.js";

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

// todo: add pagination
// get book list
bookRouter.get("/", getBookList);

// get single book
bookRouter.get("/:bookId", getSingleBook);

// delete book
bookRouter.delete("/:bookId", authenticate, deleteBook);

export { bookRouter };
