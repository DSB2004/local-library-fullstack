import { Router } from "express";
import { UserController } from "../controller/user.controller";

const UserRouter = Router();
UserRouter.get("/", UserController.GetUserController);

export default UserRouter;
