import { Router } from "express";
import { BorrowController } from "../controller/borrow.controller";
const BorrowRouter = Router();
BorrowRouter.put("/:bookId", BorrowController.BorrowBookController);
BorrowRouter.delete("/:borrowId", BorrowController.ReturnBookController);

export default BorrowRouter;
