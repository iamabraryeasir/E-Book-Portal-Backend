import { Router } from "express";
import { getAllBooks, addNewBook } from "./book.controller.js";
import { upload } from "../utils/multer.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post(
  "/add-book",
  upload.fields([
    {
      name: "bookCoverImage",
      maxCount: 1,
    },
    {
      name: "bookFile",
      maxCount: 1,
    },
  ]),
  addNewBook
);

export { bookRouter };
