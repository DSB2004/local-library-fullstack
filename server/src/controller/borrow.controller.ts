import { User } from "../services/user.service";
import { ErrorType } from "../types";
import { Borrow } from "../services/borrow.service";
import { Request, Response } from "express";
export class BorrowController {
  static async BorrowBookController(req: Request, res: Response): Promise<any> {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res
        .status(403)
        .json({ message: "Authorization token is missing" });
    }
    const { bookId } = req.params;

    try {
      const user = await User.getUser(authorization);
      if (!bookId)
        return res.status(400).json({
          message: "Book id is required",
        });
      await Borrow.borrowBook({
        userId: user.id,
        bookId,
      });
      return res
        .json({
          message: "Book borrowed",
        })
        .status(200);
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
  static async ReturnBookController(req: Request, res: Response): Promise<any> {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res
        .json({ message: "Authorization token is missing" })
        .status(403);
    }
    const { borrowId } = req.params;
    if (!borrowId) return res.json({ message: "Borrow id" }).status(400);
    try {
      const user = await User.getUser(authorization);

      await Borrow.returnBook({
        userId: user.id,
        borrowId,
      });
      return res.status(200).json({
        message: "Book returned",
      });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
}
