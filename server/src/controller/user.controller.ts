import { User } from "../services/user.service";
import { ErrorType } from "../types";
import { Request, Response } from "express";
export class UserController {
  static async GetUserController(req: Request, res: Response): Promise<any> {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res
        .status(403)
        .json({ message: "Authrorization token is missing" });
    }
    try {
      const user = await User.getUserDetails(authorization);
      return res.status(200).json({ message: "User Details", user });
    } catch (err: any) {
      const { message, status } = JSON.parse(err.message) as ErrorType;
      return res.status(status).json({ message });
    }
  }
}
