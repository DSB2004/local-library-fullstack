import { User } from "../services/user.service";
import { ErrorType } from "../types";
import { Interaction } from "../services/interaction.service";
import { Request, Response } from "express";
export class InteractionController {
  static async AddReviewController(req: Request, res: Response): Promise<any> {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res
        .json({ message: "Authrorization token is missing" })
        .status(403);
    }
    const { bookId, review, learningReflection } = req.body;

    try {
      const user = await User.getUser(authorization);
      if (!bookId || !review || !learningReflection)
        return res.status(400).json({
          message: "Book id ,review and learningReflection is required",
        });
      await Interaction.addReview({
        userId: user.id,
        review,
        bookId,
        learningReflection,
      });
      return res
        .json({
          message: "Review added",
        })
        .status(200);
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
  static async AddRatingController(req: Request, res: Response): Promise<any> {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res
        .json({ message: "Authrorization token is missing" })
        .status(403);
    }
    const { bookId, rating } = req.body;
    if (!bookId || !rating)
      return res
        .json({ message: "Book id and rating is required" })
        .status(400);
    try {
      const user = await User.getUser(authorization);

      await Interaction.addRating({
        userId: user.id,
        rating: Number(rating),
        bookId,
      });
      return res.status(200).json({
        message: "Rating updated",
      });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
}
