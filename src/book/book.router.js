import { Router } from "express";
import { getAllBooks, addNewBook } from "./book.controller.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/add-book", addNewBook);

export { bookRouter };
