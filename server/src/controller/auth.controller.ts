import { User } from "../services/user.service";
import { ErrorType } from "../types";
import { Request, Response } from "express";
export class AuthController {
  static async LoginController(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required" });

    try {
      const { token } = await User.loginUser({ email, password });
      return res.status(200).json({ message: "Login Successful", token });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
  static async SignupController(req: Request, res: Response): Promise<any> {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res
        .status(400)
        .json({ message: "Name, Email and Password are required" });

    try {
      const { token } = await User.createUser({ email, password, name });
      return res
        .status(200)
        .json({ message: "User created Successful", token });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
}
