import { Router } from "express";

import { AuthController } from "../controller/auth.controller";

const AuthRouter = Router();
AuthRouter.post("/login", AuthController.LoginController);
AuthRouter.post("/signup", AuthController.SignupController);
export default AuthRouter;
