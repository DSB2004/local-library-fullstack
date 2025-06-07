import { Router } from "express";
import { InteractionController } from "../controller/interaction.controller";
const InteractionRouter = Router();
InteractionRouter.post(
  "/rating",
  InteractionController.AddRatingController
);
InteractionRouter.post(
  "/review",
  InteractionController.AddReviewController
);

export default InteractionRouter;
