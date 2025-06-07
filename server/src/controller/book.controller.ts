import { Books } from "../services/books.service";
import { Request, Response } from "express";
import { ErrorType } from "../types";

export class BooksController {
  static async GetBooksController(req: Request, res: Response): Promise<any> {
    const { author, rating, name, genre, page, limit } = req.query;
    try {
      const books = await Books.getBooks({
        name: String(name),
        genre: String(genre),
        author: String(author),
        rating: Number(rating || 0),
        page: Number(page || 1),
        limit: Number(limit || 10),
      });
      return res.status(200).json({ message: "Books found", ...books });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
  static async GetBookController(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: "Book ID required" });
      const book = await Books.getBookDetails({ bookId: id });
      return res.status(200).json({ message: "Book found", book });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
}
