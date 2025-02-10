import { Router } from "express";
import { addNewBook } from "./book.controller.js";
import { upload } from "../utils/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const bookRouter = Router();

bookRouter.post(
  "/add-book",
  authenticate,
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
