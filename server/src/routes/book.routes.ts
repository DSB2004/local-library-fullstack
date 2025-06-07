import { Router } from "express";
import { BooksController } from "../controller/book.controller";
const BookRouter = Router();
BookRouter.get("/", BooksController.GetBooksController);
BookRouter.get("/:id", BooksController.GetBookController);
export default BookRouter;
